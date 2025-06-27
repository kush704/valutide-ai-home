'use client';

import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center justify-between p-4 text-center text-white">
      <div className="w-full text-center mt-10 animate-pulse">
        <h1 className="text-2xl md:text-4xl font-extrabold text-shadow-lg drop-shadow-xl">
          ✨ Welcome to ValuCommerce AI ✨
        </h1>
        <p className="text-md md:text-lg mt-2 font-medium">
          A Product of <span className="font-bold text-yellow-300">Valutide.Inc</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl w-full mt-12 px-2">
        {/* AI Interface */}
        <div
          onClick={() => handleNavigate('/ai-dashboard')}
          className="cursor-pointer bg-white rounded-2xl shadow-xl p-6 text-center text-gray-800 hover:scale-105 transition transform duration-300"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-blue-700 mb-2">🤖 ValuAI</h2>
          <p>Your 24/7 Commerce Expert & CA Buddy</p>
        </div>

        {/* Business News Updates */}
        <div
          onClick={() => handleNavigate('/updates')}
          className="cursor-pointer bg-white rounded-2xl shadow-xl p-6 text-center text-gray-800 hover:scale-105 transition transform duration-300"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-red-600 mb-2">📰 Business Updates</h2>
          <p>Commerce news, market moves & more</p>
        </div>

        {/* Law Updates */}
        <div
          onClick={() => handleNavigate('/law-updates')}
          className="cursor-pointer bg-white rounded-2xl shadow-xl p-6 text-center text-gray-800 hover:scale-105 transition transform duration-300"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-yellow-600 mb-2">📜 Law Updates</h2>
          <p>Amendments, Sections & Legal Changes</p>
        </div>
      </div>

      <div className="text-center mt-16 text-sm md:text-base">
        <p className="mb-2">
          👉 For more information visit —
          <a
            href="https://valutide-ai.vercel.app"
            className="underline text-blue-200 hover:text-yellow-200 ml-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            valutide-ai.vercel.app
          </a>
        </p>
        <p className="text-white text-xs md:text-sm">© 2025 Valutide™. All rights reserved.</p>
      </div>
    </div>
  );
}
