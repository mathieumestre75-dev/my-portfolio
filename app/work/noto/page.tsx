'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

// ─── Assets ──────────────────────────────────────────────────────────────────
const HERO_VIDEO = 'https://framerusercontent.com/assets/kPKcaYZ2R90b4hWydwXcYTDCx8.mp4'
const SUN_ICON   = 'https://framerusercontent.com/images/WPQ9VOXXZnAWbWSooANYVFhw.png'

// ─── Fonts ───────────────────────────────────────────────────────────────────
const MONO   = "'Spline Sans Mono', var(--font-spline-sans-mono), monospace"
const SERIFR = "'P22 Mackinac Regular', serif"
const SANS   = "'PP Neue Montreal Medium', sans-serif"

// ─── Nav ─────────────────────────────────────────────────────────────────────
const NAV = [
  { id: 'overview',       label: 'Overview'      },
  { id: 'problem',        label: 'Problem'       },
  { id: 'solution',       label: 'Solution'      },
  { id: 'research',       label: 'Research'      },
  { id: 'next-steps',     label: 'Next Steps'    },
  { id: 'what-i-learned', label: 'What I learned'},
]

// ─── Title animation variants ─────────────────────────────────────────────────
const titleContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055, delayChildren: 0.05 } },
}
const titleWord = {
  hidden: { opacity: 0, y: 10, filter: 'blur(6px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1.0] as [number, number, number, number] },
  },
}

