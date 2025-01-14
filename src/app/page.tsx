'use client'

import { useEffect } from 'react'
import { useStore } from '@/store/useStore'
import VideoFeed from '@/components/VideoFeed'
import { api } from '@/services/api'

export default function Home() {
  const { setCurrentUser } = useStore()

  useEffect(() => {
    // Fetch current user on app load
    const fetchUser = async () => {
      try {
        const user = await api.getCurrentUser()
        // Only set the user if we got one back
        if (user) {
          setCurrentUser(user)
        }
      } catch (error) {
        console.error('Failed to fetch user:', error)
      }
    }

    fetchUser()
  }, [setCurrentUser])

  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="w-full max-w-[500px] mx-auto">
        <VideoFeed />
      </div>
    </main>
  )
} 