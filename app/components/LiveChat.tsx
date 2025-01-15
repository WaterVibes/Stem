"use client";

import { useState } from 'react';

interface ChatMessage {
  id: string;
  user: string;
  message: string;
  timestamp: Date;
  type: 'message' | 'join' | 'leave' | 'duet-request' | 'collab-request';
}

export default function LiveChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      user: 'You',
      message: newMessage,
      timestamp: new Date(),
      type: 'message'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2 ${
              msg.type === 'join' || msg.type === 'leave'
                ? 'text-white/40 text-sm'
                : ''
            }`}
          >
            {msg.type === 'message' && (
              <>
                <span className="font-medium text-green-500">{msg.user}:</span>
                <p className="text-white/80">{msg.message}</p>
              </>
            )}
            {msg.type === 'join' && (
              <p>👋 {msg.user} joined the stream</p>
            )}
            {msg.type === 'leave' && (
              <p>👋 {msg.user} left the stream</p>
            )}
            {msg.type === 'duet-request' && (
              <div className="bg-white/5 p-2 rounded-lg w-full">
                <p className="text-sm">
                  <span className="text-green-500">{msg.user}</span> wants to start a duet
                </p>
                <div className="flex gap-2 mt-2">
                  <button className="px-3 py-1 bg-green-500 text-black text-sm rounded">
                    Accept
                  </button>
                  <button className="px-3 py-1 bg-white/10 text-sm rounded">
                    Decline
                  </button>
                </div>
              </div>
            )}
            {msg.type === 'collab-request' && (
              <div className="bg-white/5 p-2 rounded-lg w-full">
                <p className="text-sm">
                  <span className="text-green-500">{msg.user}</span> wants to collaborate
                </p>
                <div className="flex gap-2 mt-2">
                  <button className="px-3 py-1 bg-green-500 text-black text-sm rounded">
                    Accept
                  </button>
                  <button className="px-3 py-1 bg-white/10 text-sm rounded">
                    Decline
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} className="mt-4 flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
          placeholder="Send a message..."
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-black rounded-lg font-medium hover:bg-green-400"
        >
          Send
        </button>
      </form>
    </div>
  );
} 