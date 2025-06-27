/// <reference lib="dom" />
'use client';

import { useState, useEffect, useRef } from 'react';
import { useChat } from '@/hooks/usechat';
import Tesseract from 'tesseract.js';

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }

  interface SpeechRecognition extends EventTarget {
    lang: string;
    interimResults: boolean;
    continuous: boolean;
    onresult: ((event: SpeechRecognitionEvent) => void) | null;
    onerror: ((event: Event) => void) | null;
    onend: (() => void) | null;
    start(): void;
    stop(): void;
  }

  interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
    resultIndex: number;
  }
}

const AIDashboard = () => {
  const { chatId, messages, loading, startNewChat, addMessage } = useChat();

  const [userQuery, setUserQuery] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [aiThinking, setAiThinking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, aiThinking]);

  // 🎤 Voice Input Setup
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let fullTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        fullTranscript += event.results[i][0].transcript;
      }
      setUserQuery(fullTranscript);
    };

    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
  }, []);

  // 🧠 Voice Engine Logic
  const speakText = (text: string) => {
    const synth = window.speechSynthesis;
    synth.cancel(); // Stop any existing speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-IN';
    utterance.pitch = 1.1;
    utterance.rate = 0.93;
    utterance.volume = 1;

    const voices = synth.getVoices();
    const indianVoice = voices.find(v => v.lang === 'en-IN') || voices.find(v => v.name.includes('Google'));
    if (indianVoice) utterance.voice = indianVoice;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);

    if (voices.length === 0) {
      synth.onvoiceschanged = () => synth.speak(utterance);
    } else {
      synth.speak(utterance);
    }
  };

  const stopVoice = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const pauseVoice = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
    }
  };

  const resumeVoice = () => {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
  };

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
    setIsListening((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuery && !imageFile) return;

    let finalQuery = userQuery;

    if (imageFile) {
      const result = await Tesseract.recognize(imageFile, 'eng');
      finalQuery = result.data.text.trim();
    }

    const activeChatId = chatId || (await startNewChat());

    await addMessage({ chat_id: activeChatId, role: 'user', content: finalQuery });

    setUserQuery('');
    setAiThinking(true);

    const res = await fetch('/api/openrouter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: finalQuery }),
    });

    const data = await res.json();
    const cleaned = data.response
      .replace(/As an AI language model,?/gi, '')
      .replace(/I cannot/gi, "Here's what we can understand:")
      .replace(/I'm just an AI/gi, "Here's my explanation:")
      .replace(/Based on my training/gi, "According to my knowledge");

    await addMessage({ chat_id: activeChatId, role: 'ai', content: cleaned });

    setAiThinking(false);
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <header className="text-center py-4 shadow-md border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <h1 className="text-xl md:text-2xl font-bold">
          📊 ValuCommerce AI — Your Smart Commerce Expert
        </h1>
      </header>

      {/* Messages */}
      <main className="flex-grow overflow-y-auto p-4 md:p-6 bg-gray-50">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.length === 0 && !loading && (
            <p className="text-center text-gray-400">
              Ask anything related to GST, Taxation, Business Law, CA, Economics…
            </p>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`relative max-w-[80%] px-4 py-3 rounded-lg shadow-sm whitespace-pre-wrap ${
                msg.role === 'user'
                  ? 'bg-blue-100 text-blue-900 ml-auto text-right'
                  : 'bg-gray-100 text-gray-800 mr-auto text-left'
              }`}
            >
              {msg.content}
              {msg.role === 'ai' && (
                <div className="absolute bottom-2 right-2 flex gap-2">
                  <button
                    onClick={() => speakText(msg.content)}
                    className="text-gray-500 hover:text-blue-600 text-sm"
                    title="Play"
                  >
                    ▶️
                  </button>
                  <button
                    onClick={pauseVoice}
                    className="text-gray-500 hover:text-yellow-500 text-sm"
                    title="Pause"
                  >
                    ⏸️
                  </button>
                  <button
                    onClick={resumeVoice}
                    className="text-gray-500 hover:text-green-500 text-sm"
                    title="Resume"
                  >
                    🔁
                  </button>
                  <button
                    onClick={stopVoice}
                    className="text-gray-500 hover:text-red-500 text-sm"
                    title="Stop"
                  >
                    ⏹️
                  </button>
                </div>
              )}
            </div>
          ))}

          {aiThinking && (
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span>ValuCommerce AI is thinking...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input + Mic */}
      <form
        onSubmit={handleSubmit}
        className="w-full border-t bg-white p-4 flex items-center gap-2"
      >
        <label className="cursor-pointer text-2xl">
          📎
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          />
        </label>

        <input
          value={userQuery}
          onChange={(e) => setUserQuery(e.target.value)}
          placeholder="Speak or type your commerce doubt..."
          className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
        />

        <button
          type="button"
          onClick={toggleListening}
          className={`text-xl px-3 py-2 rounded-lg transition ${
            isListening
              ? 'bg-red-600 text-white animate-pulse'
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
          }`}
        >
          🎤
        </button>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
        >
          Ask ➤
        </button>
      </form>
    </div>
  );
};

export default AIDashboard;
