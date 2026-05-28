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
  const [hoveredKey, setHoveredKey] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const pathname = usePathname()
  const { view, setView } = useView()
  const { theme, setTheme } = useTheme()
  const isOrganized = view === 'organized'
  const isWorkPage = pathname.startsWith('/work')

  const allItems: Item[] = [
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

  const itemKey = (item: Item) => item.kind === 'link' ? `link-${(item as { href: string }).href}` : item.kind

  const renderIcon = (item: Item) => {
    const key = itemKey(item)
    const isActive = item.kind === 'link' ? item.active : false
    const isHovered = hoveredKey === key
    const opacity = isActive || isHovered ? 1 : 0.3

    return (
      <div
        style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        onMouseEnter={() => setHoveredKey(key)}
        onMouseLeave={() => setHoveredKey(null)}
      >
        <AnimatePresence>
          {isHovered && (
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
        <div style={{ display: 'flex', transform: isHovered ? 'scale(1.2)' : 'scale(1)', transition: 'transform 0.15s ease-out' }}>
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
                opacity: isOrganized || isHovered ? 1 : 0.3,
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
        </div>
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
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 280, damping: 30, mass: 1 }}
        style={{
          background: 'var(--color-dock-bg)',
          borderRadius: 1100,
          border: '1px solid var(--color-dock-border)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          boxShadow: '0px 5px 25px 3px rgba(79, 44, 9, 0.02)',
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
        {/* Sub-flex — gaps managed manually so width animation moves copy cleanly */}
        <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          {renderIcon(allItems[0])}

          {/* View icon: width animates 34→0 so copy slides as a natural flex item */}
          <motion.div
            initial={false}
            animate={{ width: isWorkPage ? 0 : 34 }}
            transition={{ type: 'spring', stiffness: 280, damping: 30, mass: 1 }}
            style={{ flexShrink: 0, display: 'flex', alignItems: 'center', pointerEvents: isWorkPage ? 'none' : 'auto' }}
          >
            <motion.div
              initial={false}
              animate={{ scale: isWorkPage ? 0 : 1, opacity: isWorkPage ? 0 : 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 24 }}
              style={{ paddingLeft: 14, flexShrink: 0, display: 'flex' }}
            >
              {renderIcon(allItems[1])}
            </motion.div>
          </motion.div>

          <div style={{ marginLeft: 14, display: 'flex', flexShrink: 0 }}>
            {renderIcon(allItems[2])}
          </div>
        </div>

        <div style={{ width: 1, height: 12, background: 'var(--color-dock-divider)', flexShrink: 0 }} />

        {navItems.map((item) => renderIcon(item))}
      </motion.div>
    </motion.div>
  )
}
