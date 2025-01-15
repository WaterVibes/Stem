'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  HomeIcon, 
  FilmIcon, 
  ChatBubbleLeftIcon, 
  ChartBarIcon, 
  LightBulbIcon, 
  MusicalNoteIcon, 
  AcademicCapIcon, 
  ChatBubbleOvalLeftIcon 
} from '@heroicons/react/24/outline';

const sidebarItems = [
  { name: 'Home', href: '/studio', icon: HomeIcon },
  { name: 'Posts', href: '/studio/posts', icon: FilmIcon },
  { name: 'Comments', href: '/studio/comments', icon: ChatBubbleLeftIcon },
  { name: 'Analytics', href: '/studio/analytics', icon: ChartBarIcon },
  { name: 'Inspirations', href: '/studio/inspirations', icon: LightBulbIcon },
  { name: 'Unlimited sounds', href: '/studio/sounds', icon: MusicalNoteIcon },
  { name: 'Creator Academy', href: '/studio/academy', icon: AcademicCapIcon },
  { name: 'Feedback', href: '/studio/feedback', icon: ChatBubbleOvalLeftIcon },
];

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-black">
      {/* Sidebar */}
      <div className="w-64 border-r border-[#00ff9d]/20">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-[#00ff9d]/20">
          <Link href="/" className="text-xl font-bold text-[#00ff9d] hover:text-[#00ff9d]/80">
            Back to Stem
          </Link>
        </div>

        {/* Upload Button */}
        <div className="p-4">
          <Link 
            href="/studio/upload"
            className="block w-full py-2 px-4 bg-[#00ff9d] text-black text-center font-medium hover:bg-[#00ff9d]/90 transition-colors"
          >
            Upload
          </Link>
        </div>

        {/* Navigation */}
        <nav className="mt-4">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-6 py-3 hover:bg-[#00ff9d]/5 transition-colors ${
                  isActive ? 'text-[#00ff9d] bg-[#00ff9d]/5' : 'text-[#00ff9d]/60'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
} 