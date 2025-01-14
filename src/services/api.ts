import { Video, User, PaginatedResponse, Comment } from '@/types'

// Mock data for testing
const MOCK_VIDEOS: Video[] = [
  {
    id: '1',
    url: 'https://storage.googleapis.com/your-bucket/sample1.mp4',
    thumbnail: 'https://storage.googleapis.com/your-bucket/thumb1.jpg',
    caption: 'Purple Haze strain review 🌿',
    tags: ['review', 'indica', 'medical'],
    likes: 1200,
    comments: 45,
    shares: 15,
    createdAt: new Date().toISOString(),
    user: {
      id: '1',
      username: '@cannabisexpert',
      avatar: 'https://storage.googleapis.com/your-bucket/avatar1.jpg',
    }
  },
  {
    id: '2',
    url: 'https://storage.googleapis.com/your-bucket/sample2.mp4',
    thumbnail: 'https://storage.googleapis.com/your-bucket/thumb2.jpg',
    caption: 'Medical benefits of CBD explained',
    tags: ['education', 'cbd', 'medical'],
    likes: 890,
    comments: 32,
    shares: 25,
    createdAt: new Date().toISOString(),
    user: {
      id: '1',
      username: '@cannabisexpert',
      avatar: 'https://storage.googleapis.com/your-bucket/avatar1.jpg',
    }
  },
]

const MOCK_USER: User = {
  id: '1',
  username: '@cannabisexpert',
  email: 'expert@example.com',
  avatar: 'https://storage.googleapis.com/your-bucket/avatar1.jpg',
  bio: 'Cannabis educator and advocate. Sharing knowledge about medical benefits and responsible use. 🌿',
  followers: 12500,
  following: 850,
  totalLikes: 45200,
  emailVerified: true,
  createdAt: new Date('2024-01-01T00:00:00.000Z'),
}

const MOCK_COMMENTS: Comment[] = [
  {
    id: '1',
    content: 'Great information! Thanks for sharing 🙌',
    user: {
      id: '2',
      username: '@medicaluser',
      avatar: 'https://storage.googleapis.com/your-bucket/avatar2.jpg',
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    content: 'This helped me understand CBD much better',
    user: {
      id: '3',
      username: '@newbie',
      avatar: 'https://storage.googleapis.com/your-bucket/avatar3.jpg',
    },
    createdAt: new Date().toISOString(),
  },
]

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

class Api {
  private baseUrl = '/api'

  async getCurrentUser(): Promise<User | null> {
    try {
      await delay(500) // Simulate network delay
      return MOCK_USER
    } catch (error) {
      console.error('Failed to get current user:', error)
      return null
    }
  }

  async getVideos(page = 1, limit = 10): Promise<PaginatedResponse<Video[]>> {
    await delay(1000) // Simulate network delay
    const offset = (page - 1) * limit
    const totalVideos = MOCK_VIDEOS.length
    const totalPages = Math.ceil(totalVideos / limit)

    return {
      data: MOCK_VIDEOS.slice(offset, offset + limit),
      pagination: {
        page,
        limit,
        totalCount: totalVideos,
        totalPages,
        hasMore: page < totalPages,
      }
    }
  }

  async getUserVideos(userId: string): Promise<PaginatedResponse<Video[]>> {
    await delay(1000) // Simulate network delay
    const userVideos = MOCK_VIDEOS.filter(video => video.user.id === userId)
    return {
      data: userVideos,
      pagination: {
        page: 1,
        limit: 10,
        totalCount: userVideos.length,
        totalPages: 1,
        hasMore: false,
      }
    }
  }

  async uploadVideo(formData: FormData): Promise<Video> {
    await delay(2000) // Simulate upload delay
    const newVideo: Video = {
      id: Date.now().toString(),
      url: URL.createObjectURL(formData.get('video') as File),
      thumbnail: URL.createObjectURL(formData.get('thumbnail') as File),
      caption: formData.get('caption') as string,
      tags: (formData.get('tags') as string).split(',').map(tag => tag.trim()),
      likes: 0,
      comments: 0,
      shares: 0,
      createdAt: new Date().toISOString(),
      user: {
        id: MOCK_USER.id,
        username: MOCK_USER.username,
        avatar: MOCK_USER.avatar || '',
      }
    }
    MOCK_VIDEOS.unshift(newVideo)
    return newVideo
  }

  async updateUser(userId: string, updates: Partial<User>): Promise<User> {
    await delay(1000) // Simulate network delay
    const updatedUser = { ...MOCK_USER, ...updates }
    return updatedUser
  }

  async likeVideo(videoId: string): Promise<void> {
    await delay(500) // Simulate network delay
    const video = MOCK_VIDEOS.find(v => v.id === videoId)
    if (video) {
      video.likes++
    }
  }

  async unlikeVideo(videoId: string): Promise<void> {
    await delay(500) // Simulate network delay
    const video = MOCK_VIDEOS.find(v => v.id === videoId)
    if (video) {
      video.likes = Math.max(0, video.likes - 1)
    }
  }

  async toggleVideoLike(videoId: string, liked: boolean): Promise<void> {
    if (liked) {
      await this.likeVideo(videoId)
    } else {
      await this.unlikeVideo(videoId)
    }
  }

  async getComments(videoId: string): Promise<Comment[]> {
    await delay(1000) // Simulate network delay
    return MOCK_COMMENTS
  }

  async addComment(videoId: string, content: string): Promise<Comment> {
    await delay(1000) // Simulate network delay
    const newComment: Comment = {
      id: Date.now().toString(),
      content,
      user: {
        id: MOCK_USER.id,
        username: MOCK_USER.username,
        avatar: MOCK_USER.avatar || '',
      },
      createdAt: new Date().toISOString(),
    }
    MOCK_COMMENTS.unshift(newComment)
    return newComment
  }
}

export const api = new Api() 