'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import ClockWidget from '@/components/ClockWidget'
import GridBackground from '@/components/GridBackground'

/* Placeholder set — varied aspect ratios so the masonry reads as a
   real photo portfolio (mix of portrait, landscape, and square). When
   real photos are added, swap each item's `ratio` for an actual `src`
   without changing the layout. */
const PLACEHOLDERS: { id: string; ratio: number }[] = [
  { id: 'p01', ratio: 0.72 },  // tall portrait
  { id: 'p02', ratio: 1.50 },  // landscape
  { id: 'p03', ratio: 1.00 },  // square
  { id: 'p04', ratio: 0.80 },  // portrait
  { id: 'p05', ratio: 1.35 },  // landscape
  { id: 'p06', ratio: 0.66 },  // tall portrait
  { id: 'p07', ratio: 1.20 },  // wide-ish
  { id: 'p08', ratio: 0.85 },  // portrait
  { id: 'p09', ratio: 1.00 },  // square
  { id: 'p10', ratio: 1.55 },  // landscape
  { id: 'p11', ratio: 0.75 },  // portrait
  { id: 'p12', ratio: 1.30 },  // landscape
]

const CARD_KEYFRAME = `@keyframes photo-rise { from { opacity:0; transform:translateY(28px) } to { opacity:1; transform:translateY(0) } }`

const monoStyle: React.CSSProperties = {
  fontFamily: "'Spline Sans Mono', var(--font-spline-sans-mono), monospace",
  fontSize: 11.2,
  fontWeight: 400,
  lineHeight: '13.44px',
  color: 'var(--color-text-secondary)',
}

function PhotoTile({ ratio, index }: { ratio: number; index: number }) {
  const delay = `${(0.1 + index * 0.05).toFixed(2)}s`
  return (
    <div
      style={{
        breakInside: 'avoid',
        marginBottom: 10,
        animation: `photo-rise 1s cubic-bezier(0.25,0.46,0.45,0.94) ${delay} both`,
      }}
    >
      <div
        aria-hidden
        style={{
          width: '100%',
          aspectRatio: String(ratio),
          borderRadius: 8,
          background: 'var(--color-card-bg)',
          border: '1px solid var(--color-card-border)',
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
        }}
      />
    </div>
  )
}

export default function Photography() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const isDark = mounted && resolvedTheme === 'dark'

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-page-bg)', position: 'relative' }}>
      <style>{CARD_KEYFRAME}</style>

      {/* Grid background — same opacity treatment as /work */}
      <div aria-hidden style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.65 }}>
        <GridBackground />
      </div>

      {/* Top color wash — light mode only (matches /work and /about). */}
      {!isDark && (
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 101,
            background: 'linear-gradient(180deg, rgba(217,235,252,0.46) 0%, rgba(255,235,242,0.32) 27.9%, rgba(255,249,242,0.53) 62.25%, rgba(252,252,252,0) 100%)',
            maskImage: 'linear-gradient(to right, transparent 0%, black 30%, black 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 30%, black 100%)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      )}

      {/* Bottom color wash — light mode only, mirrors top via 0deg. */}
      {!isDark && (
        <div
          aria-hidden
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 101,
            background: 'linear-gradient(0deg, rgba(217,235,252,0.46) 0%, rgba(255,235,242,0.32) 27.9%, rgba(255,249,242,0.53) 62.25%, rgba(252,252,252,0) 100%)',
            maskImage: 'linear-gradient(to right, transparent 0%, black 30%, black 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 30%, black 100%)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      )}

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1500, margin: '0 auto', padding: '0 20px 120px' }}>

        {/* Top bar — matches /work */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          style={{
            paddingTop: 20,
            paddingBottom: 16,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}
        >
          <Link href="/" style={{ textDecoration: 'none', display: 'block' }}>
            <span style={{ ...monoStyle, cursor: 'pointer' }}>MATHIEU MESTRE</span>
          </Link>
          <ClockWidget />
        </motion.div>

        {/* Title block — same rhythm as /work's intro */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.08 }}
          style={{ padding: '24px 0 28px' }}
        >
          <p style={{
            fontFamily: "'P22 Mackinac Medium', sans-serif",
            fontSize: 14,
            fontWeight: 500,
            color: 'var(--color-text-primary)',
            marginBottom: 6,
          }}>
            A personal selection of analog photography taken along the years.
          </p>
          <p style={monoStyle}>35mm — film</p>
        </motion.div>

        {/* Masonry — CSS columns so portraits and landscapes flow naturally
           and the layout reads as a real photo portfolio rather than a grid. */}
        <div style={{ columnCount: 3, columnGap: 10 }}>
          {PLACEHOLDERS.map((p, i) => (
            <PhotoTile key={p.id} ratio={p.ratio} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
