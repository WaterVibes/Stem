import { NextRequest, NextResponse } from 'next/server'

// Mock user data for testing
const mockUser = {
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
  // Check for auth token - in a real app, verify the token
  const authToken = request.headers.get('authorization')?.split(' ')[1]
  
  if (!authToken) {
    return NextResponse.json(null)
  }

  // Return mock user data
  return NextResponse.json(mockUser)
} 