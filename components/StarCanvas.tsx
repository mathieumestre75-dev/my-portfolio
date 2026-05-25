'use client'

import { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'

interface Star {
  x: number
  y: number
  r: number
  opacity: number
}

interface ShootingStar {
  x: number
  y: number
  startTime: number
  duration: number
}

export default function StarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!mounted || resolvedTheme !== 'dark') return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const stars: Star[] = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1 + 0.5,
      opacity: Math.random() * 0.6 + 0.15,
    }))

    const shootingStars: ShootingStar[] = []
    let nextSpawn = performance.now() + 5000 + Math.random() * 3000
    let rafId: number

    function draw(t: number) {
      if (!canvas || !ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const s of stars) {
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${s.opacity})`
        ctx.fill()
      }

      if (t >= nextSpawn) {
        shootingStars.push({
          x: Math.random() * canvas.width * 0.7,
          y: Math.random() * canvas.height * 0.4,
          startTime: t,
          duration: 900,
        })
        nextSpawn = t + 5000 + Math.random() * 3000
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i]
        const p = (t - s.startTime) / s.duration
        if (p >= 1) { shootingStars.splice(i, 1); continue }

        const alpha = p < 0.4 ? p / 0.4 : p > 0.7 ? (1 - p) / 0.3 : 1
        const len = 80 * Math.min(p * 3, 1)
        const angle = Math.PI / 5

        const x2 = s.x + Math.cos(angle) * len
        const y2 = s.y + Math.sin(angle) * len
        const grad = ctx.createLinearGradient(s.x, s.y, x2, y2)
        grad.addColorStop(0, `rgba(255,255,255,0)`)
        grad.addColorStop(1, `rgba(255,255,255,${alpha * 0.9})`)

        ctx.beginPath()
        ctx.moveTo(s.x, s.y)
        ctx.lineTo(x2, y2)
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.5
        ctx.stroke()
      }

      rafId = requestAnimationFrame(draw)
    }

    rafId = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  }, [mounted, resolvedTheme])

  if (!mounted || resolvedTheme !== 'dark') return null

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}
