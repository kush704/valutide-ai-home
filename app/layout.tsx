// app/layout.tsx
'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>ValuCommerce AI</title>
        <meta
          name="description"
          content="Your 24/7 commerce brain with law updates, AI news, and more."
        />
      </head>
      <body className={`${inter.className} bg-gradient-to-br from-[#f0f9ff] via-white to-[#e0f7fa] text-gray-800`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
