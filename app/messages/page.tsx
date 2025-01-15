"use client";

import { useState } from 'react';
import Image from 'next/image';

interface Message {
  id: string;
  username: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  isVerified?: boolean;
}

export default function MessagesPage() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messages] = useState<Message[]>([
    {
      id: '1',
      username: 'Keanu Da Ghost',
      avatar: '/avatars/keanu.jpg',
      lastMessage: 'You shared a video',
      timestamp: '1/8/2025'
    },
    {
      id: '2',
      username: 'Jelani Miller',
      avatar: '/avatars/jelani.jpg',
      lastMessage: 'You shared a video',
      timestamp: '1/7/2025'
    },
    {
      id: '3',
      username: 'Tam',
      avatar: '/avatars/tam.jpg',
      lastMessage: 'You shared a video',
      timestamp: '1/7/2025'
    },
    {
      id: '4',
      username: 'RakStar ✓',
      avatar: '/avatars/rakstar.jpg',
      lastMessage: 'You shared a video',
      timestamp: '12/12/2024',
      isVerified: true
    },
    {
      id: '5',
      username: 'Bria Universe',
      avatar: '/avatars/bria.jpg',
      lastMessage: 'You shared a video',
      timestamp: '12/5/2024'
    },
    {
      id: '6',
      username: 'VinChi Coyote',
      avatar: '/avatars/vinchi.jpg',
      lastMessage: 'You shared a video',
      timestamp: '12/4/2024'
    },
    {
      id: '7',
      username: 'Teri Nowlin',
      avatar: '/avatars/teri.jpg',
      lastMessage: 'Shared a video',
      timestamp: '8/31/2024'
    }
  ]);

  return (
    <div className="flex h-screen bg-black">
      {/* Left sidebar - Message list */}
      <div className="w-[420px] border-r border-white/10">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Messages</h1>
          <button className="p-2 hover:bg-white/10 rounded-full">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto">
          {messages.map((message) => (
            <button
              key={message.id}
              onClick={() => setSelectedChat(message.id)}
              className={`w-full p-4 flex items-start gap-3 hover:bg-white/5 ${
                selectedChat === message.id ? 'bg-white/10' : ''
              }`}
            >
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={message.avatar}
                  alt={message.username}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <span className="font-medium truncate">{message.username}</span>
                  {message.isVerified && (
                    <svg className="w-4 h-4 text-[#20D5EC]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-white/60 truncate">{message.lastMessage}</p>
                  <span className="text-xs text-white/40">{message.timestamp}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right side - Chat area */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            {/* Chat header */}
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img
                    src={messages.find(m => m.id === selectedChat)?.avatar}
                    alt={messages.find(m => m.id === selectedChat)?.username}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-medium">
                  {messages.find(m => m.id === selectedChat)?.username}
                </span>
              </div>
            </div>

            {/* Chat messages */}
            <div className="flex-1 overflow-y-auto p-4">
              {/* Message content would go here */}
            </div>

            {/* Message input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Send a message..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-white/20"
                />
                <button className="p-2 hover:bg-white/10 rounded-full">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
                <button className="px-4 py-2 bg-[#F02C56] text-white rounded-full font-medium hover:bg-[#F02C56]/90">
                  Send
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-white/40">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
} 