// ─── Shared style objects ─────────────────────────────────────────────────────
const metaLabel: React.CSSProperties = {
  fontFamily: SANS, fontSize: 12.8, fontWeight: 500,
  color: 'rgba(0,0,0,0.35)', lineHeight: '17.92px',
  letterSpacing: '0.1024px', margin: 0,
}
const metaValue: React.CSSProperties = {
  fontFamily: SANS, fontSize: 14.08, fontWeight: 500,
  color: 'rgba(0,0,0,0.75)', lineHeight: '22.528px', margin: 0,
}
const skillTag: React.CSSProperties = {
  fontFamily: SANS, fontSize: 12, fontWeight: 500,
  color: 'rgba(0,0,0,0.75)', lineHeight: '19.2px',
  background: 'rgba(65,70,77,0.03)', borderRadius: 5,
  padding: '5px 11px', display: 'inline-flex', alignItems: 'center',
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function NotoPage() {
  const [activeSection, setActiveSection] = useState('overview')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) }),
      { rootMargin: '-20% 0px -75% 0px', threshold: 0 },
    )
    NAV.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  function scrollTo(id: string) {
    const el = document.getElementById(id)
    if (!el) return
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 60, behavior: 'smooth' })
  }

  return (
    <div style={{ background: 'var(--color-page-bg)', minHeight: '100vh', position: 'relative' }}>

      {/* ── Font ─────────────────────────────────────────────────────────── */}
      <style>{`
        @font-face {
          font-family: 'P22 Mackinac Regular';
          src: url('https://framerusercontent.com/assets/noqSsOKWJ22atmEGnKWK1hZHPk.woff2') format('woff2');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }
      `}</style>

      {/* ── Fixed viewport layer — mirrors homepage inner div exactly ──────── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: 'var(--color-inner-bg)',
        boxShadow: 'rgba(117,117,117,0.01) 0px 1px 40px 0px inset, rgba(156,156,156,0.01) 0px 0px 40px 10px inset',
      }}>
        {/* Top gradient — same stops as homepage, opacity halved to compensate for no grid */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 101,
          background: 'linear-gradient(180deg, rgba(217,235,252,0.23) 0%, rgba(255,235,242,0.16) 27.9%, rgba(255,249,242,0.26) 62.25%, rgba(252,252,252,0) 100%)',
          pointerEvents: 'none', zIndex: 1,
        }} />
      </div>

      {/* ── Bottom gradient — at page end, reveals on scroll ─────────────── */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 738,
        background: 'linear-gradient(0deg, rgba(217,235,252,0.46) 0%, rgba(255,235,242,0.32) 27.9%, rgba(255,249,242,0.53) 62.25%, rgba(252,252,252,0) 100%)',
        zIndex: 0, pointerEvents: 'none',
      }} />

      {/* ── Fixed: ← Back ─────────────────────────────────────────────────── */}
      <Link
        href="/"
        style={{
          position: 'fixed', top: 20, left: 20, zIndex: 50,
          fontFamily: MONO, fontSize: 11.2, fontWeight: 400,
          color: 'rgba(0,0,0,0.45)', textDecoration: 'none',
          letterSpacing: '-0.224px', lineHeight: '15.68px',
          display: 'flex', alignItems: 'center', gap: 6,
        }}
      >
        <svg width="9" height="7" viewBox="0 0 8.5 6.812" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M 0.653 2.633 L 0.326 2.96 L 0 2.633 L 0.326 2.308 Z M 8.499 6.327 C 8.508 6.497 8.422 6.658 8.276 6.746 C 8.129 6.833 7.947 6.833 7.801 6.746 C 7.654 6.658 7.568 6.497 7.577 6.327 Z M 2.633 5.268 L 0.326 2.96 L 0.979 2.307 L 3.287 4.615 L 2.633 5.269 Z M 0.326 2.308 L 2.633 0 L 3.287 0.653 L 0.977 2.959 L 0.325 2.305 Z M 0.653 2.172 L 5.268 2.172 L 5.268 3.095 L 0.653 3.095 Z M 8.499 5.403 L 8.499 6.327 L 7.577 6.327 L 7.577 5.403 Z M 5.268 2.172 C 7.052 2.172 8.499 3.619 8.499 5.403 L 7.577 5.403 C 7.577 4.791 7.333 4.204 6.9 3.771 C 6.467 3.338 5.88 3.095 5.268 3.095 Z"/>
        </svg>
        Back
      </Link>

      {/* ── Fixed: Sun icon (dark mode toggle placeholder) ────────────────── */}
      <button
        aria-label="Toggle dark mode"
        style={{
          position: 'fixed', top: 20, right: 20, zIndex: 50,
          background: 'none', border: 'none', padding: 0,
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'rgba(0,0,0,0.40)',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={SUN_ICON} alt="" width={20} height={20} style={{ display: 'block', opacity: 0.55 }} />
      </button>

      {/* ── Page body ─────────────────────────────────────────────────────── */}
      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Fixed left sidebar */}
        <aside
          style={{
            position: 'fixed', left: 20, top: 0,
            width: 120, height: '100vh',
            padding: '140px 0 20px 0',
            display: 'flex', flexDirection: 'column', gap: 10,
            zIndex: 10,
          }}
        >
          {NAV.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              style={{
                background: 'none', border: 'none', padding: 0,
                cursor: 'pointer', textAlign: 'left',
                fontFamily: SANS, fontSize: 12.48, fontWeight: 500,
                lineHeight: '14.976px',
                color: activeSection === id ? 'rgba(0,0,0,0.75)' : 'rgba(0,0,0,0.35)',
                transition: 'color 0.2s ease',
              }}
            >
              {label}
            </button>
          ))}
        </aside>

        {/* ── Main content column — centered in the viewport ───────────────── */}
        <main
          style={{
            width: 641,
            margin: '0 auto',
            padding: '150px 20px 250px',
          }}
        >

          {/* ════ HERO ════════════════════════════════════════════════════════ */}
          <section id="overview" style={{ display: 'flex', flexDirection: 'column', gap: 52 }}>

            {/* Breadcrumb + H1 + subtitle */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <p style={{
                fontFamily: MONO, fontSize: 13.28, fontWeight: 400,
                color: 'rgba(0,0,0,0.45)', lineHeight: '18.592px',
                letterSpacing: '-0.5312px', margin: 0,
              }}>
                Noto / App
              </p>

              <motion.h1
                variants={titleContainer}
                initial="hidden"
                animate="visible"
                style={{
                  fontFamily: SERIFR, fontSize: 32, fontWeight: 400,
                  color: 'rgba(0,0,0,0.75)', lineHeight: '38.4px',
                  letterSpacing: '-1.28px', margin: 0,
                }}
              >
                {'The notes app that captures who you are.'.split(' ').map((word, i) => (
                  <motion.span
                    key={i}
                    variants={titleWord}
                    style={{ display: 'inline-block', marginRight: '0.28em' }}
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h1>

              <p style={{
                fontFamily: SANS, fontSize: 15.52, fontWeight: 500,
                color: 'rgba(0,0,0,0.60)', lineHeight: '25.608px',
                letterSpacing: '0.12416px', margin: 0,
              }}>
                Building a note-taking experience that grows with you, so you can make sense of who you were and who you&apos;re becoming.
              </p>
            </div>

            {/* Metadata grid */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

              {/* Row 1: Role + Timeline */}
              <div style={{ display: 'flex' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <p style={metaLabel}>Role</p>
                  <p style={metaValue}>Product Designer</p>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <p style={metaLabel}>Timeline</p>
                  <p style={metaValue}>
                    8 weeks<br />
                    March – June 2025
                  </p>
                </div>
              </div>

              {/* Row 2: Team + Skills */}
              <div style={{ display: 'flex' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <p style={metaLabel}>Team</p>
                  <p style={metaValue}>
                    David Robles<br />
                    Elisha Jeon
                  </p>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <p style={metaLabel}>Skills</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {['UX/UI', 'Product Strategy', 'User Research', 'Visual Design'].map(s => (
                      <span key={s} style={skillTag}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Hero video */}
            <div style={{
              width: '100%',
              aspectRatio: '1.51053',
              background: 'rgba(0,0,0,0.03)',
              border: '1px solid rgba(0,0,0,0.05)',
              borderRadius: 8,
              overflow: 'hidden',
            }}>
              <video
                src={HERO_VIDEO}
                autoPlay muted loop playsInline preload="none"
                style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }}
              />
            </div>

          </section>

          {/* ── First horizontal divider ─────────────────────────────────── */}
          <div style={{ height: 1, background: 'rgba(0,0,0,0.08)', margin: '100px 0' }} />

        </main>
      </div>
    </div>
  )
}
