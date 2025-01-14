import { NextRequest, NextResponse } from 'next/server'
import { User } from '@/types'

// Mock user data - replace with real database
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

export async function GET(request: NextRequest) {
  try {
    // Check for auth token
    const token = request.headers.get('Authorization')?.split(' ')[1]
    
    if (!token) {
      return NextResponse.json(null)
    }

    // In a real app, you would verify the token and fetch the user from your database
    // For now, we'll just return the mock user
    return NextResponse.json(MOCK_USER)
  } catch (error) {
    console.error('Failed to get current user:', error)
    return NextResponse.json(null)
  }
} 