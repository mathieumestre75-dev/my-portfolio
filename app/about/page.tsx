'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import GridBackground from '@/components/GridBackground'
import DotParticles from '@/components/DotParticles'
import ClockWidget from '@/components/ClockWidget'

const CDN = 'https://framerusercontent.com/images'

const PHOTOS = [
  `${CDN}/xj2ByBC3nJVc6F6HtI6nqcbnTw.jpg`,
  `${CDN}/60U0IdoPtBAMAmLmMKGolwQI.jpg`,
  `${CDN}/5zyj2mIYoYnGcqeSfIVOXwLoXt0.jpg`,
]

const SIGNATURE = `${CDN}/K6G4OceU6E7MAZnRlAe9IGbRk.png`

const CURRENTS = [
  { label: 'Watching', value: 'Culinary Class Wars 👩🏻‍🍳' },
  { label: 'Reading',  value: 'Monte Cristo' },
  { label: 'Learning', value: 'after effects and blender ;-;' },
]

const mono: React.CSSProperties = {
  fontFamily: "'Spline Sans Mono', var(--font-spline-sans-mono), monospace",
  fontSize: 11.2,
  fontWeight: 400,
  lineHeight: '13.44px',
  letterSpacing: '-0.02em',
  color: 'var(--color-status-text)',
}

const STYLES = `
@keyframes about-marquee {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.about-marquee { animation: about-marquee 12s linear infinite; display: inline-block; white-space: nowrap; }
`

