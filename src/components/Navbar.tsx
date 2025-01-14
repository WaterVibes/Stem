import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HomeIcon, UserIcon, PlusCircleIcon } from '@heroicons/react/24/outline'

export default function Navbar() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 px-4 py-2">
      <div className="max-w-screen-md mx-auto flex justify-around items-center">
        <Link 
          href="/"
          className={`flex flex-col items-center ${isActive('/') ? 'text-green-500' : 'text-gray-400'}`}
        >
          <HomeIcon className="w-6 h-6" />
          <span className="text-xs mt-1">Feed</span>
        </Link>

        <Link 
          href="/upload"
          className={`flex flex-col items-center ${isActive('/upload') ? 'text-green-500' : 'text-gray-400'}`}
        >
          <PlusCircleIcon className="w-6 h-6" />
          <span className="text-xs mt-1">Upload</span>
        </Link>

        <Link 
          href="/profile"
          className={`flex flex-col items-center ${isActive('/profile') ? 'text-green-500' : 'text-gray-400'}`}
        >
          <UserIcon className="w-6 h-6" />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </nav>
  )
} 