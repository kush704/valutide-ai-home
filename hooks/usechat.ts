'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseclient';

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

  // 🔁 Fetch chats on load
  useEffect(() => {
    const fetchChats = async () => {
      const { data, error } = await supabase
        .from('chats')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) setChats(data);
    };
    fetchChats();
  }, []);

  // 🔁 Fetch messages whenever chatId changes
  useEffect(() => {
    if (!chatId) return;
    setLoading(true);
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('chat_id', chatId)
        .order('created_at', { ascending: true });
      if (!error && data) setMessages(data);
      setLoading(false);
    };
    fetchMessages();
  }, [chatId]);

  // ➕ Start a new chat
  const startNewChat = async () => {
    const { data, error } = await supabase
      .from('chats')
      .insert({}) // 👈 empty insert, auto timestamp
      .select()
      .single();

    if (!error && data) {
      setChatId(data.id);
      setMessages([]);
      setChats((prev) => [data, ...prev]);
      return data.id;
    }
    return '';
  };

  // ➕ Add message to current chat
  const addMessage = async (message: Message) => {
    const { data, error } = await supabase
      .from('messages')
      .insert(message)
      .select()
      .single();

    if (!error && data) {
      setMessages((prev) => [...prev, data]);
    }
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
