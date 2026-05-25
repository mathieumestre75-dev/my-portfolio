'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { usePathname } from 'next/navigation'
import { Sun, Moon, LayoutGrid, Mail, Home, User, Bookmark } from 'lucide-react'
import { useView } from '@/app/providers'

export default function Dock() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const { theme, setTheme } = useTheme()
  const { view, setView } = useView()
  const pathname = usePathname()

  const viewLabel = view === 'scattered' ? 'Organized' : 'Scattered'
  const isOrganized = view === 'organized'

  const items = [
    {
      kind: 'theme' as const,
      label: theme === 'dark' ? 'Light Mode' : 'Dark Mode',
      icon: theme === 'dark' ? Sun : Moon,
      active: false,
    },
    {
      kind: 'view' as const,
      label: viewLabel,
      icon: LayoutGrid,
      active: isOrganized,
    },
    {
      kind: 'link' as const,
      href: 'mailto:mathieumestre75@gmail.com',
      label: 'Contact',
      icon: Mail,
      active: false,
    },
    {
      kind: 'link' as const,
      href: '/',
      label: 'Home',
      icon: Home,
      active: pathname === '/',
    },
    {
      kind: 'link' as const,
      href: '/about',
      label: 'About',
      icon: User,
      active: pathname === '/about',
    },
    {
      kind: 'link' as const,
      href: '/work',
      label: 'Work',
      icon: Bookmark,
      active: pathname.startsWith('/work'),
    },
  ]

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 80,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 17.6,
          width: 'fit-content',
          height: 'auto',
          background: 'var(--dock-bg)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderRadius: 1100,
          border: '1px solid var(--dock-border)',
          boxShadow: 'var(--dock-shadow)',
          padding: '10px 14px',
        }}
      >
        {items.map((item, i) => (
          <div key={i} style={{ display: 'contents' }}>
            {/* Divider between Contact (2) and Home (3) */}
            {i === 3 && (
              <div style={{ width: 1, height: 12, background: 'rgba(0,0,0,0.08)', flexShrink: 0 }} />
            )}

            <div
              style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Tooltip */}
              <AnimatePresence>
                {hoveredIndex === i && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    style={{
                      position: 'absolute',
                      bottom: 'calc(100% + 8px)',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'rgb(255,95,51)',
                      borderRadius: 100,
                      padding: '6px 12px',
                      fontFamily: 'var(--font-spline-sans-mono)',
                      fontSize: 'calc(1rem * 0.73)',
                      letterSpacing: '-0.02em',
                      color: '#ffffff',
                      whiteSpace: 'nowrap',
                      pointerEvents: 'none',
                      zIndex: 1,
                    }}
                  >
                    {item.label}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
              >
                {item.kind === 'theme' && (
                  <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 20,
                      height: 20,
                      color: 'var(--fg)',
                      opacity: hoveredIndex === i ? 1 : 0.4,
                      transition: 'opacity 0.2s ease',
                    }}
                  >
                    <item.icon size={16} strokeWidth={1.5} />
                  </button>
                )}

                {item.kind === 'view' && (
                  <button
                    onClick={() => setView(view === 'scattered' ? 'organized' : 'scattered')}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 20,
                      height: 20,
                      color: 'var(--fg)',
                      opacity: item.active ? 1 : hoveredIndex === i ? 1 : 0.4,
                      transition: 'opacity 0.2s ease',
                    }}
                  >
                    <item.icon size={16} strokeWidth={1.5} />
                  </button>
                )}

                {item.kind === 'link' && (
                  <Link
                    href={item.href}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 20,
                      height: 20,
                      color: 'var(--fg)',
                      opacity: item.active ? 1 : hoveredIndex === i ? 1 : 0.4,
                      transition: 'opacity 0.2s ease',
                    }}
                  >
                    <item.icon size={16} strokeWidth={1.5} />
                  </Link>
                )}
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
