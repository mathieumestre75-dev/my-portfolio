import type { Metadata } from 'next'
import { Caveat, Spline_Sans_Mono } from 'next/font/google'
import './globals.css'

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-caveat',
  display: 'swap',
})

const splineSansMono = Spline_Sans_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-spline-sans-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Mathieu Mestre',
  description: 'Designer orbiting vision, craft, & curiosity.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${caveat.variable} ${splineSansMono.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
