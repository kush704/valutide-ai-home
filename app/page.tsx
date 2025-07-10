'use client';

import { useState, useEffect } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

export default function HomePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleNavigate = (path: string) => router.push(path);

  return (
    <div
      className={clsx(
        'min-h-screen transition duration-500 flex flex-col justify-between p-4 text-white',
        darkMode
          ? 'bg-gradient-to-r from-gray-900 via-black to-gray-800'
          : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'
      )}
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold text-shadow animate-pulse">
          ✨ ValuCommerce AI ✨
        </h1>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-xs bg-white text-black rounded px-2 py-1 font-semibold hover:bg-yellow-200 transition"
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>

          {!session ? (
            <button
              onClick={() => signIn('google')}
              className="bg-white text-purple-800 font-semibold px-4 py-1 rounded shadow hover:bg-yellow-200"
            >
              Sign in with Google
            </button>
          ) : (
            <div className="relative group">
              <img
                src={session.user?.image!}
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-white cursor-pointer"
                onClick={() => signOut()}
                title="Click to sign out"
              />
              <p className="text-sm mt-1 text-white/80">{session.user?.name}</p>
            </div>
          )}
        </div>
      </div>

      {/* Glowing Welcome */}
      <div className="text-center mt-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white animate-glow">
          ✨ Welcome to ValuCommerce AI ✨
        </h2>
        <p className="mt-2 text-md font-medium text-yellow-200">
          A Product of <span className="font-bold text-white">Valutide.Inc</span>
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-12 w-full">
        <Card
          title="🤖 ValuAI"
          desc="Your 24/7 Commerce Expert & CA Buddy"
          onClick={() => handleNavigate('/ai-dashboard')}
          borderColor="border-blue-500"
          bgLight="bg-white"
          bgDark="bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900"
          darkMode={darkMode}
        />
        <Card
          title="📰 Business Updates"
          desc="Commerce news, market moves & more"
          onClick={() => handleNavigate('/updates')}
          borderColor="border-red-600"
          bgLight="bg-white"
          bgDark="bg-gradient-to-br from-red-900 via-pink-900 to-purple-800"
          darkMode={darkMode}
        />
        <Card
          title="📜 Law Updates"
          desc="Amendments, Sections & Legal Changes"
          onClick={() => handleNavigate('/law-updates')}
          borderColor="border-yellow-500"
          bgLight="bg-white"
          bgDark="bg-gradient-to-br from-yellow-800 via-orange-800 to-red-800"
          darkMode={darkMode}
        />
      </div>

      {/* Footer */}
      <div className="text-center mt-20 text-sm text-white/80">
        <p>
          👉 Visit:{' '}
          <a
            className="underline text-yellow-300 hover:text-white transition"
            href="https://valutide-ai.vercel.app"
            target="_blank"
          >
            valutide-ai.vercel.app
          </a>
        </p>
        <p className="text-xs mt-2">© 2025 Valutide™. All rights reserved.</p>
      </div>
    </div>
  );
}

function Card({
  title,
  desc,
  onClick,
  borderColor,
  bgLight,
  bgDark,
  darkMode,
}: {
  title: string;
  desc: string;
  onClick: () => void;
  borderColor: string;
  bgLight: string;
  bgDark: string;
  darkMode: boolean;
}) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        'cursor-pointer rounded-xl shadow-xl p-6 hover:scale-105 transition duration-300 animate-fade-up border-t-4 text-black',
        borderColor,
        darkMode ? bgDark : bgLight
      )}
    >
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-sm">{desc}</p>
    </div>
  );
}
