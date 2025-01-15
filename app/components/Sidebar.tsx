"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import LoginModal from './LoginModal';
import { useAuth } from '../context/auth-context';

interface MenuItem {
  label: string;
  path: string;
  icon: React.ReactElement;
  badge?: number;
}

interface FollowingAccount {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
}

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { user, logout } = useAuth();

  const followingAccounts: FollowingAccount[] = [
    {
      id: '1',
      username: 'hydracam',
      displayName: 'HydraCam',
      avatar: '/images/default-avatar.png'
    },
    {
      id: '2',
      username: 'oklamaruski',
      displayName: 'Kendrick Lamar✓',
      avatar: '/images/default-avatar.png'
    },
    {
      id: '3',
      username: 'amandaasumme',
      displayName: 'Amanda + ',
      avatar: '/images/default-avatar.png'
    },
    {
      id: '4',
      username: 'squirrel.games0',
      displayName: 'Squirrel games',
      avatar: '/images/default-avatar.png'
    }
  ];

  const menuItems: MenuItem[] = [
    {
      label: 'For You',
      path: '/',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      label: 'Explore',
      path: '/explore',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    },
    {
      label: 'LIVE',
      path: '/live',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  const loggedInMenuItems = [
    ...menuItems,
    {
      label: 'Following',
      path: '/following',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    {
      label: 'Friends',
      path: '/friends',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      label: 'Messages',
      path: '/messages',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ),
      badge: 1
    }
  ];

  const currentMenuItems = user ? loggedInMenuItems : menuItems;

  const handleLogout = () => {
    logout();
    if (pathname !== '/') {
      router.push('/');
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 h-full w-60 bg-black border-r border-[#00ff9d]/20 flex flex-col pt-16">
        {/* Scrollable container for the content */}
        <div className="flex-1 overflow-y-auto">
          {/* Main Navigation */}
          <nav>
            <ul className="space-y-2 px-2 py-4">
              {currentMenuItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-none hover-scale ${
                      pathname === item.path
                        ? 'bg-[#00ff9d]/10 text-[#00ff9d] hover-glow border border-[#00ff9d]/50'
                        : 'hover:bg-[#00ff9d]/5 hover:text-[#00ff9d] border border-transparent'
                    }`}
                  >
                    <div className={pathname === item.path ? 'text-[#00ff9d]' : 'text-white'}>
                      {item.icon}
                    </div>
                    <span className="font-medium">{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto bg-red-500 text-white text-xs px-1.5 py-0.5 animate-pulse">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Following Accounts */}
          {user && (
            <div className="px-2 py-4 border-t border-[#00ff9d]/20">
              <h3 className="px-4 text-sm font-medium text-[#00ff9d]/60 mb-2">Following accounts</h3>
              <ul className="space-y-1">
                {followingAccounts.map((account) => (
                  <li key={account.id}>
                    <Link
                      href={`/@${account.username}`}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-[#00ff9d]/5 hover-scale border border-transparent hover:border-[#00ff9d]/20"
                    >
                      <div className="w-8 h-8 rounded-none bg-[#00ff9d]/10 overflow-hidden hover-glow">
                        <Image
                          src={account.avatar}
                          alt={account.username}
                          width={32}
                          height={32}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium leading-tight hover:text-[#00ff9d] transition-colors">{account.username}</p>
                        <p className="text-sm text-[#00ff9d]/40 leading-tight">{account.displayName}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Login/Logout Section */}
          {user ? (
            <div className="px-2 py-4 border-t border-[#00ff9d]/20">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-500/5 text-red-500 hover-scale border border-transparent hover:border-red-500/20"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="font-medium">Log out</span>
              </button>
            </div>
          ) : (
            <div className="px-2 py-4 border-t border-[#00ff9d]/20">
              <p className="px-4 text-sm text-[#00ff9d]/60 mb-4">
                Log in to follow creators, like videos, and view comments.
              </p>
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="w-full px-4 py-3 bg-[#00ff9d] text-black rounded-none font-medium hover:bg-[#00ff9d]/90 hover-scale hover-glow transition-all border border-[#00ff9d]"
              >
                Log in
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={() => {
          setIsLoginModalOpen(false);
        }}
      />
    </>
  );
} 