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
  color: 'rgba(0,0,0,0.6)', margin: 0,
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
const flowLabel: React.CSSProperties = {
  fontFamily: MONO, fontSize: 11.68, fontWeight: 500,
  lineHeight: '1.4em', letterSpacing: 0, color: 'rgba(0,0,0,0.35)', margin: 0,
}
const flowHeading: React.CSSProperties = {
  fontFamily: SANS, fontSize: 16, fontWeight: 500,
  lineHeight: '1.4em', color: 'rgba(0,0,0,0.75)', margin: 0,
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
  const [hoveredC1, setHoveredC1] = useState<number | null>(null)
  const [hoveredC2, setHoveredC2] = useState<number | null>(null)

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

            {/* Breadcrumb — direct child of section, gets the full 52px section gap below */}
            <p style={{
              fontFamily: MONO, fontSize: 13.28, fontWeight: 400,
              color: 'rgba(0,0,0,0.45)', lineHeight: '18.592px',
              letterSpacing: '-0.5312px', margin: 0,
            }}>
              Noto / App
            </p>

            {/* H1 + subtitle — framer-taecsi, gap:14 between title and subtitle */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
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
                color: 'rgba(0,0,0,0.6)', lineHeight: '25.608px',
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
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
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

          {/* framer-1ikk3wh — hairline divider between hero and overview */}
          {DIVIDER}

          {/* ════ OVERVIEW CONTENT — framer-1tmbiea gap:30 ══════════════════ */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
            <p style={sectionLabel}>Overview</p>
            {/* framer-1dwyu3 gap:20 — h2 + content block */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <h2 style={sectionH2}>
                What if your notes could help you understand yourself?
              </h2>
              {/* framer-128cftz gap:6 — h4 + body */}
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
          </div>

          {/* ════ PROBLEM ═══════════════════════════════════════════════════ */}
          {/* marginTop:100 = framer-zjwxzf gap:100px — no visual divider between sections */}
          <section id="problem" style={{ display: 'flex', flexDirection: 'column', gap: 52, marginTop: 100 }}>

            {/* Heading + label — gap:30 matches framer-1h9oh6v */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
              <p style={sectionLabel}>The Problem</p>
              {/* framer-sodk4t gap:20 — h2 + content block */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <h2 style={sectionH2}>
                  No one is building for self-insight, only self-documentation.
                </h2>
                {/* framer-tywa0x gap:6 — h4 + body */}
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

          {/* ════ SOLUTION ══════════════════════════════════════════════════ */}
          {/* marginTop:100 = framer-zjwxzf gap:100px */}
          {/* framer-1hi1yld gap:52 */}
          <section id="solution" style={{ display: 'flex', flexDirection: 'column', gap: 52, marginTop: 100 }}>

            {/* framer-1xkd5nd gap:30 — "Solution" label + heading block */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
              <p style={sectionLabel}>Solution</p>

              {/* framer-twxyns gap:20 — h2 / content / prototype button */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <h2 style={sectionH2}>Introducing Noto</h2>

                {/* framer-u2y2jt gap:6 — h4 + body */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <h4 style={sectionH4}>A reflective notes app that turns everyday writing into personal insight.</h4>
                  <p style={bodyText}>
                    Noto creates space for free-form thought, while surfacing the themes and patterns that naturally emerge — helping you see not just what you wrote, but what it might mean.
                  </p>
                </div>

                {/* framer-tslh18 — single prototype pill */}
                <a
                  href="https://www.figma.com/proto/S0bTLqZhpFROoKbn94W54L/Noto---Prototype?page-id=0%3A1&node-id=1-2921&viewport=1017%2C399%2C0.22&t=ACbfv3hry8KrebBj-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1%3A2921"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '6px 8px 6px 12px',
                    background: 'rgba(0,0,0,0.03)',
                    borderRadius: 100,
                    textDecoration: 'none',
                    fontFamily: MONO, fontSize: 11.68, fontWeight: 500,
                    lineHeight: '1.4em', letterSpacing: 0,
                    color: 'rgba(0,0,0,0.45)',
                    whiteSpace: 'nowrap', width: 'min-content',
                  }}
                >
                  TRY PROTOTYPE
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{ flexShrink: 0 }}>
                    <path d="M2 11L11 2M11 2H5.5M11 2V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* framer-eqhqbc — standalone preview video */}
            {/* position:relative + overflow:visible so the annotation extends outside */}
            <div style={{ position: 'relative', overflow: 'visible' }}>
              {/* framer-1e6zi1m */}
              <div style={{
                width: '100%', aspectRatio: '1.79375',
                background: 'rgba(0,0,0,0.03)',
                border: '1px solid rgba(0,0,0,0.05)',
                borderRadius: 8,
                overflow: 'hidden',
              }}>
                <video
                  src="https://framerusercontent.com/assets/aWLZeI27ccId05r9gtkPN04M.mp4"
                  autoPlay muted loop playsInline preload="none"
                  style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }}
                />
              </div>

              {/* framer-16od6sh — "Unmute for sound!" handwriting annotation */}
              {/* position:absolute; bottom:40px; right:-163px */}
              <div style={{ position: 'absolute', bottom: 40, right: -163, overflow: 'visible', pointerEvents: 'none' }}>
                <svg viewBox="0 0 124.043 32.5" width={124} height={33} overflow="visible" aria-hidden="true">
                  <path d="M 53.736 4.11 C 53.749 4.673 53.728 5.272 53.673 5.907 C 53.617 6.551 53.519 7.192 53.381 7.824 C 53.239 8.461 53.049 9.068 52.813 9.644 C 52.594 10.194 52.304 10.713 51.951 11.187 C 51.619 11.625 51.204 11.993 50.729 12.269 C 50.24 12.547 49.688 12.695 49.126 12.698 C 48.294 12.716 47.63 12.468 47.132 11.95 C 46.634 11.433 46.372 10.646 46.348 9.589 C 46.335 8.991 46.382 8.405 46.489 7.831 C 46.596 7.246 46.727 6.715 46.879 6.234 C 47.034 5.753 47.168 5.357 47.282 5.042 C 47.244 4.965 47.224 4.881 47.224 4.795 C 47.217 4.535 47.272 4.292 47.389 4.064 C 47.505 3.827 47.648 3.633 47.818 3.482 C 47.996 3.33 48.168 3.252 48.332 3.248 C 48.462 3.245 48.567 3.291 48.647 3.385 C 48.736 3.478 48.783 3.624 48.788 3.823 C 48.793 4.04 48.725 4.336 48.588 4.712 C 48.458 5.089 48.307 5.533 48.138 6.05 C 47.968 6.557 47.815 7.127 47.683 7.763 C 47.559 8.39 47.506 9.063 47.523 9.782 C 47.536 10.337 47.692 10.757 47.995 11.045 C 48.296 11.325 48.736 11.458 49.317 11.443 C 49.794 11.433 50.206 11.272 50.555 10.96 C 50.903 10.648 51.192 10.229 51.422 9.704 C 51.661 9.17 51.851 8.566 51.991 7.897 C 52.139 7.225 52.25 6.524 52.319 5.795 C 52.397 5.064 52.449 4.348 52.476 3.646 C 52.489 3.42 52.549 3.253 52.659 3.147 C 52.776 3.032 52.933 2.967 53.097 2.967 C 53.211 2.96 53.324 2.985 53.425 3.037 C 53.521 3.079 53.593 3.18 53.639 3.346 C 53.695 3.508 53.728 3.763 53.736 4.11 Z M 57.04 12.225 C 56.788 12.231 56.559 12.093 56.354 11.811 C 56.148 11.53 56.039 11.165 56.029 10.714 C 56.021 10.18 56.074 9.646 56.186 9.124 C 56.312 8.557 56.467 7.981 56.654 7.396 C 56.839 6.802 57.021 6.23 57.199 5.68 C 57.23 5.58 57.291 5.493 57.374 5.429 C 57.491 5.358 57.626 5.323 57.762 5.329 C 58.074 5.322 58.234 5.47 58.24 5.773 C 58.243 5.842 58.212 5.999 58.148 6.243 C 58.083 6.488 58 6.789 57.896 7.147 C 57.799 7.504 57.701 7.892 57.598 8.31 C 57.494 8.721 57.406 9.134 57.328 9.552 C 57.251 9.97 57.2 10.358 57.173 10.713 C 57.349 10.502 57.501 10.271 57.625 10.026 C 57.799 9.719 57.987 9.372 58.186 8.986 C 58.384 8.591 58.592 8.196 58.81 7.801 C 59.024 7.398 59.241 7.028 59.46 6.693 C 59.684 6.35 59.903 6.077 60.116 5.871 C 60.337 5.658 60.541 5.55 60.732 5.546 C 60.99 5.533 61.244 5.62 61.439 5.788 C 61.644 5.948 61.802 6.239 61.915 6.662 C 62.037 7.075 62.108 7.663 62.126 8.426 C 62.132 8.81 62.18 9.192 62.269 9.566 C 62.343 9.878 62.488 10.168 62.693 10.415 C 62.883 10.616 63.152 10.724 63.428 10.71 C 63.87 10.7 64.262 10.613 64.605 10.447 C 64.92 10.293 65.217 10.102 65.489 9.881 C 65.744 9.666 65.957 9.48 66.126 9.32 C 66.295 9.151 66.428 9.066 66.522 9.063 C 66.723 9.059 66.824 9.16 66.829 9.368 C 66.832 9.454 66.769 9.595 66.645 9.788 C 66.495 10.015 66.326 10.228 66.139 10.425 C 65.911 10.671 65.664 10.898 65.401 11.105 C 65.128 11.32 64.834 11.5 64.517 11.646 C 64.207 11.792 63.893 11.868 63.573 11.876 C 62.975 11.89 62.482 11.785 62.096 11.56 C 61.718 11.335 61.432 10.956 61.237 10.423 C 61.051 9.89 60.947 9.172 60.926 8.271 C 60.914 7.777 60.875 7.418 60.809 7.195 C 60.752 6.962 60.649 6.809 60.5 6.735 C 60.399 6.918 60.272 7.182 60.115 7.524 C 59.959 7.857 59.777 8.23 59.569 8.642 C 59.371 9.054 59.159 9.47 58.936 9.891 C 58.72 10.304 58.499 10.687 58.273 11.039 C 58.082 11.346 57.862 11.634 57.617 11.9 C 57.406 12.111 57.213 12.221 57.04 12.225 Z M 76.205 11.684 C 76.203 11.815 76.145 11.94 76.045 12.026 C 75.945 12.114 75.817 12.164 75.684 12.165 C 75.538 12.172 75.395 12.119 75.29 12.018 C 75.183 11.916 75.127 11.758 75.123 11.541 C 75.11 10.978 75.121 10.366 75.157 9.706 C 75.195 9.038 75.244 8.378 75.307 7.727 C 75.369 7.066 75.433 6.458 75.498 5.901 C 75.221 6.315 74.92 6.772 74.594 7.274 C 74.276 7.776 73.949 8.274 73.614 8.767 C 73.279 9.261 72.951 9.716 72.632 10.129 C 72.362 10.479 72.07 10.812 71.758 11.125 C 71.495 11.374 71.277 11.502 71.104 11.504 C 70.785 11.513 70.478 11.382 70.263 11.147 C 70.02 10.884 69.886 10.539 69.889 10.181 C 69.886 10.025 69.899 9.812 69.927 9.543 C 69.954 9.264 69.987 8.973 70.023 8.669 C 70.06 8.365 70.092 8.083 70.121 7.821 C 70.145 7.623 70.158 7.423 70.159 7.223 C 70.158 7.118 70.142 7.013 70.112 6.911 C 70.092 6.817 70.047 6.77 69.979 6.772 C 69.875 6.774 69.735 6.895 69.558 7.132 C 69.345 7.416 69.148 7.712 68.968 8.018 C 68.76 8.378 68.543 8.76 68.318 9.164 L 67.707 10.31 C 67.556 10.593 67.394 10.871 67.221 11.142 C 67.14 11.296 67.038 11.438 66.918 11.564 C 66.824 11.653 66.7 11.702 66.571 11.702 C 66.405 11.706 66.252 11.624 66.109 11.452 C 65.971 11.271 65.898 11.048 65.9 10.821 C 65.903 10.589 65.923 10.358 65.961 10.13 C 66.005 9.808 66.062 9.456 66.131 9.072 C 66.209 8.69 66.283 8.315 66.352 7.949 C 66.43 7.574 66.495 7.256 66.551 6.995 C 66.613 6.7 66.694 6.498 66.797 6.391 C 66.881 6.293 67.002 6.234 67.131 6.228 C 67.282 6.218 67.429 6.283 67.525 6.401 C 67.631 6.51 67.687 6.687 67.694 6.93 C 67.694 6.973 67.672 7.091 67.624 7.282 C 67.575 7.465 67.517 7.691 67.444 7.962 C 67.378 8.238 67.306 8.514 67.23 8.787 C 67.158 9.073 67.1 9.34 67.054 9.584 C 67.236 9.259 67.429 8.908 67.626 8.531 C 67.834 8.153 68.042 7.78 68.25 7.411 C 68.458 7.034 68.667 6.689 68.877 6.381 C 69.086 6.064 69.293 5.813 69.497 5.626 C 69.7 5.439 69.897 5.344 70.088 5.34 C 70.313 5.334 70.533 5.402 70.716 5.532 C 70.919 5.666 71.084 5.848 71.21 6.079 C 71.338 6.311 71.405 6.57 71.41 6.856 C 71.407 7.14 71.38 7.423 71.327 7.702 C 71.261 8.089 71.196 8.476 71.132 8.864 C 71.075 9.257 71.041 9.653 71.031 10.05 C 71.032 10.137 71.059 10.18 71.111 10.178 C 71.154 10.177 71.206 10.146 71.265 10.083 C 71.511 9.8 71.78 9.459 72.073 9.063 C 72.367 8.657 72.665 8.231 72.967 7.781 C 73.277 7.331 73.583 6.891 73.886 6.459 C 74.187 6.018 74.468 5.622 74.728 5.268 C 74.997 4.907 75.234 4.62 75.437 4.408 C 75.648 4.194 75.814 4.087 75.936 4.083 C 76.196 4.077 76.397 4.146 76.539 4.291 C 76.682 4.434 76.756 4.681 76.764 5.026 C 76.77 5.303 76.757 5.663 76.725 6.105 C 76.7 6.549 76.664 7.031 76.616 7.552 C 76.577 8.072 76.527 8.599 76.47 9.129 C 76.422 9.649 76.373 10.137 76.323 10.589 C 76.272 11.031 76.232 11.398 76.206 11.684 Z M 82.895 12.23 C 82.745 12.232 82.603 12.162 82.514 12.043 C 82.406 11.915 82.35 11.727 82.345 11.474 C 82.337 11.181 82.371 10.759 82.445 10.211 C 82.527 9.664 82.649 8.937 82.809 8.031 C 82.588 8.591 82.341 9.121 82.067 9.622 C 81.839 10.069 81.551 10.483 81.211 10.852 C 80.907 11.17 80.59 11.334 80.261 11.342 C 79.935 11.348 79.621 11.219 79.394 10.986 C 79.145 10.739 79.014 10.301 78.999 9.667 C 78.991 9.313 79.012 8.913 79.061 8.47 C 79.112 8.018 79.179 7.571 79.264 7.126 C 79.35 6.681 79.435 6.285 79.522 5.936 C 79.61 5.579 79.69 5.318 79.764 5.151 C 79.799 5.045 79.859 4.95 79.94 4.873 C 80.008 4.817 80.095 4.787 80.184 4.79 C 80.328 4.795 80.466 4.846 80.578 4.937 C 80.72 5.037 80.793 5.21 80.799 5.452 C 80.799 5.513 80.773 5.656 80.717 5.883 C 80.658 6.154 80.595 6.424 80.529 6.693 C 80.452 7.032 80.377 7.372 80.305 7.712 C 80.227 8.079 80.162 8.444 80.11 8.809 C 80.066 9.173 80.049 9.509 80.055 9.812 C 80.059 9.977 80.08 10.111 80.117 10.215 C 80.154 10.317 80.241 10.367 80.38 10.363 C 80.501 10.36 80.651 10.236 80.826 9.989 C 81.011 9.742 81.207 9.417 81.415 9.014 C 81.631 8.6 81.849 8.145 82.072 7.645 C 82.303 7.145 82.525 6.633 82.739 6.108 C 82.96 5.583 83.161 5.084 83.341 4.612 C 83.406 4.454 83.477 4.357 83.555 4.321 C 83.633 4.275 83.722 4.25 83.812 4.249 C 83.973 4.247 84.127 4.315 84.234 4.435 C 84.368 4.556 84.442 4.73 84.439 4.911 C 84.443 5.041 84.422 5.267 84.378 5.588 C 84.342 5.91 84.286 6.289 84.209 6.724 C 84.141 7.151 84.061 7.603 83.967 8.081 C 83.884 8.561 83.799 9.036 83.715 9.505 C 83.638 9.928 83.557 10.351 83.472 10.772 C 83.403 11.155 83.346 11.464 83.299 11.699 C 83.26 11.918 83.203 12.057 83.126 12.119 C 83.067 12.186 82.984 12.226 82.895 12.23 Z M 85.341 7.698 C 85.107 7.686 84.994 7.538 85.006 7.251 C 85.012 7.182 85.058 7.099 85.142 7.001 C 85.212 6.904 85.319 6.84 85.437 6.826 C 85.705 6.793 86.034 6.746 86.423 6.685 C 86.819 6.615 87.255 6.536 87.731 6.446 C 87.807 6.02 87.9 5.571 88.01 5.101 C 88.121 4.63 88.244 4.171 88.382 3.726 C 88.518 3.271 88.665 2.861 88.821 2.494 C 88.945 2.181 89.113 1.888 89.321 1.623 C 89.393 1.542 89.479 1.474 89.575 1.423 C 89.638 1.382 89.709 1.358 89.783 1.353 C 89.899 1.348 90.009 1.405 90.072 1.502 C 90.198 1.659 90.233 1.87 90.163 2.059 C 90 2.549 89.829 3.151 89.646 3.866 C 89.464 4.581 89.269 5.361 89.064 6.206 C 89.86 6.058 90.654 5.901 91.446 5.735 C 92.129 5.593 92.81 5.443 93.49 5.284 C 93.652 5.211 93.778 5.22 93.867 5.314 C 93.965 5.407 94.015 5.501 94.017 5.596 C 94.02 5.718 93.988 5.809 93.92 5.871 C 93.862 5.932 93.798 5.986 93.728 6.033 L 93.715 6.046 C 93.544 6.118 93.286 6.207 92.941 6.311 C 92.597 6.406 92.2 6.51 91.753 6.625 C 90.783 6.854 89.808 7.058 88.828 7.239 C 88.646 8.006 88.461 8.795 88.273 9.605 C 88.091 10.408 87.911 11.196 87.729 11.972 C 87.651 12.287 87.555 12.483 87.445 12.565 C 87.353 12.65 87.234 12.699 87.109 12.703 C 86.972 12.706 86.839 12.652 86.743 12.555 C 86.644 12.453 86.626 12.241 86.688 11.919 L 87.533 7.465 C 87.016 7.556 86.558 7.621 86.159 7.667 C 85.77 7.71 85.497 7.721 85.34 7.698 Z M 97.8 5.962 C 97.802 6.255 97.718 6.542 97.559 6.788 C 97.392 7.052 97.169 7.308 96.888 7.558 C 96.594 7.808 96.282 8.037 95.954 8.243 C 95.336 8.636 94.676 8.961 93.988 9.212 C 93.93 9.508 93.903 9.809 93.906 10.111 C 93.91 10.276 93.951 10.392 94.03 10.459 C 94.11 10.527 94.232 10.559 94.397 10.555 C 94.761 10.546 95.145 10.472 95.549 10.333 C 95.953 10.194 96.365 10.015 96.784 9.796 C 97.205 9.579 97.607 9.348 97.99 9.105 C 98.375 8.861 98.725 8.633 99.041 8.417 C 99.366 8.201 99.635 8.027 99.847 7.892 C 100.061 7.756 100.203 7.688 100.272 7.686 C 100.376 7.684 100.454 7.716 100.508 7.785 C 100.569 7.841 100.604 7.92 100.605 8.003 C 100.606 8.072 100.501 8.21 100.289 8.414 C 100.026 8.67 99.75 8.911 99.461 9.136 C 99.112 9.404 98.72 9.682 98.284 9.969 C 97.849 10.258 97.396 10.528 96.924 10.782 C 96.491 11.022 96.039 11.229 95.574 11.399 C 95.145 11.555 94.756 11.638 94.41 11.646 C 93.959 11.658 93.604 11.497 93.344 11.165 C 93.085 10.832 92.948 10.311 92.931 9.601 C 92.92 9.124 92.97 8.642 93.079 8.154 C 93.301 7.211 93.709 6.322 94.279 5.539 C 94.548 5.176 94.831 4.893 95.13 4.686 C 95.429 4.471 95.72 4.361 96.006 4.353 C 96.552 4.34 96.985 4.483 97.304 4.778 C 97.624 5.075 97.789 5.468 97.8 5.962 Z M 94.238 8.205 C 94.502 8.035 94.775 7.854 95.057 7.665 C 95.338 7.477 95.598 7.285 95.837 7.088 C 96.075 6.892 96.266 6.688 96.408 6.477 C 96.551 6.283 96.627 6.049 96.627 5.808 C 96.619 5.488 96.442 5.332 96.095 5.34 C 95.878 5.345 95.653 5.489 95.416 5.771 C 95.156 6.099 94.937 6.458 94.765 6.84 C 94.557 7.282 94.38 7.738 94.237 8.205 Z M 106.413 12.522 C 106.278 12.531 106.147 12.476 106.058 12.374 C 105.97 12.273 105.923 12.101 105.916 11.858 C 105.906 11.425 105.916 10.978 105.95 10.519 C 105.992 10.048 106.007 9.615 105.998 9.216 C 105.976 8.306 105.876 7.559 105.698 6.974 C 105.529 6.38 105.177 5.986 104.642 5.79 C 104.546 5.763 104.457 5.716 104.38 5.652 C 104.317 5.602 104.285 5.52 104.282 5.407 C 104.278 5.291 104.328 5.179 104.419 5.106 C 104.503 5.025 104.667 4.982 104.91 4.976 C 105.109 4.972 105.373 4.974 105.703 4.984 C 106.033 4.994 106.388 5.003 106.769 5.011 C 107.016 4.044 107.301 3.239 107.623 2.598 C 107.947 1.958 108.303 1.451 108.693 1.077 C 109.092 0.704 109.515 0.435 109.962 0.268 C 110.417 0.101 110.891 0.012 111.385 0.001 C 111.603 -0.005 111.742 0.023 111.804 0.081 C 111.865 0.133 111.898 0.214 111.9 0.327 C 111.899 0.483 111.858 0.636 111.781 0.772 C 111.697 0.921 111.522 1.02 111.255 1.071 C 110.668 1.188 110.148 1.39 109.695 1.679 C 109.243 1.966 108.854 2.378 108.528 2.915 C 108.203 3.443 107.938 4.135 107.732 4.989 C 108.449 4.961 109.163 4.901 109.874 4.808 C 110.469 4.717 110.966 4.622 111.362 4.526 C 111.766 4.422 112.09 4.336 112.331 4.27 C 112.572 4.194 112.758 4.155 112.887 4.153 C 113.035 4.149 113.126 4.185 113.164 4.263 C 113.2 4.34 113.22 4.424 113.221 4.509 C 113.225 4.673 113.073 4.837 112.765 5 C 112.457 5.155 112.047 5.299 111.539 5.432 C 111.04 5.557 110.486 5.661 109.883 5.744 C 109.277 5.827 108.68 5.877 108.091 5.89 L 107.805 5.897 L 107.532 5.904 C 107.516 5.968 107.505 6.033 107.498 6.099 C 107.423 6.603 107.349 7.139 107.275 7.704 C 107.21 8.261 107.15 8.808 107.093 9.346 C 107.045 9.877 107.008 10.359 106.984 10.792 C 106.959 11.226 106.95 11.573 106.956 11.833 C 106.962 12.05 106.913 12.215 106.812 12.331 C 106.715 12.453 106.568 12.523 106.413 12.522 Z M 106.569 5.874 C 106.333 5.856 106.099 5.827 105.866 5.787 C 105.98 5.914 106.08 6.064 106.162 6.234 C 106.253 6.406 106.331 6.59 106.396 6.788 C 106.448 6.467 106.507 6.161 106.569 5.874 Z M 113.036 11.339 C 112.526 11.352 112.117 11.166 111.814 10.783 C 111.51 10.401 111.352 9.898 111.336 9.274 C 111.333 9.032 111.358 8.791 111.411 8.556 C 111.474 8.295 111.554 8.058 111.655 7.849 C 111.586 7.78 111.535 7.696 111.505 7.604 C 111.464 7.47 111.444 7.33 111.444 7.19 C 111.412 6.265 111.729 5.361 112.333 4.66 C 112.611 4.332 112.922 4.077 113.265 3.897 C 113.616 3.715 113.974 3.62 114.338 3.611 C 114.936 3.598 115.426 3.802 115.808 4.227 C 116.19 4.643 116.393 5.288 116.413 6.164 C 116.424 6.623 116.366 7.092 116.238 7.572 C 116.119 8.053 115.947 8.52 115.725 8.963 C 115.52 9.393 115.263 9.796 114.959 10.163 C 114.673 10.516 114.364 10.801 114.03 11.017 C 113.705 11.225 113.374 11.331 113.036 11.339 Z M 112.502 7.387 C 112.559 7.466 112.588 7.561 112.585 7.658 C 112.588 7.791 112.565 7.924 112.518 8.049 C 112.477 8.179 112.433 8.358 112.388 8.586 C 112.335 8.904 112.316 9.226 112.332 9.548 C 112.341 9.964 112.511 10.169 112.839 10.161 C 113.203 10.152 113.538 10.002 113.844 9.709 C 114.174 9.372 114.446 8.984 114.65 8.559 C 114.88 8.093 115.055 7.599 115.174 7.077 C 115.3 6.544 115.357 6.044 115.347 5.576 C 115.339 5.273 115.278 5.063 115.162 4.945 C 115.046 4.817 114.841 4.756 114.547 4.763 C 114.243 4.77 113.93 4.882 113.606 5.098 C 113.282 5.312 113.012 5.599 112.818 5.935 C 112.61 6.286 112.511 6.68 112.522 7.113 C 112.523 7.208 112.516 7.299 112.502 7.386 Z M 118.408 11.331 C 118.271 11.336 118.14 11.276 118.053 11.17 C 117.948 11.039 117.893 10.874 117.898 10.706 C 117.904 10.461 117.929 10.217 117.973 9.976 C 118.034 9.627 118.097 9.222 118.165 8.761 C 118.24 8.3 118.303 7.823 118.352 7.327 C 118.402 6.823 118.42 6.342 118.409 5.882 C 118.404 5.657 118.456 5.492 118.567 5.384 C 118.671 5.275 118.815 5.211 118.966 5.206 C 119.105 5.203 119.21 5.286 119.284 5.458 C 119.357 5.63 119.378 5.977 119.347 6.498 C 119.725 5.604 120.146 4.883 120.61 4.335 C 121.082 3.778 121.554 3.377 122.025 3.131 C 122.495 2.878 122.922 2.746 123.303 2.737 C 123.555 2.732 123.738 2.779 123.852 2.88 C 123.976 2.974 124.04 3.08 124.042 3.201 C 124.05 3.359 123.974 3.509 123.843 3.596 C 123.628 3.729 123.4 3.839 123.162 3.924 C 122.785 4.08 122.437 4.262 122.122 4.469 C 121.814 4.666 121.522 4.924 121.242 5.244 C 120.973 5.562 120.709 5.966 120.452 6.459 C 120.194 6.94 119.939 7.537 119.687 8.245 C 119.435 8.952 119.169 9.805 118.889 10.8 C 118.841 10.991 118.776 11.127 118.69 11.207 C 118.617 11.286 118.514 11.331 118.407 11.331 Z M 48.038 31.225 C 47.873 31.239 47.711 31.181 47.592 31.067 C 47.496 30.971 47.441 30.841 47.44 30.705 C 47.441 30.576 47.494 30.453 47.588 30.365 C 47.698 30.248 47.848 30.146 48.036 30.054 C 48.378 29.864 48.699 29.674 48.998 29.486 C 49.305 29.296 49.552 29.096 49.739 28.883 C 49.912 28.702 50.008 28.463 50.009 28.213 C 50.005 28.014 49.936 27.865 49.803 27.763 C 49.649 27.647 49.458 27.592 49.266 27.607 C 49.136 27.61 48.954 27.64 48.722 27.698 C 48.489 27.747 48.235 27.805 47.958 27.871 L 47.171 28.047 C 46.911 28.096 46.69 28.122 46.508 28.127 C 46.18 28.135 45.93 28.062 45.763 27.91 C 45.594 27.749 45.507 27.531 45.5 27.254 C 45.496 27.115 45.574 26.905 45.732 26.623 C 45.92 26.297 46.13 25.984 46.361 25.686 C 46.923 24.952 47.546 24.268 48.224 23.64 C 48.563 23.337 48.879 23.091 49.169 22.901 C 49.468 22.713 49.717 22.615 49.916 22.612 C 50.115 22.606 50.269 22.669 50.375 22.796 C 50.487 22.935 50.546 23.108 50.544 23.286 C 50.551 23.424 50.527 23.562 50.475 23.691 C 50.426 23.796 50.319 23.88 50.155 23.945 C 50.001 24.01 49.759 24.049 49.43 24.066 C 49.099 24.343 48.746 24.659 48.373 25.015 C 48.017 25.353 47.683 25.712 47.372 26.092 C 47.107 26.404 46.891 26.755 46.733 27.133 C 47.07 27.017 47.415 26.927 47.766 26.863 C 48.181 26.774 48.599 26.726 49.024 26.716 C 49.691 26.7 50.189 26.839 50.517 27.136 C 50.852 27.422 51.026 27.809 51.037 28.293 C 51.045 28.605 50.954 28.932 50.761 29.275 C 50.579 29.609 50.335 29.923 50.029 30.215 C 49.737 30.499 49.406 30.739 49.045 30.928 C 48.738 31.106 48.393 31.208 48.038 31.225 Z M 54.318 30.921 C 53.807 30.934 53.4 30.748 53.096 30.365 C 52.792 29.983 52.633 29.478 52.619 28.854 C 52.615 28.613 52.64 28.373 52.693 28.138 C 52.755 27.877 52.836 27.64 52.936 27.429 C 52.869 27.361 52.818 27.278 52.788 27.186 C 52.747 27.052 52.726 26.912 52.726 26.772 C 52.693 25.846 53.011 24.942 53.615 24.24 C 53.894 23.914 54.205 23.659 54.547 23.477 C 54.898 23.295 55.255 23.202 55.619 23.193 C 56.217 23.18 56.707 23.384 57.09 23.809 C 57.473 24.225 57.675 24.87 57.694 25.746 C 57.706 26.203 57.647 26.674 57.52 27.154 C 57.401 27.635 57.228 28.101 57.006 28.545 C 56.802 28.975 56.545 29.378 56.241 29.745 C 55.978 30.076 55.665 30.365 55.313 30.599 C 54.988 30.807 54.656 30.913 54.318 30.921 Z M 53.784 26.968 C 53.841 27.047 53.871 27.142 53.868 27.24 C 53.871 27.37 53.847 27.5 53.799 27.63 C 53.759 27.762 53.715 27.942 53.669 28.166 C 53.621 28.394 53.604 28.715 53.613 29.131 C 53.623 29.547 53.793 29.75 54.12 29.742 C 54.484 29.734 54.82 29.583 55.125 29.29 C 55.431 28.988 55.699 28.605 55.931 28.139 C 56.163 27.675 56.337 27.181 56.455 26.657 C 56.581 26.127 56.639 25.626 56.628 25.158 C 56.62 24.855 56.559 24.645 56.444 24.526 C 56.328 24.399 56.122 24.338 55.829 24.344 C 55.526 24.352 55.211 24.464 54.887 24.68 C 54.564 24.894 54.295 25.181 54.101 25.517 C 53.893 25.868 53.793 26.261 53.802 26.695 C 53.805 26.79 53.798 26.881 53.784 26.968 Z M 63.382 30.891 C 63.232 30.894 63.091 30.825 63.001 30.705 C 62.893 30.577 62.837 30.388 62.832 30.136 C 62.834 29.713 62.867 29.291 62.931 28.872 C 63.014 28.325 63.136 27.598 63.296 26.692 C 63.075 27.253 62.828 27.783 62.554 28.283 C 62.287 28.784 62.002 29.193 61.698 29.513 C 61.393 29.832 61.077 29.996 60.747 30.003 C 60.421 30.009 60.108 29.88 59.881 29.647 C 59.632 29.4 59.5 28.962 59.486 28.329 C 59.478 27.974 59.499 27.575 59.548 27.132 C 59.599 26.679 59.665 26.232 59.751 25.787 C 59.837 25.344 59.922 24.948 60.009 24.598 C 60.068 24.33 60.149 24.067 60.251 23.813 C 60.286 23.707 60.346 23.611 60.427 23.535 C 60.495 23.478 60.582 23.449 60.671 23.451 C 60.815 23.456 60.953 23.508 61.065 23.598 C 61.205 23.698 61.28 23.871 61.286 24.113 C 61.272 24.259 61.245 24.404 61.204 24.545 C 61.157 24.762 61.095 25.032 61.016 25.355 C 60.939 25.694 60.864 26.033 60.792 26.374 C 60.714 26.74 60.649 27.106 60.597 27.471 C 60.555 27.803 60.536 28.138 60.542 28.473 C 60.546 28.638 60.567 28.772 60.604 28.876 C 60.641 28.979 60.728 29.028 60.867 29.026 C 60.988 29.022 61.138 28.897 61.313 28.65 C 61.498 28.403 61.694 28.078 61.902 27.675 C 62.118 27.262 62.336 26.807 62.559 26.307 C 62.79 25.807 63.012 25.295 63.226 24.77 C 63.447 24.244 63.648 23.745 63.828 23.273 C 63.893 23.116 63.964 23.018 64.042 22.982 C 64.12 22.936 64.209 22.912 64.299 22.911 C 64.46 22.909 64.614 22.977 64.721 23.096 C 64.854 23.218 64.929 23.391 64.926 23.572 C 64.93 23.702 64.909 23.928 64.865 24.25 C 64.829 24.572 64.773 24.95 64.696 25.386 C 64.628 25.812 64.548 26.265 64.454 26.743 C 64.371 27.223 64.285 27.697 64.202 28.166 C 64.125 28.59 64.044 29.012 63.959 29.434 C 63.89 29.817 63.831 30.126 63.786 30.361 C 63.747 30.579 63.69 30.718 63.613 30.781 C 63.555 30.848 63.471 30.888 63.382 30.891 Z M 67.759 30.176 C 67.507 30.183 67.278 30.046 67.072 29.764 C 66.867 29.483 66.758 29.117 66.747 28.666 C 66.74 28.131 66.793 27.598 66.906 27.076 C 67.031 26.509 67.187 25.934 67.371 25.348 C 67.557 24.755 67.739 24.183 67.917 23.632 C 67.948 23.532 68.01 23.444 68.093 23.381 C 68.209 23.31 68.345 23.275 68.482 23.281 C 68.794 23.273 68.952 23.421 68.96 23.724 C 68.96 23.795 68.93 23.951 68.866 24.195 C 68.803 24.439 68.719 24.741 68.614 25.098 C 68.519 25.456 68.419 25.845 68.316 26.263 C 68.212 26.673 68.124 27.086 68.047 27.505 C 67.969 27.922 67.917 28.309 67.891 28.666 C 68.028 28.515 68.177 28.286 68.344 27.978 C 68.519 27.671 68.705 27.324 68.904 26.938 C 69.104 26.544 69.311 26.149 69.528 25.754 C 69.743 25.349 69.96 24.98 70.178 24.646 C 70.403 24.303 70.623 24.029 70.835 23.824 C 71.056 23.611 71.26 23.502 71.451 23.497 C 71.71 23.484 71.963 23.571 72.159 23.741 C 72.362 23.901 72.521 24.192 72.634 24.614 C 72.756 25.027 72.826 25.615 72.844 26.378 C 72.855 26.785 72.902 27.165 72.987 27.519 C 73.062 27.83 73.207 28.12 73.411 28.367 C 73.606 28.571 73.853 28.668 74.147 28.662 C 74.589 28.651 74.982 28.564 75.323 28.4 C 75.638 28.245 75.935 28.055 76.207 27.834 C 76.462 27.619 76.675 27.432 76.844 27.272 C 77.013 27.103 77.146 27.017 77.242 27.016 C 77.441 27.011 77.543 27.112 77.548 27.32 C 77.55 27.407 77.488 27.548 77.363 27.741 C 77.213 27.967 77.044 28.18 76.857 28.377 C 76.629 28.623 76.383 28.85 76.119 29.057 C 75.846 29.271 75.552 29.452 75.235 29.598 C 74.927 29.745 74.611 29.821 74.291 29.829 C 73.693 29.842 73.201 29.738 72.814 29.512 C 72.436 29.287 72.15 28.907 71.956 28.374 C 71.769 27.841 71.665 27.125 71.644 26.224 C 71.633 25.73 71.595 25.371 71.527 25.147 C 71.472 24.914 71.368 24.76 71.218 24.686 C 71.082 24.945 70.954 25.208 70.835 25.475 C 70.677 25.808 70.495 26.181 70.289 26.593 C 70.09 27.006 69.878 27.423 69.654 27.844 C 69.45 28.236 69.229 28.618 68.991 28.991 C 68.8 29.297 68.581 29.586 68.336 29.851 C 68.124 30.064 67.933 30.172 67.759 30.176 Z M 81.632 23.61 C 81.853 23.041 82.06 22.456 82.254 21.852 C 82.457 21.249 82.637 20.634 82.796 20.006 C 82.834 19.85 82.911 19.705 83.019 19.585 C 83.118 19.475 83.258 19.411 83.406 19.407 C 83.505 19.403 83.601 19.443 83.668 19.518 C 83.75 19.599 83.796 19.711 83.793 19.827 C 83.797 19.992 83.738 20.279 83.617 20.689 C 83.506 21.1 83.363 21.618 83.186 22.246 C 83.019 22.874 82.849 23.598 82.679 24.417 C 82.515 25.227 82.38 26.123 82.273 27.106 C 82.174 28.087 82.138 29.134 82.164 30.241 C 82.178 30.451 82.129 30.661 82.022 30.843 C 81.922 31.011 81.799 31.095 81.652 31.099 C 81.565 31.101 81.48 31.08 81.404 31.039 C 81.324 30.998 81.253 30.896 81.188 30.733 C 81.114 30.492 81.065 30.245 81.041 29.996 C 80.99 29.53 80.961 29.061 80.955 28.593 C 80.945 28.142 80.959 27.652 80.999 27.123 C 80.649 27.803 80.228 28.445 79.743 29.037 C 79.298 29.577 78.859 29.994 78.433 30.291 C 78.017 30.586 77.656 30.738 77.353 30.746 C 77.009 30.766 76.674 30.636 76.434 30.389 C 76.202 30.152 76.081 29.791 76.07 29.305 C 76.065 28.851 76.157 28.402 76.337 27.986 C 76.527 27.531 76.779 27.082 77.099 26.642 C 77.73 25.764 78.482 24.981 79.333 24.315 C 79.734 24.001 80.105 23.758 80.448 23.587 C 80.79 23.405 81.069 23.311 81.287 23.306 C 81.373 23.304 81.458 23.334 81.523 23.392 C 81.591 23.444 81.631 23.524 81.632 23.61 Z M 81.472 24.017 C 81.406 24.085 81.333 24.148 81.255 24.204 C 81.171 24.266 81.076 24.334 80.975 24.406 C 80.555 24.718 80.141 25.04 79.736 25.37 C 79.294 25.728 78.869 26.119 78.462 26.545 C 78.083 26.938 77.757 27.378 77.492 27.854 C 77.242 28.312 77.124 28.777 77.134 29.255 C 77.14 29.463 77.246 29.564 77.454 29.559 C 77.74 29.552 78.05 29.411 78.381 29.135 C 78.72 28.849 79.067 28.459 79.42 27.965 C 79.771 27.463 80.122 26.878 80.47 26.211 C 80.819 25.535 81.153 24.805 81.471 24.017 Z M 86.394 26.827 C 86.316 26.827 86.246 26.791 86.184 26.714 C 86.125 26.612 86.096 26.496 86.098 26.379 C 86.103 26.077 86.131 25.777 86.181 25.479 C 86.249 25.062 86.337 24.578 86.446 24.03 C 86.563 23.472 86.697 22.892 86.847 22.29 C 87.007 21.689 87.174 21.1 87.352 20.522 C 87.529 19.937 87.707 19.417 87.888 18.962 C 88.01 18.657 88.167 18.502 88.357 18.497 C 88.557 18.493 88.741 18.584 88.91 18.77 C 89.081 18.962 89.175 19.21 89.174 19.467 C 89.176 19.571 89.128 19.766 89.031 20.054 C 88.942 20.343 88.821 20.693 88.667 21.104 C 88.52 21.514 88.356 21.956 88.177 22.43 L 87.625 23.873 C 87.446 24.354 87.28 24.809 87.125 25.236 C 86.969 25.665 86.848 26.036 86.761 26.35 C 86.729 26.486 86.675 26.615 86.6 26.731 C 86.549 26.793 86.474 26.828 86.394 26.826 Z M 85.718 30.717 C 85.588 30.721 85.453 30.651 85.31 30.506 C 85.168 30.362 85.092 30.064 85.081 29.615 C 85.076 29.362 85.154 29.175 85.315 29.049 C 85.496 28.909 85.719 28.835 85.947 28.84 C 86.389 28.829 86.615 29.054 86.627 29.513 C 86.634 29.719 86.585 29.922 86.484 30.101 C 86.396 30.273 86.271 30.422 86.117 30.539 C 86.009 30.643 85.868 30.706 85.718 30.717 Z" fill="rgba(0, 0, 0, 0.35)"/>
                  <path d="M 36.4 19.5 C 28.01 25.174 22.136 28.17 11.83 26.361 C 9.329 25.922 5.218 25.503 3.211 23.833 C 2.071 22.884 0.303 22.797 2.525 21.987 C 4.355 21.321 7.008 20.221 8.999 20.221 C 9.719 20.221 2.677 21.978 0.51 22.429 C -2.261 23.005 7.098 31.082 8.614 32.5" fill="transparent" strokeWidth="1.04" stroke="rgba(0, 0, 0, 0.35)" strokeLinecap="round" strokeMiterlimit="10"/>
                </svg>
              </div>
            </div>

            {/* framer-nqq7nl gap:24 — "Core flows" label + flow items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <p style={sectionLabel}>Core flows</p>

              {/* framer-1ki6eyr gap:52 — 6 flow cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 52 }}>
                {([
                  {
                    num: '01', title: 'TEXT ENTRY',
                    heading: 'A simple place for your thoughts.',
                    body: 'Plans, reflections, or brain dumps — write whatever calls to you in the moment. This space is a living archive of your life but without the clutter. Your entry will be automatically tagged with emotions and topics based on what you write.',
                    video: 'https://framerusercontent.com/assets/GdJOJCUgBbwnzlpOwYSlbEBRDk.mp4',
                  },
                  {
                    num: '02', title: 'ENTRIES',
                    heading: 'Revisit entries by what emotions emerged in them.',
                    body: 'With theme tags, you can sort through your entries by the emotions captured in them, discovering how they connect to larger patterns in your thinking.',
                    video: 'https://framerusercontent.com/assets/CxE7HR8cC55iy8eYhN3x0dO1gM.mp4',
                  },
                  {
                    num: '03', title: 'THEMES & INSIGHTS',
                    heading: 'See what patterns and topics have been on your mind.',
                    body: "Recurring or notable ideas appear as theme orbs in the Themes Layer, where size indicates how often you've written about the topic. Use the timeline to see when themes emerged or how they grew.",
                    video: 'https://framerusercontent.com/assets/2frfO148GUQNItNHj1Nv2NlU.mp4',
                  },
                  {
                    num: '04', title: 'PERSONA',
                    heading: "A bird's eye view of who you are.",
                    body: "Your persona is an evolving monthly reflection of you. Expressed through color, motion, and a summary, it captures who you are through your writing, giving you both a quick understanding of yourself and a fun, personal keepsake. Return to past personas to see how you've changed.",
                    video: 'https://framerusercontent.com/assets/haoKZam3ncTPoJzkeoVskKkwWA.mp4',
                  },
                  {
                    num: '05', title: 'ASK AI + FORTUNE',
                    heading: "Find answers about yourself and who you're becoming.",
                    body: 'Ask questions without digging, like "What have I been stressed about?". You can also find a gentle forecast of what you may be moving toward based on your entries and their emerging patterns.',
                    video: 'https://framerusercontent.com/assets/meQs8AgqI0IX7f1VNaeNmpmkjCY.mp4',
                  },
                  {
                    num: '06', title: 'NAVIGATION',
                    heading: 'Move through layers to see different depths of yourself.',
                    body: 'Zoom seamlessly from a high-level summary of who you are to the writing behind it. Every insight and pattern traces back to the original notes that created it.',
                    video: 'https://framerusercontent.com/assets/TLnT0l7sPGWVwqK68tog9JxOfU.mp4',
                  },
                ] as const).map(flow => (
                  // framer-1gi8a2x gap:18
                  <div key={flow.num} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

                    {/* framer-16r1ig8 — card */}
                    {/* bg:rgba(0,0,0,0.03), border:1px solid rgba(0,0,0,0.05), border-radius:8, overflow:hidden, position:relative */}
                    <div style={{
                      position: 'relative',
                      background: 'rgba(0,0,0,0.03)',
                      border: '1px solid rgba(0,0,0,0.05)',
                      borderRadius: 8,
                      overflow: 'hidden',
                    }}>

                      {/* framer-5p6enx — label absolutely overlaid top-left of video */}
                      <h5 style={{ ...flowLabel, position: 'absolute', top: 20, left: 20, zIndex: 1 }}>
                        {flow.num} {flow.title}
                      </h5>

                      {/* framer-n8u0fq — video container: aspect-ratio:1.30455, bg:#f4f4f4 */}
                      <div style={{ width: '100%', aspectRatio: '1.30455', background: '#f4f4f4', overflow: 'hidden' }}>
                        <video
                          src={flow.video}
                          autoPlay muted loop playsInline preload="none"
                          style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }}
                        />
                      </div>

                      {/* framer-608d8k — divider: 1px, width:92%, bg:rgba(0,0,0,0.05) */}
                      <div style={{ height: 1, width: '92%', margin: '0 auto', background: 'rgba(0,0,0,0.05)' }} />

                      {/* framer-1kqxrx9 — text block: padding:24, gap:6 */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: 24 }}>
                        <h6 style={flowHeading}>{flow.heading}</h6>
                        <p style={{ ...bodyText, color: 'rgba(0,0,0,0.45)' }}>{flow.body}</p>
                      </div>

                    </div>
                  </div>
                ))}
              </div>

            </div>

          </section>

          {/* ════ COMPETITIVE ANALYSIS ══════════════════════════════════════ */}
          {/* framer-1xa5sv5 gap:52 */}
          <section id="research" style={{ display: 'flex', flexDirection: 'column', gap: 52, marginTop: 100 }}>

            {/* framer-b0lvjl gap:30 — label + heading block */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
              <p style={sectionLabel}>Competitive Analysis</p>

              {/* framer-x1p9aa gap:20 — h2 + content */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <h2 style={sectionH2}>Understand why journaling apps fail.</h2>

                {/* framer-jm3mu0 gap:6 — h4 + body */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <h4 style={sectionH4}>Too much direction, too little you</h4>
                  <p style={bodyText}>
                    These apps take control, limiting space for self-led reflection. Predefined selections feels mindless, overwhelming features dilute user intention, and excessive nudging feels disingenuous.
                  </p>
                </div>
              </div>
            </div>

            {/* framer-1rwgstg — blue card; position:relative so annotation is contained */}
            <div style={{
              position: 'relative', overflow: 'visible',
              display: 'flex', flexDirection: 'row', gap: 30,
              padding: '40px 30px',
              background: '#ebf3ff',
              border: '1px solid rgba(0,0,0,0.05)',
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {([
                { src: 'https://framerusercontent.com/images/yOsMzlTlHqK7xAUoDWlta4hg.png',     popup: 'https://framerusercontent.com/images/zGK0nXK7YjF9U1hzHzCB5iHug.png' },
                { src: 'https://framerusercontent.com/images/4X2I3KeqMdfj7kA4NudLby40IbY.png',  popup: 'https://framerusercontent.com/images/EKCtJFCARyGT6t6no5avIDfwUWY.png' },
                { src: 'https://framerusercontent.com/images/RJLpWEFlBg7CjXSR64S5p1IQOYY.png',  popup: 'https://framerusercontent.com/images/xcjQuxE3rSJo4HmiK67r7tphs.png' },
                { src: 'https://framerusercontent.com/images/G5SnSYDX0UpPr7CPBVQWZLAUcE.png',  popup: 'https://framerusercontent.com/images/o2o8Ti2xrM8bxy24nbqWMsCDwA0.png' },
              ] as const).map(({ src, popup }, i) => (
                <div key={i} style={{ flexShrink: 0, position: 'relative', overflow: 'visible' }}>
                  <div
                    style={{ position: 'relative', width: 50, height: 50, overflow: 'visible', flexShrink: 0 }}
                    onMouseEnter={() => setHoveredC1(i)}
                    onMouseLeave={() => setHoveredC1(null)}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" style={{ width: 50, height: 50, borderRadius: 11, display: 'block', objectFit: 'cover' }} />
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredC1 === i ? 1 : 0 }}
                      transition={{ duration: 0.2, ease: 'easeInOut' }}
                      style={{ position: 'absolute', top: 65, left: -333, zIndex: 3, pointerEvents: 'none', width: 324 }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={popup} alt="" style={{ width: '100%', display: 'block', borderRadius: 12 }} />
                    </motion.div>
                  </div>
                </div>
              ))}

              {/* framer-75koya — annotation inside the card, top:50% left:113% translate(-50%,-50%) */}
              <div style={{
                position: 'absolute', top: '50%', left: 'calc(100% + 20px)',
                transform: 'translateY(-50%)',
                display: 'flex', flexDirection: 'row', gap: 10,
                alignItems: 'center', width: 'min-content',
                pointerEvents: 'none',
              }}>
                <svg viewBox="0 0 17.101 20.082" width={23} height={23} overflow="visible" aria-hidden="true" style={{ flexShrink: 0 }}>
                  <path d="M 6.75 0 C 7.164 0 7.5 0.336 7.5 0.75 L 7.5 3.25 C 7.5 3.664 7.164 4 6.75 4 C 6.336 4 6 3.664 6 3.25 L 6 0.75 C 6 0.336 6.336 0 6.75 0 Z M 1.97 1.97 C 2.263 1.678 2.737 1.678 3.03 1.97 L 4.78 3.72 C 4.981 3.907 5.063 4.189 4.995 4.454 C 4.928 4.72 4.72 4.928 4.454 4.995 C 4.189 5.063 3.907 4.981 3.72 4.78 L 1.97 3.03 C 1.678 2.737 1.678 2.263 1.97 1.97 Z M 11.53 1.97 C 11.822 2.263 11.822 2.737 11.53 3.03 L 9.78 4.78 C 9.593 4.981 9.311 5.063 9.046 4.995 C 8.78 4.928 8.572 4.72 8.505 4.454 C 8.437 4.189 8.519 3.907 8.72 3.72 L 10.47 1.97 C 10.763 1.678 11.237 1.678 11.53 1.97 Z M 0 6.75 C 0 6.336 0.336 6 0.75 6 L 3.25 6 C 3.664 6 4 6.336 4 6.75 C 4 7.164 3.664 7.5 3.25 7.5 L 0.75 7.5 C 0.336 7.5 0 7.164 0 6.75 Z M 6 7.487 C 6 6.36 7.322 5.752 8.177 6.486 L 16.638 13.738 C 17.548 14.518 17.03 16.009 15.833 16.058 L 11.993 16.211 C 11.58 16.227 11.192 16.411 10.916 16.718 L 8.302 19.64 C 7.495 20.543 6 19.971 6 18.76 Z" fill="rgba(0,0,0,0.35)" />
                </svg>
                <p style={{ fontFamily: SANS, fontSize: 12.8, fontWeight: 500, letterSpacing: '0.008em', lineHeight: '1.4em', color: 'rgba(0,0,0,0.35)', margin: 0, width: 73, wordBreak: 'break-word' }}>
                  Hover to see breakdown
                </p>
              </div>
            </div>

            {/* framer-k5i85n — "On the other hand…" content block, sits ABOVE the pink card */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
              <h3 style={{
                fontFamily: SERIFM, fontSize: 18.4, fontWeight: 500,
                letterSpacing: '-0.008em', lineHeight: '1.4em',
                color: 'rgba(0,0,0,0.45)', margin: 0,
              }}>
                On the other hand…
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <h4 style={sectionH4}>Tools that feel like yours</h4>
                <p style={bodyText}>
                  The apps people love taught us what to build: Spotify Wrapped, personality tests, curated spaces. They take passive data and turn it into something affirming, making users feel present, seen, and surprised. That&apos;s what was missing from journaling apps.
                </p>
              </div>
            </div>

            {/* framer-1rqkq0j / framer-3l0ku3 — pink card; position:relative so annotation is contained */}
            <div style={{
              position: 'relative', overflow: 'visible',
              display: 'flex', flexDirection: 'row', gap: 30,
              padding: 40,
              background: '#fff7ff',
              border: '1px solid rgba(0,0,0,0.05)',
              borderRadius: 8,
              alignItems: 'center',
            }}>
              {([
                { src: 'https://framerusercontent.com/images/fTCbOk9HCmFiFis0lXL6MVbWro.png',  popup: null },
                { src: 'https://framerusercontent.com/images/EvG0rueg5cuZuwWqp0VtwyO7KI.png',  popup: 'https://framerusercontent.com/images/hBMqPMCGkdfP32gNBwrebRPmAY.png' },
                { src: 'https://framerusercontent.com/images/Gm9kR8IT3TVehfbTrHw6Ypfj4.png',  popup: 'https://framerusercontent.com/images/o7lPpLwgliIbqTZviHUMTriaA4.png' },
                { src: 'https://framerusercontent.com/images/cv0eA6lEl3dMEHDYMHsgiZUis.png',   popup: 'https://framerusercontent.com/images/UvqFdzRZPNJAk9DCv3VRWqfMPU.png' },
                { src: 'https://framerusercontent.com/images/oKk0snbA80Gl62haHizWsPGTI.png',   popup: 'https://framerusercontent.com/images/HcnRdMhK1O2I5mvLGu1Kt66ZZLc.png' },
                { src: 'https://framerusercontent.com/images/V3zaOEUWA8xHm6hkEPq28kS41nQ.png', popup: 'https://framerusercontent.com/images/0jDpNhr7BjtrrYRCNMHJcjCgcN8.png' },
              ] as const).map(({ src, popup }, i) => (
                <div
                  key={i}
                  style={{ flex: '1 0 0', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', overflow: 'visible' }}
                >
                  <div
                    style={{ position: 'relative', width: 50, height: 50, overflow: 'visible', flexShrink: 0 }}
                    onMouseEnter={() => setHoveredC2(i)}
                    onMouseLeave={() => setHoveredC2(null)}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" style={{ width: 50, height: 50, borderRadius: 10, display: 'block', objectFit: 'cover' }} />
                    {popup && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredC2 === i ? 1 : 0 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        style={{ position: 'absolute', top: 65, left: -333, zIndex: 3, pointerEvents: 'none', width: 324 }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={popup} alt="" style={{ width: '100%', display: 'block', borderRadius: 12 }} />
                      </motion.div>
                    )}
                  </div>
                </div>
              ))}

              {/* framer-1ysa99t — annotation inside the card, top:50% left:113% translate(-50%,-50%) */}
              <div style={{
                position: 'absolute', top: '50%', left: 'calc(100% + 20px)',
                transform: 'translateY(-50%)',
                display: 'flex', flexDirection: 'row', gap: 10,
                alignItems: 'center', width: 'min-content',
                pointerEvents: 'none',
              }}>
                <svg viewBox="0 0 17.101 20.082" width={23} height={23} overflow="visible" aria-hidden="true" style={{ flexShrink: 0 }}>
                  <path d="M 6.75 0 C 7.164 0 7.5 0.336 7.5 0.75 L 7.5 3.25 C 7.5 3.664 7.164 4 6.75 4 C 6.336 4 6 3.664 6 3.25 L 6 0.75 C 6 0.336 6.336 0 6.75 0 Z M 1.97 1.97 C 2.263 1.678 2.737 1.678 3.03 1.97 L 4.78 3.72 C 4.981 3.907 5.063 4.189 4.995 4.454 C 4.928 4.72 4.72 4.928 4.454 4.995 C 4.189 5.063 3.907 4.981 3.72 4.78 L 1.97 3.03 C 1.678 2.737 1.678 2.263 1.97 1.97 Z M 11.53 1.97 C 11.822 2.263 11.822 2.737 11.53 3.03 L 9.78 4.78 C 9.593 4.981 9.311 5.063 9.046 4.995 C 8.78 4.928 8.572 4.72 8.505 4.454 C 8.437 4.189 8.519 3.907 8.72 3.72 L 10.47 1.97 C 10.763 1.678 11.237 1.678 11.53 1.97 Z M 0 6.75 C 0 6.336 0.336 6 0.75 6 L 3.25 6 C 3.664 6 4 6.336 4 6.75 C 4 7.164 3.664 7.5 3.25 7.5 L 0.75 7.5 C 0.336 7.5 0 7.164 0 6.75 Z M 6 7.487 C 6 6.36 7.322 5.752 8.177 6.486 L 16.638 13.738 C 17.548 14.518 17.03 16.009 15.833 16.058 L 11.993 16.211 C 11.58 16.227 11.192 16.411 10.916 16.718 L 8.302 19.64 C 7.495 20.543 6 19.971 6 18.76 Z" fill="rgba(0,0,0,0.35)" />
                </svg>
                <p style={{ fontFamily: SANS, fontSize: 12.8, fontWeight: 500, letterSpacing: '0.008em', lineHeight: '1.4em', color: 'rgba(0,0,0,0.35)', margin: 0, width: 73, wordBreak: 'break-word' }}>
                  Hover to see breakdown
                </p>
              </div>
            </div>

          </section>

          {/* ════ USER RESEARCH ════════════════════════════════════════════════ */}
          {/* framer-porx15 — col, gap:52, marginTop:100 from parent gap */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 52, marginTop: 100 }}>

            {/* framer-1i2iuye — heading-and-label, col, gap:30 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
              <p style={sectionLabel}>User Research</p>
              <h2 style={sectionH2}>I surveyed 19 people to understand what was missing in their journaling.</h2>
            </div>

            {/* framer-1p5r23d/framer-qo33zv — content-wrapper, col, gap:30 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>

              {/* framer-qo33zv — KEY INSIGHTS overline */}
              <h5 style={flowLabel}>KEY INSIGHTS</h5>

              {/* ── insight-one — framer-1m7en23, col, gap:30, pb:40 ── */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 30, paddingBottom: 40 }}>

                {/* framer-1y6rb38 — two insight rows, col, gap:24 */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

                  {/* framer-1wlitmk — row, gap:19 */}
                  <div style={{ display: 'flex', flexDirection: 'row', gap: 19, width: '100%', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: 13, height: 13, flexShrink: 0, paddingTop: 11, overflow: 'visible' }}>
                      <svg viewBox="0 0 6 10" width={6} height={10} overflow="visible" fill="transparent" style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}>
                        <path d="M 3 0 L 3 10 M 0 6.552 C 0 6.552 0.75 7.414 1.5 8.276 C 2.25 9.138 3 10 3 10 L 6 6.552" strokeWidth="1.26" stroke="rgba(0,0,0,0.35)" />
                      </svg>
                    </div>
                    {/* framer-1801hzm — text col, gap:4 */}
                    <div style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <h6 style={{ fontFamily: SANS, fontSize: 16, fontWeight: 500, lineHeight: '1.4em', color: 'rgba(0,0,0,0.75)', margin: 0 }}>
                        Journaling feels like a chore.
                      </h6>
                      <p style={{ fontFamily: SANS, fontSize: 15.52, fontWeight: 500, letterSpacing: '0.008em', lineHeight: '1.65em', color: 'rgba(0,0,0,0.6)', margin: 0 }}>
                        Too structured, too time-consuming. Digital entries get buried and forgotten.
                      </p>
                    </div>
                  </div>

                  {/* framer-88xlrp — row, gap:19 */}
                  <div style={{ display: 'flex', flexDirection: 'row', gap: 19, width: '100%', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: 13, height: 13, flexShrink: 0, paddingTop: 11, overflow: 'visible' }}>
                      <svg viewBox="0 0 6 10" width={6} height={10} overflow="visible" fill="transparent" style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}>
                        <path d="M 3 0 L 3 10 M 0 6.552 C 0 6.552 0.75 7.414 1.5 8.276 C 2.25 9.138 3 10 3 10 L 6 6.552" strokeWidth="1.26" stroke="rgba(0,0,0,0.35)" />
                      </svg>
                    </div>
                    {/* framer-lbnr5j — text col, gap:4 */}
                    <div style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <h6 style={{ fontFamily: SANS, fontSize: 16, fontWeight: 500, lineHeight: '1.4em', color: 'rgba(0,0,0,0.75)', margin: 0 }}>
                        Forced engagement backfires
                      </h6>
                      <p style={{ fontFamily: SANS, fontSize: 15.52, fontWeight: 500, letterSpacing: '0.008em', lineHeight: '1.65em', color: 'rgba(0,0,0,0.6)', margin: 0 }}>
                        Streaks, mood check-ins, daily prompts lead to half-hearted entries people never revisit.
                      </p>
                    </div>
                  </div>

                </div>

                {/* framer-1oatcuo — questionnaire card, bg rgba(0,0,0,0.03), border 1px rgba(0,0,0,0.05), radius:8, padding:24 24 40, col, gap:40 */}
                <div style={{
                  background: 'rgba(0,0,0,0.03)',
                  border: '1px solid rgba(0,0,0,0.05)',
                  borderRadius: 8,
                  padding: '24px 24px 40px',
                  display: 'flex', flexDirection: 'column', gap: 40,
                }}>
                  {/* framer-1bxl74z — Q label + hairline, col, gap:20 */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <h5 style={flowLabel}>Q: WHAT FRUSTRATES YOU ABOUT CURRENT JOURNALING OR NOTES APPS YOU&apos;VE USED?</h5>
                    <div style={{ height: 1, background: 'rgba(0,0,0,0.08)', width: '100%' }} />
                  </div>
                  {/* framer-2rk5xa — image row, gap:21, align-items:center */}
                  <div style={{ display: 'flex', flexDirection: 'row', gap: 21, alignItems: 'center', width: '100%' }}>
                    {([
                      { src: 'https://framerusercontent.com/images/CxboID94pnqmBeJbVS45igCumSo.png', ratio: 1967 / 1722, label: 'Messy/cluttered' },
                      { src: 'https://framerusercontent.com/images/oCaJEDt7QC731m08buY0Wn6CiHY.png', ratio: 1938 / 2294, label: 'Not insightful or optimized' },
                      { src: 'https://framerusercontent.com/images/rPJLcLpLYeexwzPpUo6WWZ2K5E.png', ratio: 987 / 885,   label: 'Too much' },
                    ] as const).map(({ src, ratio, label }) => (
                      /* framer-96of3o / framer-ch08su — flex:1, col, gap:18, align-items:center */
                      <div key={label} style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'center' }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={src} alt="" style={{ width: '100%', aspectRatio: ratio, objectFit: 'cover', display: 'block' }} />
                        <p style={{ fontFamily: SANS, fontSize: 12.8, fontWeight: 500, letterSpacing: '0.008em', lineHeight: '1.4em', color: 'rgba(0,0,0,0.75)', textAlign: 'center', margin: 0 }}>
                          {label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* ── insight-two — framer-5d4ru7, col, gap:30, pb:40 ── */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 30, paddingBottom: 40 }}>

                {/* framer-13jky28 — row, gap:19 */}
                <div style={{ display: 'flex', flexDirection: 'row', gap: 19, width: '100%', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: 13, height: 13, flexShrink: 0, paddingTop: 11, overflow: 'visible' }}>
                    <svg viewBox="0 0 6 10" width={6} height={10} overflow="visible" fill="transparent" style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}>
                      <path d="M 3 0 L 3 10 M 0 6.552 C 0 6.552 0.75 7.414 1.5 8.276 C 2.25 9.138 3 10 3 10 L 6 6.552" strokeWidth="1.26" stroke="rgba(0,0,0,0.35)" />
                    </svg>
                  </div>
                  <div style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <h6 style={{ fontFamily: SANS, fontSize: 16, fontWeight: 500, lineHeight: '1.4em', color: 'rgba(0,0,0,0.75)', margin: 0 }}>
                      Stats ≠ understanding
                    </h6>
                    <p style={{ fontFamily: SANS, fontSize: 15.52, fontWeight: 500, letterSpacing: '0.008em', lineHeight: '1.65em', color: 'rgba(0,0,0,0.6)', margin: 0 }}>
                      Apps are great for tracking numbers. But they miss the why behind how you felt — not just the data point that you did.
                    </p>
                  </div>
                </div>

                {/* framer-1q3kegj — questionnaire card */}
                <div style={{
                  background: 'rgba(0,0,0,0.03)',
                  border: '1px solid rgba(0,0,0,0.05)',
                  borderRadius: 8,
                  padding: '24px 24px 40px',
                  display: 'flex', flexDirection: 'column', gap: 40,
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <h5 style={flowLabel}>Q: IF YOUR NOTES COULD REVEAL STUFF ABOUT YOU, WHAT WOULD YOU WANT IT TO REVEAL?</h5>
                    <div style={{ height: 1, background: 'rgba(0,0,0,0.08)', width: '100%' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row', gap: 21, alignItems: 'center', width: '100%' }}>
                    {([
                      { src: 'https://framerusercontent.com/images/ZF46egK2w2MQ9BCv4BD9pX3eyo.png', ratio: 2544 / 2174, label: 'Habits and behaviors' },
                      { src: 'https://framerusercontent.com/images/DALytHm2bbzLWXWZ31FoT0YJYA.png', ratio: 2806 / 2172, label: 'Growth' },
                      { src: 'https://framerusercontent.com/images/5uiX3rg0os6JZQSXp5KkzI6me4.png', ratio: 1782 / 1374, label: 'Reoccurring ideas + tasks' },
                    ] as const).map(({ src, ratio, label }) => (
                      <div key={label} style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'center' }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={src} alt="" style={{ width: '100%', aspectRatio: ratio, objectFit: 'cover', display: 'block' }} />
                        <p style={{ fontFamily: SANS, fontSize: 12.8, fontWeight: 500, letterSpacing: '0.008em', lineHeight: '1.4em', color: 'rgba(0,0,0,0.75)', textAlign: 'center', margin: 0 }}>
                          {label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* ── insight-three — col, gap:30, pb:40 ── */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 30, paddingBottom: 40 }}>

                <div style={{ display: 'flex', flexDirection: 'row', gap: 19, width: '100%', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: 13, height: 13, flexShrink: 0, paddingTop: 11, overflow: 'visible' }}>
                    <svg viewBox="0 0 6 10" width={6} height={10} overflow="visible" fill="transparent" style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}>
                      <path d="M 3 0 L 3 10 M 0 6.552 C 0 6.552 0.75 7.414 1.5 8.276 C 2.25 9.138 3 10 3 10 L 6 6.552" strokeWidth="1.26" stroke="rgba(0,0,0,0.35)" />
                    </svg>
                  </div>
                  <div style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <h6 style={{ fontFamily: SANS, fontSize: 16, fontWeight: 500, lineHeight: '1.4em', color: 'rgba(0,0,0,0.75)', margin: 0 }}>
                      People want insights about themselves.
                    </h6>
                    <p style={{ fontFamily: SANS, fontSize: 15.52, fontWeight: 500, letterSpacing: '0.008em', lineHeight: '1.65em', color: 'rgba(0,0,0,0.6)', margin: 0 }}>
                      Nuanced things like recurring thoughts or how they&apos;ve shifted over time. Something that gives back, not just takes input.
                    </p>
                  </div>
                </div>

                <div style={{
                  background: 'rgba(0,0,0,0.03)',
                  border: '1px solid rgba(0,0,0,0.05)',
                  borderRadius: 8,
                  padding: '24px 24px 40px',
                  display: 'flex', flexDirection: 'column', gap: 40,
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <h5 style={flowLabel}>Q: WHEN JOURNALING, WHAT KIND OF INSIGHTS ARE YOU HOPING TO UNCOVER ABOUT YOURSELF?</h5>
                    <div style={{ height: 1, background: 'rgba(0,0,0,0.08)', width: '100%' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'row', gap: 21, alignItems: 'center', width: '100%' }}>
                    {([
                      { src: 'https://framerusercontent.com/images/Y9epdXbth4CZhZZBP2T2PcQqHw.png', ratio: 1968 / 1682, label: 'Tracking' },
                      { src: 'https://framerusercontent.com/images/nCwhVm4hgDaTBnFR0WnPejI8QKw.png', ratio: 3894 / 2340, label: 'Self-awareness' },
                      { src: 'https://framerusercontent.com/images/GD5nphZIKjcTURNwR5PujGXMWBA.png', ratio: 1971 / 1841, label: 'Mental Health' },
                    ] as const).map(({ src, ratio, label }) => (
                      <div key={label} style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'center' }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={src} alt="" style={{ width: '100%', aspectRatio: ratio, objectFit: 'cover', display: 'block' }} />
                        <p style={{ fontFamily: SANS, fontSize: 12.8, fontWeight: 500, letterSpacing: '0.008em', lineHeight: '1.4em', color: 'rgba(0,0,0,0.75)', textAlign: 'center', margin: 0 }}>
                          {label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* ════ OPPORTUNITY ═══════════════════════════════════════════════ */}
          {/* framer-1p5r23d — col, gap:52, marginTop:100 from parent gap */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 52, marginTop: 100 }}>

            {/* framer-1s780on — heading-and-label, col, gap:30 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
              <p style={sectionLabel}>Opportunity</p>

              {/* framer-1nc5jif — heading + content block 1, col, gap:20 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <h2 style={sectionH2}>People don&apos;t need more prompts, they need meaning.</h2>

                {/* framer-3f8daf — content block 1, col, gap:6 */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <h4 style={sectionH4}>Shifting from documentation to understanding</h4>
                  <p style={bodyText}>
                    Most journaling apps approximate insight with mood sliders and surface-level stats. I wanted something more nuanced — using AI to read between the lines and pull meaning straight from the writing itself. The aim was to reveal patterns and reflections that feel genuinely tied to who the user is.
                  </p>
                </div>
              </div>
            </div>

            {/* framer-10aef4m — visual block 1, col, gap:20, align-items:center */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' }}>
              {/* framer-uh8qd3 — bg:#f7f7f7, pad:60, radius:8, border 1px rgba(0,0,0,0.08) */}
              <div style={{
                background: '#f7f7f7',
                borderRadius: 8,
                padding: 60,
                border: '1px solid rgba(0,0,0,0.08)',
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://framerusercontent.com/images/KDxnIb9F0u7IO8msRJNuxwFTSM.png"
                  alt=""
                  style={{ width: '100%', aspectRatio: 1.2358292512246327, objectFit: 'cover', display: 'block' }}
                />
              </div>
              {/* framer-13fr7nq — caption label */}
              <p style={sectionLabel}>Feature matrix with direct competitors</p>
            </div>

            {/* framer-p00v80 — content block 2, col, gap:6 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <h4 style={sectionH4}>Write to feel, not to finish.</h4>
              <p style={bodyText}>
                In addition to lacking meaningful self-insight, most competitor apps push engagement over genuine reflection. I wanted to create a space where insights emerge naturally, not because users are trying to hit a quota.
              </p>
            </div>

            {/* framer-w8kvpi — visual block 2, col, gap:20, align-items:center */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' }}>
              {/* framer-tzbqyk — bg:#f7f7f7, pad:40, radius:8, border 1px rgba(0,0,0,0.08) */}
              <div style={{
                background: '#f7f7f7',
                borderRadius: 8,
                padding: 40,
                border: '1px solid rgba(0,0,0,0.08)',
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://framerusercontent.com/images/wpaaFPhiL5yof49Q66gTPxBajXY.png"
                  alt=""
                  style={{ width: '100%', aspectRatio: 1.5603900975243812, objectFit: 'cover', display: 'block' }}
                />
              </div>
              {/* caption label */}
              <p style={sectionLabel}>Positioning matrix</p>
            </div>

          </div>

          {/* ════ IDEATION ═══════════════════════════════════════════════════ */}
          {/* framer-cs137s — col, gap:52, marginTop:100 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 52, marginTop: 100 }}>

            {/* framer-kwlz11 — heading-and-label, col, gap:30 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
              <p style={sectionLabel}>Ideation</p>
              {/* framer-hlrv39 — heading, col, gap:20 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <h2 style={sectionH2}>How might we turn every unfiltered writing into meaningful self-understanding?</h2>
              </div>
            </div>

            {/* framer-d0i1i5 — key-insights, col, gap:24 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <h5 style={flowLabel}>HIGH-LEVEL GOALS</h5>

              {/* framer-1cc90it — col, gap:10 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

                {/* framer-1a5rery — insight block 1, col, gap:10 */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {/* framer-1fnia68 — row, gap:19, align-items:flex-start */}
                  <div style={{ display: 'flex', flexDirection: 'row', gap: 19, width: '100%', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: 13, height: 13, flexShrink: 0, paddingTop: 11, overflow: 'visible' }}>
                      <svg viewBox="0 0 6 10" width={6} height={10} overflow="visible" fill="transparent" style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}>
                        <path d="M 3 0 L 3 10 M 0 6.552 C 0 6.552 0.75 7.414 1.5 8.276 C 2.25 9.138 3 10 3 10 L 6 6.552" strokeWidth="1.26" stroke="rgba(0,0,0,0.35)" />
                      </svg>
                    </div>
                    <div style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <h6 style={{ fontFamily: SANS, fontSize: 16, fontWeight: 500, lineHeight: '1.4em', color: 'rgba(0,0,0,0.75)', margin: 0 }}>
                        <span style={{ color: 'rgba(0,0,0,0.45)' }}>I want this app to feel </span>natural, intuitive, and second nature.
                      </h6>
                    </div>
                  </div>
                  {/* framer-1xekwnr — row, gap:19 */}
                  <div style={{ display: 'flex', flexDirection: 'row', gap: 19, width: '100%', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: 13, height: 13, flexShrink: 0, paddingTop: 11, overflow: 'visible' }}>
                      <svg viewBox="0 0 6 10" width={6} height={10} overflow="visible" fill="transparent" style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}>
                        <path d="M 3 0 L 3 10 M 0 6.552 C 0 6.552 0.75 7.414 1.5 8.276 C 2.25 9.138 3 10 3 10 L 6 6.552" strokeWidth="1.26" stroke="rgba(0,0,0,0.35)" />
                      </svg>
                    </div>
                    <div style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <h6 style={{ fontFamily: SANS, fontSize: 16, fontWeight: 500, lineHeight: '1.4em', color: 'rgba(0,0,0,0.75)', margin: 0 }}>
                        <span style={{ color: 'rgba(0,0,0,0.45)' }}>I want people to feel </span>fully present, without distractions or obstacles.
                      </h6>
                    </div>
                  </div>
                </div>

                {/* framer-uf5sra — insight block 2, col, gap:10 */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {/* framer-1fup30 */}
                  <div style={{ display: 'flex', flexDirection: 'row', gap: 19, width: '100%', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: 13, height: 13, flexShrink: 0, paddingTop: 11, overflow: 'visible' }}>
                      <svg viewBox="0 0 6 10" width={6} height={10} overflow="visible" fill="transparent" style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}>
                        <path d="M 3 0 L 3 10 M 0 6.552 C 0 6.552 0.75 7.414 1.5 8.276 C 2.25 9.138 3 10 3 10 L 6 6.552" strokeWidth="1.26" stroke="rgba(0,0,0,0.35)" />
                      </svg>
                    </div>
                    <div style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <h6 style={{ fontFamily: SANS, fontSize: 16, fontWeight: 500, lineHeight: '1.4em', color: 'rgba(0,0,0,0.75)', margin: 0 }}>
                        <span style={{ color: 'rgba(0,0,0,0.45)' }}>I want people to write </span>freely and honestly, without needing to make it perfect.
                      </h6>
                    </div>
                  </div>
                  {/* framer-1eyt74 */}
                  <div style={{ display: 'flex', flexDirection: 'row', gap: 19, width: '100%', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: 13, height: 13, flexShrink: 0, paddingTop: 11, overflow: 'visible' }}>
                      <svg viewBox="0 0 6 10" width={6} height={10} overflow="visible" fill="transparent" style={{ transform: 'rotate(-90deg)', flexShrink: 0 }}>
                        <path d="M 3 0 L 3 10 M 0 6.552 C 0 6.552 0.75 7.414 1.5 8.276 C 2.25 9.138 3 10 3 10 L 6 6.552" strokeWidth="1.26" stroke="rgba(0,0,0,0.35)" />
                      </svg>
                    </div>
                    <div style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <h6 style={{ fontFamily: SANS, fontSize: 16, fontWeight: 500, lineHeight: '1.4em', color: 'rgba(0,0,0,0.75)', margin: 0 }}>
                        <span style={{ color: 'rgba(0,0,0,0.45)' }}>I want people to discover </span>what matters most to them — fluidly and flexibly.
                      </h6>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* framer-1tqvzlq — content, col, gap:6 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <h4 style={sectionH4}>Exploring what our app should have</h4>
              <p style={bodyText}>
                My teammate and I whiteboarded different ways to surface insights — from abstract, build-up visuals (dots tracking progress or patterns) to prescriptive snippets and direct feedback. This helped us realize that each idea held a different tone and that we wanted to evoke one that felt insightful but not like it boxed you in.
              </p>
            </div>

            {/* framer-1pylx54 — content-wrapper, col, gap:30 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
              {/* framer-18xbyw8 — visual, row, gap:10, pad:10, bg:#f7f7f7, radius:8, border */}
              <div style={{
                display: 'flex', flexDirection: 'row', gap: 10,
                padding: 10,
                background: '#f7f7f7',
                borderRadius: 8,
                border: '1px solid rgba(0,0,0,0.08)',
              }}>
                {/* framer-1am0gu — flex:1, radius:6px, overflow:hidden */}
                <div style={{ flex: '1 0 0', borderRadius: 6, overflow: 'hidden' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://framerusercontent.com/images/4XdueX0HdTVsRUYgDu86qyeTiY4.png"
                    alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
                {/* framer-1k73t79 — flex:1, radius:6px, overflow:hidden */}
                <div style={{ flex: '1 0 0', borderRadius: 6, overflow: 'hidden' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://framerusercontent.com/images/YFyHIcZNMivgRq4Xgx6SVIqfCo.png"
                    alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
              </div>
            </div>

            {/* framer-23mot0 — content, col, gap:6 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <h4 style={sectionH4}>We landed on ideas that were essential to our goals.</h4>
              <p style={bodyText}>
                From our research, we knew users wanted to understand not just what they were thinking, but when and why. This guided our selection of signature experiences to develop further:
              </p>
            </div>

            {/* framer-1amafnv — feature cards grid, col, gap:16 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

              {/* framer-1pxvhad — row 1, gap:16 */}
              <div style={{ display: 'flex', flexDirection: 'row', gap: 16 }}>
                {/* framer-eegxmx — card 1, flex:1, col, gap:10 */}
                <div style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
                  {/* framer-z31sfp — aspect-ratio:1.19048, radius:8, border */}
                  <div style={{ width: '100%', aspectRatio: 1.19048, borderRadius: 8, border: '1px solid rgba(0,0,0,0.08)', overflow: 'hidden' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://framerusercontent.com/images/5xjBmzJKZKlLtFDswBBqT6d2Rjo.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </div>
                  <p style={sectionLabel}>Simple Entry Page</p>
                </div>
                {/* framer-tgt7nh — card 2, flex:1, col, gap:10 */}
                <div style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
                  <div style={{ width: '100%', aspectRatio: 1.19048, borderRadius: 8, border: '1px solid rgba(0,0,0,0.08)', overflow: 'hidden' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://framerusercontent.com/images/rJgA7ZHTcuzasxO6CH4xWUSK8.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </div>
                  <p style={sectionLabel}>Themes Timeline</p>
                </div>
              </div>

              {/* framer-1m0t3lw — row 2, gap:16 */}
              <div style={{ display: 'flex', flexDirection: 'row', gap: 16 }}>
                {/* framer-1qcbh84 — card 3, flex:1, col, gap:10 */}
                <div style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
                  <div style={{ width: '100%', aspectRatio: 1.19048, borderRadius: 8, border: '1px solid rgba(0,0,0,0.08)', overflow: 'hidden' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://framerusercontent.com/images/pPgId4Rmqg0GJjC6dl53y97Ho4.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </div>
                  <p style={sectionLabel}>Themes &amp; Patterns</p>
                </div>
                {/* framer-1qltxkh — card 4, flex:1, col, gap:10 */}
                <div style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
                  <div style={{ width: '100%', aspectRatio: 1.19048, borderRadius: 8, border: '1px solid rgba(0,0,0,0.08)', overflow: 'hidden' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://framerusercontent.com/images/dWy6vprWOK3i8iO3FnNv7yVfB6Y.png" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </div>
                  <p style={sectionLabel}>High-level Insights</p>
                </div>
              </div>

            </div>

          </div>

          {/* ════ UX STRATEGY ════════════════════════════════════════════════ */}
          {/* framer-cw2gqo — col, gap:52, marginTop:100 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 52, marginTop: 100 }}>

            {/* framer-b0g9k2 — heading-and-label, col, gap:30, ai:flex-start */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
              <p style={sectionLabel}>UX Strategy</p>
              {/* framer-ql3mz1 — heading, col, gap:20, ai:center */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <h2 style={sectionH2}>Defining the Noto experience.</h2>
                {/* framer-5jp3nd — content block 1, col, gap:6, ai:center */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <h4 style={sectionH4}>An unbiased but supportive space</h4>
                  <p style={bodyText}>
                    Too many AI tools act like yes-men, validating rather than offering honest reflection. We made a deliberate decision not to make a personal therapist, but instead a quiet observer that surfaces patterns as they are, leaving the mental-health realm untouched. Instead, we wanted Noto to simply reflect their true selves, whatever may show up.
                  </p>
                </div>
              </div>
            </div>

            {/* framer-1rjn2dd — visual-1, col, gap:20, ai:center */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' }}>
              {/* framer-jrco7v — #f7f7f7, pad:30px 20px 34px, radius:8, border */}
              <div style={{ width: '100%', background: '#f7f7f7', borderRadius: 8, padding: '30px 20px 34px', border: '1px solid rgba(0,0,0,0.08)' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://framerusercontent.com/images/morTEExmS0An4qNK3U9Cd4CETk.png"
                  alt=""
                  style={{ width: '100%', aspectRatio: 6640 / 3396, objectFit: 'cover', display: 'block' }}
                />
              </div>
              {/* framer-3ir36m — caption, w:auto, centers via parent ai:center */}
              <p style={sectionLabel}>UX pyramid</p>
            </div>

            {/* framer-kj1ggh — content block 2, col, gap:6 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <h4 style={sectionH4}>A purposefully stripped-down, minimal interface</h4>
              <p style={bodyText}>
                Personally, I found many existing journaling apps overwhelming, which is why I kept returning to my Notes app. To recreate that same quiet space you want to return to, we designed a dead simple entry interface.
              </p>
              {/* blank line between paragraphs — empty p matching 0.97rem line-height */}
              <p style={{ ...bodyText, visibility: 'hidden' as const }}>&nbsp;</p>
              <p style={bodyText}>
                For the insights and themes, we knew we wanted to capture the feeling — so soft shapes, subtle blurs, and generous white space to keep the mind clear and calm.
              </p>
            </div>

            {/* framer-1mbryby — visual-2, col, gap:20, ai:center */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' }}>
              {/* framer-8xbaz5 — #f7f7f7, pad:10px, radius:8, border */}
              <div style={{ width: '100%', background: '#f7f7f7', borderRadius: 8, padding: 10, border: '1px solid rgba(0,0,0,0.08)' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://framerusercontent.com/images/JYA0UAv7uHxwoe3dOvjHvF7lmCc.png"
                  alt=""
                  style={{ width: '100%', aspectRatio: 3580 / 1710, objectFit: 'cover', display: 'block' }}
                />
              </div>
              {/* framer-ghzpe2 — caption */}
              <p style={sectionLabel}>Moodboard</p>
            </div>

            {/* framer-jfjk1h — visual-3 (text-only), col, gap:20 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* framer-bjyto7 — content, col, gap:6 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <h4 style={sectionH4}>Mirroring inner reflection with spatial navigation</h4>
                <p style={bodyText}>
                  To hide clutter and keep users fully immersed on each layer, we decided to have a spatial zoom interaction to change tabs. This way, each layer feels like a &ldquo;depth of self&rdquo;: from the surface-level personality to the raw inner monologue:
                </p>
              </div>
            </div>

            {/* framer-paglm4 — visual-4, col, gap:20, ai:center */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' }}>
              {/* framer-16cnwll — #fff, pad:30px, radius:8, border */}
              <div style={{ width: '100%', background: '#fff', borderRadius: 8, padding: 30, border: '1px solid rgba(0,0,0,0.08)' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://framerusercontent.com/images/Zg5OKg79gRWqQ4mPir93BlOFfPk.png"
                  alt=""
                  style={{ width: '100%', aspectRatio: 1124 / 632, objectFit: 'cover', display: 'block' }}
                />
              </div>
              {/* framer-765c36 — caption */}
              <p style={sectionLabel}>Mental Model</p>
            </div>

            {/* framer-fpv9nm — visual-5, col, gap:20, ai:center */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' }}>
              {/* framer-6lutwi — #fafafa, pad:30px 20px 34px, radius:8, border */}
              <div style={{ width: '100%', background: '#fafafa', borderRadius: 8, padding: '30px 20px 34px', border: '1px solid rgba(0,0,0,0.08)' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://framerusercontent.com/images/19oa8ysUL9f8xR2FVIZtK5cjoOQ.png"
                  alt=""
                  style={{ width: '100%', aspectRatio: 1265 / 385, objectFit: 'cover', display: 'block' }}
                />
              </div>
              {/* framer-agsepg — caption */}
              <p style={sectionLabel}>Navigation Layers</p>
            </div>

          </div>

          {/* ════ NEXT STEPS ═════════════════════════════════════════════════ */}
          {/* framer-11xfupa — col, gap:30, marginTop:100 */}
          <div id="next-steps" style={{ display: 'flex', flexDirection: 'column', gap: 30, marginTop: 100 }}>

            {/* framer-fo9447 — heading-and-label, col, gap:30, ai:flex-start */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
              <p style={sectionLabel}>Next Steps</p>
              <h2 style={sectionH2}>What I&apos;d do next</h2>
            </div>

            {/* framer-1a1sno5 — content-wrapper, col, gap:30 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>

              {/* framer-71g87e — content 1, col, gap:6 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <h4 style={sectionH4}>Improve interactions and feature design</h4>
                <p style={bodyText}>
                  Juggling three other projects limited the time I wish I had to refine the interactions and the UI. Areas like the searchability of entries + timeline events interaction still need more care. If I revisit this project I&apos;d definitely polish the experience by thinking on a larger scale (e.g. more notes, more themes, etc.) to improve usability — or even make transformative changes to cater to a more general audience.
                </p>
              </div>

              {/* framer-1pvlqt7 — content 2, col, gap:6 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <h4 style={sectionH4}>Add an Import Notes Feature</h4>
                <p style={bodyText}>
                  Many people already have years of notes in other apps, giving them a wealth of material to generate insights from. To allow users to leverage their existing notes and adopt Noto more easily, I&apos;d build import tools that seamlessly integrate previous entries into the new system.
                </p>
              </div>

              {/* framer-1niouhd — content 3, col, gap:6 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <h4 style={sectionH4}>Develop it (in the works)</h4>
                <p style={bodyText}>
                  This is a tool I&apos;d love to use myself. With vibe-coding lowering the barrier from design to build, David and I hope to make it a reality one day.
                </p>
              </div>

            </div>
          </div>

          {/* ════ LOOKING BACK ═══════════════════════════════════════════════ */}
          {/* framer-j58py0 — col, gap:52, marginTop:100 */}
          <div id="what-i-learned" style={{ display: 'flex', flexDirection: 'column', gap: 52, marginTop: 100 }}>

            {/* framer-8yg9yo → framer-6f9dqj — heading-and-label, col, gap:30 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
              <p style={sectionLabel}>Looking back</p>
              <h2 style={sectionH2}>What I learned from Noto.</h2>
            </div>

            {/* framer-othznv — comment/blockquote, row, gap:16, ai:center */}
            <div style={{ display: 'flex', flexDirection: 'row', gap: 16, alignItems: 'center' }}>
              {/* framer-9bbg2m — accent bar, width:3, alignSelf:stretch, rgba(0,0,0,0.15) */}
              <div style={{ width: 3, alignSelf: 'stretch', background: 'rgba(0,0,0,0.15)', flexShrink: 0 }} />
              {/* pull-quote — P22 Mackinac Medium, ×1.2=19.2px, rgba(0,0,0,0.45) */}
              <p style={{ fontFamily: SERIFM, fontSize: 19.2, fontWeight: 500, lineHeight: '1.4em', letterSpacing: '-0.04em', color: 'rgba(0,0,0,0.45)', margin: 0 }}>
                I&apos;m grateful to have ended with a deeply personal project, &amp; it couldn&apos;t have been done without my amazing co-designer and the 2025 IxD cohort :-)
              </p>
            </div>

            {/* framer-lmxa3q — label-and-icon, row, gap:10, ai:center */}
            <div style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }}>
              <h5 style={flowLabel}>WHAT I LEARNED</h5>
            </div>

            {/* framer-1qx5jqb — supporting-text, col, gap:40 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>

              {/* framer-1ddybiy — item 1, row, gap:60, ai:flex-start */}
              <div style={{ display: 'flex', flexDirection: 'row', gap: 60, alignItems: 'flex-start' }}>
                {/* framer-l1bw4q — h3 col, w:28%, flex:none */}
                <div style={{ width: '28%', flexShrink: 0 }}>
                  <h3 style={{ fontFamily: SERIFM, fontSize: 15.2, fontWeight: 500, lineHeight: '1.4em', letterSpacing: '-0.008em', color: 'rgba(0,0,0,0.75)', margin: 0 }}>
                    Bringing a product mindset
                  </h3>
                </div>
                {/* framer-1xjxehs — p col, flex:1 */}
                <div style={{ flex: '1 0 0' }}>
                  <p style={{ fontFamily: SANS, fontSize: 14.08, fontWeight: 500, lineHeight: '1.7em', letterSpacing: '0.008em', color: 'rgba(0,0,0,0.45)', margin: 0 }}>
                    While this was just a school project, I approached it like a product I&apos;d pitch. Understanding the market and defining the mission gave me a taste of designing with stakes, and how that framing sharpens clarity and impact.
                  </p>
                </div>
              </div>

              {/* framer-v7lf2p — divider, 1px rgba(0,0,0,0.08) */}
              <div style={{ height: 1, width: '100%', background: 'rgba(0,0,0,0.08)' }} />

              {/* framer-rq31m → framer-xgr962 — item 2, row, gap:60, ai:flex-start */}
              <div style={{ display: 'flex', flexDirection: 'row', gap: 60, alignItems: 'flex-start' }}>
                <div style={{ width: '28%', flexShrink: 0 }}>
                  <h3 style={{ fontFamily: SERIFM, fontSize: 15.2, fontWeight: 500, lineHeight: '1.4em', letterSpacing: '-0.008em', color: 'rgba(0,0,0,0.75)', margin: 0 }}>
                    Designing for people, not just function
                  </h3>
                </div>
                <div style={{ flex: '1 0 0' }}>
                  <p style={{ fontFamily: SANS, fontSize: 14.08, fontWeight: 500, lineHeight: '1.7em', letterSpacing: '0.008em', color: 'rgba(0,0,0,0.45)', margin: 0 }}>
                    I believe at the core, people crave tools that feel made for them, not just function, but experiences that are intuitive and personal. This project reminded me that designing for humans starts with honoring that simple, human need.
                  </p>
                </div>
              </div>

              {/* framer-se6ect — divider */}
              <div style={{ height: 1, width: '100%', background: 'rgba(0,0,0,0.08)' }} />

              {/* framer-10up296 — item 3, row, gap:60, ai:flex-start */}
              <div style={{ display: 'flex', flexDirection: 'row', gap: 60, alignItems: 'flex-start' }}>
                <div style={{ width: '28%', flexShrink: 0 }}>
                  <h3 style={{ fontFamily: SERIFM, fontSize: 15.2, fontWeight: 500, lineHeight: '1.4em', letterSpacing: '-0.008em', color: 'rgba(0,0,0,0.75)', margin: 0 }}>
                    Using the free will to just create stuff
                  </h3>
                </div>
                <div style={{ flex: '1 0 0' }}>
                  <p style={{ fontFamily: SANS, fontSize: 14.08, fontWeight: 500, lineHeight: '1.7em', letterSpacing: '0.008em', color: 'rgba(0,0,0,0.45)', margin: 0 }}>
                    Much of this project felt like I was designing for myself, and in that freedom, I discovered how liberating it is to simply make. In many ways, this project became a reminder that the best work often comes when you give yourself permission to create without constraints — a fitting way to close out my time in school.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </main>
      </div>
    </div>
  )
}
