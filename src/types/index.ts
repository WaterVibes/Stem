export interface User {
  id: string
  username: string
  avatar: string
  bio?: string
  followers?: number
  following?: number
}

export interface Video {
  id: string
  url: string
  caption: string
  user: User
  likes: number
  comments: number
  shares?: number
  createdAt: string
  duration?: number
  thumbnail?: string
  tags?: string[]
}

export interface Comment {
  id: string
  content: string
  user: User
  createdAt: string
  likes?: number
}

export interface ApiResponse<T> {
  data: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  page: number
  totalPages: number
  hasMore: boolean
} 