import { NextRequest, NextResponse } from 'next/server'
import { PaginatedResponse, Video, ApiError } from '@/types'

// Mock video data - replace with real database queries later
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
    createdAt: new Date('2024-01-14T12:00:00.000Z').toISOString(),
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
    createdAt: new Date('2024-01-13T15:30:00.000Z').toISOString(),
    user: {
      id: '1',
      username: '@cannabisexpert',
      avatar: 'https://storage.googleapis.com/your-bucket/avatar1.jpg',
    }
  },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const sort = searchParams.get('sort') || 'recent'
    const timeRange = searchParams.get('timeRange') || 'all'
    const tags = searchParams.get('tags')?.split(',') || []

    // Filter by tags if provided
    let filteredVideos = tags.length > 0
      ? MOCK_VIDEOS.filter(video => tags.some(tag => video.tags.includes(tag)))
      : [...MOCK_VIDEOS]

    // Filter by time range
    const now = new Date()
    if (timeRange !== 'all') {
      const ranges = {
        day: 24 * 60 * 60 * 1000,
        week: 7 * 24 * 60 * 60 * 1000,
        month: 30 * 24 * 60 * 60 * 1000,
      }
      const range = ranges[timeRange as keyof typeof ranges]
      if (range) {
        filteredVideos = filteredVideos.filter(video => {
          const videoDate = new Date(video.createdAt)
          return now.getTime() - videoDate.getTime() <= range
        })
      }
    }

    // Sort videos
    filteredVideos.sort((a, b) => {
      switch (sort) {
        case 'recent':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case 'popular':
          return b.likes - a.likes
        case 'trending':
          // Simple trending algorithm: likes + comments + shares
          const scoreA = a.likes + a.comments + a.shares
          const scoreB = b.likes + b.comments + b.shares
          return scoreB - scoreA
        default:
          return 0
      }
    })

    // Calculate pagination
    const offset = (page - 1) * limit
    const totalVideos = filteredVideos.length
    const totalPages = Math.ceil(totalVideos / limit)
    const paginatedVideos = filteredVideos.slice(offset, offset + limit)

    const response: PaginatedResponse<Video[]> = {
      data: paginatedVideos,
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
    console.error('Failed to fetch videos:', error)
    const apiError: ApiError = {
      message: 'Failed to fetch videos',
      code: 'FETCH_VIDEOS_ERROR',
      status: 500
    }
    return NextResponse.json(apiError, { status: apiError.status || 500 })
  }
}

// Optional: Add a POST endpoint for creating new videos
export async function POST(request: NextRequest) {
  try {
    const video = await request.json()

    // Validate required fields
    if (!video.url || !video.caption) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // In a real app, you would:
    // 1. Validate the user's session
    // 2. Save the video to your database
    // 3. Process the video (generate thumbnails, etc.)
    // 4. Return the created video

    const newVideo: Video = {
      id: Date.now().toString(),
      url: video.url,
      thumbnail: video.thumbnail || video.url,
      caption: video.caption,
      tags: video.tags || [],
      likes: 0,
      comments: 0,
      shares: 0,
      createdAt: new Date().toISOString(),
      user: {
        id: 'temp-user-id', // Replace with actual user ID from session
        username: '@tempuser',
        avatar: '/default-avatar.png'
      }
    }

    // In a real app, you would save this to your database
    MOCK_VIDEOS.unshift(newVideo)

    return NextResponse.json(newVideo)
  } catch (error) {
    console.error('Failed to create video:', error)
    return NextResponse.json(
      { error: 'Failed to create video' },
      { status: 500 }
    )
  }
} 