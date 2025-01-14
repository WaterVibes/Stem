import { Video, User, PaginatedResponse } from '@/types'

class Api {
  private baseUrl = '/api'

  async getVideos(page = 1, limit = 10): Promise<PaginatedResponse<Video[]>> {
    const response = await fetch(`${this.baseUrl}/videos?page=${page}&limit=${limit}`)
    if (!response.ok) throw new Error('Failed to fetch videos')
    return response.json()
  }

  async getUserVideos(userId: string): Promise<PaginatedResponse<Video[]>> {
    const response = await fetch(`${this.baseUrl}/users/${userId}/videos`)
    if (!response.ok) throw new Error('Failed to fetch user videos')
    return response.json()
  }

  async uploadVideo(formData: FormData): Promise<Video> {
    const response = await fetch(`${this.baseUrl}/videos/upload`, {
      method: 'POST',
      body: formData,
    })
    if (!response.ok) throw new Error('Failed to upload video')
    return response.json()
  }

  async updateUser(userId: string, updates: Partial<User>): Promise<User> {
    const response = await fetch(`${this.baseUrl}/users/${userId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    })
    if (!response.ok) throw new Error('Failed to update user')
    return response.json()
  }

  async likeVideo(videoId: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/videos/${videoId}/like`, {
      method: 'POST',
    })
    if (!response.ok) throw new Error('Failed to like video')
  }

  async unlikeVideo(videoId: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/videos/${videoId}/like`, {
      method: 'DELETE',
    })
    if (!response.ok) throw new Error('Failed to unlike video')
  }

  async getComments(videoId: string): Promise<Comment[]> {
    const response = await fetch(`${this.baseUrl}/videos/${videoId}/comments`)
    if (!response.ok) throw new Error('Failed to fetch comments')
    return response.json()
  }

  async addComment(videoId: string, content: string): Promise<Comment> {
    const response = await fetch(`${this.baseUrl}/videos/${videoId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    })
    if (!response.ok) throw new Error('Failed to add comment')
    return response.json()
  }
}

export const api = new Api() 