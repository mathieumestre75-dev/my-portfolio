'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Sun, Moon, LayoutGrid, Copy, Mail, Home, Ghost, Notebook } from 'lucide-react'
import { springs } from '@/lib/springs'
import { useView } from '@/app/providers'
import { useTheme } from 'next-themes'

type Item =
  | { kind: 'theme'; label: string; icon: typeof Sun }
  | { kind: 'view'; label: string; icon: typeof Sun }
  | { kind: 'copy'; label: string; icon: typeof Sun }
  | { kind: 'link'; href: string; label: string; icon: typeof Sun; active: boolean }

export default function DockNavigation() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [copied, setCopied] = useState(false)
  const pathname = usePathname()
  const { view, setView } = useView()
  const { theme, setTheme } = useTheme()
  const isOrganized = view === 'organized'

  const items: Item[] = [
    { kind: 'theme', label: theme === 'dark' ? 'Light Mode' : 'Dark Mode', icon: theme === 'dark' ? Sun : Moon },
    { kind: 'view', label: isOrganized ? 'Scattered' : 'Organized', icon: LayoutGrid },
    { kind: 'copy', label: copied ? 'Copied!' : 'Copy email', icon: Mail },
  ]

  const navItems: Item[] = [
    { kind: 'link', href: '/', label: 'Home', icon: Home, active: pathname === '/' },
    { kind: 'link', href: '/work', label: 'Work', icon: Ghost, active: pathname.startsWith('/work') },
    { kind: 'link', href: '/about', label: 'About', icon: Notebook, active: pathname === '/about' },
  ]

  const handleCopy = () => {
    navigator.clipboard.writeText('mathieu.mestre@usercentrics.com').catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const renderIcon = (item: Item, i: number, offset = 0) => {
    const idx = offset + i
    const isActive = item.kind === 'link' ? item.active : false
    const opacity = isActive || hoveredIndex === idx ? 1 : 0.3

    return (
      <div
        key={idx}
        style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        onMouseEnter={() => setHoveredIndex(idx)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <AnimatePresence>
          {hoveredIndex === idx && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              style={{
                position: 'absolute',
                bottom: 'calc(100% + 8px)',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgb(255,95,51)',
                borderRadius: 100,
                padding: '6px 12px',
                fontFamily: "'Spline Sans Mono', var(--font-spline-sans-mono), monospace",
                fontSize: 11.68,
                color: '#fff',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
                zIndex: 100,
              }}
            >
              {item.label}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div whileHover={{ scale: 1.2 }} transition={{ duration: 0.15, ease: 'easeOut' }}>
          {item.kind === 'theme' && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              style={{
                background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 20, height: 20, color: 'var(--color-icon)',
                opacity,
                transition: 'opacity 0.2s ease, color 0.4s ease',
              }}
            >
              <item.icon size={16} strokeWidth={1.5} />
            </button>
          )}
          {item.kind === 'view' && (
            <button
              onClick={() => setView(view === 'scattered' ? 'organized' : 'scattered')}
              style={{
                background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 20, height: 20,
                color: isOrganized ? 'rgba(120, 120, 120, 0.85)' : 'var(--color-icon)',
                opacity: isOrganized || hoveredIndex === idx ? 1 : 0.3,
                transition: 'opacity 0.2s ease, color 0.2s ease',
              }}
            >
              {isOrganized ? <Copy size={16} strokeWidth={1.5} /> : <LayoutGrid size={16} strokeWidth={1.5} />}
            </button>
          )}
          {item.kind === 'copy' && (
            <button
              onClick={handleCopy}
              style={{
                background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 20, height: 20, color: 'var(--color-icon)',
                opacity,
                transition: 'opacity 0.2s ease, color 0.4s ease',
              }}
            >
              <item.icon size={16} strokeWidth={1.5} />
            </button>
          )}
          {item.kind === 'link' && (
            <Link
              href={item.href}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 20, height: 20, color: 'var(--color-icon)',
                opacity,
                transition: 'opacity 0.2s ease, color 0.4s ease',
              }}
            >
              <item.icon size={16} strokeWidth={1.5} />
            </Link>
          )}
        </motion.div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ ...springs.entrance, delay: 0.4 }}
      style={{
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        zIndex: 10,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          background: 'var(--color-dock-bg)',
          borderRadius: 1100,
          border: '1px solid var(--color-dock-border)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          boxShadow: '0px 5px 25px 3px rgba(79, 44, 9, 0.02)',
          transition: 'background 0.4s ease, border-color 0.4s ease',
          padding: '10px 14px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 14,
          height: 40,
          pointerEvents: 'auto',
        }}
      >
        {items.map((item, i) => renderIcon(item, i))}

        <div style={{ width: 1, height: 12, background: 'var(--color-dock-divider)', flexShrink: 0, transition: 'background 0.4s ease' }} />

        {navItems.map((item, i) => renderIcon(item, i, items.length + 1))}
      </div>
    </motion.div>
  )
}
