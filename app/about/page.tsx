'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import GridBackground from '@/components/GridBackground'
import ClockWidget from '@/components/ClockWidget'
import DockNavigation from '@/components/DockNavigation'
import MusicBar from '@/components/MusicBar'

const CDN = 'https://framerusercontent.com/images'

// Photo URLs from Elisha's JS bundle — swap with your own when ready
const PHOTOS = [
  `${CDN}/imES17pCEsaQ99IBA6CtA0wgQ8.jpg`,
  `${CDN}/aVpA7YU5d8n6ERDDlMDoHXm81Hk.jpeg`,
  `${CDN}/H7nAsraQjyYOycbb9CbLsrvBg.jpg`,
]

const mono: React.CSSProperties = {
  fontFamily: "'Spline Sans Mono', var(--font-spline-sans-mono), monospace",
  fontSize: 11.2,
  fontWeight: 400,
  lineHeight: '13.44px',
  color: 'var(--color-text-secondary)',
}

const STYLES = `
@keyframes about-marquee {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.about-marquee { animation: about-marquee 12s linear infinite; display: inline-block; white-space: nowrap; }
`

// One photo at a time, crossfade on a timer — matches Elisha's micro-animation
function PhotoSlideshow() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % PHOTOS.length), 3500)
    return () => clearInterval(t)
  }, [])

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '268 / 185.84',
        borderRadius: 10,
        overflow: 'hidden',
        background: 'rgba(255,255,255,0.1)',
        border: '1px solid rgba(0,0,0,0.08)',
        boxShadow: 'rgba(0,0,0,0.18) 0px 0.602187px 0.602187px -1.25px, rgba(0,0,0,0.16) 0px 2.28853px 2.28853px -2.5px, rgba(0,0,0,0.06) 0px 10px 10px -3.75px',
      }}
    >
      <AnimatePresence initial={false}>
        <motion.img
          key={idx}
          // eslint-disable-next-line @next/next/no-img-element
          src={PHOTOS[idx]}
          alt=""
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', display: 'block',
          }}
        />
      </AnimatePresence>
    </div>
  )
}

