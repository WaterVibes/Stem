import { create } from 'zustand'
import { Video, FeedFilters, PaginatedResponse } from '@/types'
import { api } from '@/services/api'

interface FeedState {
  videos: Video[]
  isLoading: boolean
  error: string | null
  filters: FeedFilters
  hasMore: boolean
  setFilters: (filters: FeedFilters) => void
  loadVideos: () => Promise<void>
  loadMoreVideos: () => Promise<void>
}

export const useFeedStore = create<FeedState>((set, get) => ({
  videos: [],
  isLoading: false,
  error: null,
  filters: {
    sort: 'trending',
    timeRange: 'all',
  },
  hasMore: true,

  setFilters: (filters) => {
    set({ filters, videos: [], hasMore: true })
    get().loadVideos()
  },

  loadVideos: async () => {
    try {
      set({ isLoading: true, error: null })
      const response = await api.getVideos(1, 10)
      set({
        videos: response.data,
        hasMore: response.pagination.hasMore,
        isLoading: false
      })
    } catch (error) {
      set({
        error: 'Failed to load videos. Please try again later.',
        isLoading: false
      })
    }
  },

  loadMoreVideos: async () => {
    const { videos, isLoading, hasMore } = get()
    if (isLoading || !hasMore) return

    try {
      set({ isLoading: true, error: null })
      const page = Math.ceil(videos.length / 10) + 1
      const response = await api.getVideos(page, 10)
      
      set({
        videos: [...videos, ...response.data],
        hasMore: response.pagination.hasMore,
        isLoading: false
      })
    } catch (error) {
      set({
        error: 'Failed to load more videos. Please try again later.',
        isLoading: false
      })
    }
  }
})) 