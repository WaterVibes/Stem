'use client';

import { ChartBarIcon, UsersIcon, HeartIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';

const stats = [
  {
    name: 'Total Views',
    value: '24.5K',
    change: '+12.3%',
    icon: ChartBarIcon,
    positive: true
  },
  {
    name: 'Followers',
    value: '1,890',
    change: '+4.5%',
    icon: UsersIcon,
    positive: true
  },
  {
    name: 'Likes',
    value: '5.2K',
    change: '+8.1%',
    icon: HeartIcon,
    positive: true
  },
  {
    name: 'Comments',
    value: '521',
    change: '-2.4%',
    icon: ChatBubbleLeftIcon,
    positive: false
  }
];

const topPosts = [
  {
    id: 1,
    title: 'My first cyberpunk edit 🌟',
    views: '12.3K',
    engagement: '8.4%'
  },
  {
    id: 2,
    title: 'Night City Vibes #cyberpunk',
    views: '8.1K',
    engagement: '6.2%'
  },
  {
    id: 3,
    title: 'Neon lights and city fights',
    views: '4.1K',
    engagement: '5.9%'
  }
];

export default function AnalyticsPage() {
  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Analytics Overview</h1>
          <p className="text-[#00ff9d]/60">Last 28 days</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.name} className="border border-[#00ff9d]/20 p-4 hover:bg-[#00ff9d]/5 transition-colors">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[#00ff9d]/60">{stat.name}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <stat.icon className="w-6 h-6 text-[#00ff9d]" />
              </div>
              <div className={`mt-2 text-sm ${
                stat.positive ? 'text-[#00ff9d]' : 'text-red-500'
              }`}>
                {stat.change} from last period
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Views Chart */}
          <div className="border border-[#00ff9d]/20 p-6">
            <h2 className="text-lg font-semibold mb-4">Views Over Time</h2>
            <div className="h-64 bg-[#00ff9d]/5 flex items-center justify-center">
              <span className="text-[#00ff9d]/40">Chart Placeholder</span>
            </div>
          </div>

          {/* Engagement Chart */}
          <div className="border border-[#00ff9d]/20 p-6">
            <h2 className="text-lg font-semibold mb-4">Engagement Rate</h2>
            <div className="h-64 bg-[#00ff9d]/5 flex items-center justify-center">
              <span className="text-[#00ff9d]/40">Chart Placeholder</span>
            </div>
          </div>
        </div>

        {/* Top Posts */}
        <div className="border border-[#00ff9d]/20">
          <div className="p-4 border-b border-[#00ff9d]/20">
            <h2 className="text-lg font-semibold">Top Performing Posts</h2>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#00ff9d]/20">
                <th className="px-4 py-3 text-left font-medium text-[#00ff9d]/60">Post</th>
                <th className="px-4 py-3 text-left font-medium text-[#00ff9d]/60">Views</th>
                <th className="px-4 py-3 text-left font-medium text-[#00ff9d]/60">Engagement</th>
              </tr>
            </thead>
            <tbody>
              {topPosts.map((post) => (
                <tr key={post.id} className="border-b border-[#00ff9d]/20 hover:bg-[#00ff9d]/5">
                  <td className="px-4 py-4 font-medium">{post.title}</td>
                  <td className="px-4 py-4 text-[#00ff9d]/60">{post.views}</td>
                  <td className="px-4 py-4 text-[#00ff9d]/60">{post.engagement}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 