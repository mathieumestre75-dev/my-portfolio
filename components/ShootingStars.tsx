'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

type Streak = {
  top: string
  left: string
  width: number
  height: number
  rotate: number
  duration: number
  delay: number
  animation: 'shooting-star' | 'shooting-star-alt'
}

const STREAKS: Streak[] = [
  { top: '5%',  left: '-5%',  width: 1.5, height: 100, rotate: -45, duration: 11, delay: 0,  animation: 'shooting-star' },
  { top: '-8%', left: '15%',  width: 1,   height: 90,  rotate: -45, duration: 13, delay: 3,  animation: 'shooting-star-alt' },
  { top: '12%', left: '-10%', width: 2,   height: 120, rotate: -45, duration: 10, delay: 6,  animation: 'shooting-star' },
  { top: '-5%', left: '40%',  width: 1,   height: 80,  rotate: -45, duration: 14, delay: 9,  animation: 'shooting-star-alt' },
]

export default function ShootingStars() {
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
        zIndex: 1,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {STREAKS.map((s, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: s.top,
            left: s.left,
            width: s.width,
            height: s.height,
            background:
              'linear-gradient(to bottom, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 100%)',
            opacity: 0,
            transformOrigin: 'center center',
            animation: `${s.animation} ${s.duration}s ${s.delay}s linear infinite`,
            ['--streak-rotate' as string]: `${s.rotate}deg`,
          }}
        />
      ))}
    </div>
  )
}
