"use client";

import { useState } from "react";

export default function ExplorePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const trendingVideos = [
    {
      id: 1,
      title: "Adding warmth to your room",
      views: "16.5K",
      thumbnail: "/video1.jpg"
    },
    {
      id: 2,
      title: "Kardashian Hidden Hills fire",
      views: "959",
      thumbnail: "/video2.jpg"
    },
    {
      id: 3,
      title: "First female to take on 72oz steak challenge",
      views: "544.9K",
      thumbnail: "/video3.jpg"
    },
    {
      id: 4,
      title: "72oz steak",
      views: "3.2M",
      thumbnail: "/video4.jpg"
    },
    {
      id: 5,
      title: "Making the perfect burger",
      views: "4M",
      thumbnail: "/video5.jpg"
    }
  ];

  const categories = [
    "All",
    "Singing & Dancing",
    "Comedy",
    "Sports",
    "Anime & Comics",
    "Relationship",
    "Shows",
    "Lipsync",
    "Daily Life",
    "Food",
    "Gaming",
    "Animals"
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black border-b border-white/10">
        <h1 className="px-8 py-4 text-xl font-semibold">Trending today</h1>
        
        {/* Category Filters */}
        <div className="px-8 pb-4 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
                  selectedCategory === category
                    ? "bg-white text-black"
                    : "bg-[#2A2A2A] hover:bg-white/20"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Video Grid */}
      <div className="p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {trendingVideos.map((video) => (
            <div
              key={video.id}
              className="group relative aspect-[9/16] bg-white/5 rounded-lg overflow-hidden cursor-pointer"
            >
              {/* Video Thumbnail */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white/40">Video {video.id}</span>
              </div>
              
              {/* Video Info Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-medium text-sm line-clamp-2">{video.title}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span className="text-sm text-white/60">{video.views}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 