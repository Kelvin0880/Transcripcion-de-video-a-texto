import { NextRequest, NextResponse } from 'next/server';
import { AssemblyAI } from 'assemblyai';

// USANDO ASSEMBLYAI - GRATIS 3 HORAS/MES
// Configuración de AssemblyAI (alternativa gratuita a OpenAI)
const ASSEMBLYAI_API_KEY = process.env.ASSEMBLYAI_API_KEY || '';

// Inicializar cliente AssemblyAI
const client = ASSEMBLYAI_API_KEY ? new AssemblyAI({
  apiKey: ASSEMBLYAI_API_KEY,
}) : null;

// Rate limiting simple
const requestCounts = new Map();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60000; // 1 minuto
  const maxRequests = 10;
  
  const userRequests = requestCounts.get(ip) || [];
  const recentRequests = userRequests.filter((time: number) => now - time < windowMs);
  
  if (recentRequests.length >= maxRequests) {
    return false;
  }
  
  recentRequests.push(now);
  requestCounts.set(ip, recentRequests);
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    
    // Verificar rate limiting
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const language = formData.get('language') as string || 'auto';
    const includeTimestamps = formData.get('includeTimestamps') === 'true';

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Verificar tipo de archivo
    const allowedTypes = [
      'video/mp4', 'video/avi', 'video/mov', 'video/mkv',
      'video/webm', 'video/quicktime', 'video/x-msvideo',
      'audio/mpeg', 'audio/mp4', 'audio/wav', 'audio/webm'
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Unsupported file type' },
        { status: 400 }
      );
    }

    // Verificar tamaño del archivo (100MB máximo)
    const maxSize = 100 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size exceeds 100MB limit' },
        { status: 400 }
      );
    }

    // Verificar si tenemos API key de AssemblyAI configurada
    if (!ASSEMBLYAI_API_KEY || ASSEMBLYAI_API_KEY === 'your_assemblyai_api_key_here') {
      console.log('🔄 MODO SIMULADO: Sin API key válida de AssemblyAI');
      
      const mockTranscript = {
        text: "¡Hola! Esta es una transcripción de prueba. Para usar transcripción real, configura tu API key de AssemblyAI.",
        timestamps: includeTimestamps ? [
          { start: 0, end: 5, text: "¡Hola! Esta es una transcripción de prueba." },
          { start: 5, end: 10, text: "Para usar transcripción real, configura tu API key de AssemblyAI." }
        ] : [],
        language: language === 'auto' ? 'es' : language,
        duration: 10,
        confidence: 0.95,
        wordCount: 15
      };

      return NextResponse.json(mockTranscript);
    }

    // TRANSCRIPCIÓN REAL CON ASSEMBLYAI
    console.log('🔄 Procesando transcripción REAL con AssemblyAI...');
    console.log('🎤 API Key detectada:', {
      length: ASSEMBLYAI_API_KEY.length,
      prefix: ASSEMBLYAI_API_KEY.substring(0, 10) + '...'
    });

    if (!client) {
      return NextResponse.json({
        error: 'Cliente AssemblyAI no configurado correctamente'
      }, { status: 500 });
    }
    
    let transcription;
    let retryCount = 0;
    const maxRetries = 3;
    
    while (retryCount <= maxRetries) {
      try {
        console.log(`🎤 Intento ${retryCount + 1}/${maxRetries + 1} - Subiendo archivo a AssemblyAI...`);
        
        // Convertir archivo a buffer
        const buffer = Buffer.from(await file.arrayBuffer());
        
        // Subir archivo a AssemblyAI
        const uploadResponse = await client.files.upload(buffer);
        
        console.log('📤 Archivo subido, iniciando transcripción...');
        
        // Configurar parámetros de transcripción
        const params = {
          audio_url: uploadResponse,
          language_code: language === 'auto' ? undefined : language,
          punctuate: true,
          format_text: true,
        };
        
        // Agregar timestamps si se requieren
        if (includeTimestamps) {
          (params as any).word_boost = [];
          (params as any).boost_param = 'default';
        }
        
        // Iniciar transcripción
        const transcript = await client.transcripts.create(params);
        
        // Esperar a que se complete
        console.log('⏳ Esperando transcripción...');
        transcription = await client.transcripts.waitUntilReady(transcript.id);
        
        console.log('🎤 ¡Respuesta REAL de AssemblyAI recibida!');
        break; // Éxito, salir del bucle
        
      } catch (assemblyError) {
        console.error(`❌ Error en intento ${retryCount + 1}:`, assemblyError);
        
        // Verificar si es error de rate limit
        if (assemblyError instanceof Error && assemblyError.message.includes('rate limit')) {
          retryCount++;
          if (retryCount <= maxRetries) {
            const waitTime = Math.pow(2, retryCount) * 1000; // 2s, 4s, 8s
            console.log(`⏱️ Rate limit - Esperando ${waitTime/1000}s antes del reintento...`);
            await new Promise(resolve => setTimeout(resolve, waitTime));
            continue;
          } else {
            return NextResponse.json({
              error: 'Límite de AssemblyAI excedido después de varios intentos. Intenta más tarde.'
            }, { status: 429 });
          }
        }
        
        // Otros errores de AssemblyAI
        return NextResponse.json({
          error: 'Error al procesar archivo con AssemblyAI: ' + (assemblyError as Error).message
        }, { status: 500 });
      }
    }

    // Verificar que recibimos una transcripción válida
    if (!transcription || !transcription.text) {
      console.error('❌ Transcripción vacía recibida de AssemblyAI');
      return NextResponse.json({
        error: 'No se pudo obtener transcripción del archivo'
      }, { status: 500 });
    }

    // Formatear la respuesta real de AssemblyAI
    const response = {
      text: transcription.text.trim(),
      timestamps: includeTimestamps && transcription.words ? 
        transcription.words.map((word: any) => ({
          start: Math.round(word.start / 1000 * 100) / 100, // Convertir ms a segundos
          end: Math.round(word.end / 1000 * 100) / 100,
          text: word.text
        })) : [],
      language: transcription.language_code || (language === 'auto' ? 'es' : language),
      duration: Math.round((transcription.audio_duration || 0) * 100) / 100,
      confidence: transcription.confidence || 0.95,
      wordCount: transcription.text.trim().split(/\s+/).filter((word: string) => word.length > 0).length
    };

    console.log('✅ Transcripción REAL completada exitosamente:', {
      textLength: response.text.length,
      wordCount: response.wordCount,
      duration: response.duration
    });
    
    return NextResponse.json(response);

  } catch (error) {
    console.error('❌ Error general en transcripción:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor. Inténtalo de nuevo.' },
      { status: 500 }
    );
  }
}
