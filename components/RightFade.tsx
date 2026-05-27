'use client'

import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'

export default function RightFade() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  // In dark mode Elisha hides this fade (opacity 0) — bg image handles the look
  if (mounted && resolvedTheme === 'dark') return null

  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: 594,
        height: '100%',
        background: 'linear-gradient(90deg, rgb(252, 252, 252) 0%, transparent 100%)',
        zIndex: 3,
        pointerEvents: 'none',
        overflow: 'clip',
      }}
    />
  )
}
