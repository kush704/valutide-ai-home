'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Your 24/7 commerce brain with law updates, AI news, and more."
        />
        <title>ValuCommerce AI</title>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>

      <body className={`${inter.className} bg-gradient-to-br from-[#f0f9ff] via-white to-[#e0f7fa] text-gray-800`}>
        <SessionProvider>
          {children}
          <Analytics />
          <SpeedInsights />
        </SessionProvider>
      </body>
    </html>
  );
}

