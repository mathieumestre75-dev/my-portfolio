'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import ClockWidget from '@/components/ClockWidget'
import GridBackground from '@/components/GridBackground'

type Tab = 'photos' | 'inspirations'

type Photo = { id: string; ratio: number; src?: string; displayRatio?: number }

/* My Photos — film roll R1-08704 (36 frames, 35mm), scanner frame
   cropped out. Order mixes LP / LLP / LLLP chunks so the 3-column
   masonry has natural rhythm — varied, never a single orientation
   in a long run, but not metronome-predictable either. */
const PHOTOS: Photo[] = [
  { id: 'p0000', ratio: 1.501, src: '/photos/R1-08704-0000.JPG' },
  { id: 'p0001', ratio: 0.667, src: '/photos/R1-08704-0001.JPG' },
  { id: 'p0003', ratio: 1.501, src: '/photos/R1-08704-0003.JPG' },
  { id: 'p0004', ratio: 1.501, src: '/photos/R1-08704-0004.JPG' },
  { id: 'p0002', ratio: 0.667, src: '/photos/R1-08704-0002.JPG' },
  { id: 'p0005', ratio: 1.501, src: '/photos/R1-08704-0005.JPG' },
  { id: 'p0006', ratio: 1.501, src: '/photos/R1-08704-0006.JPG' },
  { id: 'p0010', ratio: 0.667, src: '/photos/R1-08704-0010.JPG' },
  { id: 'p0007', ratio: 1.501, src: '/photos/R1-08704-0007.JPG' },
  { id: 'p0008', ratio: 1.501, src: '/photos/R1-08704-0008.JPG' },
  { id: 'p0009', ratio: 1.501, src: '/photos/R1-08704-0009.JPG' },
  { id: 'p0013', ratio: 0.667, src: '/photos/R1-08704-0013.JPG' },
  { id: 'p0011', ratio: 1.501, src: '/photos/R1-08704-0011.JPG' },
  { id: 'p0017', ratio: 0.667, src: '/photos/R1-08704-0017.JPG' },
  { id: 'p0012', ratio: 1.501, src: '/photos/R1-08704-0012.JPG' },
  { id: 'p0014', ratio: 1.501, src: '/photos/R1-08704-0014.JPG' },
  { id: 'p0015', ratio: 1.501, src: '/photos/R1-08704-0015.JPG' },
  { id: 'p0018', ratio: 0.667, src: '/photos/R1-08704-0018.JPG' },
  { id: 'p0016', ratio: 1.501, src: '/photos/R1-08704-0016.JPG' },
  { id: 'p0019', ratio: 0.667, src: '/photos/R1-08704-0019.JPG' },
  { id: 'p0020', ratio: 1.501, src: '/photos/R1-08704-0020.JPG' },
  { id: 'p0022', ratio: 1.501, src: '/photos/R1-08704-0022.JPG' },
  { id: 'p0021', ratio: 0.667, src: '/photos/R1-08704-0021.JPG' },
  { id: 'p0023', ratio: 1.501, src: '/photos/R1-08704-0023.JPG' },
  { id: 'p0024', ratio: 1.501, src: '/photos/R1-08704-0024.JPG' },
  { id: 'p0027', ratio: 1.501, src: '/photos/R1-08704-0027.JPG' },
  { id: 'p0025', ratio: 0.667, src: '/photos/R1-08704-0025.JPG' },
  { id: 'p0028', ratio: 1.501, src: '/photos/R1-08704-0028.JPG' },
  { id: 'p0026', ratio: 0.667, src: '/photos/R1-08704-0026.JPG' },
  { id: 'p0029', ratio: 1.501, src: '/photos/R1-08704-0029.JPG' },
  { id: 'p0030', ratio: 1.501, src: '/photos/R1-08704-0030.JPG' },
  { id: 'p0031', ratio: 1.501, src: '/photos/R1-08704-0031.JPG' },
  { id: 'p0034', ratio: 0.667, src: '/photos/R1-08704-0034.JPG' },
  { id: 'p0032', ratio: 1.501, src: '/photos/R1-08704-0032.JPG' },
  { id: 'p0035', ratio: 0.667, src: '/photos/R1-08704-0035.JPG' },
  { id: 'p0033', ratio: 1.501, src: '/photos/R1-08704-0033.JPG' },
]

