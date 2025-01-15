'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const recentPosts = [
  {
    id: 1,
    title: 'This song means something atm and this...',
    views: '280',
    comments: '1',
    likes: '7',
    date: 'Oct 31, 2024',
    visibility: 'Everyone',
    duration: '00:26'
  },
  {
    id: 2,
    title: '@Keanu Da Ghost @Grass App #baltimore #maryla...',
    views: '110',
    comments: '1',
    likes: '3',
    date: 'Jul 6, 2024',
    visibility: 'Everyone',
    duration: '00:29'
  },
  {
    id: 3,
    title: '@Grass App 👀#baltimore #maryland #cannabish...',
    views: '72',
    comments: '0',
    likes: '2',
    date: 'Jul 6, 2024',
    visibility: 'Everyone',
    duration: '00:29'
  }
];

export default function StudioHomePage() {
  const [timeRange] = useState('Last 7 days');

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Key Metrics Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Key metrics</h2>
            <span className="text-[#00ff9d]/60">{timeRange}</span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border border-[#00ff9d]/20 p-4">
              <h3 className="text-[#00ff9d]/60 mb-2">Video views</h3>
              <p className="text-2xl font-bold">7</p>
              <p className="text-sm text-[#00ff9d]">+6 vs. Jan 1 - Jan 7</p>
            </div>
            <div className="border border-[#00ff9d]/20 p-4">
              <h3 className="text-[#00ff9d]/60 mb-2">Profile views</h3>
              <p className="text-2xl font-bold">0</p>
              <p className="text-sm text-[#00ff9d]">+0 vs. Jan 1 - Jan 7</p>
            </div>
            <div className="border border-[#00ff9d]/20 p-4">
              <h3 className="text-[#00ff9d]/60 mb-2">Likes</h3>
              <p className="text-2xl font-bold">0</p>
              <p className="text-sm text-[#00ff9d]">+0 vs. Jan 1 - Jan 7</p>
            </div>
            <div className="border border-[#00ff9d]/20 p-4">
              <h3 className="text-[#00ff9d]/60 mb-2">Comments</h3>
              <p className="text-2xl font-bold">0</p>
              <p className="text-sm text-[#00ff9d]">+0 vs. Jan 1 - Jan 7</p>
            </div>
          </div>
        </div>

        {/* Recent Posts Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Recent posts</h2>
          </div>

          <div className="border border-[#00ff9d]/20">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#00ff9d]/20">
                  <th className="px-4 py-3 text-left text-[#00ff9d]/60">Video</th>
                  <th className="px-4 py-3 text-left text-[#00ff9d]/60">Views</th>
                  <th className="px-4 py-3 text-left text-[#00ff9d]/60">Comments</th>
                  <th className="px-4 py-3 text-left text-[#00ff9d]/60">Likes</th>
                  <th className="px-4 py-3 text-left text-[#00ff9d]/60">Date posted</th>
                </tr>
              </thead>
              <tbody>
                {recentPosts.map((post) => (
                  <tr key={post.id} className="border-b border-[#00ff9d]/20 hover:bg-[#00ff9d]/5">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-24 h-14 bg-[#00ff9d]/10 flex items-center justify-center">
                          <span className="text-xs text-[#00ff9d]/40">Thumbnail</span>
                          <div className="absolute bottom-1 right-1 bg-black/80 px-1 text-xs">
                            {post.duration}
                          </div>
                        </div>
                        <div>
                          <p className="font-medium">{post.title}</p>
                          <p className="text-sm text-[#00ff9d]/60">{post.visibility}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-[#00ff9d]/60">{post.views}</td>
                    <td className="px-4 py-4 text-[#00ff9d]/60">{post.comments}</td>
                    <td className="px-4 py-4 text-[#00ff9d]/60">{post.likes}</td>
                    <td className="px-4 py-4 text-[#00ff9d]/60">{post.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 