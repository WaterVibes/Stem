import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '@/types'

interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null
}

interface AuthStore extends AuthState {
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, username: string) => Promise<void>
  logout: () => void
  checkAuth: () => Promise<void>
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        try {
          set({ isLoading: true, error: null })
          // Mock login - replace with real API call
          const mockUser: User = {
            id: '1',
            username: '@cannabisexpert',
            email: email,
            avatar: 'https://storage.googleapis.com/your-bucket/avatar1.jpg',
            bio: 'Cannabis educator and advocate. Sharing knowledge about medical benefits and responsible use. 🌿',
            followers: 12500,
            following: 850,
            totalLikes: 45200,
            emailVerified: true,
            createdAt: new Date('2024-01-01T00:00:00.000Z'),
          }
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 1000))
          set({ user: mockUser, isLoading: false })
        } catch (error) {
          set({ error: 'Failed to login', isLoading: false })
          throw error
        }
      },

      signup: async (email: string, password: string, username: string) => {
        try {
          set({ isLoading: true, error: null })
          // Mock signup - replace with real API call
          const mockUser: User = {
            id: '1',
            username: username,
            email: email,
            avatar: undefined,
            followers: 0,
            following: 0,
            totalLikes: 0,
            emailVerified: false,
            createdAt: new Date(),
          }
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 1000))
          set({ user: mockUser, isLoading: false })
        } catch (error) {
          set({ error: 'Failed to signup', isLoading: false })
          throw error
        }
      },

      logout: () => {
        set({ user: null, error: null })
      },

      checkAuth: async () => {
        try {
          set({ isLoading: true, error: null })
          // Mock auth check - replace with real API call
          const token = localStorage.getItem('auth-token')
          if (!token) {
            set({ user: null, isLoading: false })
            return
          }
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 500))
          // Keep existing user or set to null
          set(state => ({ user: state.user, isLoading: false }))
        } catch (error) {
          set({ error: 'Failed to check auth', isLoading: false })
          throw error
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user })
    }
  )
) 