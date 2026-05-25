'use client'

import { motion } from 'framer-motion'
import { springs } from '@/lib/springs'

const MARQUEE_WIDTH = 737

export default function MusicBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...springs.drag, delay: 0.6 }}
      style={{
        position: 'fixed',
        bottom: 20,
        left: 20,
        zIndex: 50,
        width: 230,
        height: 33,
        pointerEvents: 'none',
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
            background: 'rgb(200, 220, 232)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: 'rgb(255, 80, 80)',
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
          PAUSED
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
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          >
            {[0, 1].map(n => (
              <span
                key={n}
                style={{
                  whiteSpace: 'nowrap',
                  paddingRight: 32,
                  fontFamily: "'PP Neue Montreal Medium', sans-serif",
                  fontSize: 11,
                  color: 'rgba(0, 0, 0, 0.75)',
                }}
              >
                <span style={{ fontWeight: 500 }}>Elevator Music</span>
                <span style={{ opacity: 0.5, fontWeight: 400 }}>
                  {' '}by Bobbing (feat. Nay Mapalo, Marcos Mena &amp; Forrest Rice) —{' '}
                </span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
