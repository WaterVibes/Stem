"use client";

import { useState } from 'react';
import { useAuth } from '../context/auth-context';
import { useRouter } from 'next/navigation';

export default function FollowingPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // Sample followed creators' videos
  const videos = [
    {
      id: 1,
      username: "mceewieee",
      postedDate: "2024-12-16",
      description: "true",
      likes: "988",
      comments: "31",
      bookmarks: "44",
      shares: "18",
    },
    // Add more sample videos as needed
  ];

  if (!user) {
    router.push('/');
    return null;
  }

  return (
    <div className="h-screen bg-black text-white">
      <div className="snap-y snap-mandatory h-screen overflow-y-scroll">
        {videos.map((video, index) => (
          <div 
            key={video.id}
            className="snap-start h-screen w-full relative flex items-center justify-center"
          >
            {/* Video Container */}
            <div className="relative w-full h-full bg-black/20">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white/40">Video {index + 1}</span>
              </div>

              {/* Right Sidebar Actions */}
              <div className="absolute right-4 bottom-20 flex flex-col items-center gap-6">
                {/* Profile */}
                <div className="flex flex-col items-center gap-1">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <span className="text-xl">👤</span>
                  </div>
                </div>

                {/* Like */}
                <div className="flex flex-col items-center gap-1">
                  <button className="flex flex-col items-center">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span className="text-xs font-semibold">{video.likes}</span>
                  </button>
                </div>

                {/* Comments */}
                <div className="flex flex-col items-center gap-1">
                  <button className="flex flex-col items-center">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span className="text-xs font-semibold">{video.comments}</span>
                  </button>
                </div>

                {/* Bookmark */}
                <div className="flex flex-col items-center gap-1">
                  <button className="flex flex-col items-center">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                    <span className="text-xs font-semibold">{video.bookmarks}</span>
                  </button>
                </div>

                {/* Share */}
                <div className="flex flex-col items-center gap-1">
                  <button className="flex flex-col items-center">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    <span className="text-xs font-semibold">{video.shares}</span>
                  </button>
                </div>
              </div>

              {/* Bottom Info */}
              <div className="absolute bottom-20 left-4 max-w-[80%] z-20">
                <h3 className="font-semibold text-lg">@{video.username}</h3>
                <p className="text-sm mt-2">{video.description}</p>
                <p className="text-sm text-gray-400 mt-1">{video.postedDate}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 