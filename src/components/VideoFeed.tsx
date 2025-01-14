import { useRef } from 'react'
import VideoCard from './VideoCard'

// Temporary mock data - this would come from your backend in production
const MOCK_VIDEOS = [
  {
    id: 1,
    videoUrl: '/sample-video-1.mp4',
    caption: 'Purple Haze strain review 🌿',
    username: '@cannabisexpert',
    likes: 1200,
    comments: 45,
  },
  {
    id: 2,
    videoUrl: '/sample-video-2.mp4',
    caption: 'Medical benefits of CBD explained',
    username: '@dr.green',
    likes: 890,
    comments: 32,
  },
]

export default function VideoFeed() {
  const feedRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={feedRef} className="snap-y snap-mandatory h-screen overflow-y-scroll">
      {MOCK_VIDEOS.map((video) => (
        <div key={video.id} className="snap-start h-screen w-full">
          <VideoCard video={video} />
        </div>
      ))}
    </div>
  )
} 