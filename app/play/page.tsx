'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

/* ═══════════════════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════════════════ */

interface CardData {
  id: string
  title: string
  video?: string
  bg?: string
  href?: string
  /** 'dark' = rgba(0,0,0,0.4) pill, 'light' = rgba(255,255,255,0.14) pill */
  pill: 'dark' | 'light'
}

const ROWS: CardData[][] = [
  /* ── Row 1 ────────────────────────────────────────────────────────────── */
  [
    {
      id: 'noto',
      title: 'Noto — 2024',
      video: 'https://framerusercontent.com/assets/vJartkUm1cgJd6nwHHK6tzamQ0.mp4',
      pill: 'dark',
      href: '/work/noto',
    },
    {
      id: 'omro',
      title: 'Omro — 2024',
      video: 'https://framerusercontent.com/assets/kxDBVRmfj6B5ABnEZZ6mkmxKmrg.mp4',
      pill: 'dark',
      href: '/work/omro',
    },
    {
      id: 'azure-iot',
      title: 'Azure IoT — 2023',
      video: 'https://framerusercontent.com/assets/oDc5CCQvvQoL6t8EpijysOmqemY.mp4',
      pill: 'light',
      href: '/work/azure-iot',
    },
  ],
  /* ── Row 2 ────────────────────────────────────────────────────────────── */
  [
    {
      id: 'motra',
      title: 'Motra — 2024',
      video: 'https://framerusercontent.com/assets/JqE2KiKbDDfKSaHI6MfBg8LJkwo.mp4',
      pill: 'dark',
      href: '/work/motra',
    },
    {
      id: 'nucleus',
      title: 'Nucleus — 2024',
      bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      pill: 'dark',
      href: '/work/nucleus',
    },
    {
      id: 'flowdesk',
      title: 'Flowdesk — 2024',
      bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      pill: 'dark',
      href: '/work/flowdesk',
    },
  ],
  /* ── Row 3 ────────────────────────────────────────────────────────────── */
  [
    {
      id: 'arcal',
      title: 'Arcal — 2023',
      bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      pill: 'light',
      href: '/work/arcal',
    },
    {
      id: 'meridian',
      title: 'Meridian — 2023',
      bg: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      pill: 'dark',
      href: '/work/meridian',
    },
    {
      id: 'uc-ds',
      title: 'UC Design System — 2025',
      bg: 'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)',
      pill: 'dark',
    },
  ],
  /* ── Row 4 ────────────────────────────────────────────────────────────── */
  [
    {
      id: 'motion-lab',
      title: 'Motion Lab — 2024',
      bg: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
      pill: 'dark',
    },
    {
      id: 'brand-audit',
      title: 'Brand Audit — 2024',
      bg: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      pill: 'light',
    },
    {
      id: 'type-study',
      title: 'Type Study — 2023',
      bg: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
      pill: 'light',
    },
  ],
  /* ── Row 5 ────────────────────────────────────────────────────────────── */
  [
    {
      id: 'illustration',
      title: 'Illustrations — 2023',
      bg: 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)',
      pill: 'dark',
    },
    {
      id: 'icon-system',
      title: 'Icon System — 2024',
      bg: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
      pill: 'dark',
    },
    {
      id: 'ambient-ui',
      title: 'Ambient UI — 2025',
      bg: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
      pill: 'dark',
    },
  ],
]

/** delay/duration pairs for 14 shooting stars */
const STARS: [number, number][] = [
  [1.5, 8], [0.2, 5.6], [0.6, 7], [0.2, 5.9],
  [2, 6], [2.4, 6], [3.2, 7.4], [1, 5],
  [1, 6], [3, 5.6], [2, 5.4], [5.4, 5.3],
  [2.3, 5.8], [5.4, 6],
]

const MONO: React.CSSProperties = {
  fontFamily: "'Spline Sans Mono', var(--font-spline-sans-mono), monospace",
  fontSize: 11.2,
  fontWeight: 400,
  letterSpacing: -0.224,
  lineHeight: '13.44px',
}

const LABEL: React.CSSProperties = {
  fontFamily: "'PP Neue Montreal Medium', sans-serif",
  fontSize: 12,
  fontWeight: 500,
  color: 'rgb(255,255,255)',
  letterSpacing: 0.096,
  lineHeight: '16.8px',
}

