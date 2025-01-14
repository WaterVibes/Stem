import { create } from 'zustand'
import { VideoWithMetrics, FeedFilters } from '@/types'
import { RecommendationService } from '@/services/recommendationService'

interface FeedState {
  videos: VideoWithMetrics[]
  isLoading: boolean
  filters: FeedFilters
  hasMore: boolean
  error: string | null
  setFilters: (filters: Partial<FeedFilters>) => Promise<void>
  loadVideos: () => Promise<void>
  loadMoreVideos: () => Promise<void>
}

const recommendationService = new RecommendationService()

export const useFeedStore = create<FeedState>((set, get) => ({
  videos: [],
  isLoading: false,
  hasMore: true,
  error: null,
  filters: {
    sort: 'trending',
    timeRange: 'all',
  },

  setFilters: async (newFilters) => {
    set(state => ({
      filters: { ...state.filters, ...newFilters },
      videos: [], // Reset videos when filters change
      hasMore: true,
    }))
    await get().loadVideos()
  },

  loadVideos: async () => {
    try {
      set({ isLoading: true, error: null })
      const videos = await recommendationService.getTrendingVideos(get().filters)
      set({
        videos,
        hasMore: videos.length >= 10, // Assuming 10 is the page size
      })
    } catch (error) {
      set({ error: 'Failed to load videos' })
      console.error('Failed to load videos:', error)
    } finally {
      set({ isLoading: false })
    }
  },

  loadMoreVideos: async () => {
    const { videos, isLoading, hasMore, filters } = get()
    if (isLoading || !hasMore) return

    try {
      set({ isLoading: true, error: null })
      const newVideos = await recommendationService.getTrendingVideos({
        ...filters,
        // In a real app, you would pass the last video's ID or timestamp
        // for proper pagination
      })

      set(state => ({
        videos: [...state.videos, ...newVideos],
        hasMore: newVideos.length >= 10,
      }))
    } catch (error) {
      set({ error: 'Failed to load more videos' })
      console.error('Failed to load more videos:', error)
    } finally {
      set({ isLoading: false })
    }
  },
})) 