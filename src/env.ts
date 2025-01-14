export const env = {
  // API Configuration
  apiUrl: process.env.NEXT_PUBLIC_API_URL!,
  websocketUrl: process.env.NEXT_PUBLIC_WEBSOCKET_URL!,
  
  // Media Storage
  mediaBucketUrl: process.env.NEXT_PUBLIC_MEDIA_BUCKET_URL!,
  uploadMaxSize: Number(process.env.NEXT_PUBLIC_UPLOAD_MAX_SIZE!) || 100000000,
  
  // Feature Flags
  enableLiveStreaming: process.env.NEXT_PUBLIC_ENABLE_LIVE_STREAMING === 'true',
  enableComments: process.env.NEXT_PUBLIC_ENABLE_COMMENTS === 'true',

  // Storage Configuration
  STORAGE_PROVIDER: process.env.STORAGE_PROVIDER || 'mock',
  AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
  AWS_REGION: process.env.AWS_REGION,
  GCS_BUCKET_NAME: process.env.GCS_BUCKET_NAME,
} as const

// Type checking to ensure all environment variables are defined
type EnvCheck = Record<keyof typeof env, string | number | boolean | undefined>
export type Env = typeof env 