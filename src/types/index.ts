export interface User {
  id: string
  username: string
  email: string
  avatar: string | undefined
  bio?: string
  followers: number
  following: number
  totalLikes: number
  emailVerified: boolean
  createdAt: Date
}

export interface Video {
  id: string
  url: string
  thumbnail: string
  caption: string
  tags: string[]
  likes: number
  comments: number
  shares: number
  createdAt: string
  updatedAt?: string
  user: {
    id: string
    username: string
    avatar: string
  }
}

export interface PaginatedResponse<T> {
  data: T
  pagination: {
    page: number
    limit: number
    totalCount: number
    totalPages: number
    hasMore: boolean
  }
}

export interface ApiError {
  error: string
  status: number
  message?: string
}

export interface VideoMetrics {
  views: number
  watchTime: number
  completionRate: number
  engagementScore: number
  trendingScore: number
  lastUpdated: string
}

export interface VideoWithMetrics extends Video {
  metrics: VideoMetrics
}

export type SortOption = 'trending' | 'recent' | 'popular'

export interface FeedFilters {
  sort: SortOption
  tags?: string[]
  timeRange?: 'day' | 'week' | 'month' | 'all'
} 