'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Sun, LayoutGrid, Mail, Briefcase, Play, User } from 'lucide-react'
import { springs } from '@/lib/springs'

type Item =
  | { kind: 'copy'; label: string; icon: typeof Sun }
  | { kind: 'link'; href: string; label: string; icon: typeof Sun; active: boolean }

export default function DockNavigation() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [copied, setCopied] = useState(false)
  const pathname = usePathname()

  const leftItems: Item[] = [
    { kind: 'copy', label: copied ? 'Copied!' : 'Copy email', icon: Mail },
    { kind: 'link', href: '/', label: 'Home', icon: Sun, active: pathname === '/' },
    { kind: 'link', href: '/', label: 'Organized', icon: LayoutGrid, active: false },
  ]

  const rightItems: Item[] = [
    { kind: 'link', href: '/work', label: 'Work', icon: Briefcase, active: pathname.startsWith('/work') },
    { kind: 'link', href: '/', label: 'Play', icon: Play, active: false },
    { kind: 'link', href: '/about', label: 'About', icon: User, active: pathname === '/about' },
  ]

  const allItems = [...leftItems, null, ...rightItems]

  const handleCopy = () => {
    navigator.clipboard.writeText('mathieu.mestre@usercentrics.com').catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const renderIcon = (item: Item, i: number) => {
    const opacity = hoveredIndex === i ? 1 : 0.4
    const iconEl =
      item.kind === 'copy' ? (
        <button
          onClick={handleCopy}
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
            color: 'rgba(0,0,0,0.75)',
            opacity,
            transition: 'opacity 0.2s ease',
          }}
        >
          <item.icon size={16} strokeWidth={1.5} />
        </button>
      ) : (
        <Link
          href={item.href}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 20,
            height: 20,
            color: 'rgba(0,0,0,0.75)',
            opacity: item.active ? 1 : opacity,
            transition: 'opacity 0.2s ease',
            textDecoration: 'none',
          }}
        >
          <item.icon size={16} strokeWidth={1.5} />
        </Link>
      )

    return (
      <div
        key={i}
        style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        onMouseEnter={() => setHoveredIndex(i)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <AnimatePresence>
          {hoveredIndex === i && (
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
                background: 'rgba(0, 0, 0, 0.6)',
                borderRadius: 6,
                padding: '4px 8px',
                fontFamily: "'Spline Sans Mono', var(--font-spline-sans-mono), monospace",
                fontSize: 11.68,
                fontWeight: 400,
                lineHeight: '14.016px',
                color: 'rgb(255, 255, 255)',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
                zIndex: 100,
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
          {iconEl}
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
        top: 542,
        left: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0px 20px 0px 280px',
        height: 40,
        zIndex: 10,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.3)',
          borderRadius: 1100,
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          boxShadow: 'rgba(79, 44, 9, 0.02) 0px 5px 25px 3px',
          padding: '10px 14px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 17.6,
          width: 240.188,
          height: 40,
          pointerEvents: 'auto',
        }}
      >
        {/* Left group */}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 14 }}>
          {leftItems.map((item, i) => renderIcon(item, i))}
        </div>

        {/* Divider */}
        <div style={{ width: 1, height: 12, background: 'rgba(0, 0, 0, 0.08)', flexShrink: 0 }} />

        {/* Right group */}
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 17.6 }}>
          {rightItems.map((item, i) => renderIcon(item, leftItems.length + 1 + i))}
        </div>
      </div>
    </motion.div>
  )
}
