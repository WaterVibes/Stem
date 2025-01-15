'use client';

import Link from 'next/link';
import { HomeIcon, ListBulletIcon, ChatBubbleLeftIcon, ChartBarIcon, SparklesIcon, MusicalNoteIcon, AcademicCapIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

const sidebarItems = [
  { label: 'Home', icon: HomeIcon, href: '/' },
  { label: 'Posts', icon: ListBulletIcon, href: '/posts' },
  { label: 'Comments', icon: ChatBubbleLeftIcon, href: '/comments' },
  { label: 'Analytics', icon: ChartBarIcon, href: '/analytics' },
  { label: 'Inspirations', icon: SparklesIcon, href: '/inspirations' },
  { label: 'Unlimited sounds', icon: MusicalNoteIcon, href: '/sounds' },
  { label: 'Creator Academy', icon: AcademicCapIcon, href: '/academy' },
  { label: 'Feedback', icon: QuestionMarkCircleIcon, href: '/feedback' },
];

export default function UploadLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-black">
      {/* Studio Sidebar */}
      <div className="fixed top-0 left-0 h-full w-60 bg-black border-r border-[#00ff9d]/20 flex flex-col">
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-[#00ff9d]/20">
          <Link href="/" className="flex items-center gap-2">
            <h1 className="gradient-text text-2xl font-bold">Stem Studio</h1>
          </Link>
        </div>

        {/* Upload Button */}
        <div className="p-4">
          <div className="bg-[#00ff9d]/10 border border-[#00ff9d]/20 p-4 text-center">
            <h2 className="text-lg font-semibold mb-1">Upload</h2>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-1 p-2">
            {sidebarItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 text-[#00ff9d]/60 hover:text-[#00ff9d] hover:bg-[#00ff9d]/5 transition-colors"
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Back to Stem */}
        <div className="p-4 border-t border-[#00ff9d]/20">
          <Link
            href="/"
            className="flex items-center gap-2 text-[#00ff9d]/60 hover:text-[#00ff9d] transition-colors"
          >
            <span>← Back to Stem</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-60">
        {children}
      </div>
    </div>
  );
} 