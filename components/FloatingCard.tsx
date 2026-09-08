'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import TagChip from './TagChip'
import type { HomeProject } from '@/lib/projects'

interface FloatingCardProps {
  project: HomeProject
  positionStyle: React.CSSProperties
  onHover: (slug: string | null) => void
  isGrid?: boolean
  gridOffset?: { x: number; y: number }
  hoverRotate?: number
  gridHoverRotate?: number
}

// ─── Blob data for the animated gradient (Figma node 347-188028) ──────────────
// Positions as fractions of the original 1920×1080 frame.
// cx/cy = blob centre; rw/rh = blob half-dimensions as fraction of frame.
const GRADIENT_BLOBS = [
  { cx:.3125,cy:.4167,rw:.833,rh:1.11, col:'#1a1aab',op:.82,blur:439 },
  { cx:.7813,cy:.3704,rw:.938,rh:1.30, col:'#00c7f0',op:.68,blur:419 },
  { cx:.2344,cy:.7870,rw:.781,rh:1.20, col:'#6130e8',op:.90,blur:399 },
  { cx:.5208,cy:.4167,rw:.729,rh:1.02, col:'#7070ff',op:.76,blur:378 },
  { cx:.2865,cy:.7407,rw:.677,rh:.926, col:'#b030e8',op:.63,blur:358 },
  { cx:.6771,cy:.6481,rw:.625,rh:.926, col:'#1747f7',op:.84,blur:537 },
  { cx:.4167,cy:.3704,rw:.729,rh:1.11, col:'#4747f7',op:.70,blur:517 },
  { cx:.4688,cy:.4630,rw:.521,rh:.741, col:'#a1a1ff',op:.92,blur:496 },
  { cx:.6510,cy:.2315,rw:.469,rh:.648, col:'#8787ff',op:.78,blur:476 },
  { cx:.2344,cy:.5093,rw:.573,rh:.833, col:'#00a8c7',op:.65,blur:455 },
  { cx:.4688,cy:.3241,rw:.417,rh:.556, col:'#ccccff',op:.86,blur:435 },
  { cx:.2865,cy:.5093,rw:.365,rh:.463, col:'#8f21bf',op:.73,blur:414 },
  { cx:.7813,cy:.7870,rw:.625,rh:.833, col:'#381a99',op:.94,blur:394 },
  { cx:.1563,cy:.8333,rw:.521,rh:.741, col:'#2633cc',op:.80,blur:373 },
]

// Per-blob drift parameters — unique frequency + phase so they never sync
const DRIFT = GRADIENT_BLOBS.map((_, i) => ({
  ax: 0.05 + (i % 3) * 0.012,
  ay: 0.04 + (i % 4) * 0.010,
  fx: 0.7 + i * 0.11,
  fy: 0.6 + i * 0.09,
  ph: i * 0.57,
}))

function hexToRgb(hex: string): [number, number, number] {
  return [
    parseInt(hex.slice(1,3),16),
    parseInt(hex.slice(3,5),16),
    parseInt(hex.slice(5,7),16),
  ]
}

// Render gradient onto a tiny offscreen canvas, then upscale to display.
// The 6× upscale gives free bilinear smoothing — creamy, no visible edges.
const OFF = 6

