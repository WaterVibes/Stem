"use client";

import { useState } from 'react';

interface LiveStream {
  id: string;
  username: string;
  title: string;
  viewers: number;
  thumbnail: string;
  category: 'Gaming' | 'Art' | 'Music' | 'Just Chatting';
  tags: string[];
}

export default function LiveTab() {
  const [liveStreams] = useState<LiveStream[]>([
    {
      id: '1',
      username: 'ArtistJane',
      title: 'Live Painting Session 🎨',
      viewers: 1234,
      thumbnail: '/thumbnails/art.jpg',
      category: 'Art',
      tags: ['painting', 'art', 'creative']
    },
    {
      id: '2',
      username: 'GamerJohn',
      title: 'Elden Ring First Playthrough',
      viewers: 856,
      thumbnail: '/thumbnails/gaming.jpg',
      category: 'Gaming',
      tags: ['gaming', 'elden ring', 'first time']
    },
    {
      id: '3',
      username: 'MusicMike',
      title: 'Guitar Session - Taking Requests',
      viewers: 2341,
      thumbnail: '/thumbnails/music.jpg',
      category: 'Music',
      tags: ['music', 'guitar', 'live performance']
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState<LiveStream['category'] | 'All'>('All');

  const categories: (LiveStream['category'] | 'All')[] = ['All', 'Gaming', 'Art', 'Music', 'Just Chatting'];

  const filteredStreams = selectedCategory === 'All' 
    ? liveStreams 
    : liveStreams.filter(stream => stream.category === selectedCategory);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Live</h1>
          <button
            onClick={() => window.location.href = '/stream'}
            className="px-4 py-2 bg-green-500 text-black rounded-lg font-medium hover:bg-green-400"
          >
            Go Live
          </button>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-green-500 text-black'
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Live Streams Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStreams.map((stream) => (
            <div
              key={stream.id}
              className="group relative bg-white/5 rounded-lg overflow-hidden cursor-pointer hover:bg-white/10"
            >
              {/* Thumbnail */}
              <div className="aspect-video bg-black/20 relative">
                <div className="absolute top-2 left-2 bg-red-500 px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                  LIVE
                </div>
                <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded text-xs font-medium">
                  {stream.viewers.toLocaleString()} viewers
                </div>
              </div>

              {/* Stream Info */}
              <div className="p-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-medium line-clamp-1">{stream.title}</h3>
                    <p className="text-sm text-white/60">{stream.username}</p>
                  </div>
                  <button className="shrink-0 px-3 py-1 bg-green-500 text-black text-sm rounded-full font-medium hover:bg-green-400">
                    Watch
                  </button>
                </div>

                <div className="flex flex-wrap gap-1">
                  {stream.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-white/5 rounded-full text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredStreams.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/60">No live streams found in this category</p>
          </div>
        )}
      </div>
    </div>
  );
} 