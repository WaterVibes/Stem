"use client";

import { useState } from 'react';
import Image from 'next/image';
import { useAuth } from '../context/auth-context';
import SendCryptoMessage from '../components/SendCryptoMessage';

interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: string;
  cryptoAmount?: string;
  cryptoToken?: string;
}

interface Chat {
  id: string;
  username: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread?: number;
}

export default function MessagesPage() {
  const { user } = useAuth();
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  // Sample chats data
  const chats: Chat[] = [
    {
      id: '1',
      username: 'hydracam',
      avatar: '/images/default-avatar.png',
      lastMessage: 'Hey, check out my latest video!',
      timestamp: '2h',
      unread: 2
    },
    // ... more chats
  ];

  const handleSendMessage = (content: string) => {
    if (!content.trim() || !selectedChat) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: user?.email || 'me',
      timestamp: new Date().toISOString()
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };

  const handleSendCrypto = (amount: string, token: string) => {
    if (!amount || !selectedChat) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: `Sent ${amount} ${token}`,
      sender: user?.email || 'me',
      timestamp: new Date().toISOString(),
      cryptoAmount: amount,
      cryptoToken: token
    };

    setMessages([...messages, newMessage]);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-16">
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Chats List */}
        <div className="w-80 border-r border-[#1F6B3B]/20">
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Messages</h2>
            <div className="space-y-2">
              {chats.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => setSelectedChat(chat)}
                  className={`w-full flex items-center gap-3 p-3 hover:bg-[#1F6B3B]/5 border border-transparent ${
                    selectedChat?.id === chat.id ? 'bg-[#1F6B3B]/10 border-[#1F6B3B]/20' : ''
                  }`}
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={chat.avatar}
                      alt={chat.username}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{chat.username}</span>
                      <span className="text-xs text-gray-400">{chat.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-400 truncate">{chat.lastMessage}</p>
                  </div>
                  {chat.unread && (
                    <span className="w-5 h-5 rounded-full bg-[#1F6B3B] text-white text-xs flex items-center justify-center">
                      {chat.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Area */}
        {selectedChat ? (
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-[#1F6B3B]/20 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src={selectedChat.avatar}
                  alt={selectedChat.username}
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-medium">{selectedChat.username}</span>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === user?.email ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded ${
                      msg.sender === user?.email
                        ? 'bg-[#1F6B3B] text-white'
                        : 'bg-gray-800 text-white'
                    }`}
                  >
                    {msg.cryptoAmount ? (
                      <p className="flex items-center gap-1">
                        <span>💰</span>
                        <span>Sent {msg.cryptoAmount} GACA</span>
                      </p>
                    ) : (
                      <p>{msg.content}</p>
                    )}
                    <span className="text-xs opacity-50 mt-1 block">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-[#1F6B3B]/20">
              <div className="flex items-center gap-2">
                <SendCryptoMessage
                  recipientAddress="0x..." // Add recipient's address here
                  onSend={handleSendCrypto}
                />
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(message)}
                  placeholder="Type a message..."
                  className="flex-1 bg-black border border-[#1F6B3B]/20 rounded p-2 focus:border-[#1F6B3B] focus:ring-1 focus:ring-[#1F6B3B]"
                />
                <button
                  onClick={() => handleSendMessage(message)}
                  className="p-2 text-[#1F6B3B] hover:text-[#1F6B3B]/80 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
} 