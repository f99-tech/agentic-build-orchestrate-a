import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Providers } from '@/components/attendhub/providers'
import './globals.css'

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

export const metadata: Metadata = {
  title: 'AttendHub — Role-based attendance',
  description:
    'AttendHub is a role-based access control (RBAC) attendance demo. Switch between manager, supervisor, and staff roles to see how visibility changes across check-ins, records, and people.',
  keywords: ['RBAC', 'attendance', 'role-based access control', 'check-in', 'workforce', 'demo'],
  authors: [{ name: 'AttendHub' }],
  openGraph: {
    title: 'AttendHub — Role-based attendance',
    description:
      'Switch between manager, supervisor, and staff roles to see how RBAC changes what you can view.',
    type: 'website',
    siteName: 'AttendHub',
  },
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  )
}
