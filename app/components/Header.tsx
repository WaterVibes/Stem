'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { 
  PlusIcon, 
  InboxIcon,
  UserIcon,
  Cog8ToothIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../context/auth-context';
import SearchBar from './SearchBar';
import LoginModal from './LoginModal';
import ConnectWallet from './ConnectWallet';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [avatarError, setAvatarError] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMenuItemClick = (action: () => void) => {
    action();
    setShowUserMenu(false);
  };

  const handleLogin = () => {
    router.push('/login');
  };

  const isInStudio = pathname?.startsWith('/studio');

  // Don't render header in studio
  if (isInStudio) return null;

  return (
    <header className="fixed top-0 w-full bg-black border-b border-[#00ff9d]/20 z-50">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-[#00ff9d] hover:text-[#00ff9d]/80">
          Stem
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-2xl px-4">
          <SearchBar />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <ConnectWallet />
          
          <Link 
            href="/studio"
            className="px-4 py-2 bg-[#00ff9d] text-black font-medium hover:bg-[#00ff9d]/90 transition-colors"
          >
            Upload
          </Link>

          {user ? (
            <>
              <Link href="/messages" className="p-2 text-[#00ff9d]/60 hover:text-[#00ff9d] transition-colors">
                <InboxIcon className="w-6 h-6" />
              </Link>

              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center"
                >
                  {avatarError ? (
                    <div className="w-8 h-8 rounded-full bg-[#00ff9d]/10 flex items-center justify-center">
                      <UserIcon className="w-5 h-5 text-[#00ff9d]" />
                    </div>
                  ) : (
                    <Image
                      src={user.avatar || '/images/default-avatar.png'}
                      alt={user.username}
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full object-cover border border-[#00ff9d]/20"
                      onError={() => setAvatarError(true)}
                    />
                  )}
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-black border border-[#00ff9d]/20 shadow-lg z-[200]">
                    <Link
                      href="/profile"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2 px-4 py-2 text-[#00ff9d]/60 hover:text-[#00ff9d] hover:bg-[#00ff9d]/5"
                    >
                      <UserIcon className="w-5 h-5" />
                      <span>View Profile</span>
                    </Link>
                    <Link
                      href="/settings"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2 px-4 py-2 text-[#00ff9d]/60 hover:text-[#00ff9d] hover:bg-[#00ff9d]/5"
                    >
                      <Cog8ToothIcon className="w-5 h-5" />
                      <span>Settings</span>
                    </Link>
                    <button
                      onClick={() => handleMenuItemClick(logout)}
                      className="w-full flex items-center gap-2 px-4 py-2 text-[#00ff9d]/60 hover:text-[#00ff9d] hover:bg-[#00ff9d]/5"
                    >
                      <ArrowRightOnRectangleIcon className="w-5 h-5" />
                      <span>Log out</span>
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="px-4 py-2 border border-[#00ff9d] text-[#00ff9d] hover:bg-[#00ff9d]/10 transition-colors"
            >
              Login
            </button>
          )}
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        onLogin={handleLogin}
      />
    </header>
  );
} 