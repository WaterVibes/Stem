import { NextRequest, NextResponse } from 'next/server'
import { User, Video, PaginatedResponse, ApiError } from '@/types'

// Mock user data - replace with real database
const MOCK_USERS: Record<string, User> = {
  '1': {
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
}

// Mock videos - replace with real database
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

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = MOCK_USERS[params.id]

    if (!user) {
      const error: ApiError = {
        code: 'USER_NOT_FOUND',
        message: `No user found with ID: ${params.id}`,
        status: 404
      }
      return NextResponse.json(error, { status: error.status })
    }

    // Check if videos should be included
    const includeVideos = request.nextUrl.searchParams.get('include') === 'videos'
    
    if (!includeVideos) {
      return NextResponse.json(user)
    }

    // Get pagination parameters
    const page = parseInt(request.nextUrl.searchParams.get('page') || '1')
    const limit = parseInt(request.nextUrl.searchParams.get('limit') || '12')
    const offset = (page - 1) * limit

    // Filter videos by user ID
    const userVideos = MOCK_VIDEOS.filter(video => video.user.id === params.id)
    const totalVideos = userVideos.length
    const paginatedVideos = userVideos.slice(offset, offset + limit)
    const totalPages = Math.ceil(totalVideos / limit)

    // Return user with paginated videos
    const response: PaginatedResponse<{ user: User; videos: Video[] }> = {
      data: {
        user,
        videos: paginatedVideos,
      },
      pagination: {
        page,
        limit,
        totalCount: totalVideos,
        totalPages,
        hasMore: page < totalPages,
      }
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching user:', error)
    const apiError: ApiError = {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Internal server error',
      status: 500
    }
    return NextResponse.json(apiError, { status: apiError.status })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const updates = await request.json()
    const user = MOCK_USERS[params.id]

    if (!user) {
      const error: ApiError = {
        code: 'USER_NOT_FOUND',
        message: `No user found with ID: ${params.id}`,
        status: 404
      }
      return NextResponse.json(error, { status: error.status })
    }

    // Validate update fields
    const allowedFields = ['username', 'bio', 'avatar']
    const invalidFields = Object.keys(updates).filter(field => !allowedFields.includes(field))

    if (invalidFields.length > 0) {
      const error: ApiError = {
        code: 'INVALID_FIELDS',
        message: `Cannot update the following fields: ${invalidFields.join(', ')}`,
        status: 400
      }
      return NextResponse.json(error, { status: error.status })
    }

    // Update user data
    const updatedUser = {
      ...user,
      ...updates,
      updatedAt: new Date().toISOString()
    }

    // In a real app, you would update the database here
    MOCK_USERS[params.id] = updatedUser

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error('Failed to update user:', error)
    const apiError: ApiError = {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to update user data',
      status: 500
    }
    return NextResponse.json(apiError, { status: apiError.status })
  }
} 