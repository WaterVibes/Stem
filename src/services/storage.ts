import { env } from '@/env'

export interface UploadResponse {
  url: string
  key: string
}

export interface StorageConfig {
  bucket: string
  region?: string
  endpoint?: string
}

export interface StorageService {
  uploadVideo(file: File, key: string): Promise<UploadResponse>
  getSignedUrl(key: string): Promise<string>
  deleteFile(key: string): Promise<void>
}

// AWS S3 Implementation
export class S3StorageService implements StorageService {
  private config: StorageConfig

  constructor(config: StorageConfig) {
    this.config = config
  }

  async uploadVideo(file: File, key: string): Promise<UploadResponse> {
    // This will be implemented when AWS is chosen
    throw new Error('AWS S3 implementation pending')
  }

  async getSignedUrl(key: string): Promise<string> {
    // This will be implemented when AWS is chosen
    throw new Error('AWS S3 implementation pending')
  }

  async deleteFile(key: string): Promise<void> {
    // This will be implemented when AWS is chosen
    throw new Error('AWS S3 implementation pending')
  }
}

// Google Cloud Storage Implementation
export class GCSStorageService implements StorageService {
  private config: StorageConfig

  constructor(config: StorageConfig) {
    this.config = config
  }

  async uploadVideo(file: File, key: string): Promise<UploadResponse> {
    // This will be implemented when GCS is chosen
    throw new Error('Google Cloud Storage implementation pending')
  }

  async getSignedUrl(key: string): Promise<string> {
    // This will be implemented when GCS is chosen
    throw new Error('Google Cloud Storage implementation pending')
  }

  async deleteFile(key: string): Promise<void> {
    // This will be implemented when GCS is chosen
    throw new Error('Google Cloud Storage implementation pending')
  }
}

// Mock Storage Service for Development
export class MockStorageService implements StorageService {
  async uploadVideo(file: File, key: string): Promise<UploadResponse> {
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const url = URL.createObjectURL(file)
    return {
      url,
      key
    }
  }

  async getSignedUrl(key: string): Promise<string> {
    return `/mock-videos/${key}`
  }

  async deleteFile(key: string): Promise<void> {
    console.log(`Mock delete: ${key}`)
  }
}

// Factory function to create the appropriate storage service
export function createStorageService(): StorageService {
  if (env.STORAGE_PROVIDER === 'aws') {
    return new S3StorageService({
      bucket: env.AWS_BUCKET_NAME || '',
      region: env.AWS_REGION
    })
  }
  
  if (env.STORAGE_PROVIDER === 'gcs') {
    return new GCSStorageService({
      bucket: env.GCS_BUCKET_NAME || '',
    })
  }
  
  // Default to mock service for development
  return new MockStorageService()
} 