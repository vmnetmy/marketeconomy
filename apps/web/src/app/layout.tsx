import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import { Footer } from '../components/site/Footer'
import { Header } from '../components/site/Header'
import { getFooter, getHeader, getSiteSettings } from '../lib/cms'

import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Network for Market Economy',
  description: 'Advancing free market principles and open, rules-based trade.',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [site, header, footer] = await Promise.all([getSiteSettings(), getHeader(), getFooter()])

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header site={site} navItems={header?.navItems} />
        {children}
        <Footer footer={footer} site={site} />
      </body>
    </html>
  )
}
