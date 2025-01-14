import { env } from '@/env'
import { User, Video, Comment, ApiResponse, PaginatedResponse } from '@/types'

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: any
  headers?: Record<string, string>
}

class ApiService {
  private baseUrl: string

  constructor() {
    this.baseUrl = env.apiUrl
  }

  private async request<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
    const {
      method = 'GET',
      body,
      headers = {},
    } = options

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`)
    }

    return response.json()
  }

  // Videos
  async getFeed(page: number = 1): Promise<PaginatedResponse<Video[]>> {
    return this.request('/videos/feed', { 
      method: 'GET',
      headers: { page: page.toString() }
    })
  }

  async uploadVideo(file: File, caption: string): Promise<ApiResponse<Video>> {
    const formData = new FormData()
    formData.append('video', file)
    formData.append('caption', caption)
    
    return this.request('/videos/upload', {
      method: 'POST',
      body: formData,
    })
  }

  // User
  async getCurrentUser(): Promise<ApiResponse<User>> {
    return this.request('/user/me')
  }

  // Interactions
  async likeVideo(videoId: string): Promise<ApiResponse<{ likes: number }>> {
    return this.request(`/videos/${videoId}/like`, { method: 'POST' })
  }

  async addComment(videoId: string, content: string): Promise<ApiResponse<Comment>> {
    return this.request(`/videos/${videoId}/comments`, {
      method: 'POST',
      body: { content },
    })
  }
}

export const api = new ApiService() 