import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AuthUser, LoginCredentials, SignupCredentials, AuthState } from '@/types/auth'

interface AuthStore extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>
  signup: (credentials: SignupCredentials) => Promise<void>
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: true,
      error: null,

      login: async (credentials) => {
        try {
          set({ isLoading: true, error: null })
          const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
          })

          if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message || 'Failed to login')
          }

          const { user, token } = await response.json()
          
          // Store token in localStorage
          localStorage.setItem('auth_token', token)
          
          set({ user, isLoading: false })
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to login',
            isLoading: false 
          })
          throw error
        }
      },

      signup: async (credentials) => {
        try {
          set({ isLoading: true, error: null })
          const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
          })

          if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message || 'Failed to sign up')
          }

          const { user, token } = await response.json()
          
          // Store token in localStorage
          localStorage.setItem('auth_token', token)
          
          set({ user, isLoading: false })
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to sign up',
            isLoading: false 
          })
          throw error
        }
      },

      logout: async () => {
        try {
          set({ isLoading: true, error: null })
          await fetch('/api/auth/logout', { method: 'POST' })
          
          // Clear token from localStorage
          localStorage.removeItem('auth_token')
          
          set({ user: null, isLoading: false })
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to logout',
            isLoading: false 
          })
        }
      },

      checkAuth: async () => {
        try {
          set({ isLoading: true, error: null })
          const token = localStorage.getItem('auth_token')
          
          if (!token) {
            set({ user: null, isLoading: false })
            return
          }

          const response = await fetch('/api/auth/me', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })

          if (!response.ok) {
            // Clear invalid token
            localStorage.removeItem('auth_token')
            set({ user: null, isLoading: false })
            return
          }

          const { user } = await response.json()
          set({ user, isLoading: false })
        } catch (error) {
          set({ 
            user: null,
            error: error instanceof Error ? error.message : 'Failed to check auth',
            isLoading: false 
          })
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user }), // Only persist user data
    }
  )
) 