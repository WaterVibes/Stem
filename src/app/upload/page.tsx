'use client'

import { useState } from 'react'
import { CloudArrowUpIcon } from '@heroicons/react/24/outline'
import { env } from '@/env'

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [caption, setCaption] = useState('')
  const [uploading, setUploading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.size <= env.uploadMaxSize) {
      setFile(selectedFile)
    } else {
      alert('File is too large. Maximum size is 100MB.')
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Upload Video</h1>
      
      <div className="space-y-6">
        <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="hidden"
            id="video-upload"
          />
          <label
            htmlFor="video-upload"
            className="cursor-pointer flex flex-col items-center"
          >
            <CloudArrowUpIcon className="w-12 h-12 text-gray-400 mb-2" />
            <span className="text-gray-400">
              {file ? file.name : 'Click to upload video'}
            </span>
            <span className="text-gray-500 text-sm mt-1">
              Maximum file size: 100MB
            </span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Caption
          </label>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="w-full px-3 py-2 bg-gray-900 rounded-lg border border-gray-700 focus:border-green-500 focus:ring-1 focus:ring-green-500"
            rows={3}
            placeholder="Describe your video..."
          />
        </div>

        <button
          disabled={!file || !caption || uploading}
          className="w-full bg-green-500 text-white py-3 px-4 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? 'Uploading...' : 'Post Video'}
        </button>
      </div>
    </div>
  )
} 