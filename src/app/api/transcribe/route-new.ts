import { NextRequest, NextResponse } from 'next/server'
import { writeFile, unlink, mkdir } from 'fs/promises'
import { join } from 'path'
import { v4 as uuidv4 } from 'uuid'
import { existsSync } from 'fs'

// Simulación de la API de Whisper - En producción, usarías la API real de OpenAI
interface TranscriptionResponse {
  text: string
  timestamps: Array<{ start: number; end: number; text: string }>
  language: string
  confidence: number
  wordCount: number
  duration: number
}

// Función para simular la transcripción (reemplaza con OpenAI Whisper en producción)
async function simulateTranscription(
  filePath: string, 
  language: string, 
  includeTimestamps: boolean
): Promise<TranscriptionResponse> {
  // Simular tiempo de procesamiento
  await new Promise(resolve => setTimeout(resolve, 3000))
  
  // Texto de ejemplo basado en el idioma
  const sampleTexts = {
    'es': 'Hola, este es un ejemplo de transcripción en español. La inteligencia artificial ha avanzado mucho en los últimos años, especialmente en el procesamiento de lenguaje natural. Ahora podemos convertir audio a texto con una precisión extraordinaria. Esta herramienta es perfecta para estudiantes, profesionales y creadores de contenido.',
    'en': 'Hello, this is an example of transcription in English. Artificial intelligence has advanced a lot in recent years, especially in natural language processing. We can now convert audio to text with extraordinary precision. This tool is perfect for students, professionals and content creators.',
    'fr': 'Bonjour, ceci est un exemple de transcription en français. L\'intelligence artificielle a beaucoup progressé ces dernières années, en particulier dans le traitement du langage naturel. Nous pouvons maintenant convertir l\'audio en texte avec une précision extraordinaire.',
    'de': 'Hallo, das ist ein Beispiel für eine Transkription auf Deutsch. Die künstliche Intelligenz hat sich in den letzten Jahren stark weiterentwickelt, insbesondere bei der natürlichen Sprachverarbeitung. Wir können jetzt Audio mit außergewöhnlicher Präzision in Text umwandeln.',
    'it': 'Ciao, questo è un esempio di trascrizione in italiano. L\'intelligenza artificiale ha fatto molti progressi negli ultimi anni, soprattutto nell\'elaborazione del linguaggio naturale. Ora possiamo convertire l\'audio in testo con una precisione straordinaria.',
    'pt': 'Olá, este é um exemplo de transcrição em português. A inteligência artificial avançou muito nos últimos anos, especialmente no processamento de linguagem natural. Agora podemos converter áudio em texto com precisão extraordinária.',
    'ru': 'Привет, это пример транскрипции на русском языке. Искусственный интеллект значительно продвинулся в последние годы, особенно в обработке естественного языка.',
    'ja': 'こんにちは、これは日本語での転写の例です。人工知能は近年大きく進歩しており、特に自然言語処理において顕著です。',
    'ko': '안녕하세요, 이것은 한국어 전사의 예시입니다. 인공지능은 최근 몇 년간 많이 발전했으며, 특히 자연어 처리 분야에서 두드러집니다.',
    'zh': '你好，这是中文转录的示例。人工智能在最近几年取得了很大进展，特别是在自然语言处理方面。',
    'ar': 'مرحبا، هذا مثال على النسخ باللغة العربية. لقد تقدم الذكاء الاصطناعي كثيرا في السنوات الأخيرة، خاصة في معالجة اللغة الطبيعية.',
    'hi': 'नमस्ते, यह हिंदी में ट्रांसक्रिप्शन का एक उदाहरण है। कृत्रिम बुद्धिमत्ता ने हाल के वर्षों में बहुत प्रगति की है, विशेष रूप से प्राकृतिक भाषा प्रसंस्करण में।'
  }
  
  const text = sampleTexts[language as keyof typeof sampleTexts] || sampleTexts.en
  const words = text.split(' ')
  const wordCount = words.length
  
  // Generar timestamps simulados
  let timestamps: Array<{ start: number; end: number; text: string }> = []
  
  if (includeTimestamps) {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim())
    let currentTime = 0
    
    sentences.forEach((sentence, index) => {
      const duration = sentence.split(' ').length * 0.6 // ~0.6 segundos por palabra
      timestamps.push({
        start: currentTime,
        end: currentTime + duration,
        text: sentence.trim()
      })
      currentTime += duration + 0.5 // Pausa entre oraciones
    })
  }
  
  return {
    text,
    timestamps,
    language,
    confidence: 0.93 + Math.random() * 0.07, // 93-100% confianza
    wordCount,
    duration: words.length * 0.6 // Duración simulada
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('video') as File
    const language = formData.get('language') as string || 'es'
    const includeTimestamps = formData.get('includeTimestamps') === 'true'
    
    if (!file) {
      return NextResponse.json(
        { error: 'No se proporcionó archivo de video' },
        { status: 400 }
      )
    }
    
    // Validar tipo de archivo
    if (!file.type.startsWith('video/')) {
      return NextResponse.json(
        { error: 'El archivo debe ser un video' },
        { status: 400 }
      )
    }
    
    // Validar tamaño (100MB máximo)
    if (file.size > 100 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'El archivo es demasiado grande. Máximo 100MB' },
        { status: 400 }
      )
    }
    
    // Crear directorio temporal si no existe
    const tempDir = join(process.cwd(), 'temp')
    if (!existsSync(tempDir)) {
      await mkdir(tempDir, { recursive: true })
    }
    
    // Crear archivo temporal
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const fileName = `${uuidv4()}.${file.name.split('.').pop()}`
    const filePath = join(tempDir, fileName)
    
    try {
      // Escribir archivo temporal
      await writeFile(filePath, buffer)
      
      // Simular transcripción (reemplaza con OpenAI Whisper en producción)
      const result = await simulateTranscription(filePath, language, includeTimestamps)
      
      // Limpiar archivo temporal
      await unlink(filePath)
      
      return NextResponse.json(result)
      
    } catch (error) {
      // Limpiar archivo temporal si existe
      try {
        await unlink(filePath)
      } catch {}
      
      throw error
    }
    
  } catch (error) {
    console.error('Error en transcripción:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// Para Next.js 13+ App Router
export const runtime = 'nodejs'
export const maxDuration = 30 // 30 segundos máximo
