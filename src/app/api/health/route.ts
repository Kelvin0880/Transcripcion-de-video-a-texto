import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Verificar que la aplicación esté funcionando
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      services: {
        database: 'not_required',
        openai: process.env.OPENAI_API_KEY ? 'configured' : 'not_configured',
        file_upload: 'active',
        transcription: 'active',
        analysis: 'active'
      },
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      features: {
        audio_support: true,
        video_support: true,
        transcription: true,
        analysis: true,
        translation: true
      }
    }

    return NextResponse.json(health)
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}