function useAnimatedGradient(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  hoverRef: React.RefObject<boolean>,
  enabled: boolean,
  w: number,
  h: number,
) {
  useEffect(() => {
    if (!enabled) return
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width  = w
    canvas.height = h
    const ctx = canvas.getContext('2d')!
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'

    const offW = Math.max(1, Math.round(w / OFF))
    const offH = Math.max(1, Math.round(h / OFF))
    const off  = document.createElement('canvas')
    off.width  = offW
    off.height = offH
    const oc = off.getContext('2d')!

    let hp   = 0       // hoverProgress 0→1
    let drift = 0      // time accumulator
    let last  = performance.now()
    let raf   = 0

    function draw(now: number) {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now

      const isHov = hoverRef.current
      hp = isHov
        ? Math.min(1, hp + dt / 0.25)
        : Math.max(0, hp - dt / 0.4)

      if (hp > 0) drift += dt * hp

      // Smoothstep for creamy easing
      const t = hp * hp * (3 - 2 * hp)

      oc.fillStyle = '#2e26a6'
      oc.fillRect(0, 0, offW, offH)

      for (let i = 0; i < GRADIENT_BLOBS.length; i++) {
        const b = GRADIENT_BLOBS[i]
        const d = DRIFT[i]
        const cx = (b.cx + Math.sin(drift * d.fx + d.ph) * d.ax * t) * offW
        const cy = (b.cy + Math.cos(drift * d.fy + d.ph * 1.4) * d.ay * t) * offH
        const r  = Math.max(b.rw * offW, b.rh * offH) * 0.9
        const [R,G,B] = hexToRgb(b.col)
        const gr = oc.createRadialGradient(cx, cy, 0, cx, cy, r)
        gr.addColorStop(0,    `rgba(${R},${G},${B},${b.op})`)
        gr.addColorStop(0.45, `rgba(${R},${G},${B},${+(b.op*.3).toFixed(3)})`)
        gr.addColorStop(1,    `rgba(${R},${G},${B},0)`)
        oc.fillStyle = gr
        oc.fillRect(0, 0, offW, offH)
      }

      ctx.drawImage(off, 0, 0, w, h)
      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(raf)
  }, [enabled, canvasRef, hoverRef, w, h])
}

export default function FloatingCard({ project, positionStyle, onHover, isGrid = false, gridOffset, hoverRotate = 0, gridHoverRotate }: FloatingCardProps) {
  const [isDragging, setIsDragging]   = useState(false)
  const [isHovered,  setIsHovered]    = useState(false)
  const videoRef         = useRef<HTMLVideoElement>(null)
  const gradientCanvas   = useRef<HTMLCanvasElement>(null)
  const gradientHoverRef = useRef<boolean>(false)
  const router = useRouter()

  const { zIndex: rowZIndex, ...posRest } = positionStyle as React.CSSProperties & { zIndex?: number }

  // Card inner media area: 386px − 2×8px padding = 370×245
  useAnimatedGradient(gradientCanvas, gradientHoverRef, !!project.animatedGradient, 370, 245)

  return (
    <motion.div
      style={{
        position: 'absolute',
        width: 386,
        height: 261,
        cursor: isDragging ? 'grabbing' : 'pointer',
        zIndex: isGrid ? 1 : (isHovered ? 20 : (rowZIndex ?? project.zIndex)),
        ...posRest,
      }}
      initial={{ x: project.initialX, y: project.initialY, rotate: project.initialRotate, opacity: 0 }}
      animate={{
        x: isGrid ? (gridOffset?.x ?? 0) : 0,
        y: isGrid ? (gridOffset?.y ?? 0) : 0,
        rotate: 0,
        opacity: 1,
      }}
      transition={{ type: 'spring', stiffness: 160, damping: 22, mass: 1, delay: project.animDelay * 0.6 }}
      drag={!isGrid}
      dragConstraints={{ top: -30, bottom: 30, left: -30, right: 30 }}
      dragElastic={0.12}
      dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
      whileDrag={{ scale: 1.04 }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setTimeout(() => setIsDragging(false), 50)}
      onMouseEnter={() => {
        setIsHovered(true)
        onHover(project.slug)
        gradientHoverRef.current = true
        videoRef.current?.play()
      }}
      onMouseLeave={() => {
        setIsHovered(false)
        onHover(null)
        gradientHoverRef.current = false
        if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0 }
      }}
      onClick={() => { if (!isDragging) router.push(`/work/${project.slug}`) }}
    >
      {/* Card shell */}
      <div
        style={{
          background: 'var(--color-card-bg)',
          border: '1px solid var(--color-card-border)',
          borderRadius: 12,
          backdropFilter: 'blur(var(--card-backdrop-blur))',
          WebkitBackdropFilter: 'blur(var(--card-backdrop-blur))',
          padding: 8,
          width: '100%',
          height: '100%',
          transform: isHovered ? `rotate(${isGrid && gridHoverRotate !== undefined ? gridHoverRotate : hoverRotate}deg)` : 'none',
          boxShadow: isHovered ? 'var(--card-shadow-hover)' : 'none',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        {/* Media area */}
        <div
          style={{
            borderRadius: 8,
            overflow: 'clip',
            width: '100%',
            height: '100%',
            background: project.gradient,
            position: 'relative',
          }}
        >
          {/* Animated gradient canvas — Omro card only */}
          {project.animatedGradient && (
            <canvas
              ref={gradientCanvas}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
            />
          )}

          {/* Static image — other cards */}
          {project.cardImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.cardImage}
              alt=""
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          )}

          {/* Logo overlay — fades in on hover */}
          {project.cardLogo && (
            <>
              <style>{`
                @keyframes card-logo-in {
                  from { opacity:0; transform:scale(.94) translateY(8px); filter:blur(10px); }
                  to   { opacity:1; transform:scale(1) translateY(0); filter:blur(0); }
                }
              `}</style>
              <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:'70%', pointerEvents:'none' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.cardLogo}
                  alt={project.client}
                  style={{
                    width: '100%', height: 'auto', display: 'block',
                    opacity: isHovered ? 1 : 0,
                    animation: isHovered ? 'card-logo-in 0.7s cubic-bezier(0.22,1,0.36,1) forwards' : 'none',
                  }}
                />
              </div>
            </>
          )}

          {/* Video — other cards */}
          {project.video && (
            <>
              <video
                ref={videoRef}
                src={project.video}
                muted
                loop
                playsInline
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              {project.videoPoster && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={project.videoPoster}
                  alt=""
                  style={{
                    position: 'absolute', inset: 0,
                    width: '100%', height: '100%', objectFit: 'cover',
                    opacity: isHovered ? 0 : 1,
                    transition: 'opacity 0.3s ease',
                    pointerEvents: 'none',
                  }}
                />
              )}
            </>
          )}

          {/* Title overlay (Noto only) */}
          {project.titleOverlay && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'Caveat', var(--font-caveat), sans-serif",
                fontSize: 72,
                fontWeight: 400,
                color: 'rgba(255, 255, 255, 0.9)',
                pointerEvents: 'none',
              }}
            >
              {project.titleOverlay}
            </div>
          )}

          {/* Tag chips — hidden until hover */}
          <motion.div
            style={{ position: 'absolute', bottom: 10, left: 10, display: 'flex', flexDirection: 'row', gap: 6 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {project.tags.map((tag, i) => (
              <TagChip key={i} label={tag} />
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