export default function About() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'clip',
        position: 'relative',
        background: 'var(--color-page-bg)',
      }}
    >
      <style>{STYLES}</style>
      <GridBackground />

      {/* Top bar */}
      <div
        style={{
          position: 'absolute',
          top: 20,
          left: 20,
          right: 20,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      >
        <Link href="/" style={{ textDecoration: 'none', pointerEvents: 'auto' }}>
          <span style={mono}>MATHIEU MESTRE</span>
        </Link>
        <ClockWidget />
      </div>

      {/* Main content */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 120,
          padding: '60px 60px 80px',
        }}
      >

        {/* ── LEFT CARD ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.05 }}
          style={{
            width: 300,
            flexShrink: 0,
            background: '#fff',
            borderRadius: 16,
            border: '0.8px solid rgba(0,0,0,0.08)',
            backdropFilter: 'blur(5px)',
            WebkitBackdropFilter: 'blur(5px)',
            boxShadow: 'rgba(64, 39, 14, 0.08) 0px 0.602187px 1.56569px -0.833333px, rgba(64, 39, 14, 0.08) 0px 2.28853px 5.95019px -1.66667px, rgba(64, 39, 14, 0.08) 0px 10px 26px -2.5px',
            padding: 16,
          }}
        >
          <div style={{ marginBottom: 10 }}>
            <PhotoSlideshow />
          </div>

          {/* Caption — marquee + fixed date */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 8,
              overflow: 'hidden',
              marginBottom: 10,
            }}
          >
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <span className="about-marquee" style={mono}>
                Photo w/ my bestie. I&apos;m rocking the cowboy hat.&nbsp;&nbsp;·&nbsp;&nbsp;Photo w/ my bestie. I&apos;m rocking the cowboy hat.&nbsp;&nbsp;·&nbsp;&nbsp;
              </span>
            </div>
            <span style={{ ...mono, flexShrink: 0 }}>09.11.23</span>
          </div>

          {/* Divider */}
          <div
            style={{
              height: 1,
              background: 'rgba(0,0,0,0.08)',
              width: '100%',
              margin: '0 0 10px',
            }}
          />

          {/* Tagline + Signature */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 19.2, overflow: 'hidden', width: '100%' }}>
            <p
              style={{
                fontFamily: "'Spline Sans Mono', var(--font-spline-sans-mono), monospace",
                fontSize: 14,
                fontWeight: 400,
                lineHeight: '22px',
                color: 'var(--color-text-primary)',
                padding: '0 2px',
              }}
            >
              Finding joy and purpose in creating the things I wish existed
            </p>

            {/* Signature — SVG */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/signature-elisha.svg"
              alt="Mathieu"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>

          {/* Currently I'm… */}
          <div
            style={{
              marginTop: 12,
              border: '1px solid rgba(0,0,0,0.06)',
              backdropFilter: 'blur(5px)',
              WebkitBackdropFilter: 'blur(5px)',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: 8,
              padding: '10px 14px',
            }}
          >
            <span style={mono}>Currently I&apos;m…</span>
          </div>
        </motion.div>

        {/* ── RIGHT CONTENT ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.12 }}
          style={{ width: 490, flexShrink: 0 }}
        >
          {/* "About" label — P22 Mackinac Medium, rgba(0,0,0,0.35) */}
          <p
            style={{
              fontFamily: "'P22 Mackinac Medium', serif",
              fontSize: 14,
              fontWeight: 500,
              letterSpacing: '-0.02em',
              lineHeight: '1.75em',
              color: 'rgba(0,0,0,0.35)',
              marginBottom: 28,
            }}
          >
            About
          </p>

          {/* Bio paragraphs — P22 Mackinac Medium, 0.85rem, rgba(0,0,0,0.75) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              <>
                I&apos;m Mathieu, nice to meet you! I&apos;m a product designer based in Munich,
                currently shaping design systems and consent experiences at{' '}
                <span style={{ color: 'rgba(0,0,0,0.75)' }}>Usercentrics</span>
                . I&apos;m drawn to the intersection of structure and craft — where rigorous systems
                thinking meets obsessive attention to detail.
              </>,
              <>
                I believe great design is invisible. I&apos;m drawn to work where curiosity drives
                intention — digging into messy problems and refining until the complexity disappears,
                then obsessing over every detail until it feels right. I love collaborative
                environments and people who bring the same care to their work.
              </>,
              <>
                Outside work, you&apos;ll find me at a coffee shop, listening to bossa nova, or
                deep in a side project I probably didn&apos;t need to start.
              </>,
            ].map((content, i) => (
              <p
                key={i}
                style={{
                  fontFamily: "'P22 Mackinac Medium', serif",
                  fontSize: 'calc(1rem * 0.85)',
                  fontWeight: 500,
                  letterSpacing: '-0.02em',
                  lineHeight: '1.75em',
                  color: 'rgba(0,0,0,0.75)',
                }}
              >
                {content}
              </p>
            ))}
          </div>

          {/* Social links — Spline Sans Mono, rgba(0,0,0,0.35) */}
          <div style={{ display: 'flex', gap: 24, marginTop: 36 }}>
            {['Email', 'Resume', 'LinkedIn', 'Twitter'].map((label) => (
              <span
                key={label}
                style={{
                  fontFamily: "'Spline Sans Mono', var(--font-spline-sans-mono), monospace",
                  fontSize: 'calc(1rem * 0.8)',
                  letterSpacing: '-0.02em',
                  color: 'rgba(0,0,0,0.35)',
                  cursor: 'default',
                }}
              >
                {label}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <MusicBar />
      <DockNavigation />
    </div>
  )
}
