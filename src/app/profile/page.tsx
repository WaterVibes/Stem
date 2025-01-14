'use client'

import { useStore } from '@/store/useStore'
import { User, Video } from '@/types'
import { formatNumber } from '@/utils/format'

// Temporary mock data
const MOCK_VIDEOS: Video[] = [
  {
    id: '1',
    url: '/video1.mp4',
    thumbnail: '/thumbnail1.jpg',
    caption: 'First review 🌿',
    user: {
      id: '1',
      username: '@cannabisexpert',
      avatar: '/avatar1.jpg'
    },
    likes: 1200,
    comments: 45,
    createdAt: new Date().toISOString()
  },
  // Add more mock videos as needed
]

export default function ProfilePage() {
  const currentUser = useStore((state: { currentUser: User | null }) => state.currentUser)

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Please log in to view your profile</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Profile Header */}
      <div className="text-center mb-8">
        <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
          <img
            src={currentUser.avatar}
            alt={currentUser.username}
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-xl font-bold">{currentUser.username}</h1>
        
        {/* Stats */}
        <div className="flex justify-center gap-6 mt-4">
          <div className="text-center">
            <div className="font-bold">{formatNumber(1234)}</div>
            <div className="text-sm text-gray-400">Followers</div>
          </div>
          <div className="text-center">
            <div className="font-bold">{formatNumber(567)}</div>
            <div className="text-sm text-gray-400">Following</div>
          </div>
          <div className="text-center">
            <div className="font-bold">{formatNumber(89)}</div>
            <div className="text-sm text-gray-400">Videos</div>
          </div>
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-3 gap-1">
        {MOCK_VIDEOS.map((video) => (
          <div key={video.id} className="aspect-square relative">
            <img
              src={video.thumbnail || video.url}
              alt={video.caption}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-1 left-1 text-xs text-white">
              {formatNumber(video.likes)} likes
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 