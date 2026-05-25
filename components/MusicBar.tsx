'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { springs } from '@/lib/springs'

const MARQUEE_TEXT = 'Elevator Music by Bobbir'
const MARQUEE_WIDTH = 400

export default function MusicBar() {
  const [playing, setPlaying] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...springs.drag, delay: 0.6 }}
      onClick={() => setPlaying(p => !p)}
      style={{
        position: 'fixed',
        bottom: 20,
        left: 20,
        zIndex: 50,
        width: 230,
        height: 33,
        cursor: 'pointer',
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.03)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderRadius: 100,
          padding: '0 12px 0 8px',
          border: '1px solid rgba(255, 255, 255, 0.05)',
        }}
      >
        {/* Status dot */}
        <div
          style={{
            width: 15,
            height: 15,
            borderRadius: '50%',
            background: 'rgba(255, 95, 51, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <motion.div
            animate={playing ? { scale: [1, 1.3, 1] } : { scale: 1 }}
            transition={playing ? { duration: 1.2, repeat: Infinity, ease: 'easeInOut' } : {}}
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#FF5F33',
            }}
          />
        </div>

        {/* Status text */}
        <span
          style={{
            fontFamily: "'Spline Sans Mono', var(--font-spline-sans-mono), monospace",
            fontSize: 10,
            fontWeight: 500,
            color: 'rgba(0, 0, 0, 0.45)',
            letterSpacing: '0.05em',
            lineHeight: 1,
            flexShrink: 0,
            width: 45,
            height: 12,
          }}
        >
          {playing ? 'PLAYING' : 'PAUSED'}
        </span>

        {/* Divider */}
        <div
          style={{
            width: 1,
            height: 13,
            background: 'rgba(0, 0, 0, 0.15)',
            flexShrink: 0,
          }}
        />

        {/* Marquee */}
        <div style={{ width: 120, height: 31, overflow: 'clip', flexShrink: 0 }}>
          <motion.div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              width: 'max-content',
            }}
            animate={{ x: [0, -MARQUEE_WIDTH] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          >
            {[0, 1].map(n => (
              <span
                key={n}
                style={{
                  whiteSpace: 'nowrap',
                  paddingRight: 32,
                  fontFamily: "'PP Neue Montreal Medium', sans-serif",
                  fontSize: 11,
                  fontWeight: 500,
                  color: 'rgba(0, 0, 0, 0.75)',
                }}
              >
                {MARQUEE_TEXT}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
