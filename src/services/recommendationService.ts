import { VideoWithMetrics, VideoMetrics, FeedFilters } from '@/types'

// Utility function to calculate trending score
function calculateTrendingScore(metrics: VideoMetrics): number {
  const now = new Date()
  const lastUpdated = new Date(metrics.lastUpdated)
  const hoursSinceUpdate = (now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60)

  // Decay factor: score decreases over time
  const timeDecay = Math.exp(-hoursSinceUpdate / 48) // Half-life of 48 hours

  // Engagement metrics with weights
  const viewWeight = 1
  const watchTimeWeight = 2
  const completionWeight = 3
  const engagementWeight = 4

  // Calculate weighted score
  const score = (
    metrics.views * viewWeight +
    metrics.watchTime * watchTimeWeight +
    metrics.completionRate * completionWeight +
    metrics.engagementScore * engagementWeight
  ) * timeDecay

  return score
}

// Sort videos based on the selected option
function sortVideos(videos: VideoWithMetrics[], sort: FeedFilters['sort']): VideoWithMetrics[] {
  switch (sort) {
    case 'trending':
      return videos.sort((a, b) => b.metrics.trendingScore - a.metrics.trendingScore)
    
    case 'recent':
      return videos.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    
    case 'popular':
      return videos.sort((a, b) => b.metrics.views - a.metrics.views)
    
    default:
      return videos
  }
}

// Filter videos by time range
function filterByTimeRange(
  videos: VideoWithMetrics[],
  timeRange: FeedFilters['timeRange']
): VideoWithMetrics[] {
  if (!timeRange || timeRange === 'all') return videos

  const now = new Date()
  const ranges = {
    day: 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    month: 30 * 24 * 60 * 60 * 1000,
  }

  const minTime = now.getTime() - ranges[timeRange]
  return videos.filter(video => new Date(video.createdAt).getTime() > minTime)
}

// Filter videos by tags
function filterByTags(
  videos: VideoWithMetrics[],
  tags?: string[]
): VideoWithMetrics[] {
  if (!tags || tags.length === 0) return videos

  return videos.filter(video =>
    tags.some(tag => video.tags.includes(tag))
  )
}

export class RecommendationService {
  // Get trending videos with filters
  async getTrendingVideos(filters: FeedFilters): Promise<VideoWithMetrics[]> {
    try {
      // In a real app, this would be a database query
      // For now, we'll use mock data
      const videos = await this.getMockVideosWithMetrics()

      // Apply filters in sequence
      let filteredVideos = videos
      
      // Filter by time range
      filteredVideos = filterByTimeRange(filteredVideos, filters.timeRange)
      
      // Filter by tags
      filteredVideos = filterByTags(filteredVideos, filters.tags)
      
      // Sort based on selected option
      filteredVideos = sortVideos(filteredVideos, filters.sort)

      return filteredVideos
    } catch (error) {
      console.error('Failed to fetch trending videos:', error)
      throw error
    }
  }

  // Get personalized recommendations (to be implemented)
  async getPersonalizedRecommendations(userId: string): Promise<VideoWithMetrics[]> {
    // TODO: Implement personalized recommendations based on:
    // 1. User's watch history
    // 2. Liked videos
    // 3. Followed topics/tags
    // 4. Similar users' preferences
    return []
  }

  // Mock data generator
  private async getMockVideosWithMetrics(): Promise<VideoWithMetrics[]> {
    return [
      {
        id: '1',
        url: 'https://storage.googleapis.com/your-bucket/sample1.mp4',
        thumbnail: 'https://storage.googleapis.com/your-bucket/thumb1.jpg',
        caption: 'Purple Haze strain review 🌿',
        tags: ['review', 'indica', 'medical'],
        likes: 1200,
        comments: 45,
        shares: 15,
        createdAt: new Date().toISOString(),
        user: {
          id: '1',
          username: '@cannabisexpert',
          avatar: 'https://storage.googleapis.com/your-bucket/avatar1.jpg',
        },
        metrics: {
          views: 15000,
          watchTime: 12000,
          completionRate: 0.85,
          engagementScore: 0.92,
          trendingScore: calculateTrendingScore({
            views: 15000,
            watchTime: 12000,
            completionRate: 0.85,
            engagementScore: 0.92,
            trendingScore: 0,
            lastUpdated: new Date().toISOString(),
          }),
          lastUpdated: new Date().toISOString(),
        }
      },
      {
        id: '2',
        url: 'https://storage.googleapis.com/your-bucket/sample2.mp4',
        thumbnail: 'https://storage.googleapis.com/your-bucket/thumb2.jpg',
        caption: 'Medical benefits of CBD explained',
        tags: ['education', 'cbd', 'medical'],
        likes: 890,
        comments: 32,
        shares: 25,
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        user: {
          id: '2',
          username: '@dr.green',
          avatar: 'https://storage.googleapis.com/your-bucket/avatar2.jpg',
        },
        metrics: {
          views: 8000,
          watchTime: 7200,
          completionRate: 0.90,
          engagementScore: 0.88,
          trendingScore: calculateTrendingScore({
            views: 8000,
            watchTime: 7200,
            completionRate: 0.90,
            engagementScore: 0.88,
            trendingScore: 0,
            lastUpdated: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
          }),
          lastUpdated: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        }
      },
      // Add more mock videos as needed
    ]
  }
} 