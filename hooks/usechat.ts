'use client';

import { useEffect, useState } from 'react';

type Message = {
  id?: string;
  chat_id: string;
  role: 'user' | 'ai';
  content: string;
  created_at?: string;
};

type Chat = {
  id: string;
  created_at: string;
};

export const useChat = () => {
  const [chatId, setChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(false);

  // ⚡ Generate a random ID
  const generateId = () => Math.random().toString(36).substring(2, 10);

  // 🔁 Load mock chats on mount
  useEffect(() => {
    const initialChatId = generateId();
    const now = new Date().toISOString();
    const newChat: Chat = { id: initialChatId, created_at: now };

    setChats([newChat]);
    setChatId(initialChatId);
  }, []);

  // ➕ Start new chat
  const startNewChat = () => {
    const id = generateId();
    const newChat: Chat = { id, created_at: new Date().toISOString() };
    setChats((prev) => [newChat, ...prev]);
    setChatId(id);
    setMessages([]);
    return id;
  };

  // ➕ Add message
  const addMessage = (message: Message) => {
    const msg: Message = {
      ...message,
      id: generateId(),
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, msg]);
  };

  return {
    chatId,
    messages,
    chats,
    loading,
    setChatId,
    startNewChat,
    addMessage,
  };
};
