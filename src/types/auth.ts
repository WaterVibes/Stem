export interface AuthUser {
  id: string
  email: string
  username: string
  avatar?: string
  emailVerified: boolean
  createdAt: Date
  bio?: string
  followers: number
  following: number
  totalLikes: number
}

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