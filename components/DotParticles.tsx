'use client'

import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'

export default function DotParticles() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (mounted && resolvedTheme === 'dark') return null

  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: 738,
        background: 'linear-gradient(0deg, rgba(217,235,252,0.46) 0%, rgba(255,235,242,0.32) 27.9%, rgba(255,249,242,0.53) 62.25%, rgba(252,252,252,0) 100%)',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    />
  )
}
