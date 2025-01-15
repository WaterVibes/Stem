'use client';

import { useState } from 'react';
import { MagnifyingGlassIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline';

const samplePosts = [
  {
    id: 1,
    thumbnail: '/placeholder.jpg',
    title: 'My first cyberpunk edit 🌟',
    date: '2024-01-15',
    likes: '1.2K',
    comments: '156',
    shares: '42',
    status: 'Public'
  },
  {
    id: 2,
    thumbnail: '/placeholder.jpg',
    title: 'Night City Vibes #cyberpunk',
    date: '2024-01-14',
    likes: '3.4K',
    comments: '289',
    shares: '167',
    status: 'Public'
  },
  {
    id: 3,
    thumbnail: '/placeholder.jpg',
    title: 'Neon lights and city fights',
    date: '2024-01-13',
    likes: '892',
    comments: '76',
    shares: '24',
    status: 'Private'
  },
];

export default function PostsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Posts</h1>
          <div className="flex gap-4">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search posts"
                className="pl-10 pr-4 py-2 bg-black border border-[#00ff9d]/20 focus:border-[#00ff9d] focus:ring-1 focus:ring-[#00ff9d] text-[#00ff9d] placeholder-[#00ff9d]/40"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00ff9d]/40" />
            </div>
            <button className="px-4 py-2 bg-[#00ff9d] text-black font-medium hover:bg-[#00ff9d]/90 transition-colors">
              Upload
            </button>
          </div>
        </div>

        {/* Posts Table */}
        <div className="border border-[#00ff9d]/20">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#00ff9d]/20">
                <th className="px-4 py-3 text-left font-medium text-[#00ff9d]/60">Video</th>
                <th className="px-4 py-3 text-left font-medium text-[#00ff9d]/60">Date</th>
                <th className="px-4 py-3 text-left font-medium text-[#00ff9d]/60">Likes</th>
                <th className="px-4 py-3 text-left font-medium text-[#00ff9d]/60">Comments</th>
                <th className="px-4 py-3 text-left font-medium text-[#00ff9d]/60">Shares</th>
                <th className="px-4 py-3 text-left font-medium text-[#00ff9d]/60">Status</th>
                <th className="px-4 py-3 text-left font-medium text-[#00ff9d]/60"></th>
              </tr>
            </thead>
            <tbody>
              {samplePosts.map((post) => (
                <tr key={post.id} className="border-b border-[#00ff9d]/20 hover:bg-[#00ff9d]/5">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-14 bg-[#00ff9d]/10 flex items-center justify-center">
                        <span className="text-xs text-[#00ff9d]/40">Thumbnail</span>
                      </div>
                      <span className="font-medium">{post.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-[#00ff9d]/60">{post.date}</td>
                  <td className="px-4 py-4 text-[#00ff9d]/60">{post.likes}</td>
                  <td className="px-4 py-4 text-[#00ff9d]/60">{post.comments}</td>
                  <td className="px-4 py-4 text-[#00ff9d]/60">{post.shares}</td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 text-sm ${
                      post.status === 'Public' 
                        ? 'bg-[#00ff9d]/10 text-[#00ff9d]' 
                        : 'bg-gray-500/10 text-gray-500'
                    }`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <button className="p-1 hover:bg-[#00ff9d]/10 rounded-none">
                      <EllipsisHorizontalIcon className="w-5 h-5 text-[#00ff9d]" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 text-sm text-[#00ff9d]/60">
          <span>Showing 1-3 of 3 posts</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-[#00ff9d]/20 hover:bg-[#00ff9d]/5 disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-3 py-1 border border-[#00ff9d]/20 hover:bg-[#00ff9d]/5 disabled:opacity-50" disabled>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 