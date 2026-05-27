'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import ClockWidget from './ClockWidget'
import { springs } from '@/lib/springs'

const monoStyle: React.CSSProperties = {
  fontFamily: "'Spline Sans Mono', var(--font-spline-sans-mono), monospace",
  fontSize: 11.2,
  fontWeight: 400,
  lineHeight: '13.44px',
  color: 'var(--color-text-secondary)',
}

export default function HomeTopBar() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        padding: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        zIndex: 10,
        pointerEvents: 'none',
      }}
    >
      {/* Left: empty placeholder for layout balance */}
      <div />

      {/* Right: Clock + Toggle */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ...springs.entrance, delay: 0.3 }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: 10,
          pointerEvents: 'auto',
        }}
      >
        <ClockWidget />
      </motion.div>
    </div>
  )
}