const EASE_SMOOTH: [number, number, number, number] = [0.44, 0, 0.56, 1]

const MARQUEE_TEXT = 'Elevator Music by Bobbing (feat. Nay Mapalo, Marcos Mena & Forrest Rice)'

/* ═══════════════════════════════════════════════════════════════════════════
   CURSOR TRAIL — canvas, rAF, physics-based
   ═══════════════════════════════════════════════════════════════════════════ */

function CursorTrail() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const c = ref.current
    if (!c) return
    const ctx = c.getContext('2d')
    if (!ctx) return

    let W = window.innerWidth
    let H = window.innerHeight
    c.width = W; c.height = H

    const trail: { x: number; y: number }[] = []
    let mx = -200, my = -200          // raw mouse
    let sx = -200, sy = -200          // smoothed head
    let vx = 0, vy = 0               // velocity for damping
    let visible = false
    let raf = 0

    const DAMPING = 0.7
    const SMOOTH  = 0.1
    const LEN     = 30
    const WIDTH   = 6

    const move = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; visible = true }
    const leave = () => { visible = false }
    const resize = () => { W = c.width = window.innerWidth; H = c.height = window.innerHeight }

    document.addEventListener('mousemove', move)
    document.addEventListener('mouseleave', leave)
    window.addEventListener('resize', resize)

    const tick = () => {
      ctx.clearRect(0, 0, W, H)

      // spring-damped follow
      const ax = (mx - sx) * SMOOTH
      const ay = (my - sy) * SMOOTH
      vx = (vx + ax) * DAMPING
      vy = (vy + ay) * DAMPING
      sx += vx; sy += vy

      if (visible) {
        trail.unshift({ x: sx, y: sy })
        if (trail.length > LEN) trail.pop()
      } else if (trail.length > 0) {
        trail.pop()
      }

      if (trail.length > 1) {
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        for (let i = 1; i < trail.length; i++) {
          const t = 1 - i / LEN
          ctx.beginPath()
          ctx.moveTo(trail[i - 1].x, trail[i - 1].y)
          ctx.lineTo(trail[i].x, trail[i].y)
          ctx.strokeStyle = `rgba(255,211,115,${t * 0.85})`
          ctx.lineWidth = Math.max(0.4, t * WIDTH)
          ctx.stroke()
        }
      }

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseleave', leave)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      style={{
        position: 'fixed', top: 0, left: 0,
        width: '100vw', height: '100vh',
        pointerEvents: 'none', zIndex: 9999,
      }}
    />
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   STAR FIELD — gradient sky, dot grid, horizon glow, shooting stars
   ═══════════════════════════════════════════════════════════════════════════ */

