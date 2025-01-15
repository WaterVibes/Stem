'use client';

import { useState } from 'react';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';

export default function UploadPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Handle the uploaded files
      console.log("File(s) dropped");
      // Implement file upload logic
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      // Handle the uploaded files
      console.log("File(s) selected");
      // Implement file upload logic
    }
  };

  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <div 
              className={`border-2 border-dashed rounded-none p-8 text-center transition-all
                ${dragActive 
                  ? 'border-[#00ff9d] bg-[#00ff9d]/5' 
                  : 'border-[#00ff9d]/20 hover:border-[#00ff9d]/50 hover:bg-[#00ff9d]/5'
                }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <CloudArrowUpIcon className="w-16 h-16 mx-auto mb-4 text-[#00ff9d]" />
              <h3 className="text-xl font-semibold mb-2">Select video to upload</h3>
              <p className="text-[#00ff9d]/60 mb-4">Or drag and drop a file</p>
              
              <div className="space-y-2 text-sm text-[#00ff9d]/60">
                <p>MP4 or WebM</p>
                <p>720x1280 resolution or higher</p>
                <p>Up to 30 minutes</p>
                <p>Less than 2 GB</p>
              </div>

              <label className="block mt-6">
                <input
                  type="file"
                  className="hidden"
                  accept="video/*"
                  onChange={handleChange}
                />
                <span className="px-6 py-3 bg-[#00ff9d] text-black font-medium hover:bg-[#00ff9d]/90 cursor-pointer transition-colors inline-block">
                  Select file
                </span>
              </label>
            </div>
          </div>

          {/* Form Section */}
          <div className="space-y-6">
            <div className="space-y-4">
              <label className="block">
                <span className="text-[#00ff9d]/60 mb-2 block">Caption</span>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-black border border-[#00ff9d]/20 rounded-none focus:outline-none focus:border-[#00ff9d] focus:ring-1 focus:ring-[#00ff9d] transition-all hover-scale text-[#00ff9d]"
                  placeholder="Add a caption"
                />
              </label>

              <label className="block">
                <span className="text-[#00ff9d]/60 mb-2 block">Cover</span>
                <div className="w-full h-40 bg-black border border-[#00ff9d]/20 rounded-none flex items-center justify-center">
                  <span className="text-[#00ff9d]/60">Upload cover image</span>
                </div>
              </label>

              <div>
                <span className="text-[#00ff9d]/60 mb-2 block">Who can view this video</span>
                <select className="w-full px-4 py-3 bg-black border border-[#00ff9d]/20 rounded-none focus:outline-none focus:border-[#00ff9d] focus:ring-1 focus:ring-[#00ff9d] transition-all hover-scale text-[#00ff9d]">
                  <option value="public">Public</option>
                  <option value="friends">Friends</option>
                  <option value="private">Private</option>
                </select>
              </div>

              <div>
                <span className="text-[#00ff9d]/60 mb-2 block">Allow users to:</span>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="form-checkbox text-[#00ff9d]" />
                    <span>Comment</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="form-checkbox text-[#00ff9d]" />
                    <span>Duet</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="form-checkbox text-[#00ff9d]" />
                    <span>Stitch</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <button className="px-6 py-3 border border-[#00ff9d]/20 text-[#00ff9d] hover:bg-[#00ff9d]/5 transition-colors">
                Discard
              </button>
              <button className="px-6 py-3 bg-[#00ff9d] text-black font-medium hover:bg-[#00ff9d]/90 transition-colors">
                Post
              </button>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
          <div className="border border-[#00ff9d]/20 p-4">
            <h3 className="font-semibold mb-2">Size and duration</h3>
            <ul className="text-sm text-[#00ff9d]/60 space-y-1">
              <li>• Up to 30 minutes</li>
              <li>• Less than 2 GB</li>
            </ul>
          </div>
          <div className="border border-[#00ff9d]/20 p-4">
            <h3 className="font-semibold mb-2">File formats</h3>
            <ul className="text-sm text-[#00ff9d]/60 space-y-1">
              <li>• MP4</li>
              <li>• WebM</li>
            </ul>
          </div>
          <div className="border border-[#00ff9d]/20 p-4">
            <h3 className="font-semibold mb-2">Video resolution</h3>
            <ul className="text-sm text-[#00ff9d]/60 space-y-1">
              <li>• 720x1280 or higher</li>
              <li>• Vertical or horizontal</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 