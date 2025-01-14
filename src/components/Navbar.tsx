'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuthStore } from '@/store/useAuthStore'
import { 
  HomeIcon, 
  PlusCircleIcon, 
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline'

export default function Navbar() {
  const pathname = usePathname()
  const { user } = useAuthStore()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isActive = (path: string) => pathname === path

  const navItems = [
    { path: '/', icon: HomeIcon, label: 'Feed' },
    { path: '/upload', icon: PlusCircleIcon, label: 'Upload' },
    { path: '/profile', icon: UserCircleIcon, label: 'Profile' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-emerald-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text hover:from-emerald-300 hover:to-cyan-300 transition-all">
              GrassApp
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex items-center space-x-8">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                href={path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                  isActive(path)
                    ? 'text-emerald-400 bg-emerald-500/10 shadow-[0_0_15px_-3px_rgba(52,211,153,0.4)] scale-105'
                    : 'text-gray-300 hover:text-emerald-400 hover:bg-emerald-500/5'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="sm:hidden p-2 rounded-lg text-gray-300 hover:text-emerald-400 hover:bg-emerald-500/5"
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-black/95 border-t border-emerald-500/20">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                href={path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  isActive(path)
                    ? 'text-emerald-400 bg-emerald-500/10 shadow-[0_0_15px_-3px_rgba(52,211,153,0.4)]'
                    : 'text-gray-300 hover:text-emerald-400 hover:bg-emerald-500/5'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
} 