import { create } from 'zustand'
import { User, Video } from '@/types'

interface AppState {
  currentUser: User | null
  videos: Video[]
  isLoading: boolean
  setCurrentUser: (user: User | null) => void
  addVideos: (newVideos: Video[]) => void
  setLoading: (loading: boolean) => void
  likeVideo: (videoId: string) => void
}

export const useStore = create<AppState>((set) => ({
  currentUser: null,
  videos: [],
  isLoading: false,

  setCurrentUser: (user) => set({ currentUser: user }),
  
  addVideos: (newVideos) => 
    set((state) => ({ 
      videos: [...state.videos, ...newVideos] 
    })),
  
  setLoading: (loading) => set({ isLoading: loading }),
  
  likeVideo: (videoId) =>
    set((state) => ({
      videos: state.videos.map((video) =>
        video.id === videoId
          ? { ...video, likes: video.likes + 1 }
          : video
      ),
    })),
})) 