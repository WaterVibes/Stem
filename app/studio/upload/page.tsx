'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { CloudArrowUpIcon, ScissorsIcon } from '@heroicons/react/24/outline';

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [description, setDescription] = useState('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setSelectedFile(file);
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);
      if (progress >= 100) clearInterval(interval);
    }, 100);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.mov', '.avi']
    },
    maxSize: 10 * 1024 * 1024 * 1024, // 10GB
    multiple: false
  });

  if (selectedFile) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Upload video</h1>
          <button className="px-4 py-2 border border-[#00ff9d]/20 text-[#00ff9d] hover:bg-[#00ff9d]/5">
            Cancel
          </button>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {/* Left Column - Video Preview */}
          <div className="space-y-4">
            <div className="aspect-video bg-[#00ff9d]/5 border border-[#00ff9d]/20 flex items-center justify-center">
              <span className="text-[#00ff9d]/40">Video Preview</span>
            </div>
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-[#00ff9d]/20 text-[#00ff9d] hover:bg-[#00ff9d]/5">
              <ScissorsIcon className="w-5 h-5" />
              Edit video
            </button>
          </div>

          {/* Right Column - Upload Form */}
          <div className="space-y-6">
            <div>
              <label className="block text-[#00ff9d]/60 mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write a description..."
                className="w-full h-32 px-4 py-3 bg-black border border-[#00ff9d]/20 focus:border-[#00ff9d] focus:ring-1 focus:ring-[#00ff9d] text-[#00ff9d] placeholder-[#00ff9d]/40"
              />
              <div className="text-right text-[#00ff9d]/40 text-sm mt-1">
                {description.length}/4000
              </div>
            </div>

            <div>
              <label className="block text-[#1F6B3B]/60 mb-2">Cover</label>
              <div className="aspect-video bg-[#1F6B3B]/5 border border-[#1F6B3B]/20 flex items-center justify-center">
                <span className="text-[#1F6B3B]/40">Edit cover</span>
              </div>
            </div>

            <div>
              <label className="block text-[#1F6B3B]/60 mb-2">Who can watch this video</label>
              <select className="w-full px-4 py-2 bg-black border border-[#1F6B3B]/20 focus:border-[#1F6B3B] focus:ring-1 focus:ring-[#1F6B3B] text-[#1F6B3B]">
                <option value="public">Everyone</option>
                <option value="friends">Friends</option>
                <option value="private">Private</option>
              </select>
            </div>

            <div className="flex justify-between pt-4">
              <button className="px-6 py-2 border border-[#1F6B3B]/20 text-[#1F6B3B] hover:bg-[#1F6B3B]/5">
                Discard
              </button>
              <button className="px-6 py-2 bg-[#1F6B3B] text-white font-medium hover:bg-[#1F6B3B]/80">
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-3xl mx-auto">
        <div {...getRootProps()} className="border-2 border-dashed border-[#00ff9d]/20 rounded-lg p-8 text-center cursor-pointer hover:border-[#00ff9d]/40 transition-colors">
          <input {...getInputProps()} />
          <CloudArrowUpIcon className="w-16 h-16 mx-auto mb-4 text-[#00ff9d]/40" />
          <h2 className="text-xl font-bold mb-2">Select video to upload</h2>
          <p className="text-[#00ff9d]/60 mb-4">Or drag and drop a file</p>
          <div className="text-sm text-[#00ff9d]/40 space-y-2">
            <p>MP4 or WebM</p>
            <p>720p or higher</p>
            <p>Up to 10 GB</p>
            <p>Less than 60 minutes</p>
          </div>
          <button className="mt-8 px-8 py-3 bg-[#00ff9d] text-black font-medium hover:bg-[#00ff9d]/90 transition-colors">
            Select file
          </button>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 text-center text-sm">
          <div className="p-4 border border-[#00ff9d]/20">
            <h3 className="font-medium mb-2">Size and duration</h3>
            <p className="text-[#00ff9d]/60">Maximum size: 10 GB, video duration: 60 minutes.</p>
          </div>
          <div className="p-4 border border-[#00ff9d]/20">
            <h3 className="font-medium mb-2">File formats</h3>
            <p className="text-[#00ff9d]/60">Recommended: ".mp4". Other major formats are supported.</p>
          </div>
          <div className="p-4 border border-[#00ff9d]/20">
            <h3 className="font-medium mb-2">Video resolutions</h3>
            <p className="text-[#00ff9d]/60">Minimum resolution: 720p. 2K and 4K are supported.</p>
          </div>
          <div className="p-4 border border-[#00ff9d]/20">
            <h3 className="font-medium mb-2">Aspect ratios</h3>
            <p className="text-[#00ff9d]/60">Recommended: 16:9 for landscape, 9:16 for vertical.</p>
          </div>
        </div>
      </div>
    </div>
  );
} 