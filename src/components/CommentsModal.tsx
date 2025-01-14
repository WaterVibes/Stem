'use client'

import { useState, useEffect } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { formatDistanceToNow } from 'date-fns'
import { Comment } from '@/types'
import { api } from '@/services/api'

interface CommentsModalProps {
  videoId: string
  onClose: () => void
}

export default function CommentsModal({ videoId, onClose }: CommentsModalProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [newComment, setNewComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Load comments
  useEffect(() => {
    loadComments()
  }, [videoId])

  const loadComments = async () => {
    try {
      setIsLoading(true)
      const data = await api.getComments(videoId)
      setComments(data)
    } catch (error) {
      console.error('Failed to load comments:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim() || isSubmitting) return

    try {
      setIsSubmitting(true)
      const comment = await api.addComment(videoId, newComment.trim())
      setComments(prev => [comment, ...prev])
      setNewComment('')
    } catch (error) {
      console.error('Failed to add comment:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-lg max-h-[80vh] bg-gray-900 rounded-xl shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="text-lg font-semibold text-emerald-400">Comments</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/5 transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Comments List */}
        <div className="p-4 overflow-y-auto max-h-[60vh]">
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex gap-3 mb-4 animate-pulse">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-1/4 bg-emerald-500/10 rounded" />
                  <div className="h-4 w-3/4 bg-emerald-500/10 rounded" />
                </div>
              </div>
            ))
          ) : comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="flex gap-3 mb-4">
                <img
                  src={comment.user.avatar}
                  alt={comment.user.username}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-emerald-400">
                      {comment.user.username}
                    </span>
                    <span className="text-sm text-gray-500">
                      {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-gray-300">{comment.content}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No comments yet</p>
          )}
        </div>

        {/* Comment Form */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-800">
          <div className="flex gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="submit"
              disabled={!newComment.trim() || isSubmitting}
              className="px-4 py-2 bg-emerald-500 text-white font-medium rounded-lg hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Posting...' : 'Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 