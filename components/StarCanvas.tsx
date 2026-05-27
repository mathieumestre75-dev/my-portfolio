'use client'

import { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'

// 22.6deg — stars sweep right-to-left and slightly downward
const ANGLE_RAD = (22.6 * Math.PI) / 180
const DX = -Math.cos(ANGLE_RAD) // ≈ -0.922 (leftward)
const DY = Math.sin(ANGLE_RAD)  // ≈ 0.384  (downward in canvas coords)

interface ShootingStar {
  startX: number
  startY: number
  startTime: number
  duration: number
}

function buildStarGrid(w: number, h: number): HTMLCanvasElement {
  const gc = document.createElement('canvas')
  gc.width = w
  gc.height = h
  const gctx = gc.getContext('2d')!
  gctx.fillStyle = 'rgba(98,141,227,0.12)'
  for (let x = 12; x < w; x += 24) {
    for (let y = 12; y < h; y += 24) {
      gctx.beginPath()
      gctx.arc(x, y, 0.5, 0, Math.PI * 2)
      gctx.fill()
    }
  }
  return gc
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

    let gridCanvas: HTMLCanvasElement

    const setSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      gridCanvas = buildStarGrid(canvas.width, canvas.height)
    }
    setSize()
    window.addEventListener('resize', setSize)

    // 14 shooting stars with exact spec timing [delay, duration] in seconds
    const STAR_TIMING: [number, number][] = [
      [1.5, 8], [0.2, 5.6], [0.6, 7], [0.2, 5.9], [2, 6], [2.4, 6], [3.2, 7.4],
      [1, 5], [1, 6], [3, 5.6], [2, 5.4], [5.4, 5.3], [2.3, 5.8], [5.4, 6],
    ]
    const REPEAT_DELAY = 1250 // 1–1.5s average
    const now = performance.now()
    const slots = STAR_TIMING.map(([delay, dur]) => ({
      nextSpawn: now + delay * 1000,
      duration: dur * 1000,
      cycle: dur * 1000 + REPEAT_DELAY,
    }))
    const shooting: ShootingStar[] = []

    function spawn(t: number, dur: number) {
      const w = canvas!.width
      const h = canvas!.height
      shooting.push({
        startX: w * 0.5 + Math.random() * w * 0.5,
        startY: Math.random() * h * 0.45,
        startTime: t,
        duration: dur,
      })
    }

    let rafId: number

    function draw(t: number) {
      if (!canvas || !ctx) return
      const w = canvas.width
      const h = canvas.height

      // Background gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, h)
      bgGrad.addColorStop(0, 'rgb(10,10,10)')
      bgGrad.addColorStop(0.60348, 'rgb(44,49,77)')
      bgGrad.addColorStop(1, 'rgb(81,81,112)')
      ctx.fillStyle = bgGrad
      ctx.fillRect(0, 0, w, h)

      // Star grid (pre-rendered offscreen)
      if (gridCanvas) ctx.drawImage(gridCanvas, 0, 0)

      // Aurora glow at bottom (opacity 0.4)
      const aGrad = ctx.createLinearGradient(0, h, 0, 0)
      aGrad.addColorStop(0, 'rgba(252,221,106,0.6)')
      aGrad.addColorStop(0.0597, 'rgba(252,194,106,0.6)')
      aGrad.addColorStop(0.2712, 'rgba(157,138,158,0.46)')
      aGrad.addColorStop(0.4141, 'rgba(202,206,227,0.13)')
      aGrad.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.save()
      ctx.globalAlpha = 0.4
      ctx.fillStyle = aGrad
      ctx.fillRect(0, 0, w, h)
      ctx.restore()

      // Spawn slots
      for (let i = 0; i < slots.length; i++) {
        const s = slots[i]
        if (t >= s.nextSpawn) {
          spawn(t, s.duration)
          s.nextSpawn = t + s.cycle
        }
      }

      // Draw shooting stars
      for (let i = shooting.length - 1; i >= 0; i--) {
        const s = shooting[i]
        const p = (t - s.startTime) / s.duration
        if (p >= 1) { shooting.splice(i, 1); continue }

        // Fade: in over first 10%, out over last 20%
        const alpha = p < 0.1 ? p / 0.1 : p > 0.8 ? (1 - p) / 0.2 : 1

        const TRAIL = 120
        const travel = p * w * 0.5
        const hx = s.startX + DX * travel
        const hy = s.startY + DY * travel
        const tx = hx - DX * TRAIL
        const ty = hy - DY * TRAIL

        // Head bright → tail transparent
        const grad = ctx.createLinearGradient(hx, hy, tx, ty)
        grad.addColorStop(0, `rgba(255,255,255,${(alpha * 0.6).toFixed(3)})`)
        grad.addColorStop(1, 'rgba(255,255,255,0)')

        ctx.save()
        ctx.shadowColor = 'rgba(255,255,255,0.4)'
        ctx.shadowBlur = 2
        ctx.beginPath()
        ctx.moveTo(tx, ty)
        ctx.lineTo(hx, hy)
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.2
        ctx.stroke()
        ctx.restore()
      }

      rafId = requestAnimationFrame(draw)
    }

    rafId = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', setSize)
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
        zIndex: 2,
        pointerEvents: 'none',
      }}
    />
  )
}
