'use client'

import { useRef, useEffect, useState } from 'react'
import { useVideoStore } from '@/store/useVideoStore'
import { Video } from '@/types'
import { 
  HeartIcon, 
  ChatBubbleLeftIcon, 
  ShareIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import CommentsModal from './CommentsModal'
import Image from 'next/image'

interface VideoCardProps {
  video: Video
  isActive: boolean
}

export default function VideoCard({ video, isActive }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(true)
  const [showComments, setShowComments] = useState(false)
  const { likedVideos, likeVideo, unlikeVideo } = useVideoStore()
  const [likesCount, setLikesCount] = useState(video.likes)
  const isLiked = likedVideos.has(video.id)

  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.currentTime = 0
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
    }
  }, [isActive])

  const handleLikeClick = async () => {
    try {
      // Optimistic update
      setLikesCount(prev => prev + (isLiked ? -1 : 1))
      if (isLiked) {
        await unlikeVideo(video.id)
      } else {
        await likeVideo(video.id)
      }
    } catch (error) {
      // Revert on error
      setLikesCount(prev => prev + (isLiked ? 1 : -1))
      console.error('Failed to update like:', error)
    }
  }

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: video.caption,
          text: `Check out this video on GrassApp`,
          url: `${window.location.origin}/video/${video.id}`,
        })
      } else {
        // Fallback to copying link
        await navigator.clipboard.writeText(
          `${window.location.origin}/video/${video.id}`
        )
        // You might want to show a toast notification here
      }
    } catch (error) {
      console.error('Failed to share:', error)
    }
  }

  return (
    <div className="relative group rounded-xl overflow-hidden bg-gray-900 shadow-[0_0_30px_-15px_rgba(52,211,153,0.3)]">
      {/* Video */}
      <div className="relative aspect-[9/16]">
        <video
          ref={videoRef}
          src={video.url}
          poster={video.thumbnail}
          loop
          playsInline
          muted={isMuted}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Video Controls Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
          {/* Mute Toggle */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
          >
            {isMuted ? (
              <SpeakerXMarkIcon className="w-6 h-6" />
            ) : (
              <SpeakerWaveIcon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Video Info */}
      <div className="p-4">
        {/* User Info */}
        <div className="flex items-center gap-3 mb-3">
          <Image
            src={video.user.avatar}
            alt={video.user.username}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full border-2 border-emerald-500/20 object-cover"
          />
          <div>
            <h3 className="font-medium text-emerald-400">
              {video.user.username}
            </h3>
            <p className="text-sm text-gray-400">
              {new Date(video.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Caption */}
        <p className="text-gray-300 mb-3">{video.caption}</p>

        {/* Tags */}
        {video.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {video.tags.map(tag => (
              <span
                key={tag}
                className="px-2 py-1 text-sm rounded-full bg-emerald-500/10 text-emerald-400"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-6">
          <button
            onClick={handleLikeClick}
            className="group/like flex items-center gap-2 transition-colors"
          >
            {isLiked ? (
              <HeartIconSolid className="w-6 h-6 text-red-500" />
            ) : (
              <HeartIcon className="w-6 h-6 text-gray-400 group-hover/like:text-red-500 transition-colors" />
            )}
            <span className={`text-sm ${isLiked ? 'text-red-500' : 'text-gray-400 group-hover/like:text-red-500'}`}>
              {likesCount.toLocaleString()}
            </span>
          </button>

          <button
            onClick={() => setShowComments(true)}
            className="group/comments flex items-center gap-2"
          >
            <ChatBubbleLeftIcon className="w-6 h-6 text-gray-400 group-hover/comments:text-emerald-400 transition-colors" />
            <span className="text-sm text-gray-400 group-hover/comments:text-emerald-400 transition-colors">
              {video.comments.toLocaleString()}
            </span>
          </button>

          <button
            onClick={handleShare}
            className="group/share flex items-center gap-2"
          >
            <ShareIcon className="w-6 h-6 text-gray-400 group-hover/share:text-emerald-400 transition-colors" />
            <span className="text-sm text-gray-400 group-hover/share:text-emerald-400 transition-colors">
              {video.shares.toLocaleString()}
            </span>
          </button>
        </div>
      </div>

      {/* Comments Modal */}
      {showComments && (
        <CommentsModal
          videoId={video.id}
          onClose={() => setShowComments(false)}
        />
      )}
    </div>
  )
} 