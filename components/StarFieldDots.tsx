'use client'

import { useTheme } from 'next-themes'
import { useEffect, useMemo, useState } from 'react'

const DOT_COUNT = 1000
const FIELD_W = 1920
const FIELD_H = 1080

function buildShadows(count: number): string {
  const parts: string[] = []
  // Hard cap: top 45% of field only — no stars below that line.
  const maxY = FIELD_H * 0.45
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * FIELD_W)
    const y = Math.floor(Math.random() * maxY)

    // Opacity: 70% dim (0.15), 20% mid (0.35), 10% bright (0.6).
    const opRoll = Math.random()
    const a = opRoll < 0.7 ? '0.15' : opRoll < 0.9 ? '0.35' : '0.6'

    // Size via box-shadow spread on the 1×1 host: 80% 1px, 15% 1.5px, 5% 2px.
    const sizeRoll = Math.random()
    const spread = sizeRoll < 0.8 ? 0 : sizeRoll < 0.95 ? 0.25 : 0.5

    parts.push(`${x}px ${y}px 0 ${spread}px rgba(255, 255, 255, ${a})`)
  }
  return parts.join(', ')
}

export default function StarFieldDots() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(t)
  }, [])

  const shadows = useMemo(() => buildShadows(DOT_COUNT), [])

  if (!mounted) return null

  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: -1,
        opacity: resolvedTheme === 'dark' ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 1,
          height: 1,
          borderRadius: '50%',
          background: 'transparent',
          boxShadow: shadows,
        }}
      />
    </div>
  )
}
