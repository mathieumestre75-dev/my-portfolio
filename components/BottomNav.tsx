'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { springs } from '@/lib/springs'

const navLinks = [
  { href: '/', label: 'Work' },
  { href: '/play', label: 'Play' },
  { href: '/about', label: 'About' },
]

export default function BottomNav() {
  const pathname = usePathname()

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...springs.entrance, delay: 0.5 }}
      style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        zIndex: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        pointerEvents: 'auto',
      }}
    >
      {navLinks.map(({ href, label }) => {
        const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href)
        return (
          <Link
            key={href}
            href={href}
            style={{
              fontFamily: "'Spline Sans Mono', var(--font-spline-sans-mono), monospace",
              fontSize: 11.68,
              fontWeight: 400,
              color: 'var(--color-nav-link)',
              textDecoration: 'none',
              opacity: isActive ? 1 : 0.5,
              transition: 'color 0.2s cubic-bezier(0.44, 0, 0.56, 1), opacity 0.2s cubic-bezier(0.44, 0, 0.56, 1)',
              willChange: 'transform',
            }}
          >
            {label}
          </Link>
        )
      })}
    </motion.div>
  )
}
