import { NextRequest, NextResponse } from 'next/server'
import { Video } from '@/types'

// Temporary mock data - replace with database queries
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
  // Add more mock videos as needed
]

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get pagination parameters from URL
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const offset = (page - 1) * limit

    // Filter videos by user ID
    const userVideos = MOCK_VIDEOS.filter(video => video.user.id === params.id)

    // Get total count
    const totalVideos = userVideos.length

    // Get paginated videos
    const videos = userVideos.slice(offset, offset + limit)

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalVideos / limit)
    const hasMore = page < totalPages

    // Return paginated response
    return NextResponse.json({
      data: videos,
      pagination: {
        page,
        limit,
        totalVideos,
        totalPages,
        hasMore
      }
    })
  } catch (error) {
    console.error('Failed to fetch user videos:', error)
    return NextResponse.json(
      { error: 'Failed to fetch user videos' },
      { status: 500 }
    )
  }
} 