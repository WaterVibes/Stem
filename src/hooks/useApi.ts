import { ApiService } from '@/services/api'

// Create a singleton instance of the API service
const apiService = new ApiService()

export function useApi() {
  return apiService
} 