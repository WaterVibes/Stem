'use client'

import { useState, useEffect } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useVideoStore } from '@/store/useVideoStore'
import { formatDistanceToNow } from 'date-fns'

interface CommentsModalProps {
  videoId: string
  onClose: () => void
}

export default function CommentsModal({ videoId, onClose }: CommentsModalProps) {
  const [newComment, setNewComment] = useState('')
  const { comments, isLoadingComments, loadComments, addComment } = useVideoStore()
  const videoComments = comments[videoId] || []

  useEffect(() => {
    loadComments(videoId)
  }, [videoId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    try {
      await addComment(videoId, newComment.trim())
      setNewComment('')
    } catch (error) {
      console.error('Failed to add comment:', error)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Comments</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {isLoadingComments ? (
            // Loading skeleton
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-start gap-3 animate-pulse">
                <div className="w-10 h-10 bg-gray-200 rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/4" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                </div>
              </div>
            ))
          ) : videoComments.length > 0 ? (
            videoComments.map(comment => (
              <div key={comment.id} className="flex items-start gap-3">
                <img
                  src={comment.user.avatar}
                  alt={comment.user.username}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold">{comment.user.username}</span>
                    <span className="text-sm text-gray-500">
                      {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-8">
              <p>No comments yet</p>
              <p className="text-sm">Be the first to comment!</p>
            </div>
          )}
        </div>

        {/* Comment Form */}
        <form onSubmit={handleSubmit} className="p-4 border-t">
          <div className="flex gap-2">
            <input
              type="text"
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 px-4 py-2 rounded-full border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:hover:bg-blue-500"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 