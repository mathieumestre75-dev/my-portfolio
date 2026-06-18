'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function DarkBackgroundLayer() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted || resolvedTheme !== 'dark') return null

  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        zIndex: -1,
        pointerEvents: 'none',
        background:
          'linear-gradient(180deg, rgb(10, 10, 10) 0%, rgb(44, 49, 77) 60.35%, rgb(81, 81, 112) 100%)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 500,
          pointerEvents: 'none',
          opacity: 0.45,
          background:
            'linear-gradient(0deg, rgba(252, 221, 106, 0.6) 0%, rgba(252, 194, 106, 0.6) 5.97%, rgba(157, 138, 158, 0.46) 27.12%, rgba(202, 206, 227, 0.13) 41.41%, rgba(0, 0, 0, 0) 100%)',
        }}
      />
    </div>
  )
}
