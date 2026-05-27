'use client'

import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'

export default function GridBackground() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (mounted && resolvedTheme === 'dark') return null

  const fade = 'rgb(252,252,252)'

  return (
    <div aria-hidden style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      {/* Grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgb(252, 252, 252)',
          backgroundImage: `
            linear-gradient(rgba(98, 141, 227, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(98, 141, 227, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
        }}
      />
      {/* Edge fades */}
      <div style={{ position: 'absolute', inset: 0, bottom: 'auto', height: 160, background: `linear-gradient(to bottom, ${fade} 30%, transparent)` }} />
      <div style={{ position: 'absolute', inset: 0, top: 'auto', height: 160, background: `linear-gradient(to top, ${fade} 30%, transparent)` }} />
      <div style={{ position: 'absolute', inset: 0, right: 'auto', width: 200, background: `linear-gradient(to right, ${fade} 40%, transparent)` }} />
      <div style={{ position: 'absolute', inset: 0, left: 'auto', width: 160, background: `linear-gradient(to left, ${fade} 30%, transparent)` }} />
    </div>
  )
}
