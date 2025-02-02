"use client";

import { useState } from 'react';
import Image from 'next/image';

interface Video {
  id: string;
  username: string;
  description: string;
  postedAt: string;
  videoUrl: string;
  likes: number;
  comments: number;
  bookmarks: number;
  shares: number;
  userAvatar: string;
  overlayText?: string;
  template?: string;
}

export default function FriendsPage() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const videos: Video[] = [
    {
      id: '1',
      username: 'chikikirin',
      description: "What's the aesthetic mutuals!? #CapCut #plants #fyp #aesthetic",
      postedAt: '2024-12-22',
      videoUrl: '/videos/chinatown.mp4',
      likes: 45,
      comments: 0,
      bookmarks: 2,
      shares: 0,
      userAvatar: '/avatars/chikikirin.jpg',
      overlayText: 'Every FACELESS photo describes your AESTHETIC',
      template: 'CapCut - Try this template'
    }
  ];

  return (
    <main className="h-screen w-full bg-black">
      {/* Video Feed */}
      <div className="h-full snap-y snap-mandatory overflow-y-scroll">
        {videos.map((video, index) => (
          <div
            key={video.id}
            className="h-screen w-full snap-start relative flex items-center justify-center"
          >
            {/* Video Player */}
            <div className="relative w-full h-full">
              <video
                className="w-full h-full object-cover"
                src={video.videoUrl}
                loop
                muted
                playsInline
                autoPlay={index === currentVideoIndex}
              />
              
              {/* Overlay Text */}
              {video.overlayText && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center px-8">
                    <h2 className="text-3xl font-bold text-white drop-shadow-lg">
                      {video.overlayText}
                    </h2>
                  </div>
                </div>
              )}

              {/* Template Badge */}
              {video.template && (
                <div className="absolute top-4 left-4 bg-black/50 px-3 py-1.5 rounded-lg text-sm flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                  {video.template}
                </div>
              )}
            </div>

            {/* Right Side Actions */}
            <div className="absolute right-4 bottom-20 flex flex-col items-center gap-6">
              {/* Profile */}
              <div className="flex flex-col items-center gap-1">
                <Image
                  src={video.userAvatar}
                  alt={video.username}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>

              {/* Like */}
              <div className="flex flex-col items-center gap-1">
                <button className="w-12 h-12 flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
                <span className="text-sm font-medium">{video.likes}</span>
              </div>

              {/* Comment */}
              <div className="flex flex-col items-center gap-1">
                <button className="w-12 h-12 flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </button>
                <span className="text-sm font-medium">{video.comments}</span>
              </div>

              {/* Bookmark */}
              <div className="flex flex-col items-center gap-1">
                <button className="w-12 h-12 flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </button>
                <span className="text-sm font-medium">{video.bookmarks}</span>
              </div>

              {/* Share */}
              <div className="flex flex-col items-center gap-1">
                <button className="w-12 h-12 flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
                <span className="text-sm font-medium">{video.shares}</span>
              </div>
            </div>

            {/* Bottom Info */}
            <div className="absolute left-4 bottom-20 max-w-[80%]">
              <h2 className="font-medium mb-1">@{video.username}</h2>
              <p className="text-sm text-white/90 mb-4">{video.description}</p>
              <span className="text-sm text-white/60">{video.postedAt}</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
} 