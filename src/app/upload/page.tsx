'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CloudArrowUpIcon, HashtagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { api } from '@/services/api'
import { env } from '@/env'

interface UploadForm {
  caption: string
  tags: string[]
  isPublic: boolean
}

export default function UploadPage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>('')
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState<UploadForm>({
    caption: '',
    tags: [],
    isPublic: true,
  })
  const [currentTag, setCurrentTag] = useState('')

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.size <= env.uploadMaxSize) {
      setFile(selectedFile)
      // Create video preview
      const url = URL.createObjectURL(selectedFile)
      setPreview(url)
    } else {
      alert('File is too large. Maximum size is 100MB.')
    }
  }

  const addTag = () => {
    if (currentTag && !form.tags.includes(currentTag)) {
      setForm(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.toLowerCase()]
      }))
      setCurrentTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setForm(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file || !form.caption) return

    try {
      setUploading(true)
      // Simulated upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 95) {
            clearInterval(progressInterval)
            return prev
          }
          return prev + 5
        })
      }, 500)

      await api.uploadVideo(file, form.caption)
      
      clearInterval(progressInterval)
      setUploadProgress(100)
      
      // Redirect to profile page after successful upload
      setTimeout(() => {
        router.push('/profile')
      }, 1000)
    } catch (error) {
      console.error('Upload failed:', error)
      alert('Failed to upload video. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Upload Video</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Video Upload */}
        <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="hidden"
            id="video-upload"
            disabled={uploading}
          />
          <label
            htmlFor="video-upload"
            className="cursor-pointer flex flex-col items-center"
          >
            {preview ? (
              <video
                src={preview}
                className="w-full max-h-[200px] object-contain mb-4"
                controls
              />
            ) : (
              <>
                <CloudArrowUpIcon className="w-12 h-12 text-gray-400 mb-2" />
                <span className="text-gray-400">Click to upload video</span>
                <span className="text-gray-500 text-sm mt-1">
                  Maximum file size: 100MB
                </span>
              </>
            )}
          </label>
        </div>

        {/* Caption */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Caption
          </label>
          <textarea
            value={form.caption}
            onChange={(e) => setForm(prev => ({ ...prev, caption: e.target.value }))}
            className="w-full px-3 py-2 bg-gray-900 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-1 focus:ring-green-500"
            rows={3}
            placeholder="Describe your video..."
            disabled={uploading}
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Tags
          </label>
          <div className="flex gap-2 mb-2 flex-wrap">
            {form.tags.map(tag => (
              <span
                key={tag}
                className="bg-gray-800 px-2 py-1 rounded-full text-sm flex items-center gap-1"
              >
                #{tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="hover:text-red-500"
                  disabled={uploading}
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <HashtagIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTag()}
                className="w-full pl-10 pr-3 py-2 bg-gray-900 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                placeholder="Add tags..."
                disabled={uploading}
              />
            </div>
            <button
              type="button"
              onClick={addTag}
              className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700"
              disabled={uploading}
            >
              Add
            </button>
          </div>
        </div>

        {/* Privacy Setting */}
        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.isPublic}
              onChange={(e) => setForm(prev => ({ ...prev, isPublic: e.target.checked }))}
              className="rounded border-gray-700 bg-gray-900 text-green-500 focus:ring-green-500"
              disabled={uploading}
            />
            <span className="text-sm">Make this video public</span>
          </label>
        </div>

        {/* Upload Progress */}
        {uploading && (
          <div className="space-y-2">
            <div className="h-2 bg-gray-900 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500 transition-all duration-500"
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
          disabled={!file || !form.caption || uploading}
          className="w-full bg-green-500 text-white py-3 px-4 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? 'Uploading...' : 'Post Video'}
        </button>
      </form>
    </div>
  )
} 