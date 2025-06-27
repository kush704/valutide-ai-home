'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type SidebarProps = {
  chats: { id: string; created_at: string }[];
  currentChatId: string | null;
  setChatId: (id: string) => void;
  startNewChat: () => Promise<string>;
};

export default function Sidebar({
  chats,
  currentChatId,
  setChatId,
  startNewChat,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={cn(
        'h-screen bg-gradient-to-b from-blue-600 to-purple-600 text-white transition-all duration-300 ease-in-out',
        collapsed ? 'w-14' : 'w-64'
      )}
    >
      {/* Toggle Sidebar Button */}
      <div className="flex justify-end p-2">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-white hover:text-gray-300 text-2xl"
        >
          ⋯
        </button>
      </div>

      {/* Expanded Content */}
      {!collapsed && (
        <>
          {/* Title */}
          <div className="px-4 mb-4">
            <h2 className="text-xl font-bold">💬 Your Chats</h2>
          </div>

          {/* Chat List */}
          <div className="space-y-2 px-4 overflow-y-auto max-h-[60vh]">
            {chats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setChatId(chat.id)}
                className={cn(
                  'w-full text-left px-3 py-2 rounded-lg hover:bg-white hover:text-blue-700 transition',
                  currentChatId === chat.id && 'bg-white text-blue-800'
                )}
              >
                {new Date(chat.created_at).toLocaleString('en-IN', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })}
              </button>
            ))}
          </div>

          {/* ➕ New Chat Button */}
          <div className="px-4 mt-4">
            <button
              onClick={startNewChat}
              className="w-full bg-white text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition font-semibold"
            >
              ➕ New Chat
            </button>
          </div>

          {/* 📢 Commerce Updates Link */}
          <div className="px-4 mt-4">
            <Link
              href="/updates"
              className="block w-full text-center bg-yellow-100 text-yellow-900 px-4 py-2 rounded-lg hover:bg-yellow-200 transition font-semibold"
            >
              📢 Commerce Updates
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
