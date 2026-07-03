'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import GridBackground from '@/components/GridBackground'
import DotParticles from '@/components/DotParticles'
import ClockWidget from '@/components/ClockWidget'

const PHOTOS = [
  { src: '/about-fern.jpg',   pos: '40% center', scale: 1.45 },
  { src: '/about-cave.jpg',   pos: '55% 68%',    scale: 1.12 },
  { src: '/about-cactus.jpg', pos: 'center 78%', scale: 1.08 },
  { src: '/about-cliff.jpg',  pos: '38% 58%',    scale: 1.12 },
]

const SIGNATURE = '/signature-mathieu.png'

const CURRENTS = [
  { label: 'Watching', value: 'The Talented Mr. Ripley' },
  { label: 'Listening', value: 'Six Blade Knife · Dire Straits' },
  { label: 'Learning', value: 'Keeping up with AI tools and workflows 🤓' },
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
.about-marquee { animation: about-marquee 36s linear infinite; display: inline-block; white-space: nowrap; }

.word-franco {
  background: linear-gradient(90deg,
    rgba(0,85,164,0.85) 0%,
    rgba(0,85,164,0.85) 19%,
    rgba(228,228,228,0.85) 25%,
    rgba(239,65,53,0.85) 31%,
    rgba(239,65,53,0.85) 50%,
    currentColor 50%,
    currentColor 100%
  );
  background-size: 200% 100%;
  background-position: 100% 0;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: background-position 0.15s ease-out;
}
.word-franco:hover { background-position: 0% 0; }

.word-brazil {
  background: linear-gradient(90deg,
    rgba(0,156,59,0.85) 0%,
    rgba(0,156,59,0.85) 19%,
    rgba(255,213,0,0.9) 31%,
    rgba(255,213,0,0.9) 50%,
    currentColor 50%,
    currentColor 100%
  );
  background-size: 200% 100%;
  background-position: 100% 0;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: background-position 0.15s ease-out;
}
.word-brazil:hover { background-position: 0% 0; }
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
    }, 6000)
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
        {PHOTOS.map(({ src, pos, scale }, i) => {
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
                overflow: 'hidden',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, display: 'block', transform: `scale(${scale})`, transformOrigin: pos }}
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
  const { resolvedTheme } = useTheme()  // subscribe to theme changes
  // Read directly from the .dark class on <html> (set synchronously by
  // next-themes' inline script before React runs). This gives us the
  // correct value on the very first render of a client-side navigation,
  // with no one-tick gap that could flash the light-mode wash.
  const isDark = (typeof document !== 'undefined' && document.documentElement.classList.contains('dark'))
                 || resolvedTheme === 'dark'

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

      {/* Top color wash — light mode only (matches app/page.tsx).
         Horizontal mask fades the left side so it visually mirrors the
         homepage where the TextBlock/PreviewCard covers that area. */}
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
            gap: 16,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Photos */}
          <PhotoSlideshow />

          {/* Caption + divider */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, paddingTop: 4 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 12.8,
                overflow: 'hidden',
              }}
            >
              <div style={{ flex: 1, overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
                <span className="about-marquee" style={{ ...mono, lineHeight: 1 }}>
                  Lanzarote w/ my bestie Pierre. Canary Islands.&nbsp;&nbsp;·&nbsp;&nbsp;Lanzarote w/ my bestie Pierre. Canary Islands.&nbsp;&nbsp;·&nbsp;&nbsp;
                </span>
              </div>
              <span style={{ ...mono, flexShrink: 0, lineHeight: 1, color: 'var(--color-text-secondary)' }}>09.11.23</span>
            </div>
            <div style={{ height: 1, background: 'var(--color-border)', width: '100%' }} />
          </div>

          {/* Tagline+sig + Currents panel share the SAME flex slot:
             tagline+sig stays in normal flow (defining the slot height);
             the panel is position:absolute over it. Card height is
             therefore fixed across both states. */}
          <div style={{ position: 'relative' }}>
            <motion.div
              animate={{ opacity: hovering ? 0 : 1 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
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
                Finding joy and purpose in creating the things I wish existed{' '}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/sun.png" alt="" aria-hidden style={{ display: 'inline', width: 21, height: 21, verticalAlign: 'middle', marginBottom: 2, marginLeft: -2, filter: 'saturate(1.8) hue-rotate(15deg) brightness(1.2)' }} />
              </p>

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={SIGNATURE}
                alt="Mathieu"
                className="about-signature"
                style={{ width: 102, height: 65, objectFit: 'contain', display: 'block', transform: 'scale(1.3)', transformOrigin: 'left center' }}
              />
            </motion.div>

            <AnimatePresence>
              {hovering && (
                <motion.div
                  key="panel"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'none',
                  }}
                >
                  <div style={{
                    background: 'var(--currently-panel-bg)',
                    borderRadius: 8,
                    padding: 14,
                    height: '100%',
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}>
                    {CURRENTS.map(({ label, value }) => (
                      <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        <p style={{
                          fontFamily: "'PP Neue Montreal Medium', sans-serif",
                          fontSize: 10.5,
                          fontWeight: 500,
                          lineHeight: 1.2,
                          color: 'var(--currently-label)',
                          margin: 0,
                        }}>
                          {label}
                        </p>
                        <p style={{
                          fontFamily: "'PP Neue Montreal Medium', sans-serif",
                          fontSize: 13,
                          fontWeight: 500,
                          lineHeight: 1.2,
                          color: 'var(--currently-value)',
                          margin: 0,
                        }}>
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Pill — last in flex, always visible at bottom of card.
             Values extracted exactly from DevTools on elishajeon.com/about:
               element     269 × 37.25 (border-box)
               background  #FFFFFFAD     = rgba(255,255,255,0.678)
               padding     12px (uniform)
               font        11.04px 'Spline Sans Mono', monospace
               text color  #00000059     = rgba(0,0,0,0.349)
             The visible 1px stroke is rendered via box-shadow inset so
             it doesn't add to the element's box dimensions (Elisha's
             computed styles show no border, and 37.25 = 24 + 11.04*1.2). */}
          <motion.div
            onMouseEnter={() => setHovering(true)}
            initial={false}
            animate={{
              backgroundColor: hovering ? 'var(--currently-pill-bg-hover)' : 'var(--currently-pill-bg)',
              color: hovering ? 'var(--currently-pill-text-hover)' : 'var(--currently-pill-text)',
            }}
            transition={{ duration: 0 }}
            style={{
              width: 268,
              backdropFilter: 'blur(5px)',
              WebkitBackdropFilter: 'blur(5px)',
              boxShadow: 'inset 0 0 0 1px var(--currently-pill-stroke)',
              borderRadius: 8,
              padding: '10px 12px',
              fontFamily: "'Spline Sans Mono', monospace",
              fontSize: 11.04,
              fontWeight: 400,
              letterSpacing: '-0.02em',
              cursor: 'default',
              flexShrink: 0,
            }}
          >
            Currently I&apos;m…
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
              I&apos;m Mathieu, nice to meet you! I&apos;m a <span className="word-franco">Franco</span>-<span className="word-brazil">Brazilian</span> product designer based in Paris, shaped by years living across Brazil, France, the US, Portugal and Canada, and a background spanning law, business, and design.
              <br /><br />
              I currently work at <span style={{ color: isDark ? '#ffffff8c' : '#00000073' }}>Usercentrics</span>, shaping privacy compliance products. As a designer, I enjoy untangling problems, refining until the complexity disappears, and obsessing over every detail until it feels right, especially alongside people who bring the same care and curiosity. More generally, I&apos;m drawn to things built with intention and soul: a vintage concert poster, the warmth of a 70s living room, a clean product that feels obvious in hindsight. I&apos;m also genuinely excited by what AI is unlocking in design today.
              <br /><br />
              Outside of work, you&apos;ll find me surfing, shooting on film, hunting for vintage objects, or deep in whatever rabbit hole I&apos;ve fallen into lately... right now it&apos;s niche perfumes and MPB and Americana music.
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
