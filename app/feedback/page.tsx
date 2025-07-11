'use client';

import { useState } from 'react';

export default function FeedbackPage() {
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const response = await fetch('https://formspree.io/f/xgvygnkb', {
      method: 'POST',
      body: formData,
      headers: {
        Accept: 'application/json',
      },
    });

    if (response.ok) {
      setStatus('Thank you for your feedback!');
      form.reset();
    } else {
      setStatus('Oops! Something went wrong.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 p-6 text-white flex items-center justify-center">
      <div className="bg-white text-black p-8 rounded-xl shadow-xl w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">💬 We value your feedback!</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold">Your Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block font-semibold">Your Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block font-semibold">Your Feedback</label>
            <textarea
              name="message"
              rows={4}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded transition"
          >
            Submit
          </button>
        </form>
        {status && <p className="mt-4 text-center font-medium text-green-600">{status}</p>}
      </div>
    </div>
  );
}
