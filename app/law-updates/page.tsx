'use client';

import { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Loader } from 'lucide-react';

interface Article {
  title: string;
  description: string;
  publishedAt: string;
  url: string;
  urlToImage?: string;
}

export default function LawUpdatesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  useEffect(() => {
    fetch('/api/law-updates')
      .then((res) => {
        if (!res.ok) throw new Error('API responded with ' + res.status);
        return res.json();
      })
      .then((data) => setArticles(data.articles || []))
      .catch((err) => {
        console.error('[Law Updates] Error:', err);
        setArticles([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Date not available';
    return date.toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-yellow-700 mb-8">
        ⚖️ Law & Act Amendments
      </h1>

      {loading ? (
        <div className="flex justify-center items-center text-gray-500 gap-2">
          <Loader className="animate-spin" />
          Loading law updates...
        </div>
      ) : articles.length === 0 ? (
        <p className="text-center text-gray-400">No law updates found. Please check later.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedArticle(article)}
              className="cursor-pointer bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition"
            >
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt="Law Update"
                  className="w-full h-40 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-md font-bold text-yellow-800 line-clamp-2 min-h-[3rem]">
                  {article.title}
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  {formatDate(article.publishedAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog
        open={!!selectedArticle}
        onClose={() => setSelectedArticle(null)}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4"
      >
        {selectedArticle && (
          <div className="bg-white max-w-lg w-full rounded-xl shadow-lg p-6 space-y-4 overflow-y-auto max-h-[80vh]">
            <button
              onClick={() => setSelectedArticle(null)}
              className="text-sm text-gray-500 hover:text-red-500 float-right"
            >
              ✖ Close
            </button>
            {selectedArticle.urlToImage && (
              <img
                src={selectedArticle.urlToImage}
                alt="Law Update"
                className="w-full h-48 object-cover rounded-md"
              />
            )}
            <h2 className="text-xl font-bold text-yellow-800">
              {selectedArticle.title}
            </h2>
            <p className="text-sm text-gray-700">{selectedArticle.description}</p>
            <p className="text-xs text-gray-500 italic">
              Published on: {formatDate(selectedArticle.publishedAt)}
            </p>
            <a
              href={selectedArticle.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-yellow-700 hover:underline text-sm mt-2"
            >
              Read full amendment →
            </a>
          </div>
        )}
      </Dialog>
    </div>
  );
}
