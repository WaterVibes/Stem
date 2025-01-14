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
} as const

// Type checking to ensure all environment variables are defined
type EnvCheck = Record<keyof typeof env, string | number | boolean>
export type Env = typeof env 