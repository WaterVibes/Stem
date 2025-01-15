"use client";

import { useState } from 'react';
import Image from 'next/image';
import EditProfileModal from '../components/EditProfileModal';

interface Video {
  id: string;
  thumbnail: string;
  views: number;
  title: string;
}

export default function ProfilePage() {
  const [selectedTab, setSelectedTab] = useState<'videos' | 'reposts' | 'favorites' | 'liked'>('videos');
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'oldest'>('latest');
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  const videos: Video[] = [
    {
      id: '1',
      thumbnail: '/video-thumbnail-1.jpg',
      views: 1200,
      title: 'Everything you ever wanted'
    },
    {
      id: '2',
      thumbnail: '/video-thumbnail-2.jpg',
      views: 800,
      title: 'No more sketchy meet-up spots'
    },
    {
      id: '3',
      thumbnail: '/video-thumbnail-3.jpg',
      views: 2400,
      title: 'or all that we have been through'
    }
  ];

  return (
    <div className="min-h-screen pt-16 px-4 md:px-8">
      {/* Profile Header */}
      <div className="max-w-4xl mx-auto">
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-white/5">
            <Image
              src="/profile-avatar.jpg"
              alt="Profile"
              width={96}
              height={96}
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              tewicecyewbs
              <span className="text-lg font-normal text-white/60">W4ves</span>
            </h1>
            
            {/* Stats */}
            <div className="flex gap-6 mt-4">
              <div>
                <span className="font-bold">250</span>
                <span className="text-white/60 ml-1">Following</span>
              </div>
              <div>
                <span className="font-bold">51</span>
                <span className="text-white/60 ml-1">Followers</span>
              </div>
              <div>
                <span className="font-bold">21</span>
                <span className="text-white/60 ml-1">Likes</span>
              </div>
            </div>

            {/* Bio */}
            <p className="mt-4">Something artistic</p>
            <div className="mt-2">
              <a href="#" className="text-[#1F6B3B] hover:text-[#1F6B3B]/80">@Grass App</a>
            </div>
            <div className="mt-1">
              <a href="#" className="text-[#1F6B3B] hover:text-[#1F6B3B]/80">TheGrassApp.com</a>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-4">
              <button 
                onClick={() => setIsEditProfileOpen(true)}
                className="px-8 py-2 bg-[#1F6B3B] text-white rounded-lg font-semibold hover:bg-[#1F6B3B]/80"
              >
                Edit profile
              </button>
              <button className="px-8 py-2 bg-white/10 rounded-lg font-semibold hover:bg-white/20">
                Promote post
              </button>
              <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
              <button className="p-2 bg-white/10 rounded-lg hover:bg-white/20">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="mt-8 border-b border-white/10">
          <div className="flex">
            <button
              onClick={() => setSelectedTab('videos')}
              className={`px-8 py-2 font-medium ${
                selectedTab === 'videos'
                  ? 'text-white border-b-2 border-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Videos
            </button>
            <button
              onClick={() => setSelectedTab('reposts')}
              className={`px-8 py-2 font-medium ${
                selectedTab === 'reposts'
                  ? 'text-white border-b-2 border-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Reposts
            </button>
            <button
              onClick={() => setSelectedTab('favorites')}
              className={`px-8 py-2 font-medium ${
                selectedTab === 'favorites'
                  ? 'text-white border-b-2 border-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Favorites
            </button>
            <button
              onClick={() => setSelectedTab('liked')}
              className={`px-8 py-2 font-medium ${
                selectedTab === 'liked'
                  ? 'text-white border-b-2 border-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Liked
            </button>

            {/* Sort Options */}
            <div className="ml-auto flex items-center gap-2 pr-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'latest' | 'popular' | 'oldest')}
                className="bg-transparent text-white/60 border-none focus:outline-none"
              >
                <option value="latest">Latest</option>
                <option value="popular">Popular</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
          </div>
        </div>

        {/* Video Grid */}
        <div className="mt-4 grid grid-cols-3 gap-4">
          {videos.map((video) => (
            <div key={video.id} className="aspect-[9/16] bg-white/5 rounded-lg overflow-hidden relative group">
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-4 left-4">
                  <p className="text-sm">{video.title}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span className="text-sm">{video.views}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
      />
    </div>
  );
} 