/* Inspirations — design references / posters I keep returning to.
   All portraits (ratios 0.67–0.84). Order alternates tall vs. wider
   portraits so the 3-column masonry has visible size rhythm without
   clustering similar heights side by side. */
const INSPIRATIONS: Photo[] = [
  { id: 'i-42c6a912', ratio: 0.673, src: '/inspirations/i-42c6a912.jpg' },
  { id: 'i-08a8fb3c', ratio: 1.598, src: '/inspirations/i-08a8fb3c.jpg' },
  { id: 'i-7c4eb8b5', ratio: 0.838, src: '/inspirations/i-7c4eb8b5.jpg' },
  { id: 'i-3613a696', ratio: 0.649, src: '/inspirations/i-3613a696.jpg' },
  { id: 'i-b29e2baa', ratio: 0.700, src: '/inspirations/i-b29e2baa.jpg' },
  { id: 'i-54d4d27f', ratio: 1.766, src: '/inspirations/i-54d4d27f.jpg' },
  { id: 'i-4f256aae', ratio: 0.812, src: '/inspirations/i-4f256aae.jpg' },
  { id: 'i-44a29719', ratio: 0.750, src: '/inspirations/i-44a29719.jpg' },
  { id: 'i-fd65770f', ratio: 0.707, src: '/inspirations/i-fd65770f.jpg' },
  { id: 'i-813d4f14', ratio: 0.811, src: '/inspirations/i-813d4f14.jpg' },
  { id: 'i-23d3b899', ratio: 0.800, src: '/inspirations/i-23d3b899.jpg' },
  { id: 'i-a0110c59', ratio: 1.049, src: '/inspirations/i-a0110c59.jpg' },
  { id: 'i-3e0e5b89', ratio: 0.771, src: '/inspirations/i-3e0e5b89.jpg' },
  { id: 'i-adb52e73', ratio: 1.425, src: '/inspirations/i-adb52e73.jpg' },
  { id: 'i-daad0cf3', ratio: 0.790, src: '/inspirations/i-daad0cf3.jpg' },
  { id: 'i-b38dd289', ratio: 1.158, src: '/inspirations/i-b38dd289.jpg' },
  { id: 'i-a139e400', ratio: 0.774, src: '/inspirations/i-a139e400.jpg' },
  { id: 'i-c94f104a', ratio: 0.786, src: '/inspirations/i-c94f104a.jpg' },
  { id: 'i-e4d86a35', ratio: 0.986, src: '/inspirations/i-e4d86a35.jpg' },
]

// Pre-computed column assignments.
// PHOTOS: exactly 8L+4P per column → identical column heights → mathematically flush bottom.
//   Portraits are grouped in pairs/bursts rather than evenly spaced, creating dramatic
//   contrast between tall portrait blocks and wide landscape runs across the three columns.
// INSPIRATIONS: hand-optimised so col pixel heights are 2982/2985/2979 at 400px col width
//   (6px max spread — the extra gap in the 7-item column is accounted for).
const _pm = Object.fromEntries(PHOTOS.map(p => [p.id, p]))
const _im = Object.fromEntries(INSPIRATIONS.map(p => [p.id, p]))
const pick = (map: Record<string, Photo>, ids: string[]) => ids.map(id => map[id])

// Col0: PP LLLL PP LLLL  Col1: LLLL PP LLLL PP  Col2: LL PP LL PP LLLL
const PHOTOS_C0 = pick(_pm, ['p0001','p0002','p0000','p0003','p0004','p0005','p0010','p0018','p0006','p0007','p0008','p0009'])
const PHOTOS_C1 = pick(_pm, ['p0011','p0012','p0014','p0015','p0013','p0017','p0016','p0020','p0022','p0023','p0019','p0025'])
const PHOTOS_C2 = pick(_pm, ['p0024','p0027','p0021','p0026','p0028','p0029','p0034','p0035','p0030','p0031','p0032','p0033'])

