'use client'

import { useEffect, useCallback } from 'react'
import { useFeedStore } from '@/store/useFeedStore'
import VideoCard from './VideoCard'
import { SortOption } from '@/types'

export default function VideoFeed() {
  const { videos, isLoading, error, filters, setFilters, loadVideos, loadMoreVideos } = useFeedStore()

  useEffect(() => {
    loadVideos();
  }, [filters, loadVideos]);

  const handleScroll = useCallback(() => {
    const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;
    if (bottom) {
      loadMoreVideos();
    }
  }, [loadMoreVideos]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'trending', label: 'Trending' },
    { value: 'recent', label: 'Recent' },
    { value: 'popular', label: 'Popular' },
  ]

  const timeRangeOptions = [
    { value: 'day', label: '24h' },
    { value: 'week', label: 'Week' },
    { value: 'month', label: 'Month' },
    { value: 'all', label: 'All Time' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black pt-20">
      {/* Filter Controls */}
      <div className="sticky top-16 z-40 bg-black/90 backdrop-blur-md border-b border-emerald-500/20 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Sort Options */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              {sortOptions.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => setFilters({ ...filters, sort: value })}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    filters.sort === value
                      ? 'bg-emerald-500/20 text-emerald-400 shadow-[0_0_15px_-3px_rgba(52,211,153,0.4)]'
                      : 'text-gray-300 hover:text-emerald-400 hover:bg-emerald-500/5'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Time Range Dropdown */}
            <select
              value={filters.timeRange || 'all'}
              onChange={(e) => setFilters({ ...filters, timeRange: e.target.value as any })}
              className="w-full sm:w-auto px-4 py-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
            >
              {timeRangeOptions.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <p className="text-red-400 text-center">{error}</p>
          </div>
        </div>
      )}

      {/* Video Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Loading Skeletons */}
          {isLoading && !videos.length && (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-[9/16] bg-emerald-500/5 rounded-xl animate-pulse" />
            ))
          )}

          {/* Videos */}
          {videos.map((video, index) => (
            <VideoCard
              key={video.id}
              video={video}
              isActive={index === 0} // You might want to implement proper active video tracking
            />
          ))}
        </div>

        {/* Loading More Indicator */}
        {isLoading && videos.length > 0 && (
          <div className="flex justify-center py-8">
            <div className="w-8 h-8 border-t-2 border-emerald-400 rounded-full animate-spin" />
          </div>
        )}
      </div>
    </div>
  )
} 