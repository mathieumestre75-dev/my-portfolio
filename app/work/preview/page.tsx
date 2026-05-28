'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import GridBackground from '@/components/GridBackground'

const CDN = 'https://framerusercontent.com'

const CARDS = [
  { bg: 'rgba(0,0,0,0.03)',                              video: `${CDN}/assets/9XDlTpVn73XU7zCAmeX7kr13vo.mp4` },
  { bg: 'rgba(0,0,0,0.03)',                              video: `${CDN}/assets/wbsalJ1kRyo9MscVWjfpwNkxuFU.mp4` },
  { bg: 'rgb(254,244,216)',                              video: `${CDN}/assets/cWCSCVbSygJF4qsUYOKhOWrD9Y.mp4` },
  { bg: 'rgb(252,253,249)',                              video: `${CDN}/assets/YsSTnImYXKJjV2KunbahLeQtXM.mp4` },
  { bg: 'rgb(252,252,247)',                              image: `${CDN}/images/AWMfUQBElW9HSDro600Ev2CKT4.png` },
  { bg: 'rgba(0,0,0,0.03)',                              video: `${CDN}/assets/DmNvMsTYP0oswLvNL45zBw3gHc.mp4` },
  { bg: 'rgba(0,0,0,0.03)',                              video: `${CDN}/assets/T0qaFSj94Xu7pF04l5PwP2JdsMY.mp4` },
  { bg: 'rgba(0,0,0,0.03)',                              video: `${CDN}/assets/3osJ4m33VXgYLE6tUzkk8WE8iG4.mp4` },
  { bg: 'rgba(0,0,0,0.03)',                              image: `${CDN}/images/fEn0bUESI6uez0luRLMYg6HRyoY.jpg` },
  { bg: 'rgb(238,232,252)',                              video: `${CDN}/assets/Mzfxg1sUVddvvSCvyqxwas4cwJ0.mp4` },
  { bg: 'linear-gradient(rgb(110,57,0), rgb(0,0,0))',   video: `${CDN}/assets/D9wZDQvAt0q3LBp8tOZWp6Pcs.mp4` },
  { bg: 'rgb(228,255,4)',                                video: `${CDN}/assets/54g9cmbs8vkWA8mkMEyELWji4yU.mp4` },
  { bg: 'rgba(0,0,0,0.03)',                              video: `${CDN}/assets/e5EUUhSiFBa4rEzO2E8w8VOdo.mp4` },
  { bg: 'rgb(247,247,247)',                              image: `${CDN}/images/epjSsUYvo1jD7o859ERfIKnl4w.png` },
  { bg: 'rgba(0,0,0,0.03)',                              video: `${CDN}/assets/Lz3jiUdjcfgxu6KU9YFb2aHyrRk.mp4` },
]

type CardData = typeof CARDS[0]

// ─── CSS keyframes — browser handles compositing, no end-frame jump ──────────
const KEYFRAMES = `
@keyframes pv-fade  { from { opacity:0 }                                            to { opacity:1 } }
@keyframes pv-rise  { from { opacity:0; transform:translateY(28px) }               to { opacity:1; transform:translateY(0) } }
@keyframes pv-scale { from { opacity:0; transform:scale(0.94) }                    to { opacity:1; transform:scale(1) } }
@keyframes pv-depth { from { opacity:0; transform:translateY(18px) scale(0.97) }   to { opacity:1; transform:translateY(0) scale(1) } }
`

// ─── Mono label style ────────────────────────────────────────────────────────
const mono: React.CSSProperties = {
  fontFamily: "'Spline Sans Mono', monospace",
  fontSize: 10.5, fontWeight: 400,
  color: 'var(--color-text-secondary)',
  letterSpacing: '0.04em',
}

// ─── Card — restarts CSS animation on replay without remounting ───────────────
function AnimCard({ card, run, anim }: { card: CardData; run: number; anim: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.animation = 'none'
    void el.offsetHeight // force reflow
    el.style.animation = anim
  }, [run, anim])
  return (
    <div
      ref={ref}
      style={{
        position: 'relative', borderRadius: 6,
        border: '1px solid rgba(0,0,0,0.08)',
        background: card.bg, aspectRatio: '1.56478',
        overflow: 'hidden',
        animation: anim,
      }}
    >
      {card.video && (
        <video
          src={card.video}
          autoPlay muted loop playsInline
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
      )}
      {card.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={card.image} alt=""
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
      )}
    </div>
  )
}

// ─── Text — same restart trick ────────────────────────────────────────────────
function AnimText({ run }: { run: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.animation = 'none'
    void el.offsetHeight
    el.style.animation = 'pv-fade 0.7s ease-out both'
  }, [run])
  return (
    <div ref={ref} style={{ marginBottom: 20, animation: 'pv-fade 0.7s ease-out both' }}>
      <div style={{ ...mono, marginBottom: 4 }}>MATHIEU MESTRE</div>
      <div style={{ fontFamily: "'P22 Mackinac Medium', sans-serif", fontSize: 12, color: 'var(--color-text-primary)', marginBottom: 3 }}>
        One-off projects and some explorations along the years.
      </div>
      <div style={mono}>2022 — Present</div>
    </div>
  )
}