function StarField() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {/* Sky */}
      <div
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgb(10,10,10) 0%, rgb(44,49,77) 60.35%, rgb(81,81,112) 100%)',
        }}
      />
      {/* Dot grid */}
      <div
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(98,141,227,0.12) 0.5px, transparent 0.5px)',
          backgroundSize: '25px 25px',
        }}
      />
      {/* Horizon glow */}
      <div
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 500,
          background: 'linear-gradient(0deg, rgba(252,221,106,0.6) 0%, rgba(252,194,106,0.6) 5.97%, rgba(157,138,158,0.46) 27.12%, rgba(202,206,227,0.13) 41.41%, rgba(0,0,0,0) 100%)',
          opacity: 0.4,
        }}
      />
      {/* Shooting stars */}
      {STARS.map(([delay, duration], i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute', top: 0, left: 0,
            width: 100, height: 1, borderRadius: 2,
            rotate: 22.6,
            background: 'linear-gradient(270deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 100%)',
            willChange: 'transform, opacity',
          }}
          animate={{
            x: [780 + i * 40, -1200],
            y: [180 + (i % 7) * 60, 180 + (i % 7) * 60],
            opacity: [0, 0.85, 0.85, 0],
          }}
          transition={{
            repeat: Infinity,
            repeatDelay: 0,
            delay,
            duration,
            ease: [0.12, 0.23, 0.5, 1],
            type: 'tween',
            times: [0, 0.06, 0.88, 1],
          }}
        />
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   DARK CLOCK — Paris time
   ═══════════════════════════════════════════════════════════════════════════ */

function DarkClock() {
  const [time, setTime] = useState('')
  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString('en-US', {
          hour: 'numeric', minute: '2-digit', second: '2-digit',
          hour12: true, timeZone: 'Europe/Paris',
        }),
      )
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const s: React.CSSProperties = { ...MONO, color: 'rgba(255,255,255,0.35)', textAlign: 'right' as const }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-end' }}>
      <span style={s}>{time}</span>
      <span style={s}>PARIS, FR</span>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   MUSIC PLAYER — bottom-left bar
   ═══════════════════════════════════════════════════════════════════════════ */

function MusicPlayer() {
  return (
    <div
      style={{
        width: 230, height: 33,
        display: 'flex', alignItems: 'center', gap: 8,
        background: 'rgba(0,0,0,0.03)',
        backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
        borderRadius: 100,
        border: '1px solid rgba(255,255,255,0.05)',
        padding: '0 8px 0 8px',
        overflow: 'hidden',
        flexShrink: 0,
        cursor: 'none',
      }}
    >
      {/* Pulsing dot — outer ring + inner dot */}
      <div
        style={{
          width: 15, height: 15, borderRadius: '50%',
          background: 'rgba(255,95,51,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <motion.div
          animate={{ scale: [1, 1.35, 1] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF5F33' }}
        />
      </div>

      {/* PAUSED label */}
      <span
        style={{
          fontFamily: "'Spline Sans Mono', var(--font-spline-sans-mono), monospace",
          fontSize: 10, fontWeight: 500,
          color: 'rgba(255,255,255,0.45)',
          letterSpacing: '0.05em', lineHeight: 1,
          flexShrink: 0, width: 45,
        }}
      >
        PAUSED
      </span>

      {/* Divider */}
      <div style={{ width: 1, height: 13, background: 'rgba(255,255,255,0.15)', flexShrink: 0 }} />

      {/* Marquee */}
      <div style={{ flex: 1, overflow: 'clip', height: 31, display: 'flex', alignItems: 'center' }}>
        <motion.div
          style={{ display: 'flex', width: 'max-content' }}
          animate={{ x: [0, -420] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        >
          {[0, 1].map(n => (
            <span
              key={n}
              style={{
                ...LABEL, fontSize: 11, whiteSpace: 'nowrap',
                paddingRight: 40,
                color: 'rgba(255,255,255,0.6)',
              }}
            >
              {MARQUEE_TEXT}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   HOVER PREVIEW — bottom-left glass panel
   ═══════════════════════════════════════════════════════════════════════════ */

function HoverPreview({ card }: { card: CardData | null }) {
  return (
    <div
      style={{
        position: 'fixed', left: 20, bottom: 66,
        width: 160, minHeight: 140,
        borderRadius: 8,
        border: '1px solid rgba(255,255,255,0.06)',
        background: 'rgba(0,0,0,0.03)',
        backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 8,
        padding: '20px 14px',
        zIndex: 10, pointerEvents: 'none',
      }}
    >
      <span style={{ fontSize: 26, lineHeight: 1 }}>🪐✨</span>
      <span
        style={{
          ...LABEL, fontSize: 10,
          color: 'rgba(255,255,255,0.3)',
          fontStyle: 'italic',
          textAlign: 'center',
          transition: 'color 0.2s ease',
        }}
      >
        {card ? card.title : 'hover a project'}
      </span>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   PLAY CARD
   ═══════════════════════════════════════════════════════════════════════════ */

function PlayCard({
  card,
  onHover,
}: {
  card: CardData
  onHover: (c: CardData | null) => void
}) {
  const [hovered, setHovered] = useState(false)
  const router = useRouter()

  const pillBg = card.pill === 'dark' ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.14)'

  return (
    <motion.div
      style={{
        width: 344, height: 220,
        borderRadius: 8, overflow: 'clip',
        position: 'relative', cursor: 'none',
        backdropFilter: 'blur(5px)', WebkitBackdropFilter: 'blur(5px)',
        border: hovered ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(255,255,255,0.06)',
        background: card.bg ?? 'rgba(0,0,0,0.03)',
        willChange: 'transform',
        flexShrink: 0,
        transition: 'border-color 0.2s cubic-bezier(0.44,0,0.56,1)',
      }}
      whileHover={{ scale: 1.015, transition: { duration: 0.3, ease: EASE_SMOOTH } }}
      onMouseEnter={() => { setHovered(true); onHover(card) }}
      onMouseLeave={() => { setHovered(false); onHover(null) }}
      onClick={() => card.href && router.push(card.href)}
    >
      {/* Video / image fill */}
      {card.video && (
        <video
          src={card.video}
          autoPlay muted loop playsInline
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', borderRadius: 8,
            display: 'block',
          }}
        />
      )}

      {/* Label pill — fades up on hover */}
      <motion.div
        initial={false}
        animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 4 }}
        transition={{ duration: 0.2, ease: EASE_SMOOTH }}
        style={{
          position: 'absolute', bottom: 14, left: 14, right: 14,
          height: 29,
          backdropFilter: 'blur(7px)', WebkitBackdropFilter: 'blur(7px)',
          borderRadius: 5, background: pillBg,
          display: 'flex', alignItems: 'center', paddingLeft: 10, paddingRight: 10,
        }}
      >
        <span
          style={{
            ...LABEL,
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          }}
        >
          {card.title}
        </span>
      </motion.div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════════════════ */

export default function PlayPage() {
  const [hoveredCard, setHoveredCard] = useState<CardData | null>(null)
  const pathname = usePathname()

  /* Force cursor:none while on this page */
  useEffect(() => {
    const prev = document.body.style.cursor
    document.body.style.cursor = 'none'
    return () => { document.body.style.cursor = prev }
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#191413', position: 'relative', cursor: 'none' }}>

      <StarField />
      <CursorTrail />

      {/* ── Top nav ─────────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          padding: '20px 20px',
          display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
          zIndex: 10, pointerEvents: 'none',
        }}
      >
        {/* Left: name link */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ pointerEvents: 'auto' }}
        >
          <Link
            href="/"
            style={{ ...MONO, color: 'rgba(255,255,255,0.35)', textDecoration: 'none', cursor: 'none' }}
          >
            MATHIEU MESTRE
          </Link>
        </motion.div>

        {/* Center: kaomoji */}
        <motion.span
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            ...MONO, color: 'rgba(255,255,255,0.35)',
            position: 'absolute', top: 20, left: '50%', transform: 'translateX(-50%)',
          }}
        >
          (⁰▿⁰)◜✧˖°
        </motion.span>

        {/* Right: clock */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <DarkClock />
        </motion.div>
      </div>

      {/* ── Main grid ───────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'relative', zIndex: 1,
          display: 'flex', flexDirection: 'column', gap: 10,
          width: 1052, maxWidth: '100vw',
          margin: '0 auto',
          paddingTop: 140, paddingBottom: 100,
        }}
      >
        {ROWS.map((row, ri) => (
          <motion.div
            key={ri}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: 'spring', bounce: 0.2, duration: 0.4,
              delay: 0.08 + ri * 0.06,
            }}
            style={{
              display: 'flex', flexDirection: 'row', gap: 10,
              alignItems: 'center', justifyContent: 'center',
            }}
          >
            {row.map(card => (
              <PlayCard key={card.id} card={card} onHover={setHoveredCard} />
            ))}
          </motion.div>
        ))}
      </div>

      {/* ── Hover preview ───────────────────────────────────────────────── */}
      <HoverPreview card={hoveredCard} />

      {/* ── Bottom nav ──────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'fixed', bottom: 20, left: 0, right: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 20px', zIndex: 10,
        }}
      >
        {/* Music player left */}
        <MusicPlayer />

        {/* Nav links right */}
        <div style={{ display: 'flex', gap: 24 }}>
          {[
            { label: 'Work', href: '/work' },
            { label: 'Play', href: '/play' },
            { label: 'About', href: '/about' },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              style={{
                ...MONO,
                color: pathname === href ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.35)',
                textDecoration: 'none', cursor: 'none',
                transition: 'color 0.2s cubic-bezier(0.44,0,0.56,1)',
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
