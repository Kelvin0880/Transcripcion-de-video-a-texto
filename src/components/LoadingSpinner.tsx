import { motion } from 'framer-motion'
import { FaSpinner } from 'react-icons/fa'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  message?: string
  progress?: number
  className?: string
}

export default function LoadingSpinner({ 
  size = 'md', 
  message, 
  progress,
  className = '' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className={`${sizeClasses[size]} text-blue-500 mb-2`}
      >
        <FaSpinner className="w-full h-full" />
      </motion.div>
      
      {message && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-gray-300 text-center"
        >
          {message}
        </motion.p>
      )}
      
      {progress !== undefined && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 w-full max-w-xs"
        >
          <div className="bg-gray-700 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="text-xs text-gray-400 text-center mt-1">
            {Math.round(progress)}% completado
          </p>
        </motion.div>
      )}
    </div>
  )
}
