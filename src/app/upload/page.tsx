'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useApi } from '@/hooks/useApi'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function UploadPage() {
  const router = useRouter()
  const api = useApi()
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    
    try {
      setIsUploading(true)
      setError(null)
      
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90))
      }, 500)

      const video = await api.uploadVideo(formData)
      
      clearInterval(progressInterval)
      setUploadProgress(100)
      
      // Redirect to the video page
      router.push(`/video/${video.id}`)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to upload video')
      setUploadProgress(0)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-900 rounded-xl shadow-lg p-6 mb-8">
            <h1 className="text-2xl font-bold text-emerald-400 mb-6">Upload Video</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Video File Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Video
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  name="video"
                  accept="video/*"
                  required
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Caption */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Caption
                </label>
                <textarea
                  name="caption"
                  required
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="Write a caption for your video..."
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  name="tags"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="education, medical, tutorial"
                />
              </div>

              {/* Privacy */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Privacy
                </label>
                <select
                  name="isPublic"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="true">Public</option>
                  <option value="false">Private</option>
                </select>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              {/* Upload Progress */}
              {isUploading && (
                <div className="space-y-2">
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 transition-all duration-500"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-400 text-center">
                    Uploading... {uploadProgress}%
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isUploading}
                className="w-full py-3 px-4 bg-emerald-500 text-white font-medium rounded-lg hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isUploading ? 'Uploading...' : 'Upload Video'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
} 