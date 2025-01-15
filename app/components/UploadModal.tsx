"use client";

import { useState } from 'react';
import EffectsPanel from './EffectsPanel';

interface Sound {
  id: string;
  name: string;
  artist: string;
  duration: string;
  category: 'Popular' | 'Trending' | 'Playlist';
}

const popularSounds: Sound[] = [
  { id: '1', name: 'Original Sound', artist: 'Your Sound', duration: '0:30', category: 'Popular' },
  { id: '2', name: 'Lo-Fi Beat', artist: 'ChillBeats', duration: '1:00', category: 'Popular' },
  { id: '3', name: 'Summer Vibes', artist: 'DJ Flow', duration: '0:45', category: 'Popular' },
];

export default function UploadModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState<'upload' | 'edit' | 'sound' | 'effects'>('upload');
  const [selectedSound, setSelectedSound] = useState<Sound | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string>('');

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
      setStep('edit');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-black border border-white/10 rounded-lg w-full max-w-4xl h-[80vh] flex overflow-hidden">
        {/* Left Panel - Preview */}
        <div className="w-2/3 border-r border-white/10 flex flex-col">
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <h2 className="text-lg font-medium">
              {step === 'upload' && 'Upload video'}
              {step === 'edit' && 'Edit video'}
              {step === 'sound' && 'Add sound'}
              {step === 'effects' && 'Add effects'}
            </h2>
            <button onClick={onClose} className="text-white/60 hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center bg-white/5">
            {step === 'upload' ? (
              <label className="flex flex-col items-center cursor-pointer group">
                <div className="w-32 h-32 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10">
                  <svg className="w-12 h-12 text-white/60 group-hover:text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <p className="mt-4 text-white/60 group-hover:text-white">Click to upload</p>
                <p className="mt-2 text-sm text-white/40">MP4 or WebM</p>
                <input type="file" accept="video/*" className="hidden" onChange={handleFileSelect} />
              </label>
            ) : (
              <div className="aspect-[9/16] h-full max-h-[600px] bg-white/5 relative">
                {videoPreview && (
                  <video
                    src={videoPreview}
                    className="w-full h-full object-contain"
                    controls
                  />
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Controls */}
        <div className="w-1/3 flex flex-col">
          {step === 'sound' && (
            <div className="flex-1 overflow-y-auto">
              <div className="p-4">
                <div className="relative">
                  <input 
                    type="search" 
                    placeholder="Search sounds" 
                    className="w-full px-4 py-2 pl-10 bg-white/5 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                  <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                <div className="mt-6">
                  <h3 className="text-sm font-medium text-white/60 mb-3">Popular</h3>
                  <div className="space-y-2">
                    {popularSounds.map((sound) => (
                      <button
                        key={sound.id}
                        onClick={() => setSelectedSound(sound)}
                        className={`w-full p-3 rounded-lg flex items-center gap-3 hover:bg-white/5 ${
                          selectedSound?.id === sound.id ? 'bg-white/10' : ''
                        }`}
                      >
                        <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{sound.name}</p>
                          <p className="text-sm text-white/40">{sound.artist}</p>
                        </div>
                        <span className="text-sm text-white/40">{sound.duration}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-sm font-medium text-white/60 mb-3">Your Sounds</h3>
                  <button className="w-full p-3 rounded-lg flex items-center gap-3 hover:bg-white/5">
                    <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">Upload sound</p>
                      <p className="text-sm text-white/40">MP3 files up to 5 minutes</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 'effects' && <EffectsPanel />}

          <div className="p-4 border-t border-white/10">
            <div className="flex gap-3">
              {step !== 'upload' && (
                <button
                  onClick={() => setStep('upload')}
                  className="px-4 py-2 text-sm text-white/60 hover:text-white"
                >
                  Back
                </button>
              )}
              <button
                onClick={() => {
                  if (step === 'upload' && videoFile) setStep('edit');
                  else if (step === 'edit') setStep('sound');
                  else if (step === 'sound') setStep('effects');
                }}
                className="flex-1 px-6 py-2 bg-green-500 text-black rounded-sm font-medium hover:bg-green-400"
              >
                {step === 'effects' ? 'Post' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 