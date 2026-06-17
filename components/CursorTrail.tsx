'use client'

import { useTheme } from 'next-themes'
import { useEffect, useRef, useState } from 'react'

const TRAIL_COLOR = '#FCDD6A'
const TRAIL_LENGTH = 30
const TRAIL_WIDTH = 6
const SMOOTHNESS = 0.1
const DAMPING = 0.7

type State = {
  mouseX: number
  mouseY: number
  cursorX: number
  cursorY: number
  velocityX: number
  velocityY: number
  trailPoints: { x: number; y: number }[]
  cursorOpacity: number
  targetOpacity: number
}

export default function CursorTrail() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const stateRef = useRef<State>({
    mouseX: 0,
    mouseY: 0,
    cursorX: 0,
    cursorY: 0,
    velocityX: 0,
    velocityY: 0,
    trailPoints: [],
    cursorOpacity: 1,
    targetOpacity: 1,
  })

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!mounted || resolvedTheme !== 'dark') return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const state = stateRef.current
    const isCoarse = window.matchMedia('(pointer: coarse)').matches
    if (isCoarse) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()

    state.mouseX = window.innerWidth / 2
    state.mouseY = window.innerHeight / 2
    state.cursorX = state.mouseX
    state.cursorY = state.mouseY

    const onMove = (e: MouseEvent) => {
      state.mouseX = e.clientX
      state.mouseY = e.clientY
      state.targetOpacity = 1
    }
    const onLeave = () => {
      state.targetOpacity = 0
    }
    const onEnter = () => {
      state.targetOpacity = 1
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('resize', resize)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    const tick = () => {
      const ax = (state.mouseX - state.cursorX) * SMOOTHNESS
      const ay = (state.mouseY - state.cursorY) * SMOOTHNESS
      state.velocityX = DAMPING * state.velocityX + ax
      state.velocityY = DAMPING * state.velocityY + ay
      state.cursorX += state.velocityX
      state.cursorY += state.velocityY

      state.trailPoints.push({ x: state.cursorX, y: state.cursorY })
      if (state.trailPoints.length > TRAIL_LENGTH) state.trailPoints.shift()

      state.cursorOpacity += (state.targetOpacity - state.cursorOpacity) * 0.1

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < state.trailPoints.length - 1; i++) {
        const p1 = state.trailPoints[i]
        const p2 = state.trailPoints[i + 1]
        const t = (i + 1) / state.trailPoints.length
        const alpha = t * state.cursorOpacity
        ctx.strokeStyle = hexToRgba(TRAIL_COLOR, alpha)
        ctx.lineWidth = TRAIL_WIDTH * t
        ctx.lineCap = 'round'
        ctx.beginPath()
        ctx.moveTo(p1.x, p1.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.stroke()
      }

      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', resize)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      state.trailPoints = []
    }
  }, [mounted, resolvedTheme])

  if (!mounted || resolvedTheme !== 'dark') return null

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  )
}

function hexToRgba(hex: string, alpha: number) {
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
