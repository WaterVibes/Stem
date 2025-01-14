import { NextRequest, NextResponse } from 'next/server'
import { User, Video, PaginatedResponse, ApiError } from '@/types'

// Temporary mock data - replace with database queries
const MOCK_USERS: User[] = [
  {
    id: '1',
    username: '@cannabisexpert',
    avatar: 'https://storage.googleapis.com/your-bucket/avatar1.jpg',
    bio: 'Cannabis educator and advocate. Sharing knowledge about medical benefits and responsible use. 🌿',
    followers: 12500,
    following: 850,
    totalLikes: 45200,
    createdAt: new Date().toISOString(),
  },
  // Add more mock users as needed
]

// Import mock videos from the videos endpoint
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
    const user = MOCK_USERS.find(u => u.id === params.id)

    if (!user) {
      const error: ApiError = {
        error: 'User not found',
        status: 404,
        message: `No user found with ID: ${params.id}`
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
    console.error('Failed to fetch user:', error)
    const apiError: ApiError = {
      error: 'Internal Server Error',
      status: 500,
      message: 'Failed to fetch user data'
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
    const userIndex = MOCK_USERS.findIndex(u => u.id === params.id)

    if (userIndex === -1) {
      const error: ApiError = {
        error: 'User not found',
        status: 404,
        message: `No user found with ID: ${params.id}`
      }
      return NextResponse.json(error, { status: error.status })
    }

    // Validate update fields
    const allowedFields = ['username', 'bio', 'avatar']
    const invalidFields = Object.keys(updates).filter(field => !allowedFields.includes(field))

    if (invalidFields.length > 0) {
      const error: ApiError = {
        error: 'Invalid fields',
        status: 400,
        message: `Cannot update the following fields: ${invalidFields.join(', ')}`
      }
      return NextResponse.json(error, { status: error.status })
    }

    // In a real app, you would:
    // 1. Validate the user's session
    // 2. Validate the update data (username uniqueness, etc.)
    // 3. Update the database
    // 4. Return the updated user

    const updatedUser = {
      ...MOCK_USERS[userIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    }

    MOCK_USERS[userIndex] = updatedUser

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error('Failed to update user:', error)
    const apiError: ApiError = {
      error: 'Internal Server Error',
      status: 500,
      message: 'Failed to update user data'
    }
    return NextResponse.json(apiError, { status: apiError.status })
  }
} 