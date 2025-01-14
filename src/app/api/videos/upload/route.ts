import { NextRequest, NextResponse } from 'next/server'
import { createStorageService } from '@/services/storage'
import { nanoid } from 'nanoid'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('video') as File
    const caption = formData.get('caption') as string
    const tags = formData.get('tags') as string
    const isPublic = formData.get('isPublic') === 'true'

    if (!file || !caption) {
      return NextResponse.json(
        { error: 'Video and caption are required' },
        { status: 400 }
      )
    }

    // Validate file type
    if (!file.type.startsWith('video/')) {
      return NextResponse.json(
        { error: 'Invalid file type. Only videos are allowed.' },
        { status: 400 }
      )
    }

    // Generate a unique key for the video
    const fileExtension = file.name.split('.').pop()
    const key = `videos/${nanoid()}.${fileExtension}`

    // Upload to cloud storage
    const storageService = createStorageService()
    const { url } = await storageService.uploadVideo(file, key)

    // Here you would typically save the video metadata to your database
    const video = {
      id: nanoid(),
      url,
      key,
      caption,
      tags: tags ? JSON.parse(tags) : [],
      isPublic,
      createdAt: new Date().toISOString(),
      // Add user information from the session when auth is implemented
      user: {
        id: 'temp-user-id',
        username: '@tempuser',
        avatar: '/default-avatar.png'
      }
    }

    // For now, we'll just return the video object
    // In production, you'd save this to your database
    return NextResponse.json(video)
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload video' },
      { status: 500 }
    )
  }
}

// Optional: Add configuration for the route
export const config = {
  api: {
    bodyParser: false, // Disable the default body parser
  },
} 