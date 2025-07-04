'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaPlay, FaPause, FaVolumeUp, FaExpand, FaCompress } from 'react-icons/fa'

interface VideoPlayerProps {
  src: string
  onTimeUpdate?: (time: number) => void
  highlights?: Array<{ start: number; end: number; text: string }>
}

export default function VideoPlayer({ src, onTimeUpdate, highlights = [] }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)

  const handlePlayPause = () => {
    const video = document.getElementById('video-player') as HTMLVideoElement
    if (video) {
      if (isPlaying) {
        video.pause()
      } else {
        video.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget
    setCurrentTime(video.currentTime)
    onTimeUpdate?.(video.currentTime)
  }

  const handleLoadedMetadata = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget
    setDuration(video.duration)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    const video = document.getElementById('video-player') as HTMLVideoElement
    if (video) {
      video.volume = newVolume
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value)
    setCurrentTime(newTime)
    const video = document.getElementById('video-player') as HTMLVideoElement
    if (video) {
      video.currentTime = newTime
    }
  }

  const toggleFullscreen = () => {
    const container = document.getElementById('video-container')
    if (container) {
      if (!isFullscreen) {
        container.requestFullscreen()
      } else {
        document.exitFullscreen()
      }
      setIsFullscreen(!isFullscreen)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getCurrentHighlight = () => {
    return highlights.find(h => currentTime >= h.start && currentTime <= h.end)
  }

  return (
    <div
      id="video-container"
      className="relative bg-black rounded-2xl overflow-hidden"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        id="video-player"
        src={src}
        className="w-full h-auto"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Controles */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showControls ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4"
      >
        {/* Barra de progreso */}
        <div className="mb-4">
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #0ea5e9 0%, #0ea5e9 ${(currentTime / duration) * 100}%, #4b5563 ${(currentTime / duration) * 100}%, #4b5563 100%)`
            }}
          />
          
          {/* Marcadores de highlights */}
          {highlights.map((highlight, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full transform -translate-x-1/2"
              style={{
                left: `${(highlight.start / duration) * 100}%`,
                top: '-4px'
              }}
            />
          ))}
        </div>

        {/* Controles principales */}
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center space-x-4">
            <button
              onClick={handlePlayPause}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
            </button>
            
            <div className="flex items-center space-x-2">
              <FaVolumeUp size={16} />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
            <div className="text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>
          
          <button
            onClick={toggleFullscreen}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            {isFullscreen ? <FaCompress size={16} /> : <FaExpand size={16} />}
          </button>
        </div>
      </motion.div>

      {/* Subtítulos/Highlights */}
      {getCurrentHighlight() && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute bottom-20 left-4 right-4 text-center"
        >
          <div className="bg-black/80 text-white px-4 py-2 rounded-lg">
            {getCurrentHighlight()?.text}
          </div>
        </motion.div>
      )}
    </div>
  )
}
