'use client'

import { motion } from 'framer-motion'

const WORDS = ['Case Study', 'Product', 'Brand', 'Motion', 'Mobile', 'Research', 'Systems', 'Visual']

export default function FloatingLabels() {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        top: '40%',
        left: '-30%',
        width: '160%',
        zIndex: 2,
        pointerEvents: 'none',
        transform: 'rotate(22.6deg)',
        opacity: 0.22,
      }}
    >
      <div style={{ overflow: 'hidden' }}>
        <motion.div
          style={{
            display: 'flex',
            width: 'max-content',
            alignItems: 'center',
            fontFamily: "'Spline Sans Mono', var(--font-spline-sans-mono), monospace",
            fontSize: 11.2,
            fontWeight: 400,
            color: 'var(--color-text-secondary)',
            whiteSpace: 'nowrap',
          }}
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        >
          {[0, 1].map(copy => (
            <div key={copy} style={{ display: 'flex', alignItems: 'center' }}>
              {WORDS.map((word, i) => (
                <span key={i} style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ padding: '0 16px' }}>{word}</span>
                  <span style={{ opacity: 0.45 }}>·</span>
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
