import { NextRequest, NextResponse } from 'next/server'

// Simulación de la API de traducción - En producción usarías Google Translate API o similar
interface TranslationResponse {
  translation: string
  sourceLanguage: string
  targetLanguage: string
  confidence: number
}

// Función para simular la traducción
async function simulateTranslation(
  text: string, 
  from: string, 
  to: string
): Promise<TranslationResponse> {
  // Simular tiempo de procesamiento
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  // Traducciones simuladas desde español
  const translations: { [key: string]: { [key: string]: string } } = {
    es: {
      en: 'Hello, this is an example of transcription in English. Artificial intelligence has advanced a lot in recent years, especially in natural language processing. We can now convert audio to text with extraordinary precision. This tool is perfect for students, professionals and content creators.',
      fr: 'Bonjour, ceci est un exemple de transcription en français. L\'intelligence artificielle a beaucoup progressé ces dernières années, en particulier dans le traitement du langage naturel. Nous pouvons maintenant convertir l\'audio en texte avec une précision extraordinaire. Cet outil est parfait pour les étudiants, les professionnels et les créateurs de contenu.',
      de: 'Hallo, das ist ein Beispiel für eine Transkription auf Deutsch. Die künstliche Intelligenz hat sich in den letzten Jahren stark weiterentwickelt, insbesondere bei der natürlichen Sprachverarbeitung. Wir können jetzt Audio mit außergewöhnlicher Präzision in Text umwandeln. Dieses Tool ist perfekt für Studenten, Profis und Content-Ersteller.',
      it: 'Ciao, questo è un esempio di trascrizione in italiano. L\'intelligenza artificiale ha fatto molti progressi negli ultimi anni, soprattutto nell\'elaborazione del linguaggio naturale. Ora possiamo convertire l\'audio in testo con una precisione straordinaria. Questo strumento è perfetto per studenti, professionisti e creatori di contenuti.',
      pt: 'Olá, este é um exemplo de transcrição em português. A inteligência artificial avançou muito nos últimos anos, especialmente no processamento de linguagem natural. Agora podemos converter áudio em texto com precisão extraordinária. Esta ferramenta é perfeita para estudantes, profissionais e criadores de conteúdo.',
      ru: 'Привет, это пример транскрипции на русском языке. Искусственный интеллект значительно продвинулся в последние годы, особенно в обработке естественного языка. Теперь мы можем преобразовывать аудио в текст с исключительной точностью. Этот инструмент идеально подходит для студентов, профессионалов и создателей контента.',
      ja: 'こんにちは、これは日本語での転写の例です。人工知能は近年大きく進歩しており、特に自然言語処理において顕著です。今では、音声を驚くほど正確にテキストに変換できます。このツールは学生、専門家、コンテンツクリエーターに最適です。',
      ko: '안녕하세요, 이것은 한국어 전사의 예시입니다. 인공지능은 최근 몇 년간 많이 발전했으며, 특히 자연어 처리 분야에서 두드러집니다. 이제 우리는 오디오를 놀라운 정확도로 텍스트로 변환할 수 있습니다. 이 도구는 학생, 전문가 및 콘텐츠 크리에이터에게 완벽합니다.',
      zh: '你好，这是中文转录的示例。人工智能在最近几年取得了很大进展，特别是在自然语言处理方面。现在我们可以将音频转换为文本，准确性非常高。这个工具非常适合学生、专业人士和内容创作者。',
      ar: 'مرحبا، هذا مثال على النسخ باللغة العربية. لقد تقدم الذكاء الاصطناعي كثيرا في السنوات الأخيرة، خاصة في معالجة اللغة الطبيعية. يمكننا الآن تحويل الصوت إلى نص بدقة استثنائية. هذه الأداة مثالية للطلاب والمهنيين ومنشئي المحتوى.',
      hi: 'नमस्ते, यह हिंदी में ट्रांसक्रिप्शन का एक उदाहरण है। कृत्रिम बुद्धिमत्ता ने हाल के वर्षों में बहुत प्रगति की है, विशेष रूप से प्राकृतिक भाषा प्रसंस्करण में। अब हम असाधारण सटीकता के साथ ऑडियो को टेक्स्ट में बदल सकते हैं। यह उपकरण छात्रों, पेशेवरों और सामग्री निर्माताओं के लिए बिल्कुल सही है।'
    }
  }
  
  // Obtener traducción simulada
  const translation = translations[from]?.[to] || translations.es[to] || text
  
  return {
    translation,
    sourceLanguage: from,
    targetLanguage: to,
    confidence: 0.92 + Math.random() * 0.08 // 92-100% confianza
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { text, from, to } = body
    
    if (!text || !from || !to) {
      return NextResponse.json(
        { error: 'Faltan parámetros requeridos: text, from, to' },
        { status: 400 }
      )
    }
    
    if (from === to) {
      return NextResponse.json(
        { error: 'El idioma de origen y destino no pueden ser el mismo' },
        { status: 400 }
      )
    }
    
    // Simular traducción
    const result = await simulateTranslation(text, from, to)
    
    return NextResponse.json(result)
    
  } catch (error) {
    console.error('Error en traducción:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// Para Next.js 13+ App Router
export const runtime = 'nodejs'
export const maxDuration = 15 // 15 segundos máximo
