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
const SERIFM = "'P22 Mackinac Medium', serif"
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
const sectionH2: React.CSSProperties = {
  fontFamily: SERIFM, fontSize: 22.4, fontWeight: 500,
  letterSpacing: '-0.04em', lineHeight: '1.4em',
  color: 'rgba(0,0,0,0.75)', margin: 0,
}
const sectionH4: React.CSSProperties = {
  fontFamily: SANS, fontSize: 16.8, fontWeight: 500,
  lineHeight: '1.68em', color: 'rgba(0,0,0,0.75)', margin: 0,
}
const bodyText: React.CSSProperties = {
  fontFamily: SANS, fontSize: 15.52, fontWeight: 500,
  letterSpacing: '0.008em', lineHeight: '1.65em',
  color: 'rgba(0,0,0,0.45)', margin: 0,
}
const sectionLabel: React.CSSProperties = {
  fontFamily: SANS, fontSize: 14.08, fontWeight: 500,
  letterSpacing: '0.008em', lineHeight: '1.6em',
  color: 'rgba(0,0,0,0.35)', margin: 0,
}
const bulletText: React.CSSProperties = {
  fontFamily: SANS, fontSize: 14.88, fontWeight: 500,
  letterSpacing: '0.008em', lineHeight: '1.6em',
  color: 'rgba(0,0,0,0.75)', margin: 0,
}

// ─── Arrow bullet SVG ────────────────────────────────────────────────────────
function ArrowBullet() {
  return (
    <svg
      viewBox="0 0 6 10" width={6} height={10}
      overflow="visible" fill="transparent"
      style={{ transform: 'rotate(-90deg)', flexShrink: 0, marginTop: 3 }}
    >
      <path
        d="M 3 0 L 3 10 M 0 6.552 C 0 6.552 0.75 7.414 1.5 8.276 C 2.25 9.138 3 10 3 10 L 6 6.552"
        strokeWidth="1.26" stroke="rgba(255, 0, 0, 0.588)"
      />
    </svg>
  )
}

