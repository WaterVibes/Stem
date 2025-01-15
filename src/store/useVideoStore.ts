import { create } from 'zustand'
import { api } from '@/services/api'

interface VideoState {
  likedVideos: Set<string>
  likeVideo: (videoId: string) => Promise<void>
  unlikeVideo: (videoId: string) => Promise<void>
}

export const useVideoStore = create<VideoState>((set) => ({
  likedVideos: new Set(),

  likeVideo: async (videoId: string) => {
    try {
      await api.likeVideo(videoId)
      set((state) => ({
        likedVideos: new Set(Array.from(state.likedVideos).concat(videoId))
      }))
    } catch (error) {
      console.error('Failed to like video:', error)
      throw error
    }
  },

  unlikeVideo: async (videoId: string) => {
    try {
      await api.unlikeVideo(videoId)
      set((state) => ({
        likedVideos: new Set(Array.from(state.likedVideos).filter(id => id !== videoId))
      }))
    } catch (error) {
      console.error('Failed to unlike video:', error)
      throw error
    }
  }
})) 