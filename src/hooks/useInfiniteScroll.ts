import { useEffect, useRef, useState } from 'react'

interface UseInfiniteScrollOptions {
  threshold?: number
  onLoadMore: () => Promise<void>
}

export function useInfiniteScroll({ 
  threshold = 0.8,
  onLoadMore 
}: UseInfiniteScrollOptions) {
  const [loading, setLoading] = useState(false)
  const observerRef = useRef<IntersectionObserver>()
  const targetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold,
    }

    const handleIntersect = async (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries
      if (entry.isIntersecting && !loading) {
        setLoading(true)
        await onLoadMore()
        setLoading(false)
      }
    }

    if (targetRef.current) {
      observerRef.current = new IntersectionObserver(handleIntersect, options)
      observerRef.current.observe(targetRef.current)
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [threshold, onLoadMore, loading])

  return {
    targetRef,
    loading,
  }
} 