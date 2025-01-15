"use client";

import { useState } from 'react';
import LiveChat from './LiveChat';
import GameStream from './GameStream';
import StreamControls from './StreamControls';

interface StreamSettings {
  title: string;
  description: string;
  category: 'Gaming' | 'Art' | 'Music' | 'Just Chatting';
  tags: string[];
  isPrivate: boolean;
}

export default function LiveStream() {
  const [isLive, setIsLive] = useState(false);
  const [settings, setSettings] = useState<StreamSettings>({
    title: '',
    description: '',
    category: 'Just Chatting',
    tags: [],
    isPrivate: false
  });

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Stream Title */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Go Live</h1>
          <button
            onClick={() => setIsLive(!isLive)}
            className={`px-4 py-2 rounded-lg font-medium ${
              isLive
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {isLive ? 'End Stream' : 'Start Stream'}
          </button>
        </div>

        <div className="grid grid-cols-[1fr,320px] gap-6">
          <div className="space-y-6">
            {/* Stream Preview */}
            <div className="aspect-video bg-white/5 rounded-lg relative overflow-hidden">
              {settings.category === 'Gaming' ? (
                <GameStream />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-white/60 mb-4">Camera preview will appear here</p>
                    <button className="px-4 py-2 bg-green-500 text-black rounded-lg font-medium hover:bg-green-400">
                      Enable Camera
                    </button>
                  </div>
                </div>
              )}
              {isLive && <StreamControls onEndStream={() => setIsLive(false)} />}
            </div>

            {/* Stream Settings */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">
                  Stream Title
                </label>
                <input
                  type="text"
                  value={settings.title}
                  onChange={(e) => setSettings({ ...settings, title: e.target.value })}
                  placeholder="Give your stream a title..."
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">
                  Description
                </label>
                <textarea
                  value={settings.description}
                  onChange={(e) => setSettings({ ...settings, description: e.target.value })}
                  placeholder="Tell viewers about your stream..."
                  rows={3}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">
                  Category
                </label>
                <select
                  value={settings.category}
                  onChange={(e) => setSettings({ ...settings, category: e.target.value as StreamSettings['category'] })}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
                >
                  <option value="Gaming">Gaming</option>
                  <option value="Art">Art</option>
                  <option value="Music">Music</option>
                  <option value="Just Chatting">Just Chatting</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/60 mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  placeholder="Add tags separated by commas..."
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ',') {
                      e.preventDefault();
                      const input = e.currentTarget;
                      const tag = input.value.trim();
                      if (tag && !settings.tags.includes(tag)) {
                        setSettings({ ...settings, tags: [...settings.tags, tag] });
                        input.value = '';
                      }
                    }
                  }}
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {settings.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-white/10 rounded-lg text-sm flex items-center gap-2"
                    >
                      {tag}
                      <button
                        onClick={() => setSettings({
                          ...settings,
                          tags: settings.tags.filter((t) => t !== tag)
                        })}
                        className="text-white/40 hover:text-white"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="private"
                  checked={settings.isPrivate}
                  onChange={(e) => setSettings({ ...settings, isPrivate: e.target.checked })}
                  className="w-4 h-4 rounded border-white/10 text-green-500 focus:ring-green-500 focus:ring-offset-0 bg-white/5"
                />
                <label htmlFor="private" className="text-sm font-medium">
                  Private Stream
                </label>
              </div>
            </div>
          </div>

          {/* Chat Panel */}
          <div className="bg-white/5 rounded-lg p-4 h-[calc(100vh-2rem)] flex flex-col">
            <h2 className="text-lg font-medium mb-4">Live Chat</h2>
            <LiveChat />
          </div>
        </div>
      </div>
    </div>
  );
} 