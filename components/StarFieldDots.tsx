'use client'

import { useTheme } from 'next-themes'
import { useEffect, useMemo, useState } from 'react'

const DOT_COUNT = 280
const FIELD_W = 1920
const FIELD_H = 1080

function buildShadows(count: number): string {
  const parts: string[] = []
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * FIELD_W)
    const y = Math.floor(Math.random() * FIELD_H)
    const a = (0.2 + Math.random() * 0.4).toFixed(2)
    parts.push(`${x}px ${y}px 0 0 rgba(255, 255, 255, ${a})`)
  }
  return parts.join(', ')
}

export default function StarFieldDots() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const shadows = useMemo(() => buildShadows(DOT_COUNT), [])

  if (!mounted || resolvedTheme !== 'dark') return null

  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: -1,
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
