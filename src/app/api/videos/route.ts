import { NextRequest, NextResponse } from 'next/server'
import { Video, PaginatedResponse, ApiError } from '@/types'

// Mock video data - replace with real database
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

export async function GET(request: NextRequest) {
  try {
    // Get pagination parameters
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const sort = searchParams.get('sort') || 'trending'
    const timeRange = searchParams.get('timeRange') || 'all'
    const tags = searchParams.getAll('tags')

    // Calculate offset
    const offset = (page - 1) * limit

    // Filter and sort videos
    let filteredVideos = [...MOCK_VIDEOS]

    // Apply tag filters
    if (tags.length > 0) {
      filteredVideos = filteredVideos.filter(video =>
        tags.some(tag => video.tags.includes(tag))
      )
    }

    // Apply time range filter
    if (timeRange !== 'all') {
      const now = new Date()
      const ranges = {
        day: 24 * 60 * 60 * 1000,
        week: 7 * 24 * 60 * 60 * 1000,
        month: 30 * 24 * 60 * 60 * 1000,
      }
      const range = ranges[timeRange as keyof typeof ranges]
      if (range) {
        filteredVideos = filteredVideos.filter(video =>
          new Date(video.createdAt).getTime() > now.getTime() - range
        )
      }
    }

    // Apply sorting
    switch (sort) {
      case 'recent':
        filteredVideos.sort((a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        break
      case 'popular':
        filteredVideos.sort((a, b) => b.likes - a.likes)
        break
      case 'trending':
      default:
        // For trending, we could use a more complex algorithm combining likes, comments, shares, and recency
        filteredVideos.sort((a, b) => {
          const scoreA = a.likes + a.comments * 2 + a.shares * 3
          const scoreB = b.likes + b.comments * 2 + b.shares * 3
          return scoreB - scoreA
        })
    }

    // Paginate results
    const paginatedVideos = filteredVideos.slice(offset, offset + limit)
    const totalVideos = filteredVideos.length
    const totalPages = Math.ceil(totalVideos / limit)

    // Prepare response
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
      error: 'Internal Server Error',
      status: 500,
      message: 'Failed to fetch videos'
    }
    return NextResponse.json(apiError, { status: apiError.status })
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