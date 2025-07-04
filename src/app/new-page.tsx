'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaVideo, 
  FaUpload, 
  FaLanguage, 
  FaClock, 
  FaShieldAlt, 
  FaDownload,
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaGlobe,
  FaCheckCircle,
  FaSpinner,
  FaExclamationTriangle,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaRocket,
  FaHeart,
  FaStar,
  FaLightbulb,
  FaMagic,
  FaFileAlt,
  FaClipboard,
  FaShare,
  FaEye,
  FaEyeSlash,
  FaUserShield,
  FaCloud,
  FaGem,
  FaFireAlt,
  FaThumbsUp,
  FaCode,
  FaDesktop,
  FaMobile,
  FaTabletAlt
} from 'react-icons/fa'
import { MdTranslate, MdSecurity, MdTimer, MdCloudUpload, MdAutoAwesome, MdSpeed, MdHighQuality } from 'react-icons/md'
import { toast, Toaster } from 'react-hot-toast'

interface TranscriptionResult {
  text: string
  timestamps: Array<{ start: number; end: number; text: string }>
  language: string
  translation?: string
  targetLanguage?: string
  confidence: number
  wordCount: number
  duration: number
}

export default function Home() {
  const [file, setFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<TranscriptionResult | null>(null)
  const [selectedLanguage, setSelectedLanguage] = useState('es')
  const [targetLanguage, setTargetLanguage] = useState('en')
  const [showTimestamps, setShowTimestamps] = useState(true)
  const [protectedMode, setProtectedMode] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [isTranslating, setIsTranslating] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const languages = [
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' }
  ]

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }, [])

  const handleFileSelect = useCallback((selectedFile: File) => {
    // Validar tipo de archivo
    if (!selectedFile.type.startsWith('video/')) {
      toast.error('Por favor selecciona un archivo de video válido')
      return
    }

    // Validar tamaño (100MB máximo)
    if (selectedFile.size > 100 * 1024 * 1024) {
      toast.error('El archivo es demasiado grande. Máximo 100MB permitido')
      return
    }

    setFile(selectedFile)
    setError(null)
    setResult(null)
    toast.success('Video cargado correctamente')
  }, [])

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      handleFileSelect(selectedFile)
    }
  }, [handleFileSelect])

  const handleTranscription = useCallback(async () => {
    if (!file) {
      toast.error('Por favor selecciona un video primero')
      return
    }

    setIsProcessing(true)
    setProgress(0)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('video', file)
      formData.append('language', selectedLanguage)
      formData.append('includeTimestamps', showTimestamps.toString())

      // Simular progreso
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return prev
          }
          return prev + Math.random() * 10
        })
      }, 500)

      const response = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData
      })

      clearInterval(progressInterval)

      if (!response.ok) {
        throw new Error('Error en la transcripción')
      }

      const data = await response.json()
      setResult(data)
      setProgress(100)
      toast.success('¡Transcripción completada!')
      
    } catch (error) {
      setError('Error al procesar el video. Inténtalo de nuevo.')
      toast.error('Error al procesar el video')
    } finally {
      setIsProcessing(false)
    }
  }, [file, selectedLanguage, showTimestamps])

  const handleTranslation = useCallback(async () => {
    if (!result?.text) return

    setIsTranslating(true)
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: result.text,
          from: selectedLanguage,
          to: targetLanguage
        })
      })

      if (!response.ok) throw new Error('Error en la traducción')

      const data = await response.json()
      setResult(prev => prev ? { ...prev, translation: data.translation, targetLanguage } : null)
      toast.success('¡Traducción completada!')
    } catch (error) {
      toast.error('Error al traducir el texto')
    } finally {
      setIsTranslating(false)
    }
  }, [result, selectedLanguage, targetLanguage])

  const copyToClipboard = useCallback((text: string) => {
    if (protectedMode) {
      toast.error('Modo protegido activado. No se puede copiar el texto.')
      return
    }

    navigator.clipboard.writeText(text)
    toast.success('Texto copiado al portapapeles')
  }, [protectedMode])

  const downloadTranscription = useCallback(() => {
    if (!result) return

    const content = `
TRANSCRIPCIÓN DE VIDEO
======================

Idioma: ${languages.find(l => l.code === selectedLanguage)?.name}
Duración: ${result.duration ? `${Math.round(result.duration)} segundos` : 'N/A'}
Palabras: ${result.wordCount || 0}
Confianza: ${result.confidence ? `${Math.round(result.confidence * 100)}%` : 'N/A'}

TRANSCRIPCIÓN:
${result.text}

${result.translation ? `
TRADUCCIÓN (${languages.find(l => l.code === targetLanguage)?.name}):
${result.translation}
` : ''}

${showTimestamps && result.timestamps ? `
MARCAS DE TIEMPO:
${result.timestamps.map(t => `${Math.round(t.start)}s - ${Math.round(t.end)}s: ${t.text}`).join('\n')}
` : ''}

---
Generado por TranscriptorPro
Desarrollado por Kelvin Jose Piña Gomez
Ingeniero en Sistemas
kelvin8bp@gmail.com
`

    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `transcripcion-${new Date().toISOString().split('T')[0]}.txt`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Transcripción descargada')
  }, [result, selectedLanguage, targetLanguage, showTimestamps, languages])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <Toaster position="top-center" />
      
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-indigo-600/20"></div>
        <div className="relative container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <motion.div
              className="inline-flex items-center gap-3 mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full">
                <FaVideo className="text-2xl" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
                TranscriptorPro
              </h1>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="text-yellow-400"
              >
                <FaStar className="text-2xl" />
              </motion.div>
            </motion.div>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Convierte tus videos a texto con precisión extraordinaria usando 
              <span className="text-yellow-400 font-semibold"> Inteligencia Artificial avanzada</span>
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <MdHighQuality className="text-green-400" />
                <span>Calidad Premium</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <MdSpeed className="text-blue-400" />
                <span>Súper Rápido</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <MdSecurity className="text-purple-400" />
                <span>100% Seguro</span>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <MdCloudUpload className="text-blue-400" />
                Subir Video
              </h2>

              {/* File Upload Area */}
              <div
                className={`border-2 border-dashed rounded-xl p-8 transition-all duration-300 ${
                  isDragging 
                    ? 'border-blue-400 bg-blue-400/10' 
                    : 'border-gray-400 hover:border-blue-400 hover:bg-blue-400/5'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="text-center">
                  <motion.div
                    animate={{ 
                      scale: isDragging ? 1.1 : 1,
                      rotate: isDragging ? 180 : 0
                    }}
                    className="mx-auto mb-4 p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-fit"
                  >
                    <FaUpload className="text-3xl" />
                  </motion.div>
                  
                  <p className="text-xl font-semibold mb-2">
                    {isDragging ? '¡Suelta tu video aquí!' : 'Arrastra tu video aquí'}
                  </p>
                  
                  <p className="text-gray-300 mb-4">
                    o haz clic para seleccionar un archivo
                  </p>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-6 py-3 rounded-full font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Seleccionar Archivo
                  </motion.button>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  
                  <div className="mt-4 text-sm text-gray-400">
                    <p>Formatos soportados: MP4, AVI, MOV, MKV</p>
                    <p>Tamaño máximo: 100MB | Duración máxima: 10 minutos</p>
                  </div>
                </div>
              </div>

              {/* Selected File Info */}
              {file && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="text-green-400 text-xl" />
                    <div>
                      <p className="font-semibold text-green-300">Archivo seleccionado</p>
                      <p className="text-sm text-gray-300">
                        {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Video Preview */}
              {file && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-6"
                >
                  <video
                    ref={videoRef}
                    controls
                    className="w-full max-w-md mx-auto rounded-xl shadow-lg"
                    src={URL.createObjectURL(file)}
                  />
                </motion.div>
              )}

              {/* Processing Progress */}
              {isProcessing && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <FaSpinner className="text-blue-400 text-xl" />
                    </motion.div>
                    <span className="font-semibold text-blue-300">Procesando video...</span>
                  </div>
                  
                  <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
                    <motion.div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  
                  <p className="text-sm text-gray-300 text-center">
                    {progress.toFixed(0)}% completado
                  </p>
                </motion.div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleTranscription}
                  disabled={!file || isProcessing}
                  className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-700 px-6 py-3 rounded-full font-semibold transition-all duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <FaSpinner className="animate-spin mr-2" />
                      Procesando...
                    </>
                  ) : (
                    <>
                      <FaRocket className="mr-2" />
                      Iniciar Transcripción
                    </>
                  )}
                </motion.button>
                
                {result && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleTranslation}
                    disabled={isTranslating}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-600 disabled:to-gray-700 px-6 py-3 rounded-full font-semibold transition-all duration-200 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
                  >
                    {isTranslating ? (
                      <>
                        <FaSpinner className="animate-spin mr-2" />
                        Traduciendo...
                      </>
                    ) : (
                      <>
                        <MdTranslate className="mr-2" />
                        Traducir
                      </>
                    )}
                  </motion.button>
                )}
              </div>
            </motion.div>
          </div>

          {/* Settings Panel */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                <FaLightbulb className="text-yellow-400" />
                Configuración
              </h3>

              {/* Language Selection */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Idioma del Video</label>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg focus:border-blue-400 focus:outline-none transition-colors"
                  >
                    {languages.map(lang => (
                      <option key={lang.code} value={lang.code} className="bg-gray-800">
                        {lang.flag} {lang.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Traducir a</label>
                  <select
                    value={targetLanguage}
                    onChange={(e) => setTargetLanguage(e.target.value)}
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg focus:border-blue-400 focus:outline-none transition-colors"
                  >
                    {languages.map(lang => (
                      <option key={lang.code} value={lang.code} className="bg-gray-800">
                        {lang.flag} {lang.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Options */}
              <div className="space-y-4 mt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FaClock className="text-blue-400" />
                    <span className="text-sm font-medium">Marcas de tiempo</span>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowTimestamps(!showTimestamps)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      showTimestamps ? 'bg-blue-500' : 'bg-gray-600'
                    }`}
                  >
                    <motion.div
                      animate={{ x: showTimestamps ? 24 : 0 }}
                      className="w-6 h-6 bg-white rounded-full shadow-md"
                    />
                  </motion.button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FaShieldAlt className="text-green-400" />
                    <span className="text-sm font-medium">Modo protegido</span>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setProtectedMode(!protectedMode)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      protectedMode ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  >
                    <motion.div
                      animate={{ x: protectedMode ? 24 : 0 }}
                      className="w-6 h-6 bg-white rounded-full shadow-md"
                    />
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Stats Panel */}
            {result && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
              >
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                  <FaGem className="text-purple-400" />
                  Estadísticas
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-white/5 rounded-lg">
                    <div className="text-2xl font-bold text-blue-400">
                      {result.wordCount || 0}
                    </div>
                    <div className="text-sm text-gray-400">Palabras</div>
                  </div>
                  
                  <div className="text-center p-3 bg-white/5 rounded-lg">
                    <div className="text-2xl font-bold text-green-400">
                      {result.confidence ? `${Math.round(result.confidence * 100)}%` : 'N/A'}
                    </div>
                    <div className="text-sm text-gray-400">Precisión</div>
                  </div>
                  
                  <div className="text-center p-3 bg-white/5 rounded-lg">
                    <div className="text-2xl font-bold text-purple-400">
                      {result.duration ? formatTime(result.duration) : 'N/A'}
                    </div>
                    <div className="text-sm text-gray-400">Duración</div>
                  </div>
                  
                  <div className="text-center p-3 bg-white/5 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-400">
                      {result.timestamps?.length || 0}
                    </div>
                    <div className="text-sm text-gray-400">Segmentos</div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Results Section */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8 bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold flex items-center gap-3">
                  <FaFileAlt className="text-green-400" />
                  Resultados
                </h3>
                
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => copyToClipboard(result.text)}
                    className="p-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-colors"
                  >
                    <FaClipboard className="text-blue-400" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={downloadTranscription}
                    className="p-2 bg-green-500/20 hover:bg-green-500/30 rounded-lg transition-colors"
                  >
                    <FaDownload className="text-green-400" />
                  </motion.button>
                </div>
              </div>

              {/* Transcription Text */}
              <div className="space-y-6">
                <div className="p-4 bg-white/5 rounded-xl">
                  <h4 className="font-semibold text-blue-300 mb-3 flex items-center gap-2">
                    <FaLanguage />
                    Transcripción Original ({languages.find(l => l.code === selectedLanguage)?.name})
                  </h4>
                  <p className="text-gray-200 leading-relaxed whitespace-pre-wrap">
                    {result.text}
                  </p>
                </div>

                {/* Translation */}
                {result.translation && (
                  <div className="p-4 bg-white/5 rounded-xl">
                    <h4 className="font-semibold text-purple-300 mb-3 flex items-center gap-2">
                      <MdTranslate />
                      Traducción ({languages.find(l => l.code === result.targetLanguage)?.name})
                    </h4>
                    <p className="text-gray-200 leading-relaxed whitespace-pre-wrap">
                      {result.translation}
                    </p>
                  </div>
                )}

                {/* Timestamps */}
                {showTimestamps && result.timestamps && result.timestamps.length > 0 && (
                  <div className="p-4 bg-white/5 rounded-xl">
                    <h4 className="font-semibold text-yellow-300 mb-3 flex items-center gap-2">
                      <FaClock />
                      Marcas de Tiempo
                    </h4>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {result.timestamps.map((timestamp, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-2 bg-white/5 rounded-lg"
                        >
                          <span className="text-sm text-blue-400 font-mono min-w-0">
                            {formatTime(timestamp.start)} - {formatTime(timestamp.end)}
                          </span>
                          <span className="text-sm text-gray-200 flex-1">
                            {timestamp.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl"
            >
              <div className="flex items-center gap-3">
                <FaExclamationTriangle className="text-red-400 text-xl" />
                <span className="text-red-300 font-medium">{error}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-white/20 bg-black/20 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FaRocket className="text-purple-400" />
                TranscriptorPro
              </h4>
              <p className="text-gray-400 leading-relaxed">
                La herramienta más avanzada para convertir videos a texto con precisión 
                profesional y traducción automática.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Características</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-400 text-sm" />
                  Transcripción ultra-precisa
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-400 text-sm" />
                  Traducción automática
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-400 text-sm" />
                  Marcas de tiempo
                </li>
                <li className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-400 text-sm" />
                  Modo protegido
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Desarrollador</h4>
              <div className="text-gray-400 space-y-2">
                <p className="font-medium text-white">Kelvin Jose Piña Gomez</p>
                <p className="text-sm">Ingeniero en Sistemas</p>
                <div className="flex gap-4 mt-4">
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    href="mailto:kelvin8bp@gmail.com"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    <FaEnvelope className="text-xl" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    href="#"
                    className="text-purple-400 hover:text-purple-300"
                  >
                    <FaGithub className="text-xl" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    href="#"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    <FaLinkedin className="text-xl" />
                  </motion.a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 TranscriptorPro. Creado con <FaHeart className="inline text-red-400" /> por Kelvin Jose Piña Gomez</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
