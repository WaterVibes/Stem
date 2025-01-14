import { NextRequest, NextResponse } from 'next/server'
import { Video } from '@/types'

// Temporary mock data - replace with database queries later
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
      id: '2',
      username: '@dr.green',
      avatar: 'https://storage.googleapis.com/your-bucket/avatar2.jpg',
    }
  },
  // Add more mock videos as needed
]

export async function GET(request: NextRequest) {
  try {
    // Get pagination parameters from URL
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = (page - 1) * limit

    // Get total count
    const totalVideos = MOCK_VIDEOS.length

    // Get paginated videos
    const videos = MOCK_VIDEOS.slice(offset, offset + limit)

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
    console.error('Failed to fetch videos:', error)
    return NextResponse.json(
      { error: 'Failed to fetch videos' },
      { status: 500 }
    )
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