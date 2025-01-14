import { User, Video, PaginatedResponse } from '@/types'

export class ApiService {
  // Get videos with pagination
  async getVideos(page = 1, limit = 10): Promise<PaginatedResponse<Video[]>> {
    const response = await fetch(`/api/videos?page=${page}&limit=${limit}`)
    if (!response.ok) {
      throw new Error('Failed to fetch videos')
    }
    return response.json()
  }

  // Get user's profile and videos
  async getUserProfile(userId: string, includeVideos = false, page = 1, limit = 12): Promise<PaginatedResponse<{ user: User; videos: Video[] }> | User> {
    const params = new URLSearchParams()
    if (includeVideos) {
      params.set('include', 'videos')
      params.set('page', page.toString())
      params.set('limit', limit.toString())
    }

    const response = await fetch(`/api/users/${userId}?${params}`)
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to fetch user')
    }
    return response.json()
  }

  // Get user's videos with pagination
  async getUserVideos(userId: string, page = 1, limit = 12): Promise<PaginatedResponse<Video[]>> {
    const response = await fetch(`/api/users/${userId}/videos?page=${page}&limit=${limit}`)
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to fetch user videos')
    }
    return response.json()
  }

  // Update user profile
  async updateUser(userId: string, updates: Partial<User>): Promise<User> {
    const response = await fetch(`/api/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to update user')
    }
    return response.json()
  }

  // Upload avatar
  async uploadAvatar(userId: string, file: File): Promise<{ url: string }> {
    const formData = new FormData()
    formData.append('avatar', file)

    const response = await fetch(`/api/users/${userId}/avatar`, {
      method: 'POST',
      body: formData,
    })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to upload avatar')
    }
    return response.json()
  }

  // Get a single video by ID
  async getVideo(id: string): Promise<Video> {
    const response = await fetch(`/api/videos/${id}`)
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to fetch video')
    }
    return response.json()
  }

  // Upload a new video
  async uploadVideo(formData: FormData): Promise<Video> {
    const response = await fetch('/api/videos/upload', {
      method: 'POST',
      body: formData,
    })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to upload video')
    }
    return response.json()
  }

  // Update a video
  async updateVideo(id: string, updates: Partial<Video>): Promise<Video> {
    const response = await fetch(`/api/videos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to update video')
    }
    return response.json()
  }

  // Delete a video
  async deleteVideo(id: string): Promise<void> {
    const response = await fetch(`/api/videos/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to delete video')
    }
  }

  // Like/unlike a video
  async toggleVideoLike(id: string, liked: boolean): Promise<Video> {
    return this.updateVideo(id, {
      likes: liked ? 1 : -1, // This would be handled properly on the server
    })
  }
} 