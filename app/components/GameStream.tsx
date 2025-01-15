"use client";

import { useState, useEffect } from 'react';
import StreamOverlay from './StreamOverlay';

interface GameStreamSettings {
  resolution: '720p' | '1080p' | '1440p';
  fps: 30 | 60;
  bitrate: number;
  captureAudio: boolean;
  showOverlay: boolean;
}

export default function GameStream() {
  const [settings, setSettings] = useState<GameStreamSettings>({
    resolution: '1080p',
    fps: 60,
    bitrate: 6000,
    captureAudio: true,
    showOverlay: true
  });

  const [selectedWindow, setSelectedWindow] = useState<string>('');
  const [streamStats, setStreamStats] = useState({
    viewers: 0,
    likes: 0,
    duration: 0,
    chatMessages: 0,
    newFollowers: 0
  });

  // Simulated stats update
  useEffect(() => {
    const interval = setInterval(() => {
      setStreamStats(prev => ({
        viewers: prev.viewers + Math.floor(Math.random() * 3),
        likes: prev.likes + Math.floor(Math.random() * 2),
        duration: prev.duration + 1,
        chatMessages: prev.chatMessages + Math.floor(Math.random() * 2),
        newFollowers: prev.newFollowers + (Math.random() > 0.8 ? 1 : 0)
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Game Capture Preview */}
      <div className="aspect-video bg-white/5 rounded-lg relative">
        <div className="absolute inset-0 flex items-center justify-center">
          {!selectedWindow ? (
            <div className="text-center">
              <p className="text-white/60 mb-4">Select a window to capture</p>
              <button 
                onClick={() => setSelectedWindow('Game Window')}
                className="px-4 py-2 bg-green-500 text-black rounded-lg font-medium hover:bg-green-400"
              >
                Select Game Window
              </button>
            </div>
          ) : (
            <div className="relative w-full h-full">
              {/* Game preview would go here */}
              {settings.showOverlay && (
                <StreamOverlay 
                  stats={streamStats}
                  gameName={selectedWindow}
                  gameCapture={true}
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Stream Settings */}
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Stream Settings</h3>
          
          <div>
            <label className="block text-sm font-medium text-white/60 mb-2">Resolution</label>
            <select
              value={settings.resolution}
              onChange={(e) => setSettings({ ...settings, resolution: e.target.value as GameStreamSettings['resolution'] })}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
            >
              <option value="720p">720p</option>
              <option value="1080p">1080p</option>
              <option value="1440p">1440p</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/60 mb-2">FPS</label>
            <select
              value={settings.fps}
              onChange={(e) => {
                const fps = Number(e.target.value);
                if (fps === 30 || fps === 60) {
                  setSettings({ ...settings, fps });
                }
              }}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
            >
              <option value="30">30 FPS</option>
              <option value="60">60 FPS</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/60 mb-2">Bitrate (kbps)</label>
            <input
              type="number"
              value={settings.bitrate}
              onChange={(e) => setSettings({ ...settings, bitrate: Number(e.target.value) })}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="captureAudio"
              checked={settings.captureAudio}
              onChange={(e) => setSettings({ ...settings, captureAudio: e.target.checked })}
              className="w-4 h-4 rounded border-white/10 text-green-500 focus:ring-green-500 focus:ring-offset-0 bg-white/5"
            />
            <label htmlFor="captureAudio" className="text-sm font-medium">
              Capture Game Audio
            </label>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="showOverlay"
              checked={settings.showOverlay}
              onChange={(e) => setSettings({ ...settings, showOverlay: e.target.checked })}
              className="w-4 h-4 rounded border-white/10 text-green-500 focus:ring-green-500 focus:ring-offset-0 bg-white/5"
            />
            <label htmlFor="showOverlay" className="text-sm font-medium">
              Show Stream Overlay
            </label>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Stream Preview</h3>
          <div className="aspect-video bg-white/5 rounded-lg flex items-center justify-center">
            <span className="text-white/40">Preview will appear here</span>
          </div>
        </div>
      </div>
    </div>
  );
} 