// Photos slide vertically — current exits upward to reveal the next beneath it.
// Spring: bounce 0.2, duration 0.8 — matches Elisha's Framer variant transition.
function PhotoSlideshow() {
  const [idx, setIdx] = useState(0)
  const [prevIdx, setPrevIdx] = useState<number | null>(null)

  useEffect(() => {
    const t = setInterval(() => {
      setIdx(i => {
        const next = (i + 1) % PHOTOS.length
        setPrevIdx(i)
        return next
      })
    }, 3500)
    return () => clearInterval(t)
  }, [])

  return (
    <div
      style={{
        padding: 6,
        borderRadius: 10,
        background: 'var(--color-about-card-bg)',
        border: '0.8px solid var(--color-border)',
        boxShadow: 'rgba(0,0,0,0.18) 0px 0.602187px 0.602187px -1.25px, rgba(0,0,0,0.16) 0px 2.28853px 2.28853px -2.5px, rgba(0,0,0,0.06) 0px 10px 10px -3.75px',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '1.4725 / 1',
          borderRadius: 8,
          overflow: 'hidden',
          border: '1px solid var(--color-photo-border)',
        }}
      >
        {PHOTOS.map((src, i) => {
          const isExiting = i === prevIdx
          return (
            <motion.div
              key={i}
              initial={false}
              animate={{ y: isExiting ? '-100%' : '0%' }}
              transition={
                isExiting
                  ? { type: 'spring', bounce: 0.2, duration: 0.8 }
                  : { duration: 0 }
              }
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: isExiting ? 2 : i === idx ? 1 : 0,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export default function About() {
  const [hovering, setHovering] = useState(false)

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
        background: 'var(--color-page-bg)',
      }}
    >
      <style>{STYLES}</style>
      <GridBackground />
      <DotParticles />

      {/* Top bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
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
        <Link href="/" style={{ textDecoration: 'none', pointerEvents: 'auto', display: 'block' }}>
          <span style={{ ...mono, cursor: 'pointer', letterSpacing: 'normal', color: 'var(--color-text-secondary)' }}>MATHIEU MESTRE</span>
        </Link>
        <ClockWidget />
      </motion.div>

      {/* Main content */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 200,
          padding: '60px 60px 80px',
        }}
      >

        {/* ── LEFT CARD ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.05 }}
          onMouseLeave={() => setHovering(false)}
          style={{
            width: 300,
            flexShrink: 0,
            zIndex: 2,
            background: 'var(--color-about-card-bg)',
            borderRadius: 16,
            border: '0.8px solid var(--color-border)',
            backdropFilter: 'blur(var(--card-backdrop-blur))',
            WebkitBackdropFilter: 'blur(var(--card-backdrop-blur))',
            boxShadow: 'rgba(64, 39, 14, 0.08) 0px 0.602187px 1.56569px -0.833333px, rgba(64, 39, 14, 0.08) 0px 2.28853px 5.95019px -1.66667px, rgba(64, 39, 14, 0.08) 0px 10px 26px -2.5px',
            padding: 16,
            display: 'flex',
            flexDirection: 'column',
            gap: 19.2,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Photos */}
          <PhotoSlideshow />

          {/* Caption + divider */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 12.8,
                overflow: 'hidden',
              }}
            >
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <span className="about-marquee" style={mono}>
                  Photo w/ my bestie. I&apos;m rocking the cowboy hat.&nbsp;&nbsp;·&nbsp;&nbsp;Photo w/ my bestie. I&apos;m rocking the cowboy hat.&nbsp;&nbsp;·&nbsp;&nbsp;
                </span>
              </div>
              <span style={{ ...mono, flexShrink: 0 }}>09.11.23</span>
            </div>
            <div style={{ height: 1, background: 'var(--color-border)', width: '100%' }} />
          </div>

          {/* Tagline + Signature — fades out on hover */}
          <motion.div
            animate={{ opacity: hovering ? 0 : 1 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            style={{ display: 'flex', flexDirection: 'column', gap: 19.2 }}
          >
            <p
              style={{
                fontFamily: "'Spline Sans Mono', var(--font-spline-sans-mono), monospace",
                fontSize: 16,
                fontWeight: 400,
                lineHeight: '1.6em',
                letterSpacing: '-0.02em',
                color: 'var(--color-text-primary)',
                margin: 0,
              }}
            >
              Finding joy and purpose in creating the things I wish existed :-)
            </p>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={SIGNATURE}
              alt="Elisha"
              className="about-signature"
              style={{ width: 102, height: 65, objectFit: 'contain', display: 'block' }}
            />
          </motion.div>

          {/* Currently I'm… — hover trigger */}
          <div
            onMouseEnter={() => setHovering(true)}
            style={{
              border: '1px solid var(--color-border)',
              backdropFilter: 'blur(var(--card-backdrop-blur))',
              WebkitBackdropFilter: 'blur(var(--card-backdrop-blur))',
              background: 'var(--color-about-card-bg)',
              borderRadius: 8,
              padding: 12,
              cursor: 'default',
            }}
          >
            <span style={{ ...mono, color: 'var(--color-text-primary)' }}>Currently I&apos;m…</span>
          </div>

          {/* Currents panel — absolute, slides in from bottom on hover */}
          <motion.div
            animate={{ opacity: hovering ? 1 : 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 166,
              padding: 14,
              borderRadius: 8,
              background: 'var(--color-card-bg)',
              display: 'flex',
              alignItems: 'center',
              pointerEvents: 'none',
              zIndex: 2,
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                width: '100%',
                height: '100%',
              }}
            >
              {CURRENTS.map(({ label, value }) => (
                <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <p style={{
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    fontSize: 10.4,
                    fontWeight: 500,
                    color: 'var(--color-status-text)',
                    margin: 0,
                  }}>
                    {label}
                  </p>
                  <p style={{
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    fontSize: 12.8,
                    fontWeight: 500,
                    lineHeight: '1.4em',
                    color: 'var(--color-text-primary)',
                    margin: 0,
                  }}>
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* ── RIGHT CONTENT ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.12 }}
          style={{ width: 490, flexShrink: 0, position: 'relative', zIndex: 2 }}
        >
          <p
            style={{
              fontFamily: "'P22 Mackinac Medium', serif",
              fontSize: 'calc(1rem * 0.8)',
              fontWeight: 500,
              letterSpacing: '-0.02em',
              lineHeight: '1.75em',
              color: 'var(--color-text-secondary)',
              marginBottom: 30,
            }}
          >
            About
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
            <p
              style={{
                fontFamily: "'P22 Mackinac Medium', serif",
                fontSize: 'calc(1rem * 0.85)',
                fontWeight: 500,
                letterSpacing: '-0.02em',
                lineHeight: '1.75em',
                color: 'var(--color-text-primary)',
                margin: 0,
              }}
            >
              I&apos;m Mathieu, nice to meet you! I&apos;m a product designer based in Munich,
              currently shaping design systems and consent experiences at{' '}
              <span style={{ color: 'var(--color-text-primary)' }}>Usercentrics</span>
              . I&apos;m drawn to the intersection of structure and craft — where rigorous systems
              thinking meets obsessive attention to detail.
              <br /><br />
              I believe great design is invisible. I&apos;m drawn to work where curiosity drives
              intention — digging into messy problems and refining until the complexity disappears,
              then obsessing over every detail until it feels right. I love collaborative
              environments and people who bring the same care to their work.
              <br /><br />
              Outside work, you&apos;ll find me at a coffee shop, listening to bossa nova, or
              deep in a side project I probably didn&apos;t need to start.
            </p>

            <div style={{ display: 'flex', gap: 24 }}>
              {[
                { label: 'Email', href: 'mailto:mathieu.mestre@usercentrics.com' },
                { label: 'Resume', href: null },
                { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mathieu-mestre-bba038102/' },
              ].map(({ label, href }) => {
                const style: React.CSSProperties = {
                  fontFamily: "'Spline Sans Mono', var(--font-spline-sans-mono), monospace",
                  fontSize: 'calc(1rem * 0.8)',
                  letterSpacing: '-0.02em',
                  color: 'var(--color-text-secondary)',
                  cursor: href ? 'pointer' : 'default',
                  textDecoration: 'none',
                }
                return href ? (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={style}>{label}</a>
                ) : (
                  <span key={label} style={style}>{label}</span>
                )
              })}
            </div>
          </div>
        </motion.div>
      </div>

    </div>
  )
}