// ─── Option A — Ghost Fade ────────────────────────────────────────────────────
// Pure opacity, no movement. Ultra clean, minimal.
function OptionA({ run }: { run: number }) {
  return (
    <div>
      <AnimText run={run} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
        {CARDS.map((card, i) => (
          <AnimCard key={i} card={card} run={run}
            anim={`pv-fade 0.9s ease-out ${(0.1 + i * 0.05).toFixed(2)}s both`}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Option B — Soft Rise ─────────────────────────────────────────────────────
// y:28 + opacity, gentle ease-out quad. Classic and smooth.
function OptionB({ run }: { run: number }) {
  return (
    <div>
      <AnimText run={run} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
        {CARDS.map((card, i) => (
          <AnimCard key={i} card={card} run={run}
            anim={`pv-rise 1s cubic-bezier(0.25,0.46,0.45,0.94) ${(0.1 + i * 0.05).toFixed(2)}s both`}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Option C — Scale Bloom ───────────────────────────────────────────────────
// scale(0.94)→1 + opacity. No y at all — modern, content-forward.
function OptionC({ run }: { run: number }) {
  return (
    <div>
      <AnimText run={run} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
        {CARDS.map((card, i) => (
          <AnimCard key={i} card={card} run={run}
            anim={`pv-scale 0.75s cubic-bezier(0.34,1.1,0.64,1) ${(0.08 + i * 0.04).toFixed(2)}s both`}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Option D — Deep Rise ─────────────────────────────────────────────────────
// y:18 + scale(0.97)→1 + opacity. Motion and depth combined.
function OptionD({ run }: { run: number }) {
  return (
    <div>
      <AnimText run={run} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
        {CARDS.map((card, i) => (
          <AnimCard key={i} card={card} run={run}
            anim={`pv-depth 0.9s cubic-bezier(0.22,1,0.36,1) ${(0.1 + i * 0.05).toFixed(2)}s both`}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Option wrapper with replay ──────────────────────────────────────────────
const OPTIONS = [
  { id: 'A', label: 'Ghost Fade',   desc: 'Pure opacity · no movement · ultra minimal' },
  { id: 'B', label: 'Soft Rise',    desc: 'y:28 + opacity · gentle ease-out quad' },
  { id: 'C', label: 'Scale Bloom',  desc: 'scale 0.94→1 + opacity · no y movement' },
  { id: 'D', label: 'Deep Rise',    desc: 'y:18 + scale 0.97→1 + opacity · combined' },
]

const RENDERERS = [OptionA, OptionB, OptionC, OptionD]

function OptionBlock({ index }: { index: number }) {
  const [run, setRun] = useState(0)
  const replay = useCallback(() => setRun(r => r + 1), [])
  const opt = OPTIONS[index]
  const Renderer = RENDERERS[index]

  return (
    <div style={{
      background: 'var(--color-page-bg)',
      borderRadius: 12,
      border: '1px solid var(--color-border)',
      padding: '20px 20px 24px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Label row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <span style={{
            fontFamily: "'PP Neue Montreal Medium', sans-serif",
            fontSize: 13, fontWeight: 500,
            color: 'var(--color-text-primary)',
          }}>
            {opt.id} — {opt.label}
          </span>
          <span style={{ ...mono, fontSize: 9.5 }}>{opt.desc}</span>
        </div>
        <button
          onClick={replay}
          style={{
            background: 'none', border: '1px solid var(--color-border)',
            borderRadius: 100, padding: '4px 12px', cursor: 'pointer',
            fontFamily: "'Spline Sans Mono', monospace", fontSize: 10,
            color: 'var(--color-text-secondary)', letterSpacing: '0.04em',
            flexShrink: 0,
          }}
        >
          REPLAY
        </button>
      </div>

      {/* Mini page preview */}
      <div key={run}>
        <Renderer run={run} />
      </div>
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function AnimationPreview() {
  const [allRun, setAllRun] = useState(0)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-page-bg)', position: 'relative' }}>
      <style>{KEYFRAMES}</style>
      <div aria-hidden style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.65 }}>
        <GridBackground />
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1400, margin: '0 auto', padding: '32px 24px 120px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
          <div>
            <div style={{
              fontFamily: "'P22 Mackinac Medium', sans-serif",
              fontSize: 16, fontWeight: 500,
              color: 'var(--color-text-primary)',
              marginBottom: 4,
            }}>
              Animation Preview
            </div>
            <div style={mono}>Pick your favourite, then tell me which one.</div>
          </div>
          <button
            onClick={() => setAllRun(r => r + 1)}
            style={{
              background: 'var(--color-text-primary)', border: 'none',
              borderRadius: 100, padding: '8px 18px', cursor: 'pointer',
              fontFamily: "'Spline Sans Mono', monospace", fontSize: 10.5,
              color: 'var(--color-page-bg)', letterSpacing: '0.04em',
            }}
          >
            REPLAY ALL
          </button>
        </div>

        {/* 2×2 grid of options */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {[0, 1, 2, 3].map(i => (
            <OptionBlock key={`${i}-${allRun}`} index={i} />
          ))}
        </div>

        {/* Footer note */}
        <div style={{ ...mono, textAlign: 'center', marginTop: 28, opacity: 0.6 }}>
          Navigate to <strong style={{ fontWeight: 500 }}>/work/preview</strong> to see this page
        </div>
      </div>
    </div>
  )
}
