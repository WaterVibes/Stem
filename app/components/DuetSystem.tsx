"use client";

import { useState } from 'react';

interface DuetPartner {
  id: string;
  name: string;
  avatar: string;
  isLive: boolean;
}

interface DuetSystemProps {
  onClose: () => void;
}

export default function DuetSystem({ onClose }: DuetSystemProps) {
  const [duetMode, setDuetMode] = useState<'side-by-side' | 'picture-in-picture' | 'split-screen'>('side-by-side');
  const [duetPartner, setDuetPartner] = useState<DuetPartner | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  const [layout, setLayout] = useState({
    mainStream: { width: '50%', height: '100%' },
    partnerStream: { width: '50%', height: '100%' }
  });

  const updateLayout = (mode: typeof duetMode) => {
    setDuetMode(mode);
    switch (mode) {
      case 'side-by-side':
        setLayout({
          mainStream: { width: '50%', height: '100%' },
          partnerStream: { width: '50%', height: '100%' }
        });
        break;
      case 'picture-in-picture':
        setLayout({
          mainStream: { width: '100%', height: '100%' },
          partnerStream: { width: '30%', height: '30%' }
        });
        break;
      case 'split-screen':
        setLayout({
          mainStream: { width: '100%', height: '50%' },
          partnerStream: { width: '100%', height: '50%' }
        });
        break;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-black/80 border border-white/10 rounded-lg w-full max-w-4xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Duet Stream</h2>
          <button onClick={onClose} className="text-white/60 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          {/* Stream Preview */}
          <div className="aspect-video bg-white/5 rounded-lg relative flex">
            {!duetPartner ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-white/60 mb-4">Waiting for duet partner...</p>
                  <button className="px-4 py-2 bg-green-500 text-black rounded-lg font-medium hover:bg-green-400">
                    Invite Partner
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div style={layout.mainStream} className="relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white/40">Your Stream</span>
                  </div>
                </div>
                <div style={layout.partnerStream} className="relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white/40">Partner&apos;s Stream</span>
                  </div>
                </div>
              </>
            )}

            {/* Recording Indicator */}
            {isRecording && (
              <div className="absolute top-4 left-4 bg-red-500/20 px-3 py-1.5 rounded-lg text-sm flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                <span>{new Date(recordingTime * 1000).toISOString().substr(14, 5)}</span>
              </div>
            )}
          </div>

          {/* Layout Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => updateLayout('side-by-side')}
                className={`p-2 rounded-lg ${duetMode === 'side-by-side' ? 'bg-green-500 text-black' : 'bg-white/5'}`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3h6m-6 18h6M3 9v6m18-6v6" />
                </svg>
              </button>
              <button
                onClick={() => updateLayout('picture-in-picture')}
                className={`p-2 rounded-lg ${duetMode === 'picture-in-picture' ? 'bg-green-500 text-black' : 'bg-white/5'}`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 14h6m-6-4h16M4 6h16M4 10h16M4 18h16" />
                </svg>
              </button>
              <button
                onClick={() => updateLayout('split-screen')}
                className={`p-2 rounded-lg ${duetMode === 'split-screen' ? 'bg-green-500 text-black' : 'bg-white/5'}`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              </button>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsRecording(!isRecording)}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                  isRecording ? 'bg-red-500 text-white' : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" strokeWidth={2} />
                  {isRecording ? (
                    <rect x="9" y="9" width="6" height="6" fill="currentColor" />
                  ) : (
                    <circle cx="12" cy="12" r="3" fill="currentColor" />
                  )}
                </svg>
                {isRecording ? 'Stop Recording' : 'Start Recording'}
              </button>

              <button className="px-4 py-2 bg-white/5 rounded-lg hover:bg-white/10">
                Switch Sides
              </button>
            </div>
          </div>

          {/* Partner Controls */}
          {duetPartner && (
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="text-sm font-medium text-white/60 mb-4">Your Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Volume</label>
                    <input type="range" className="w-full" />
                  </div>
                  <button className="w-full px-4 py-2 bg-white/5 rounded-lg hover:bg-white/10">
                    Mute Microphone
                  </button>
                </div>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <h3 className="text-sm font-medium text-white/60 mb-4">Partner Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Partner Volume</label>
                    <input type="range" className="w-full" />
                  </div>
                  <button className="w-full px-4 py-2 bg-white/5 rounded-lg hover:bg-white/10">
                    Mute Partner
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 