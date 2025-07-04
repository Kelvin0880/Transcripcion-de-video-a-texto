import { NextRequest, NextResponse } from 'next/server';

// Rate limiting simple
const requestCounts = new Map();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60000; // 1 minuto
  const maxRequests = 5; // Menor límite para esta API más intensiva
  
  const userRequests = requestCounts.get(ip) || [];
  const recentRequests = userRequests.filter((time: number) => now - time < windowMs);
  
  if (recentRequests.length >= maxRequests) {
    return false;
  }
  
  recentRequests.push(now);
  requestCounts.set(ip, recentRequests);
  return true;
}

// Función para generar resumen inteligente
function generateSummary(text: string): string {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const words = text.split(' ');
  const wordCount = words.length;
  
  // Identificar palabras clave más frecuentes
  const wordFreq: { [key: string]: number } = {};
  words.forEach(word => {
    const cleanWord = word.toLowerCase().replace(/[^\w]/g, '');
    if (cleanWord.length > 3) {
      wordFreq[cleanWord] = (wordFreq[cleanWord] || 0) + 1;
    }
  });
  
  // Obtener las 5 palabras más frecuentes
  const topWords = Object.entries(wordFreq)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([word]) => word);
  
  // Seleccionar las 3 oraciones más representativas
  const importantSentences = sentences
    .map(sentence => ({
      text: sentence.trim(),
      score: topWords.reduce((score, word) => {
        return score + (sentence.toLowerCase().includes(word) ? 1 : 0);
      }, 0)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(item => item.text);
  
  return importantSentences.join('. ') + '.';
}

// Función para identificar highlights/momentos clave
function generateHighlights(text: string, timestamps: any[]): any[] {
  if (!timestamps || timestamps.length === 0) {
    return [];
  }
  
  // Palabras que indican momentos importantes
  const keywordIndicators = [
    'importante', 'clave', 'principal', 'fundamental', 'esencial',
    'destacar', 'enfatizar', 'subrayar', 'recordar', 'atención',
    'primero', 'segundo', 'tercero', 'finalmente', 'conclusión',
    'resumen', 'punto', 'aspecto', 'factor', 'elemento'
  ];
  
  const highlights = timestamps
    .map(timestamp => ({
      ...timestamp,
      importance: keywordIndicators.reduce((score, keyword) => {
        return score + (timestamp.text.toLowerCase().includes(keyword) ? 1 : 0);
      }, 0) + (timestamp.text.length > 50 ? 1 : 0) // Preferir segmentos más largos
    }))
    .filter(item => item.importance > 0)
    .sort((a, b) => b.importance - a.importance)
    .slice(0, 5); // Top 5 highlights
  
  return highlights;
}

// Función para análisis de sentimientos básico
function analyzeSentiment(text: string): { sentiment: string; confidence: number } {
  const positiveWords = ['bueno', 'excelente', 'genial', 'perfecto', 'increíble', 'fantástico', 'maravilloso'];
  const negativeWords = ['malo', 'terrible', 'horrible', 'pésimo', 'desastroso', 'problemático'];
  
  const words = text.toLowerCase().split(' ');
  let positiveCount = 0;
  let negativeCount = 0;
  
  words.forEach(word => {
    if (positiveWords.some(pw => word.includes(pw))) positiveCount++;
    if (negativeWords.some(nw => word.includes(nw))) negativeCount++;
  });
  
  const total = positiveCount + negativeCount;
  if (total === 0) return { sentiment: 'neutral', confidence: 0.5 };
  
  const confidence = Math.max(positiveCount, negativeCount) / total;
  const sentiment = positiveCount > negativeCount ? 'positive' : 'negative';
  
  return { sentiment, confidence };
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

    const { text, timestamps, type } = await request.json();

    if (!text) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    let result: any = {};

    switch (type) {
      case 'summary':
        result = {
          summary: generateSummary(text),
          wordCount: text.split(' ').length,
          readingTime: Math.ceil(text.split(' ').length / 200), // palabras por minuto
        };
        break;

      case 'highlights':
        result = {
          highlights: generateHighlights(text, timestamps),
          totalSegments: timestamps?.length || 0,
        };
        break;

      case 'sentiment':
        result = {
          ...analyzeSentiment(text),
          analysis: 'Análisis básico de sentimientos basado en palabras clave'
        };
        break;

      case 'full-analysis':
        const sentiment = analyzeSentiment(text);
        result = {
          summary: generateSummary(text),
          highlights: generateHighlights(text, timestamps),
          sentiment: sentiment.sentiment,
          sentimentConfidence: sentiment.confidence,
          stats: {
            wordCount: text.split(' ').length,
            sentences: text.split(/[.!?]+/).filter((s: string) => s.trim().length > 0).length,
            readingTime: Math.ceil(text.split(' ').length / 200),
            totalSegments: timestamps?.length || 0,
          }
        };
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid analysis type. Use: summary, highlights, sentiment, or full-analysis' },
          { status: 400 }
        );
    }

    console.log(`✅ Análisis ${type} completado exitosamente`);
    return NextResponse.json(result);

  } catch (error) {
    console.error('❌ Error en análisis:', error);
    return NextResponse.json(
      { error: 'Analysis failed. Please try again.' },
      { status: 500 }
    );
  }
}
