'use client'

import { useTheme } from 'next-themes'
import { useEffect, useMemo, useState } from 'react'

type Star = {
  id: number
  topPct: number
  leftPct: number
  width: number
  duration: number
  delay: number
  short: boolean
}

const COUNT = 13
const MIN_DIST = 7 // % units (Euclidean across mixed top/left axes)

function buildStars(count: number): Star[] {
  const stars: Star[] = []
  for (let attempt = 0; attempt < 3000 && stars.length < count; attempt++) {
    const topPct = -5 + Math.random() * 35
    const leftPct = -15 + Math.random() * 30
    const ok = stars.every((s) => {
      const dt = s.topPct - topPct
      const dl = s.leftPct - leftPct
      return Math.hypot(dt, dl) >= MIN_DIST
    })
    if (!ok) continue
    const idx = stars.length
    // First two stars get a negative delay so the animation is already mid-flight
    // when dark mode is toggled — visible immediately.
    const delay = idx < 2
      ? -(2 + Math.random() * 3)        // -2s to -5s
      : Math.random() * 20              // rest: random 0–20s
    stars.push({
      id: idx,
      topPct,
      leftPct,
      width: 70 + Math.floor(Math.random() * 91),
      duration: 9 + Math.random() * 5,
      delay,
      short: true,
    })
  }
  return stars
}

export default function ShootingStars() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setMounted(true)
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  const stars = useMemo(() => buildStars(COUNT), [])

  if (!mounted || resolvedTheme !== 'dark') return null

  return (
    <div style={{ opacity: visible ? 1 : 0, transition: 'opacity 200ms ease' }}>

      {stars.map((s) => (
        <div
          key={s.id}
          aria-hidden
          className="shooting-star"
          style={{
            position: 'fixed',
            top: `${s.topPct}%`,
            left: `${s.leftPct}%`,
            width: s.width,
            height: 1,
            borderRadius: 2,
            background:
              'linear-gradient(270deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0) 100%)',
            opacity: 0,
            transform: 'translate(0, 0) rotate(30deg)',
            transformOrigin: 'center',
            willChange: 'transform',
            pointerEvents: 'none',
            zIndex: 0,
            animation: `${s.short ? 'shooting-star-fly-short' : 'shooting-star-fly'} ${s.duration.toFixed(2)}s linear ${s.delay.toFixed(2)}s infinite`,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              width: 2,
              borderRadius: 1,
              background: 'rgba(255, 255, 255, 0.2)',
              boxShadow: 'rgba(255, 255, 255, 0.6) 0px 0px 6px 1px',
            }}
          />
        </div>
      ))}
    </div>
  )
}
