// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ValuCommerce AI',
  description: 'Your 24/7 commerce brain with law updates, AI news, and more.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-[#f0f9ff] via-white to-[#e0f7fa] text-gray-800`}>
        {children}
      </body>
    </html>
  )
}
