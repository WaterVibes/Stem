import { NextRequest, NextResponse } from 'next/server'
import { Video } from '@/types'

// This would be replaced with a database query in a real app
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
  // ... other videos
]

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const video = MOCK_VIDEOS.find(v => v.id === params.id)

    if (!video) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(video)
  } catch (error) {
    console.error('Failed to fetch video:', error)
    return NextResponse.json(
      { error: 'Failed to fetch video' },
      { status: 500 }
    )
  }
}

// Update video (likes, comments, etc.)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const updates = await request.json()
    const videoIndex = MOCK_VIDEOS.findIndex(v => v.id === params.id)

    if (videoIndex === -1) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      )
    }

    // In a real app, you would:
    // 1. Validate the user's session
    // 2. Validate the update data
    // 3. Update the database
    // 4. Return the updated video

    const updatedVideo = {
      ...MOCK_VIDEOS[videoIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    }

    MOCK_VIDEOS[videoIndex] = updatedVideo

    return NextResponse.json(updatedVideo)
  } catch (error) {
    console.error('Failed to update video:', error)
    return NextResponse.json(
      { error: 'Failed to update video' },
      { status: 500 }
    )
  }
}

// Delete video
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const videoIndex = MOCK_VIDEOS.findIndex(v => v.id === params.id)

    if (videoIndex === -1) {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      )
    }

    // In a real app, you would:
    // 1. Validate the user's session
    // 2. Check if user has permission to delete
    // 3. Delete from storage
    // 4. Delete from database

    MOCK_VIDEOS.splice(videoIndex, 1)

    return NextResponse.json(
      { message: 'Video deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Failed to delete video:', error)
    return NextResponse.json(
      { error: 'Failed to delete video' },
      { status: 500 }
    )
  }
} 