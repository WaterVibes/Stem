'use client'

import { useState, useEffect } from 'react'
import { useApi } from '@/hooks/useApi'
import { Video, User } from '@/types'
import { PencilIcon } from '@heroicons/react/24/outline'
import EditProfileModal from '@/components/EditProfileModal'
import ProtectedRoute from '@/components/ProtectedRoute'
import { useAuthStore } from '@/store/useAuthStore'
import Image from 'next/image'

export default function ProfilePage() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [userVideos, setUserVideos] = useState<Video[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuthStore()
  const api = useApi()

  const loadUserVideos = async () => {
    if (!user?.id) return
    try {
      setIsLoading(true)
      const response = await api.getUserVideos(user.id)
      setUserVideos(response.data)
    } catch (error) {
      console.error('Failed to load videos:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadUserVideos();
  }, [loadUserVideos]);

  const handleProfileUpdate = async (updates: Partial<User>) => {
    if (!user?.id) return
    try {
      await api.updateUser(user.id, updates)
      // In a real app, you would update the user state here
      setIsEditModalOpen(false)
    } catch (error) {
      console.error('Failed to update profile:', error)
    }
  }

  if (!user) return null

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="flex items-start gap-8 mb-12">
          {/* Avatar */}
          <div className="relative">
            <Image
              src={user.avatar || '/default-avatar.png'}
              alt={user.username}
              width={128}
              height={128}
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
            />
          </div>

          {/* User Info */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold">{user.username}</h1>
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <PencilIcon className="w-5 h-5" />
                Edit Profile
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 mb-4">
              <div className="text-center">
                <div className="font-bold">{userVideos.length}</div>
                <div className="text-gray-600 text-sm">Videos</div>
              </div>
              <div className="text-center">
                <div className="font-bold">{user.followers.toLocaleString()}</div>
                <div className="text-gray-600 text-sm">Followers</div>
              </div>
              <div className="text-center">
                <div className="font-bold">{user.following.toLocaleString()}</div>
                <div className="text-gray-600 text-sm">Following</div>
              </div>
              <div className="text-center">
                <div className="font-bold">{user.totalLikes.toLocaleString()}</div>
                <div className="text-gray-600 text-sm">Likes</div>
              </div>
            </div>

            {/* Bio */}
            <p className="text-gray-700 whitespace-pre-wrap">{user.bio}</p>
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-3 gap-4">
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[9/16] bg-gray-200 rounded-lg animate-pulse"
              />
            ))
          ) : userVideos.length > 0 ? (
            userVideos.map(video => (
              <div
                key={video.id}
                className="aspect-[9/16] relative rounded-lg overflow-hidden group cursor-pointer"
              >
                {/* Thumbnail */}
                <Image
                  src={video.thumbnail}
                  alt={video.caption}
                  width={320}
                  height={568}
                  className="w-full h-full object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="font-bold text-xl">{video.likes.toLocaleString()}</div>
                    <div className="text-sm">likes</div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // Empty state
            <div className="col-span-3 py-12 text-center text-gray-500">
              <p className="text-lg">No videos yet</p>
              <p className="text-sm mt-2">Your uploaded videos will appear here</p>
            </div>
          )}
        </div>

        {/* Edit Profile Modal */}
        {isEditModalOpen && (
          <EditProfileModal
            user={user}
            onClose={() => setIsEditModalOpen(false)}
            onSave={handleProfileUpdate}
          />
        )}
      </div>
    </ProtectedRoute>
  )
} 