"use client";

import { useState } from 'react';
import Image from 'next/image';

interface LiveStream {
  id: string;
  username: string;
  title: string;
  viewers: number;
  thumbnail: string;
  avatar: string;
}

interface GameCategory {
  id: string;
  name: string;
  viewers: string;
  image: string;
}

export default function LivePage() {
  const [selectedCategory, setSelectedCategory] = useState("For You");

  const categories = [
    "For You", "Following", "Gaming", "Lifestyle", 
    "Garena Free Fire", "Mobile Legends: Bang Bang", 
    "PUBG Mobile", "Roblox", "GrandTheft Auto V"
  ];

  const liveStreams: LiveStream[] = [
    {
      id: "1",
      username: "Kiki🌟",
      title: "15號路8點路跑",
      viewers: 12,
      thumbnail: "/placeholder.jpg",
      avatar: "/avatar1.jpg"
    },
    {
      id: "2",
      username: "SteF",
      title: "Solo vs Squad gameplay",
      viewers: 1306,
      thumbnail: "/placeholder.jpg",
      avatar: "/avatar2.jpg"
    },
    // Add more sample streams...
  ];

  const recommendedCategories: GameCategory[] = [
    {
      id: "1",
      name: "Mobile Legends: Bang Bang",
      viewers: "58.8k",
      image: "/ml.jpg"
    },
    {
      id: "2", 
      name: "PUBG Mobile",
      viewers: "50.5k",
      image: "/pubg.jpg"
    },
    {
      id: "3",
      name: "Garena Free Fire",
      viewers: "68.1k", 
      image: "/ff.jpg"
    },
    {
      id: "4",
      name: "Chats",
      viewers: "1964.4k",
      image: "/chats.jpg"
    },
    {
      id: "5",
      name: "Roblox",
      viewers: "34.8k",
      image: "/roblox.jpg"
    },
    {
      id: "6",
      name: "Fortnite",
      viewers: "26.3k",
      image: "/fortnite.jpg"
    },
    {
      id: "7",
      name: "Grand Theft Auto V",
      viewers: "26.9k",
      image: "/gta.jpg" 
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Category Navigation */}
      <div className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-white/10">
        <div className="px-4 py-2 overflow-x-auto">
          <div className="flex gap-3 min-w-max">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? "bg-white text-black"
                    : "hover:bg-white/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Live Streams Grid */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {liveStreams.map((stream) => (
          <div key={stream.id} className="relative aspect-[9/16] bg-white/5 rounded-lg overflow-hidden group">
            {/* Thumbnail */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white/40">Stream Preview</span>
            </div>

            {/* LIVE Badge & Viewer Count */}
            <div className="absolute top-2 left-2 flex items-center gap-2">
              <span className="bg-red-500 px-2 py-0.5 text-xs font-medium rounded">LIVE</span>
              <span className="bg-black/50 px-2 py-0.5 text-xs rounded backdrop-blur-sm">
                {stream.viewers}
              </span>
            </div>

            {/* Stream Info */}
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white/10 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-sm">{stream.username}</h3>
                  <p className="text-sm text-white/60 line-clamp-1">{stream.title}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recommended Categories */}
      <div className="px-4 pb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recommended categories</h2>
          <button className="text-sm text-white/60 hover:text-white">View all</button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4">
          {recommendedCategories.map((category) => (
            <div key={category.id} className="relative aspect-[3/4] bg-white/5 rounded-lg overflow-hidden group cursor-pointer">
              {/* Category Image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white/40">{category.name}</span>
              </div>

              {/* Category Info */}
              <div className="absolute inset-0 flex flex-col justify-end p-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <h3 className="font-medium text-sm line-clamp-2">{category.name}</h3>
                <p className="text-xs text-white/60 mt-1">{category.viewers} watching</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 