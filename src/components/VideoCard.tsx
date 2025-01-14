import { useRef, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { HeartIcon, ChatBubbleOvalLeftIcon, ShareIcon } from '@heroicons/react/24/solid'

interface Video {
  id: number
  videoUrl: string
  caption: string
  username: string
  likes: number
  comments: number
}

interface VideoCardProps {
  video: Video
}

export default function VideoCard({ video }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [ref, inView] = useInView({
    threshold: 0.7,
  })

  useEffect(() => {
    if (!videoRef.current) return

    if (inView) {
      videoRef.current.play()
    } else {
      videoRef.current.pause()
    }
  }, [inView])

  return (
    <div ref={ref} className="relative h-full w-full bg-gray-900">
      <video
        ref={videoRef}
        src={video.videoUrl}
        className="h-full w-full object-cover"
        loop
        muted
        playsInline
      />
      
      {/* Video Info Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <p className="font-bold text-lg">{video.username}</p>
        <p className="text-sm">{video.caption}</p>
      </div>

      {/* Action Buttons */}
      <div className="absolute right-4 bottom-20 flex flex-col gap-4">
        <button className="p-2 rounded-full bg-gray-800/60 hover:bg-gray-700/60">
          <HeartIcon className="w-8 h-8" />
          <span className="text-sm">{video.likes}</span>
        </button>
        <button className="p-2 rounded-full bg-gray-800/60 hover:bg-gray-700/60">
          <ChatBubbleOvalLeftIcon className="w-8 h-8" />
          <span className="text-sm">{video.comments}</span>
        </button>
        <button className="p-2 rounded-full bg-gray-800/60 hover:bg-gray-700/60">
          <ShareIcon className="w-8 h-8" />
        </button>
      </div>
    </div>
  )
} 