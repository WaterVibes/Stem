"use client";

import { useState } from 'react';

interface Device {
  id: string;
  label: string;
}

interface StreamControlsProps {
  onEndStream: () => void;
}

export default function StreamControls({ onEndStream }: StreamControlsProps) {
  const [devices, setDevices] = useState<{
    microphones: Device[];
    cameras: Device[];
    speakers: Device[];
  }>({
    microphones: [],
    cameras: [],
    speakers: []
  });

  const [activeDevices, setActiveDevices] = useState<{
    microphoneId: string;
    cameraId: string;
    speakerId: string;
  }>({
    microphoneId: '',
    cameraId: '',
    speakerId: ''
  });

  const [settings, setSettings] = useState({
    micEnabled: true,
    cameraEnabled: true,
    screenShareEnabled: false,
    volume: 100
  });

  const toggleMic = () => {
    setSettings(prev => ({ ...prev, micEnabled: !prev.micEnabled }));
  };

  const toggleCamera = () => {
    setSettings(prev => ({ ...prev, cameraEnabled: !prev.cameraEnabled }));
  };

  const toggleScreenShare = () => {
    setSettings(prev => ({ ...prev, screenShareEnabled: !prev.screenShareEnabled }));
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Microphone Control */}
          <div className="relative">
            <button 
              onClick={toggleMic}
              className={`p-2 rounded-full ${
                settings.micEnabled ? 'bg-white/10 hover:bg-white/20' : 'bg-red-500/20 text-red-500 hover:bg-red-500/30'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d={settings.micEnabled 
                    ? "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                    : "M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                  } 
                />
                {!settings.micEnabled && (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 3l18 18" 
                  />
                )}
              </svg>
            </button>
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-[200px] bg-black/90 rounded-lg p-2 hidden group-hover:block">
              <select
                value={activeDevices.microphoneId}
                onChange={(e) => setActiveDevices(prev => ({ ...prev, microphoneId: e.target.value }))}
                className="w-full px-2 py-1 bg-white/5 rounded text-sm"
              >
                {devices.microphones.map(mic => (
                  <option key={mic.id} value={mic.id}>{mic.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Camera Control */}
          <div className="relative">
            <button 
              onClick={toggleCamera}
              className={`p-2 rounded-full ${
                settings.cameraEnabled ? 'bg-white/10 hover:bg-white/20' : 'bg-red-500/20 text-red-500 hover:bg-red-500/30'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" 
                />
                {!settings.cameraEnabled && (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 3l18 18" 
                  />
                )}
              </svg>
            </button>
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-[200px] bg-black/90 rounded-lg p-2 hidden group-hover:block">
              <select
                value={activeDevices.cameraId}
                onChange={(e) => setActiveDevices(prev => ({ ...prev, cameraId: e.target.value }))}
                className="w-full px-2 py-1 bg-white/5 rounded text-sm"
              >
                {devices.cameras.map(camera => (
                  <option key={camera.id} value={camera.id}>{camera.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Screen Share */}
          <button 
            onClick={toggleScreenShare}
            className={`p-2 rounded-full ${
              settings.screenShareEnabled ? 'bg-green-500 text-black' : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </button>

          {/* Volume Control */}
          <div className="relative group">
            <button className="p-2 rounded-full bg-white/10 hover:bg-white/20">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m0 0l-2.828 2.828-1.414-1.414 2.828-2.828a9 9 0 0112.728 0l-2.828 2.828-1.414-1.414 1.414-1.414z" />
              </svg>
            </button>
            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-[200px] bg-black/90 rounded-lg p-2 hidden group-hover:block">
              <input
                type="range"
                min={0}
                max={100}
                value={settings.volume}
                onChange={(e) => setSettings(prev => ({ ...prev, volume: Number(e.target.value) }))}
                className="w-full"
              />
            </div>
          </div>
        </div>

        <button
          onClick={onEndStream}
          className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600"
        >
          End Stream
        </button>
      </div>
    </div>
  );
} 