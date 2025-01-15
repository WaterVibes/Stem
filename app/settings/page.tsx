'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import type { FC } from 'react';

const SettingsPage: FC = () => {
  const [isPrivateAccount, setIsPrivateAccount] = useState(false);
  const [allowBrowserNotifications, setAllowBrowserNotifications] = useState(false);
  const [isBusinessAccount, setIsBusinessAccount] = useState(false);
  const [useOffTikTokData, setUseOffTikTokData] = useState(false);
  const [weeklyUpdates, setWeeklyUpdates] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white pt-16">
      {/* Settings Navigation */}
      <div className="flex max-w-7xl mx-auto">
        {/* Settings Sidebar */}
        <div className="w-72 border-r border-[#2f2f2f] min-h-[calc(100vh-4rem)] bg-black">
          <div className="p-4">
            <Link href="/" className="flex items-center gap-2 text-[#ff3b5c]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </Link>
          </div>
          <nav className="space-y-1">
            <button className="w-full px-6 py-3 text-left hover:bg-white/5 flex items-center gap-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Manage account
            </button>
            <button className="w-full px-6 py-3 text-left hover:bg-white/5 flex items-center gap-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Privacy
            </button>
            <button className="w-full px-6 py-3 text-left hover:bg-white/5 flex items-center gap-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              Push notifications
            </button>
            <button className="w-full px-6 py-3 text-left hover:bg-white/5 flex items-center gap-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Business account
            </button>
            <button className="w-full px-6 py-3 text-left hover:bg-white/5 flex items-center gap-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2z M15 9h2 M15 13h2 M15 17h2 M7 9h6 M7 13h6 M7 17h6" />
              </svg>
              Ads
            </button>
            <button className="w-full px-6 py-3 text-left hover:bg-white/5 flex items-center gap-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Screen time
            </button>
            <button className="w-full px-6 py-3 text-left hover:bg-white/5 flex items-center gap-4">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Content preferences
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Account Control */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Account control</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">Delete account</h3>
                </div>
                <button className="text-[#ff3b5c]">Delete</button>
              </div>
            </div>
          </section>

          {/* Privacy */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Privacy</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Discoverability</h3>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Private account</p>
                    <p className="text-sm text-gray-400">With a private account, only users you approve can follow you and watch your videos.</p>
                  </div>
                  <button 
                    className={`w-12 h-6 rounded-full ${isPrivateAccount ? 'bg-[#00ff9d]' : 'bg-gray-600'} relative transition-colors`}
                    onClick={() => setIsPrivateAccount(!isPrivateAccount)}
                  >
                    <span className={`block w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${isPrivateAccount ? 'right-0.5' : 'left-0.5'}`} />
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center py-4 border-t border-[#2f2f2f]">
                <div>
                  <p className="font-medium">Blocked accounts</p>
                </div>
                <ChevronRightIcon className="w-5 h-5" />
              </div>
            </div>
          </section>

          {/* Push Notifications */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Push notifications</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Desktop notifications</h3>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Allow in browser</p>
                    <p className="text-sm text-gray-400">Stay on top of notifications for likes, comments, the latest videos, and more on desktop.</p>
                  </div>
                  <button 
                    className={`w-12 h-6 rounded-full ${allowBrowserNotifications ? 'bg-[#00ff9d]' : 'bg-gray-600'} relative transition-colors`}
                    onClick={() => setAllowBrowserNotifications(!allowBrowserNotifications)}
                  >
                    <span className={`block w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${allowBrowserNotifications ? 'right-0.5' : 'left-0.5'}`} />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Screen Time */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Screen time</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Daily screen time</p>
                  <p className="text-sm text-gray-400">Get notified if you reach your time on TikTok.</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">Off</span>
                  <ChevronRightIcon className="w-5 h-5" />
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Screen time breaks</p>
                  <p className="text-sm text-gray-400">Get reminded to take breaks from scrolling.</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400">Off</span>
                  <ChevronRightIcon className="w-5 h-5" />
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Weekly screen time updates</p>
                  <p className="text-sm text-gray-400">Stay updated on your time from your Inbox.</p>
                </div>
                <button 
                  className={`w-12 h-6 rounded-full ${weeklyUpdates ? 'bg-[#00ff9d]' : 'bg-gray-600'} relative transition-colors`}
                  onClick={() => setWeeklyUpdates(!weeklyUpdates)}
                >
                  <span className={`block w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${weeklyUpdates ? 'right-0.5' : 'left-0.5'}`} />
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage; 