// ─── Section divider ─────────────────────────────────────────────────────────
const DIVIDER = <div style={{ height: 1, background: 'rgba(0,0,0,0.08)', margin: '100px 0' }} />

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

      {/* ── Fonts ────────────────────────────────────────────────────────── */}
      <style>{`
        @font-face {
          font-family: 'P22 Mackinac Regular';
          src: url('https://framerusercontent.com/assets/noqSsOKWJ22atmEGnKWK1hZHPk.woff2') format('woff2');
          font-weight: 400; font-style: normal; font-display: swap;
        }
        @font-face {
          font-family: 'P22 Mackinac Medium';
          src: url('https://framerusercontent.com/assets/xzdc8djK4HzjEKup45LHgzjbjsM.woff2') format('woff2');
          font-weight: 500; font-style: normal; font-display: swap;
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
            width: 160, height: '100vh',
            padding: '140px 0 20px 0',
            display: 'flex', flexDirection: 'column', gap: 14,
            zIndex: 10,
          }}
        >
          {NAV.map(({ id, label }) => {
            const isActive = activeSection === id
            return (
              <motion.button
                key={id}
                onClick={() => scrollTo(id)}
                animate={{ x: isActive ? 10 : 0 }}
                transition={{ type: 'spring', stiffness: 320, damping: 32, mass: 0.8 }}
                style={{
                  background: 'none', border: 'none', padding: 0,
                  cursor: 'pointer', textAlign: 'left',
                  fontFamily: SANS, fontSize: 12.48, fontWeight: 500,
                  lineHeight: '15px',
                  color: isActive ? 'rgba(0,0,0,0.75)' : 'rgba(0,0,0,0.35)',
                  transition: 'color 0.25s ease',
                }}
              >
                {label}
              </motion.button>
            )
          })}
        </aside>

        <main
          style={{
            width: 641,
            marginLeft: 'calc(50% - 290px)',
            marginRight: 'auto',
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
          {DIVIDER}

          {/* ════ OVERVIEW CONTENT ══════════════════════════════════════════ */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 52 }}>
            <h2 style={sectionH2}>
              What if your notes could help you understand yourself?
            </h2>
            {/* gap:6 matches framer-128cftz */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <h4 style={sectionH4}>A curiosity-driven passion project</h4>
              <div>
                <p style={bodyText}>
                  For 8 weeks, I partnered with another designer and led the product concept, interaction design, and visual direction for Noto — a conceptual note-taking app.
                </p>
                <p style={{ ...bodyText, marginTop: '1.65em' }}>
                  As my capstone and farewell to four years of design school, I wanted to create something deeply personal, bringing together my favorite things: Spotify Wrapped-style self-discovery, experimental design, and pretty gradients :&apos;&#41;
                </p>
              </div>
            </div>
          </div>

          {DIVIDER}

          {/* ════ PROBLEM ═══════════════════════════════════════════════════ */}
          <section id="problem" style={{ display: 'flex', flexDirection: 'column', gap: 52 }}>

            {/* Heading + label — gap:30 matches framer-1h9oh6v */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
              <p style={sectionLabel}>The Problem</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
                <h2 style={sectionH2}>
                  No one is building for self-insight, only self-documentation.
                </h2>
                {/* gap:6 matches framer-tywa0x */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <h4 style={sectionH4}>The notes app: a convenient but chaotic space</h4>
                  <p style={bodyText}>
                    I&apos;ve used my notes app for years, and it&apos;s become a trusty but unstructured archive of my life, from 2am thoughts, to-dos, and mind dumps. When I tried to make sense of it, I realized most journaling tools share the same flaw: they organize what you write, not what it means.
                  </p>
                </div>
              </div>
            </div>

            {/* What's missing — gap:24 matches framer-y1vbdo */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

              {/* Label + thin divider — gap:20 matches framer-odgv03 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <h5 style={{
                  fontFamily: MONO, fontSize: 11.68, fontWeight: 500,
                  lineHeight: '1.4em', color: 'rgba(0,0,0,0.35)', margin: 0,
                }}>
                  WHAT&apos;S MISSING
                </h5>
                <div style={{ height: 1, background: 'rgba(0,0,0,0.08)' }} />
              </div>

              {/* 2 columns — gap:46 between cols, gap:10 within each col */}
              <div style={{ display: 'flex', flexDirection: 'row', gap: 46, width: '100%' }}>

                {/* Left column: 3 items — flex:1, gap:10 matches framer-1dwufup */}
                <div style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
                  {[
                    'Unstructured notes are hard to sort through',
                    'Requires manual tagging/organization',
                    'Search is shallow; only finds keywords, not meaning',
                  ].map((text, i) => (
                    <div key={i} style={{ width: '100%', display: 'flex', gap: 14, alignItems: 'flex-start', borderRadius: 8 }}>
                      <ArrowBullet />
                      <p style={bulletText}>{text}</p>
                    </div>
                  ))}
                </div>

                {/* Right column: 2 items — flex:1, gap:10 matches framer-27grm7 */}
                <div style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
                  {[
                    'No tools for insights or pattern-finding',
                    "Doesn't support real reflection or understanding",
                  ].map((text, i) => (
                    <div key={i} style={{ width: '100%', display: 'flex', gap: 14, alignItems: 'flex-start', borderRadius: 8 }}>
                      <ArrowBullet />
                      <p style={bulletText}>{text}</p>
                    </div>
                  ))}
                </div>

              </div>

            </div>

            {/* Visual */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Container — same background + stroke as hero video, image inset with padding */}
              <div style={{
                width: '100%',
                background: 'rgba(0,0,0,0.03)',
                border: '1px solid rgba(0,0,0,0.05)',
                borderRadius: 8,
                padding: '0 120px 120px',
              }}>
                {/* Phone image — flush at top, rounded bottom corners, fills padded width */}
                <div style={{
                  width: '100%',
                  aspectRatio: '1.24667',
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                  overflow: 'hidden',
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://framerusercontent.com/images/7z4sboMYSxGAycSIv77WWnzCo.png"
                    alt=""
                    style={{
                      width: '100%', height: '100%',
                      objectFit: 'cover', objectPosition: 'center bottom',
                      display: 'block',
                    }}
                  />
                </div>
              </div>
              <p style={{
                fontFamily: SANS, fontSize: 14.08, fontWeight: 500,
                letterSpacing: '0.008em', lineHeight: '1.6em',
                color: 'rgba(0,0,0,0.35)', textAlign: 'center',
                margin: 0,
              }}>
                Years of chaotic notes. Easy to write, hard to make sense of.
              </p>
            </div>

          </section>

        </main>
      </div>
    </div>
  )
}
