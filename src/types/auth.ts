import { User } from '@/types'

export type AuthUser = User

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignupCredentials extends LoginCredentials {
  username: string
}

export interface AuthState {
  user: AuthUser | null
  isLoading: boolean
  error: string | null
}

export interface AuthResponse {
  user: AuthUser
  token: string
} 