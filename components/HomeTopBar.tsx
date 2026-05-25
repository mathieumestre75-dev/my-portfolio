'use client'

import { motion } from 'framer-motion'
import ClockWidget from './ClockWidget'
import { springs } from '@/lib/springs'

const monoStyle: React.CSSProperties = {
  fontFamily: "'Spline Sans Mono', var(--font-spline-sans-mono), monospace",
  fontSize: 11.2,
  fontWeight: 400,
  lineHeight: '13.44px',
  color: 'rgba(0, 0, 0, 0.35)',
}

export default function HomeTopBar() {
  return (
    <div
      style={{
        position: 'absolute',
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
      {/* Name — top-left */}
      <motion.a
        href="/"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ...springs.entrance, delay: 0.1 }}
        style={{
          ...monoStyle,
          textDecoration: 'none',
          pointerEvents: 'auto',
          position: 'absolute',
          top: 20,
          left: 20,
        }}
      >
        MATHIEU MESTRE
      </motion.a>

      {/* Kaomoji — top-center */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ...springs.entrance, delay: 0.2 }}
        style={{
          ...monoStyle,
          position: 'absolute',
          top: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          letterSpacing: -0.224,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
        }}
      >
        (⁰▿⁰)◜✧˖°
      </motion.div>

      {/* Clock — top-right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ...springs.entrance, delay: 0.3 }}
        style={{
          pointerEvents: 'none',
          position: 'absolute',
          top: 20,
          right: 20,
        }}
      >
        <ClockWidget />
      </motion.div>
    </div>
  )
}
