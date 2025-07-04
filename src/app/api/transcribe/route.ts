import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Configuración de OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

    // Verificar si tenemos API key de OpenAI configurada
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
      console.log('🔄 MODO SIMULADO: Sin API key válida');
      
      const mockTranscript = {
        text: "¡Hola! Esta es una transcripción de prueba. Para usar transcripción real, configura tu API key de OpenAI.",
        timestamps: includeTimestamps ? [
          { start: 0, end: 5, text: "¡Hola! Esta es una transcripción de prueba." },
          { start: 5, end: 10, text: "Para usar transcripción real, configura tu API key de OpenAI." }
        ] : [],
        language: language === 'auto' ? 'es' : language,
        duration: 10,
        confidence: 0.95,
        wordCount: 15
      };

      return NextResponse.json(mockTranscript);
    }

    // TRANSCRIPCIÓN REAL CON OPENAI WHISPER
    console.log('🔄 Procesando transcripción REAL con OpenAI...');
    console.log('🎤 API Key detectada:', {
      length: process.env.OPENAI_API_KEY.length,
      prefix: process.env.OPENAI_API_KEY.substring(0, 10) + '...'
    });
    
    let transcription;
    let retryCount = 0;
    const maxRetries = 3;
    
    while (retryCount <= maxRetries) {
      try {
        console.log(`🎤 Intento ${retryCount + 1}/${maxRetries + 1} - Llamando a OpenAI Whisper...`);
        
        transcription = await openai.audio.transcriptions.create({
          file: file,
          model: "whisper-1",
          language: language === 'auto' ? undefined : language,
          response_format: includeTimestamps ? "verbose_json" : "json",
          timestamp_granularities: includeTimestamps ? ["segment"] : undefined,
        });
        
        console.log('🎤 ¡Respuesta REAL de OpenAI recibida!');
        break; // Éxito, salir del bucle
        
      } catch (openaiError) {
        console.error(`❌ Error en intento ${retryCount + 1}:`, openaiError);
        
        if (openaiError instanceof OpenAI.APIError && openaiError.status === 429) {
          retryCount++;
          if (retryCount <= maxRetries) {
            const waitTime = Math.pow(2, retryCount) * 1000; // 2s, 4s, 8s
            console.log(`⏱️ Rate limit - Esperando ${waitTime/1000}s antes del reintento...`);
            await new Promise(resolve => setTimeout(resolve, waitTime));
            continue;
          } else {
            return NextResponse.json({
              error: 'Límite de OpenAI excedido después de varios intentos. Necesitas verificar tu cuenta en platform.openai.com agregando un método de pago.'
            }, { status: 429 });
          }
        }
        
        // Otros errores de OpenAI
        return NextResponse.json({
          error: 'Error al procesar archivo con OpenAI: ' + (openaiError as Error).message
        }, { status: 500 });
      }
    }

    // Verificar que recibimos una transcripción válida
    if (!transcription || !transcription.text) {
      console.error('❌ Transcripción vacía recibida de OpenAI');
      return NextResponse.json({
        error: 'No se pudo obtener transcripción del archivo'
      }, { status: 500 });
    }

    // Formatear la respuesta real de OpenAI
    const response = {
      text: transcription.text.trim(),
      timestamps: includeTimestamps && typeof transcription === 'object' && 'segments' in transcription ? 
        (transcription.segments as any[])?.map((segment: any) => ({
          start: Math.round(segment.start * 100) / 100,
          end: Math.round(segment.end * 100) / 100,
          text: segment.text?.trim() || ''
        })).filter(segment => segment.text.length > 0) : [],
      language: (transcription as any).language || (language === 'auto' ? 'es' : language),
      duration: Math.round(((transcription as any).duration || 0) * 100) / 100,
      confidence: 0.95,
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
