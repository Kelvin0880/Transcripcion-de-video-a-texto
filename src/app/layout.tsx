import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TranscriptorPro - Transcripción Inteligente de Videos',
  description: 'Sistema profesional de transcripción de video a texto con traducción automática. Desarrollado por Kelvin Jose Piña Gomez.',
  keywords: ['transcripción', 'video', 'audio', 'texto', 'IA', 'traducción', 'automática'],
  authors: [{ name: 'Kelvin Jose Piña Gomez', url: 'https://github.com/Kelvin0880' }],
  creator: 'Kelvin Jose Piña Gomez',
  publisher: 'TranscriptorPro',
  robots: 'index, follow',
  openGraph: {
    title: 'TranscriptorPro - Transcripción Inteligente de Videos',
    description: 'Sistema profesional de transcripción de video a texto con traducción automática',
    url: 'https://transcriptor-pro.render.com',
    siteName: 'TranscriptorPro',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'TranscriptorPro - Transcripción Inteligente',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TranscriptorPro - Transcripción Inteligente de Videos',
    description: 'Sistema profesional de transcripción de video a texto con traducción automática',
    images: ['/og-image.jpg'],
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#0ea5e9',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
          {children}
        </div>
      </body>
    </html>
  )
}
