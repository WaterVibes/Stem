import { create } from 'zustand'
import { Video } from '@/types'
import { useApi } from '@/hooks/useApi'

interface VideoState {
  likedVideos: Set<string>
  comments: Record<string, Comment[]>
  isLoadingComments: boolean
  likeVideo: (videoId: string) => Promise<void>
  unlikeVideo: (videoId: string) => Promise<void>
  addComment: (videoId: string, content: string) => Promise<void>
  loadComments: (videoId: string) => Promise<void>
}

interface Comment {
  id: string
  content: string
  user: {
    id: string
    username: string
    avatar: string
  }
  createdAt: string
}

const api = useApi()

export const useVideoStore = create<VideoState>((set, get) => ({
  likedVideos: new Set(),
  comments: {},
  isLoadingComments: false,

  likeVideo: async (videoId: string) => {
    try {
      await api.toggleVideoLike(videoId, true)
      set(state => ({
        likedVideos: new Set(Array.from(state.likedVideos).concat(videoId))
      }))
    } catch (error) {
      console.error('Failed to like video:', error)
      throw error
    }
  },

  unlikeVideo: async (videoId: string) => {
    try {
      await api.toggleVideoLike(videoId, false)
      set(state => {
        const newLikedVideos = new Set(state.likedVideos)
        newLikedVideos.delete(videoId)
        return { likedVideos: newLikedVideos }
      })
    } catch (error) {
      console.error('Failed to unlike video:', error)
      throw error
    }
  },

  addComment: async (videoId: string, content: string) => {
    try {
      // In a real app, this would come from auth
      const currentUser = {
        id: 'temp-user',
        username: '@tempuser',
        avatar: '/default-avatar.png'
      }

      const comment: Comment = {
        id: Date.now().toString(),
        content,
        user: currentUser,
        createdAt: new Date().toISOString()
      }

      // Optimistically update UI
      set(state => ({
        comments: {
          ...state.comments,
          [videoId]: [comment, ...(state.comments[videoId] || [])]
        }
      }))

      // TODO: Implement API call when backend is ready
      // const savedComment = await api.addComment(videoId, content)
      // Update with real comment data if needed
    } catch (error) {
      // Revert optimistic update on error
      set(state => ({
        comments: {
          ...state.comments,
          [videoId]: state.comments[videoId]?.slice(1) || []
        }
      }))
      console.error('Failed to add comment:', error)
      throw error
    }
  },

  loadComments: async (videoId: string) => {
    try {
      set({ isLoadingComments: true })
      // TODO: Implement API call when backend is ready
      // const comments = await api.getComments(videoId)
      const mockComments: Comment[] = [
        {
          id: '1',
          content: 'Great review! Very informative 🌿',
          user: {
            id: 'user1',
            username: '@greenthumb',
            avatar: '/avatars/user1.jpg'
          },
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          content: 'Thanks for sharing the medical benefits!',
          user: {
            id: 'user2',
            username: '@healingherbs',
            avatar: '/avatars/user2.jpg'
          },
          createdAt: new Date().toISOString()
        }
      ]

      set(state => ({
        comments: {
          ...state.comments,
          [videoId]: mockComments
        }
      }))
    } catch (error) {
      console.error('Failed to load comments:', error)
      throw error
    } finally {
      set({ isLoadingComments: false })
    }
  }
})) 