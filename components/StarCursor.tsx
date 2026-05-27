'use client'

import { useEffect, useRef, useState } from 'react'

const TRAIL_LENGTH = 30
const MAX_WIDTH = 6
const LERP = 0.1
const TRAIL_COLOR = 'rgb(255,211,115)'

export default function StarCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!mounted) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const setSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setSize()
    window.addEventListener('resize', setSize)

    let targetX = -200
    let targetY = -200
    let curX = -200
    let curY = -200

    const trail: { x: number; y: number }[] = Array.from(
      { length: TRAIL_LENGTH },
      () => ({ x: -200, y: -200 })
    )

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX
      targetY = e.clientY
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    let rafId: number

    function draw() {
      if (!canvas || !ctx) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      curX += (targetX - curX) * LERP
      curY += (targetY - curY) * LERP

      trail.shift()
      trail.push({ x: curX, y: curY })

      for (let i = 1; i < trail.length; i++) {
        const t0 = trail[i - 1]
        const t1 = trail[i]
        const progress = i / trail.length

        ctx.beginPath()
        ctx.moveTo(t0.x, t0.y)
        ctx.lineTo(t1.x, t1.y)
        ctx.strokeStyle = TRAIL_COLOR
        ctx.globalAlpha = progress * progress
        ctx.lineWidth = progress * MAX_WIDTH
        ctx.lineCap = 'round'
        ctx.stroke()
      }
      ctx.globalAlpha = 1

      rafId = requestAnimationFrame(draw)
    }

    rafId = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', setSize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [mounted])

  if (!mounted) return null

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    />
  )
}