const INSP_C0 = pick(_im, ['i-23d3b899','i-a0110c59','i-daad0cf3','i-3e0e5b89','i-c94f104a','i-a139e400'])
const INSP_C1 = pick(_im, ['i-08a8fb3c','i-44a29719','i-adb52e73','i-4f256aae','i-3613a696','i-b38dd289','i-e4d86a35'])
const INSP_C2 = pick(_im, ['i-fd65770f','i-54d4d27f','i-b29e2baa','i-7c4eb8b5','i-42c6a912','i-813d4f14'])

const CARD_KEYFRAME = `@keyframes photo-rise { from { opacity:0; transform:translateY(28px) } to { opacity:1; transform:translateY(0) } }`

const monoStyle: React.CSSProperties = {
  fontFamily: "'Spline Sans Mono', var(--font-spline-sans-mono), monospace",
  fontSize: 11.2,
  fontWeight: 400,
  lineHeight: '13.44px',
  color: 'var(--color-text-secondary)',
}

function PhotoTile({ src, ratio, displayRatio }: { src?: string; ratio: number; displayRatio?: number }) {
  const ar = String(displayRatio ?? ratio)
  return (
    <div style={{ breakInside: 'avoid', marginBottom: 10 }}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          loading="lazy"
          style={{
            width: '100%',
            aspectRatio: ar,
            objectFit: 'cover',
            display: 'block',
            background: 'var(--color-card-bg)',
          }}
        />
      ) : (
        <div
          aria-hidden
          style={{
            width: '100%',
            aspectRatio: ar,
            background: 'var(--color-card-bg)',
            border: '1px solid var(--color-card-border)',
            backdropFilter: 'blur(5px)',
            WebkitBackdropFilter: 'blur(5px)',
          }}
        />
      )}
    </div>
  )
}

export default function Art() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const isDark = mounted && resolvedTheme === 'dark'

  const [tab, setTab] = useState<Tab>('photos')
  const cols = tab === 'photos'
    ? [PHOTOS_C0, PHOTOS_C1, PHOTOS_C2]
    : [INSP_C0, INSP_C1, INSP_C2]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-page-bg)', position: 'relative' }}>
      <style>{CARD_KEYFRAME}</style>

      {/* Grid background — same opacity as /work and /about */}
      <div aria-hidden style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.65 }}>
        <GridBackground />
      </div>

      {/* Top color wash — light mode only */}
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

      {/* Bottom color wash — light mode only */}
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

        {/* Top bar */}
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

        {/* Centered title + subtext */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.08 }}
          style={{ padding: '40px 0 20px', textAlign: 'center' }}
        >
          <p style={{
            fontFamily: "'P22 Mackinac Medium', sans-serif",
            fontSize: 14,
            fontWeight: 500,
            color: 'var(--color-text-primary)',
            marginBottom: 6,
          }}>
            Pictures I keep.
          </p>
          <p style={{ ...monoStyle, margin: 0 }}>
            My film photos and things I like looking at.
          </p>
        </motion.div>

        {/* Toggle — two mono labels with an active underline.
           Restrained, matches the portfolio's quiet typography. */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.16 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 28,
            padding: '0 0 40px',
          }}
        >
          {(['photos', 'inspirations'] as Tab[]).map((t) => {
            const isActive = tab === t
            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '4px 2px',
                  cursor: 'pointer',
                  fontFamily: "'Spline Sans Mono', var(--font-spline-sans-mono), monospace",
                  fontSize: 11.2,
                  letterSpacing: '0.02em',
                  color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                  borderBottom: `1px solid ${isActive ? 'var(--color-text-primary)' : 'transparent'}`,
                  transition: 'color 0.2s ease, border-color 0.2s ease',
                }}
              >
                {t === 'photos' ? 'My photos' : 'Inspirations'}
              </button>
            )
          })}
        </motion.div>

        {/* Masonry — wrapped in a motion.div keyed by tab so the same
           subtle fade-up animation plays when the user lands on the
           page and again whenever they switch between My Photos and
           Inspirations. One animation, both tabs, no per-tile timing. */}
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}
        >
          {cols.map((col, ci) => (
            <div key={ci} style={{ flex: 1 }}>
              {col.map((p) => (
                <PhotoTile key={p.id} src={p.src} ratio={p.ratio} displayRatio={p.displayRatio} />
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
