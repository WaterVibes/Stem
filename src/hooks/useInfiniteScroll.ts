import { useEffect, useRef, useCallback } from 'react'

interface UseInfiniteScrollOptions {
  threshold?: number
  rootMargin?: string
}

export function useInfiniteScroll(
  onIntersect: () => void,
  options: UseInfiniteScrollOptions = {}
) {
  const { threshold = 0.5, rootMargin = '100px' } = options
  const observerRef = useRef<IntersectionObserver | null>(null)
  const targetRef = useRef<HTMLDivElement | null>(null)

  const setTargetRef = useCallback((node: HTMLDivElement | null) => {
    if (targetRef.current) {
      // Cleanup old observer
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }

    if (node) {
      // Create new observer
      const observer = new IntersectionObserver(
        (entries) => {
          const [entry] = entries
          if (entry.isIntersecting) {
            onIntersect()
          }
        },
        {
          threshold,
          rootMargin,
        }
      )

      observer.observe(node)
      observerRef.current = observer
      targetRef.current = node
    }
  }, [onIntersect, threshold, rootMargin])

  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  return setTargetRef
} 