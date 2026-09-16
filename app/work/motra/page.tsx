'use client'

import { Fragment, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'

// ─── Fonts ───────────────────────────────────────────────────────────────────
const MONO   = "'Spline Sans Mono', var(--font-spline-sans-mono), monospace"
const SERIFR = "'P22 Mackinac Regular', serif"
const SERIFM = "'P22 Mackinac Medium', serif"
const SANS   = "'PP Neue Montreal Medium', sans-serif"

// ─── Nav ─────────────────────────────────────────────────────────────────────
const NAV = [
  { id: 'overview',           label: 'Overview'       },
  { id: 'problem',            label: 'Problem'        },
  { id: 'solution',           label: 'Solution'       },
  { id: 'key-design-moments', label: 'Key moments'    },
  { id: 'impact',             label: 'Impact'         },
  { id: 'next-steps',         label: 'Next Steps'     },
  { id: 'what-i-learned',     label: 'What I Learned' },
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
  color: 'var(--color-text-secondary)', lineHeight: '17.92px',
  letterSpacing: '0.1024px', margin: 0,
}
const metaValue: React.CSSProperties = {
  fontFamily: SANS, fontSize: 14.08, fontWeight: 500,
  color: 'var(--color-text-primary)', lineHeight: '22.528px', margin: 0,
}
const skillTag: React.CSSProperties = {
  fontFamily: SANS, fontSize: 12, fontWeight: 500,
  color: 'var(--color-text-primary)', lineHeight: '19.2px',
  background: 'var(--color-noto-tag-bg)', borderRadius: 5,
  padding: '5px 11px', display: 'inline-flex', alignItems: 'center',
}
const sectionH2: React.CSSProperties = {
  fontFamily: SERIFM, fontSize: 22.4, fontWeight: 500,
  letterSpacing: '-0.04em', lineHeight: '1.4em',
  color: 'var(--color-text-primary)', margin: 0,
}
const sectionH4: React.CSSProperties = {
  fontFamily: SANS, fontSize: 16.8, fontWeight: 500,
  lineHeight: '1.68em', color: 'var(--color-omro-subtitle)', margin: 0,
}
const bodyText: React.CSSProperties = {
  fontFamily: SANS, fontSize: 15.52, fontWeight: 500,
  letterSpacing: '0.008em', lineHeight: '1.65em',
  color: 'var(--color-noto-body)', margin: 0,
}
const sectionLabel: React.CSSProperties = {
  fontFamily: SANS, fontSize: 14.08, fontWeight: 500,
  letterSpacing: '0.008em', lineHeight: '1.6em',
  color: 'var(--color-text-secondary)', margin: 0,
}
const flowLabel: React.CSSProperties = {
  fontFamily: MONO, fontSize: 11.68, fontWeight: 500,
  lineHeight: '1.4em', letterSpacing: 0, color: 'var(--color-text-secondary)', margin: 0,
}

// ─── Section divider ─────────────────────────────────────────────────────────
const DIVIDER = <div style={{ height: 1, background: 'var(--color-border)', margin: '100px 0' }} />

// ─── Inline placeholder block ─────────────────────────────────────────────────
function Placeholder({ label, caption, aspectRatio = 1.6 }: {
  label: string; caption?: string; aspectRatio?: number
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{
        width: '100%', aspectRatio,
        background: 'var(--color-card-bg)', border: '1px solid var(--color-border)',
        borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '0 24px',
      }}>
        <p style={{ ...flowLabel, textAlign: 'center', opacity: 0.55, whiteSpace: 'pre-line' }}>{label}</p>
      </div>
      {caption && (
        <p style={{
          fontFamily: SANS, fontSize: 14.08, fontWeight: 500,
          letterSpacing: '0.008em', lineHeight: '1.6em',
          color: 'var(--color-text-secondary)', textAlign: 'center', margin: 0,
        }}>
          {caption}
        </p>
      )}
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function MotraPage() {
  const [activeSection, setActiveSection] = useState('')
  const [contactVisible, setContactVisible] = useState(false)
  const [backHover, setBackHover] = useState(false)
  const [themeToggleHover, setThemeToggleHover] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  const isDark = mounted && resolvedTheme === 'dark'

  useEffect(() => {
    const html = document.documentElement
    const body = document.body
    const prevHtml = html.style.overflowX
    const prevBody = body.style.overflowX
    html.style.overflowX = 'hidden'
    body.style.overflowX = 'hidden'
    return () => {
      html.style.overflowX = prevHtml
      body.style.overflowX = prevBody
    }
  }, [])

  useEffect(() => {
    if (!isDark) return
    document.body.classList.add('noto-dark-route')
    return () => document.body.classList.remove('noto-dark-route')
  }, [isDark])

  const [portalNode, setPortalNode] = useState<HTMLDivElement | null>(null)
  useEffect(() => {
    if (!isDark) {
      setPortalNode(null)
      return
    }
    const prevBodyPosition = document.body.style.position
    document.body.style.position = 'relative'
    const node = document.createElement('div')
    node.setAttribute('data-noto-bg', '')
    node.style.position = 'absolute'
    node.style.top = '0'
    node.style.left = '0'
    node.style.right = '0'
    node.style.bottom = '0'
    node.style.zIndex = '-1'
    node.style.pointerEvents = 'none'
    let target: Element | null = null
    for (const child of Array.from(document.body.children)) {
      if (child.tagName !== 'DIV') continue
      const cs = window.getComputedStyle(child as HTMLElement)
      if (cs.position !== 'fixed') continue
      if (cs.zIndex !== '-1') continue
      if (cs.backgroundImage !== 'none') continue
      target = child
      break
    }
    if (target) document.body.insertBefore(node, target)
    else document.body.appendChild(node)
    setPortalNode(node)
    return () => {
      if (node.parentNode) node.parentNode.removeChild(node)
      document.body.style.position = prevBodyPosition
      setPortalNode(null)
    }
  }, [isDark])

  useEffect(() => {
    if (!isDark) {
      document.documentElement.style.removeProperty('--noto-stars-opacity')
      return
    }
    let raf = 0
    const update = () => {
      raf = 0
      const o = Math.max(0, Math.min(1, 1 - window.scrollY / 400))
      document.documentElement.style.setProperty('--noto-stars-opacity', String(o))
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
      document.documentElement.style.removeProperty('--noto-stars-opacity')
    }
  }, [isDark])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        }
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    )
    for (const { id } of NAV) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    function check() {
      const nearBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 100
      setContactVisible(nearBottom)
    }
    check()
    window.addEventListener('scroll', check, { passive: true })
    return () => window.removeEventListener('scroll', check)
  }, [])

  function scrollTo(id: string) {
    const el = document.getElementById(id)
    if (!el) return
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 60, behavior: 'smooth' })
  }

  return (
    <div style={{ background: 'var(--color-page-bg)', minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>

      {portalNode && createPortal(
        <div aria-hidden style={{
          position: 'absolute', inset: 0, minHeight: '100%', pointerEvents: 'none',
          background: 'linear-gradient(180deg, rgb(10, 10, 10) 0%, rgb(44, 49, 77) 8%, rgb(44, 49, 77) 96%, rgb(81, 81, 112) 100%)',
        }}>
          <div style={{
            position: 'absolute', top: '75%', left: 0, right: 0, bottom: 0,
            opacity: 0.45, pointerEvents: 'none',
            background: 'linear-gradient(0deg, rgba(252, 221, 106, 0.6) 0%, rgba(252, 194, 106, 0.6) 5.97%, rgba(157, 138, 158, 0.46) 27.12%, rgba(202, 206, 227, 0.13) 41.41%, rgba(0, 0, 0, 0) 100%)',
          }} />
        </div>,
        portalNode
      )}

      {isDark && (
        <style>{`
          body.noto-dark-route .shooting-star {
            -webkit-clip-path: none !important;
            clip-path: none !important;
          }
          body.noto-dark-route > div:has(> .shooting-star) {
            filter: opacity(var(--noto-stars-opacity, 1));
          }
          body.noto-dark-route > div[aria-hidden][style*="z-index: -1"]:not([style*="linear-gradient"]):not([data-noto-bg]) {
            filter: opacity(var(--noto-stars-opacity, 1));
          }
        `}</style>
      )}

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
        .noto-email-link { transition: color 0.15s ease; }
        .noto-email-link:hover { color: rgba(255, 119, 0, 0.97) !important; }
        :root { --color-omro-subtitle: rgba(0, 0, 0, 0.75); }
        .dark { --color-omro-subtitle: rgba(255, 255, 255, 0.749); }
      `}</style>

      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: 'var(--color-inner-bg)',
        boxShadow: 'rgba(117,117,117,0.01) 0px 1px 40px 0px inset, rgba(156,156,156,0.01) 0px 0px 40px 10px inset',
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 101,
          background: 'var(--noto-top-wash)', pointerEvents: 'none', zIndex: 1,
        }} />
      </div>

      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 738,
        background: 'var(--noto-bottom-wash)', zIndex: 0, pointerEvents: 'none',
      }} />

      {/* ── Fixed: Back ─────────────────────────────────────────────────────── */}
      <Link
        href="/"
        onMouseEnter={() => setBackHover(true)}
        onMouseLeave={() => setBackHover(false)}
        style={{
          position: 'fixed', top: 20, left: 20, zIndex: 50,
          fontFamily: MONO, fontSize: 11.2, fontWeight: 400,
          color: backHover ? 'var(--color-text-primary)' : 'var(--color-status-text)',
          textDecoration: 'none',
          letterSpacing: '-0.224px', lineHeight: '15.68px',
          display: 'flex', alignItems: 'center', gap: 6,
          transition: 'color 0.2s ease',
        }}
      >
        <svg width="9" height="7" viewBox="0 0 8.5 6.812" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M 0.653 2.633 L 0.326 2.96 L 0 2.633 L 0.326 2.308 Z M 8.499 6.327 C 8.508 6.497 8.422 6.658 8.276 6.746 C 8.129 6.833 7.947 6.833 7.801 6.746 C 7.654 6.658 7.568 6.497 7.577 6.327 Z M 2.633 5.268 L 0.326 2.96 L 0.979 2.307 L 3.287 4.615 L 2.633 5.269 Z M 0.326 2.308 L 2.633 0 L 3.287 0.653 L 0.977 2.959 L 0.325 2.305 Z M 0.653 2.172 L 5.268 2.172 L 5.268 3.095 L 0.653 3.095 Z M 8.499 5.403 L 8.499 6.327 L 7.577 6.327 L 7.577 5.403 Z M 5.268 2.172 C 7.052 2.172 8.499 3.619 8.499 5.403 L 7.577 5.403 C 7.577 4.791 7.333 4.204 6.9 3.771 C 6.467 3.338 5.88 3.095 5.268 3.095 Z"/>
        </svg>
        Back
      </Link>

      {/* ── Fixed: theme toggle ──────────────────────────────────────────────── */}
      <button
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
        onMouseEnter={() => setThemeToggleHover(true)}
        onMouseLeave={() => setThemeToggleHover(false)}
        aria-label={isDark ? 'Sun mode' : 'Starry mode'}
        style={{
          position: 'fixed', top: 20, right: 20, zIndex: 50,
          background: 'none', border: 'none', padding: 0, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: 20, height: 20, color: 'var(--color-icon)',
          transform: themeToggleHover ? 'scale(1.2)' : 'scale(1)',
          transition: 'transform 0.15s ease-out',
        }}
      >
        {isDark ? <Sun size={16} strokeWidth={1.5} /> : <Moon size={16} strokeWidth={1.5} />}
      </button>

      {/* ── Page body ─────────────────────────────────────────────────────────── */}
      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Fixed left sidebar ───────────────────────────────────────────────── */}
        <aside style={{
          position: 'fixed', left: 20, top: 0,
          width: 160, height: '100vh',
          padding: '140px 0 20px 0',
          display: 'flex', flexDirection: 'column', gap: 14,
          zIndex: 10,
        }}>
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
                  color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                  transition: 'color 0.25s ease',
                }}
              >
                {label}
              </motion.button>
            )
          })}
        </aside>

        <main style={{
          width: 641,
          marginLeft: 'calc(50% - 290px)',
          marginRight: 'auto',
          padding: '150px 20px 250px',
        }}>

          {/* ════ HERO ════════════════════════════════════════════════════════ */}
          <section id="overview" style={{ display: 'flex', flexDirection: 'column', gap: 52 }}>

            {/*
              BREADCRUMB — 3 options, pick one:
              A: "Usercentrics / SST"
              B: "Usercentrics / Web App"
              C: "Usercentrics / Product"
            */}
            <p style={{
              fontFamily: MONO, fontSize: 13.28, fontWeight: 400,
              color: 'var(--color-status-text)', lineHeight: '18.592px',
              letterSpacing: '-0.5312px', margin: 0,
            }}>
              Usercentrics / SST
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {/*
                H1 — 3 options, pick one:
                A (current): "A product that didn't exist, designed from the ground up."
                B: "Designing the setup and management experience for server-side tracking."
                C: "Server-side tagging was a new category. I designed the whole thing."
              */}
              <motion.h1
                variants={titleContainer}
                initial="hidden"
                animate="visible"
                style={{
                  fontFamily: SERIFR, fontSize: 32, fontWeight: 400,
                  color: 'var(--color-text-primary)', lineHeight: '38.4px',
                  letterSpacing: '-0.04em', margin: 0,
                }}
              >
                {"Giving marketers control over their own tracking data.".split(' ').map((word, i, arr) => (
                  <Fragment key={i}>
                    <motion.span variants={titleWord} style={{ display: 'inline-block' }}>{word}</motion.span>
                    {i < arr.length - 1 && ' '}
                  </Fragment>
                ))}
              </motion.h1>

              {/*
                SUBTITLE — 3 options, pick one:
                A (current): "Designing the information architecture, setup flows, and permission model for Usercentrics' first Server-Side Tagging product."
                B: "From information architecture to day-to-day experience: designing a new category of product from scratch."
                C: "Server-side tagging was a new category for Usercentrics. I designed the entire setup experience from scratch."
              */}
              <p style={{
                fontFamily: SANS, fontSize: 15.52, fontWeight: 500,
                color: 'var(--color-noto-body)', lineHeight: '25.608px',
                letterSpacing: '0.12416px', margin: 0,
              }}>
                Building Usercentrics&apos; first Server-Side Tagging product from scratch, as the company expands into privacy-led marketing infrastructure.
              </p>
            </div>

            {/* Metadata grid */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ display: 'flex' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <p style={metaLabel}>Role</p>
                  <p style={metaValue}>Product Designer</p>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <p style={metaLabel}>Company</p>
                  <p style={metaValue}>Usercentrics</p>
                </div>
              </div>
              <div style={{ display: 'flex' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <p style={metaLabel}>Timeline</p>
                  <p style={metaValue}>2025–2026</p>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <p style={metaLabel}>Skills</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {['UX/UI Design', 'SaaS Design', '0→1 Product', 'Information Architecture', 'Privacy Tech'].map(s => (
                      <span key={s} style={skillTag}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Overview image */}
            <div style={{
              width: '100%',
              aspectRatio: '1.51053',
              background: isDark ? '#ffffff' : 'var(--color-card-bg)',
              border: isDark ? 'none' : '1px solid var(--color-border)',
              borderRadius: 8, overflow: 'hidden',
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/screens/motra/00_Thumbnail.png"
                alt="SST Server Side Tagging product overview"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>

          </section>

          {DIVIDER}

          {/* ════ OVERVIEW CONTENT ════════════════════════════════════════════ */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
            <p style={sectionLabel}>Overview</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <h2 style={sectionH2}>
                Usercentrics&apos; first product beyond consent management.
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <h4 style={sectionH4}>Building a product to give marketers cleaner data and built-in compliance</h4>
                <div>
                  <p style={bodyText}>
                    Usercentrics started as a consent management platform. As privacy regulation tightened, marketers running compliant setups started losing measurement data to browser restrictions and ad blockers. Usercentrics saw an opportunity to expand into privacy-led marketing infrastructure, and I worked on the first product in that direction: Server-Side Tagging (SST).
                  </p>
                  <p style={{ ...bodyText, marginTop: '1.65em' }}>
                    To explain simply: right now, when a visitor&apos;s browser tries to tell Google or Meta directly that something happened (like a purchase after seeing an ad), ad blockers and browser privacy settings often catch the request and block it, since they recognize known tracking domains. SST fixes this by routing that data through a server the business controls instead, a &ldquo;container&rdquo; for Google Tag Manager, a &ldquo;Signals Gateway&rdquo; for Meta, making it first-party data. The result: data that would otherwise vanish gets rescued instead. That server checks what the visitor consented to and only forwards what&apos;s allowed. This results in cleaner data, faster pages and compliance. The product didn&apos;t exist before this, and my role covered the full experience from scratch: information architecture, setup flows, built-in features, and the day-to-day management interface.
                  </p>
                </div>
              </div>
            </div>
            <div style={{
              width: '100%',
              aspectRatio: '1.51053',
              background: isDark ? '#ffffff' : 'var(--color-card-bg)',
              border: isDark ? 'none' : '1px solid var(--color-border)',
              borderRadius: 8, overflow: 'hidden',
            }}>
              <video
                autoPlay muted loop playsInline
                style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
              >
                <source src="/screens/motra/overview-slide.mp4" type="video/mp4" />
              </video>
            </div>
          </div>

          {/* ════ PROBLEM ═══════════════════════════════════════════════════ */}
          <section id="problem" style={{ display: 'flex', flexDirection: 'column', gap: 52, marginTop: 100 }}>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
              <p style={sectionLabel}>The Problem</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <h2 style={sectionH2}>
                  Building a technical product from scratch.
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <h4 style={sectionH4}>Expanding our product portfolio and making it valuable to clients</h4>
                  <div>
                    <p style={bodyText}>
                      The difficulty in this project was that there was no prior product to build on. No established flows, no feature baseline and no design to inherit from. Everything from setting up a container to inviting a teammate had to be figured out from scratch, in a space new to the company.
                    </p>
                    <p style={{ ...bodyText, marginTop: '1.65em' }}>
                      SST is also genuinely technical: containers, DNS, custom domains, and parts of the setup happening inside Google Tag Manager or Meta&apos;s interface. Also, not every marketer has these technical skills, so the product needed to support delegation by letting users handoff to a consultant or a more technical colleague. Partners also had a clear list of features they expected before they&apos;d recommend the product to clients: bot detection, geolocation headers, a resilient script loader are some examples. The stake for me was thus to build a complete product from scratch that clients would trust, find easy to use, and that would bring value to their business by fixing the data loss problem.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </section>

          {/* ════ SOLUTION ══════════════════════════════════════════════════ */}
          <section id="solution" style={{ display: 'flex', flexDirection: 'column', gap: 52, marginTop: 100 }}>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
              <p style={sectionLabel}>Solution</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <h2 style={sectionH2}>
                  A full product experience designed end to end.
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <h4 style={sectionH4}>Every surface of the product, from setup to day-to-day management.</h4>
                  <p style={bodyText}>
                    With those stakes in mind, I collaborated with my team and designed during a year and half the full product experience. Here are some artifacts and snapshots from the SST product.
                  </p>
                </div>
              </div>
            </div>

            {/* Product artifact gallery */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>

              {/* Row 1: full-width — video 3 (blue) */}
              <div style={{ gridColumn: 'span 3', borderRadius: 8, overflow: 'hidden', background: 'var(--color-card-bg)', border: '1px solid var(--color-border)' }}>
                <video autoPlay muted loop playsInline style={{ display: 'block', width: '100%' }}>
                  <source src="/screens/motra/video-overview-3.mp4" type="video/mp4" />
                </video>
              </div>

              {/* Row 2: 2/3 dark (video 4) + 1/3 placeholder */}
              <div style={{ gridColumn: 'span 2', borderRadius: 8, overflow: 'hidden', background: 'var(--color-card-bg)', border: '1px solid var(--color-border)' }}>
                <video autoPlay muted loop playsInline style={{ display: 'block', width: '100%' }}>
                  <source src="/screens/motra/video-4.mp4" type="video/mp4" />
                </video>
              </div>
              <div style={{ gridColumn: 'span 1', borderRadius: 8, background: 'var(--color-card-bg)', border: '1px solid var(--color-border)' }} />

              {/* Row 3: full-width — video 6 */}
              <div style={{ gridColumn: 'span 3', borderRadius: 8, overflow: 'hidden', background: 'var(--color-card-bg)', border: '1px solid var(--color-border)' }}>
                <video autoPlay muted loop playsInline style={{ display: 'block', width: '100%' }}>
                  <source src="/screens/motra/video-6.mp4" type="video/mp4" />
                </video>
              </div>

              {/* Row 4: 1/3 placeholder + 2/3 (video 7) */}
              <div style={{ gridColumn: 'span 1', borderRadius: 8, background: 'var(--color-card-bg)', border: '1px solid var(--color-border)' }} />
              <div style={{ gridColumn: 'span 2', borderRadius: 8, overflow: 'hidden', background: 'var(--color-card-bg)', border: '1px solid var(--color-border)' }}>
                <video autoPlay muted loop playsInline style={{ display: 'block', width: '100%' }}>
                  <source src="/screens/motra/video-12.mp4" type="video/mp4" />
                </video>
              </div>

              {/* Row 5: full-width — video 5 (dark) */}
              <div style={{ gridColumn: 'span 3', borderRadius: 8, overflow: 'hidden', background: 'var(--color-card-bg)', border: '1px solid var(--color-border)' }}>
                <video autoPlay muted loop playsInline style={{ display: 'block', width: '100%' }}>
                  <source src="/screens/motra/video-5.mp4" type="video/mp4" />
                </video>
              </div>

              {/* Row 6: full-width — video 10 */}
              <div style={{ gridColumn: 'span 3', borderRadius: 8, overflow: 'hidden', background: 'var(--color-card-bg)', border: '1px solid var(--color-border)' }}>
                <video autoPlay muted loop playsInline style={{ display: 'block', width: '100%' }}>
                  <source src="/screens/motra/video-10.mp4" type="video/mp4" />
                </video>
              </div>

              {/* Row 7: 2/3 (video 8) + 1/3 placeholder */}
              <div style={{ gridColumn: 'span 2', borderRadius: 8, overflow: 'hidden', background: 'var(--color-card-bg)', border: '1px solid var(--color-border)' }}>
                <video autoPlay muted loop playsInline style={{ display: 'block', width: '100%' }}>
                  <source src="/screens/motra/video-8.mp4" type="video/mp4" />
                </video>
              </div>
              <div style={{ gridColumn: 'span 1', borderRadius: 8, background: 'var(--color-card-bg)', border: '1px solid var(--color-border)' }} />

              {/* Row 8: full-width — video 11 */}
              <div style={{ gridColumn: 'span 3', borderRadius: 8, overflow: 'hidden', background: 'var(--color-card-bg)', border: '1px solid var(--color-border)' }}>
                <video autoPlay muted loop playsInline style={{ display: 'block', width: '100%' }}>
                  <source src="/screens/motra/video-13.mp4" type="video/mp4" />
                </video>
              </div>

            </div>

          </section>

          {/* ════ KEY DESIGN MOMENTS ════════════════════════════════════════ */}
          <section id="key-design-moments" style={{ display: 'flex', flexDirection: 'column', gap: 52, marginTop: 100 }}>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
              <p style={sectionLabel}>Key design moments</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <h2 style={sectionH2}>
                  Three flows where the details mattered most.
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <h4 style={sectionH4}>Each one addresses a different place the product could break</h4>
                  <p style={bodyText}>
                    I picked these three because each one is where a wrong decision would&apos;ve hurt the most. Here&apos;s what I built and why.
                  </p>
                </div>
              </div>
            </div>

            {/* ─── Three flow blocks ─────────────────────────────────────── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 60 }}>

              {/* 01 CREATE CONTAINER */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <h5 style={flowLabel}>01 CREATE CONTAINER</h5>
                    <div style={{ height: 1, background: 'var(--color-border)' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <h4 style={sectionH4}>One step at a time through an unfamiliar handoff.</h4>
                    <p style={bodyText}>
                      Partner interviews told me the same thing: the confusion wasn&apos;t about the product. It was about what to do inside GTM once the product handed you over. Roughly a quarter of people were completing setup, and I wanted to get that closer to half. I structured the flow one step at a time, no progress indicator front-loading the complexity. You see one thing, do it, move on. The GTM config step is the exception: it has two parts, client-side and then server-side, since both need to land independently. Custom domain setup is mandatory from the start and can&apos;t be deferred. DNS configuration and GTM config both depend on it. Skip it and nothing that follows works.
                    </p>
                  </div>
                </div>
                <Placeholder
                  label={'CREATE CONTAINER FLOW\n(video placeholder)'}
                  caption="Create container flow — placeholder, real recording to replace this."
                />
              </div>

              {/* 02 INVITE USERS */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <h5 style={flowLabel}>02 INVITE USERS</h5>
                    <div style={{ height: 1, background: 'var(--color-border)' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <h4 style={sectionH4}>Access at two scales, without the spreadsheet feeling.</h4>
                    <p style={bodyText}>
                      I needed to design access that worked at two scales at once: across an entire workspace and down to individual containers, while also letting users discover and switch between workspaces without it becoming a separate journey. Three tiers: Admin gets full access including subscription and billing, Editor can configure and create containers, Reader is view-only. My rule throughout, confirmed by partner interviews and access UX research: never hide a control someone can&apos;t use. Show it disabled and explain why. Invisible controls create more confusion than ones that are clearly off-limits.
                    </p>
                  </div>
                </div>
                <Placeholder
                  label={'INVITE USERS FLOW\n(video placeholder)'}
                  caption="Invite users flow — placeholder, real recording to replace this."
                />
              </div>

              {/* 03 LOGS */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <h5 style={flowLabel}>03 LOGS</h5>
                    <div style={{ height: 1, background: 'var(--color-border)' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <h4 style={sectionH4}>Once a container is live, something has to show it&apos;s working.</h4>
                    <p style={bodyText}>
                      I designed Request Logs to surface what server-side tracking hides: a table of what&apos;s firing and whether it&apos;s succeeding, with states for an empty table, a Free-plan cap, and the live data view.
                    </p>
                  </div>
                </div>
                <Placeholder
                  label={'LOGS FLOW\n(video placeholder)'}
                  caption="Logs flow — placeholder, real recording to replace this."
                />
              </div>

            </div>

          </section>

          {/* ════ IMPACT ═════════════════════════════════════════════════════ */}
          <section id="impact" style={{ display: 'flex', flexDirection: 'column', gap: 52, marginTop: 100 }}>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
              <p style={sectionLabel}>Impact</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <h2 style={sectionH2}>
                  The design shipped, but the outcome data isn&apos;t in yet.
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <h4 style={sectionH4}>Activation rate and onboarding success are being tracked; this section will be updated once there&apos;s real signal</h4>
                  <p style={bodyText}>
                    SST went to production while this case study was being written. The create container flow activation rate and onboarding success for invited users are both being tracked, but the data hasn&apos;t stabilized long enough to report with confidence. I&apos;ll update this section once the numbers are in.
                  </p>
                </div>
              </div>
            </div>

          </section>

          {/* ════ NEXT STEPS ═════════════════════════════════════════════════ */}
          <div id="next-steps" style={{ display: 'flex', flexDirection: 'column', gap: 30, marginTop: 100 }}>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
              <p style={sectionLabel}>Next Steps</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <h2 style={sectionH2}>From prototype to production.</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <h4 style={sectionH4}>Faithful reproduction first, design system adaptation second</h4>
                  <p style={bodyText}>
                    I handed the prototypes to the engineering team with specs ready for a faithful reproduction. From there, the plan was to adapt everything to Usercentrics&apos; Lodge design system, with usability testing running alongside. A fuller onboarding wizard for the create container flow was also scoped as a follow-up.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* ════ WHAT I LEARNED ═════════════════════════════════════════════ */}
          <div id="what-i-learned" style={{ display: 'flex', flexDirection: 'column', gap: 52, marginTop: 100 }}>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
                <p style={sectionLabel}>Looking back</p>
                <h2 style={sectionH2}>What I learned from SST.</h2>
              </div>

              {/* Pull quote */}
              <div style={{ display: 'flex', flexDirection: 'row', gap: 16, alignItems: 'center', marginTop: 12 }}>
                <div style={{ width: 3, alignSelf: 'stretch', background: 'var(--color-noto-accent)', flexShrink: 0 }} />
                <h2 style={{ fontFamily: SERIFM, fontSize: 19.2, fontWeight: 500, lineHeight: '1.4em', letterSpacing: '-0.04em', color: 'var(--color-status-text)', margin: 0 }}>
                  I kept designing for failure states I couldn&apos;t test, on a product that didn&apos;t exist yet. That shapes how you think about every decision.
                </h2>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }}>
              <h5 style={flowLabel}>WHAT I LEARNED</h5>
            </div>

            {/* Two lessons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>

              <div style={{ display: 'flex', flexDirection: 'row', gap: 60, alignItems: 'flex-start' }}>
                <div style={{ width: '28%', flexShrink: 0 }}>
                  <h3 style={{ fontFamily: SERIFM, fontSize: 15.2, fontWeight: 500, lineHeight: '1.4em', letterSpacing: '-0.008em', color: 'var(--color-text-primary)', margin: 0 }}>
                    Designing for a product you can&apos;t see in action. I had to understand it before I could simplify it.
                  </h3>
                </div>
                <div style={{ flex: '1 0 0' }}>
                  <p style={{ fontFamily: SANS, fontSize: 14.08, fontWeight: 500, lineHeight: '1.7em', letterSpacing: '0.008em', color: 'var(--color-status-text)', margin: 0 }}>
                    Server-side tracking is invisible by design. Events fire on a server somewhere, and nothing shows up in the browser. Getting familiar enough with the product to design for it took real time, and I learned more from partner interviews than from any documentation. You can&apos;t design a setup flow for something you don&apos;t understand well enough to set up yourself.
                  </p>
                </div>
              </div>

              <div style={{ height: 1, width: '100%', background: 'var(--color-border)' }} />

              <div style={{ display: 'flex', flexDirection: 'row', gap: 60, alignItems: 'flex-start' }}>
                <div style={{ width: '28%', flexShrink: 0 }}>
                  <h3 style={{ fontFamily: SERIFM, fontSize: 15.2, fontWeight: 500, lineHeight: '1.4em', letterSpacing: '-0.008em', color: 'var(--color-text-primary)', margin: 0 }}>
                    The hardest step to design is the one that leaves your product. I spent more time on that screen than on anything I designed myself.
                  </h3>
                </div>
                <div style={{ flex: '1 0 0' }}>
                  <p style={{ fontFamily: SANS, fontSize: 14.08, fontWeight: 500, lineHeight: '1.7em', letterSpacing: '0.008em', color: 'var(--color-status-text)', margin: 0 }}>
                    The GTM handoff is a small moment in the flow, but it&apos;s the one that determined whether users activated. I spent more design time on that step than on anything else, trying to make a seam as smooth as possible when the product on either side of it is someone else&apos;s. I didn&apos;t expect that going in.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </main>
      </div>

      {/* ── Contact footer ──────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: contactVisible ? 1 : 0, y: contactVisible ? 0 : 8 }}
        transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 50, pointerEvents: contactVisible ? 'auto' : 'none' }}
      >
        <div style={{ position: 'relative', width: 165, height: 21, overflow: 'visible' }}>
          <a
            href="mailto:mathieumestre@yahoo.fr"
            target="_blank"
            rel="noopener"
            className="noto-email-link"
            style={{
              position: 'absolute', top: 0, bottom: 0, left: 0, right: 0,
              display: 'flex', alignItems: 'flex-end',
              paddingBottom: 3, paddingLeft: 2,
              fontFamily: MONO, fontSize: 12, fontWeight: 400,
              letterSpacing: '-0.02em', color: 'var(--color-text-primary)',
              textDecoration: 'none', whiteSpace: 'nowrap',
            }}
          >
            mathieumestre@yahoo.fr
          </a>
          <svg
            aria-hidden="true"
            viewBox="0 0 154 75"
            width={154}
            height={75}
            style={{ position: 'absolute', top: -61, left: -38, overflow: 'visible', pointerEvents: 'none' }}
          >
            <path
              d="M 3.132 17.031 C 2.692 17.052 2.254 16.95 1.869 16.735 C 1.527 16.525 1.245 16.231 1.05 15.88 C 0.859 15.549 0.754 15.175 0.743 14.793 C 0.716 14.053 0.84 13.315 1.106 12.624 C 1.366 11.957 1.697 11.367 2.1 10.855 C 2.477 10.369 2.904 9.923 3.372 9.524 C 3.816 9.157 4.22 8.882 4.581 8.695 C 4.95 8.5 5.214 8.399 5.372 8.395 C 5.687 8.388 5.85 8.543 5.857 8.858 C 5.86 9.006 5.765 9.181 5.573 9.382 C 5.381 9.574 5.134 9.802 4.834 10.065 C 4.535 10.328 4.217 10.627 3.878 10.962 C 3.528 11.299 3.211 11.668 2.928 12.064 C 2.625 12.477 2.382 12.931 2.205 13.413 C 2.018 13.901 1.933 14.433 1.946 15.016 C 1.961 15.608 2.209 15.898 2.692 15.886 C 3.135 15.876 3.588 15.783 4.047 15.604 C 4.515 15.425 4.974 15.197 5.422 14.92 C 5.878 14.633 6.316 14.337 6.733 14.031 C 7.15 13.725 7.527 13.435 7.866 13.161 C 8.205 12.877 8.49 12.648 8.724 12.475 C 8.956 12.302 9.122 12.215 9.22 12.212 C 9.418 12.207 9.518 12.314 9.523 12.53 C 9.527 12.698 9.419 12.923 9.199 13.204 C 8.978 13.485 8.681 13.793 8.304 14.127 C 7.927 14.462 7.505 14.802 7.039 15.148 C 6.575 15.485 6.103 15.797 5.626 16.084 C 5.185 16.344 4.725 16.573 4.251 16.768 C 3.822 16.935 3.449 17.024 3.134 17.031 Z M 17.329 17.022 C 17.042 17.03 16.838 16.941 16.715 16.756 C 16.592 16.571 16.526 16.253 16.515 15.799 C 16.513 15.342 16.547 14.886 16.616 14.435 C 16.702 13.891 16.807 13.291 16.93 12.638 L 17.31 10.587 C 16.78 11.365 16.121 12.046 15.36 12.599 C 14.65 13.101 13.84 13.443 12.986 13.604 C 12.803 14.068 12.575 14.514 12.307 14.935 C 12.051 15.336 11.767 15.66 11.458 15.902 C 11.147 16.146 10.82 16.272 10.474 16.281 C 10.054 16.293 9.652 16.111 9.382 15.788 C 9.089 15.45 8.934 14.951 8.919 14.29 C 8.907 13.837 8.958 13.432 9.067 13.074 C 9.178 12.706 9.304 12.441 9.449 12.28 C 9.295 11.88 9.215 11.456 9.212 11.028 C 9.197 10.447 9.32 9.931 9.575 9.481 C 9.818 9.035 10.178 8.663 10.616 8.405 C 11.052 8.139 11.529 8 12.041 7.988 C 12.455 7.978 12.829 8.161 13.165 8.539 C 13.498 8.916 13.674 9.463 13.69 10.183 C 13.706 10.854 13.606 11.601 13.388 12.425 C 13.925 12.204 14.461 11.877 14.993 11.439 C 15.565 10.973 16.088 10.45 16.554 9.879 C 17.065 9.257 17.515 8.588 17.899 7.88 C 17.985 7.711 18.159 7.603 18.35 7.602 C 18.505 7.59 18.658 7.646 18.768 7.756 C 18.883 7.861 18.945 8.011 18.94 8.166 C 18.941 8.216 18.916 8.383 18.863 8.672 C 18.82 8.959 18.76 9.324 18.683 9.771 C 18.615 10.215 18.536 10.706 18.45 11.241 L 18.193 12.86 C 18.116 13.404 18.054 13.908 18.007 14.373 C 18.503 13.37 19.027 12.381 19.579 11.407 C 19.872 10.896 20.153 10.431 20.419 10.01 C 20.696 9.59 20.938 9.253 21.15 9.002 C 21.372 8.74 21.545 8.608 21.674 8.605 C 21.903 8.597 22.126 8.676 22.299 8.827 C 22.481 8.981 22.573 9.141 22.578 9.309 C 22.583 9.536 22.566 9.882 22.529 10.345 C 22.484 10.859 22.437 11.374 22.387 11.888 L 22.22 13.608 C 22.165 14.182 22.116 14.701 22.079 15.166 C 22.046 15.51 22.029 15.855 22.029 16.201 C 22.03 16.356 21.964 16.504 21.847 16.607 C 21.735 16.722 21.583 16.789 21.422 16.794 C 21.319 16.799 21.217 16.764 21.138 16.697 C 21.067 16.639 21.011 16.503 20.965 16.287 C 20.911 15.954 20.883 15.618 20.884 15.281 C 20.872 14.837 20.876 14.355 20.894 13.831 C 20.91 13.299 20.938 12.771 20.974 12.247 C 21.021 11.713 21.075 11.234 21.134 10.808 C 20.876 11.259 20.625 11.713 20.381 12.172 C 20.107 12.701 19.819 13.246 19.517 13.805 C 19.231 14.334 18.938 14.859 18.637 15.379 C 18.404 15.79 18.146 16.187 17.865 16.567 C 17.635 16.868 17.456 17.019 17.329 17.022 Z M 12.092 12.692 C 12.202 12.314 12.285 11.913 12.344 11.487 C 12.413 11.056 12.442 10.62 12.433 10.183 C 12.437 9.966 12.381 9.752 12.27 9.565 C 12.168 9.41 12.033 9.334 11.866 9.339 C 11.599 9.348 11.339 9.431 11.116 9.578 C 10.867 9.728 10.659 9.936 10.51 10.185 C 10.353 10.466 10.278 10.785 10.294 11.107 C 10.304 11.55 10.481 11.926 10.823 12.234 C 11.175 12.53 11.598 12.683 12.092 12.692 Z M 11.717 13.722 C 11.045 13.707 10.499 13.524 10.076 13.169 L 10.026 13.538 C 10.009 13.647 10.001 13.756 10.004 13.865 C 10.011 14.172 10.066 14.413 10.169 14.587 C 10.278 14.75 10.466 14.842 10.662 14.827 C 10.839 14.823 11.02 14.719 11.203 14.518 C 11.385 14.317 11.557 14.05 11.717 13.722 Z M 23.702 11.607 C 23.436 11.592 23.307 11.423 23.32 11.096 C 23.328 11.018 23.379 10.923 23.475 10.812 C 23.554 10.701 23.676 10.628 23.811 10.611 C 24.116 10.575 24.49 10.522 24.933 10.453 C 25.384 10.373 25.879 10.283 26.421 10.181 C 26.508 9.695 26.613 9.185 26.739 8.649 C 26.864 8.114 27.005 7.592 27.162 7.086 C 27.303 6.609 27.47 6.141 27.662 5.682 C 27.803 5.327 27.994 4.993 28.23 4.692 C 28.313 4.6 28.411 4.523 28.521 4.465 C 28.591 4.419 28.672 4.391 28.755 4.385 C 28.887 4.378 29.013 4.443 29.085 4.555 C 29.229 4.733 29.268 4.973 29.188 5.188 C 29.005 5.746 28.808 6.431 28.601 7.244 C 28.394 8.058 28.172 8.945 27.938 9.907 C 28.841 9.738 29.745 9.559 30.649 9.371 C 31.426 9.21 32.201 9.039 32.974 8.858 C 33.159 8.775 33.302 8.786 33.403 8.892 C 33.515 8.999 33.572 9.105 33.575 9.213 C 33.577 9.352 33.541 9.456 33.464 9.527 C 33.398 9.596 33.324 9.658 33.245 9.71 L 33.23 9.725 C 33.036 9.808 32.742 9.908 32.35 10.027 C 31.958 10.135 31.506 10.253 30.998 10.383 C 29.894 10.644 28.784 10.877 27.669 11.083 C 27.462 11.956 27.252 12.854 27.038 13.775 C 26.832 14.689 26.626 15.586 26.421 16.469 C 26.329 16.827 26.221 17.05 26.095 17.142 C 25.991 17.239 25.856 17.295 25.714 17.3 C 25.557 17.304 25.406 17.243 25.296 17.132 C 25.186 17.016 25.163 16.775 25.234 16.407 L 26.196 11.34 C 25.607 11.444 25.086 11.518 24.632 11.57 C 24.19 11.618 23.879 11.63 23.7 11.605 Z M 32.829 16.512 C 32.455 16.519 32.141 16.355 31.887 16.015 C 31.641 15.666 31.512 15.21 31.499 14.648 C 31.487 14.126 31.603 13.605 31.847 13.086 C 32.101 12.568 32.438 12.065 32.863 11.583 C 33.285 11.099 33.748 10.655 34.252 10.249 C 34.755 9.831 35.258 9.47 35.765 9.163 C 36.22 8.885 36.694 8.641 37.184 8.433 C 37.613 8.256 37.956 8.164 38.212 8.158 C 38.332 8.15 38.451 8.178 38.555 8.238 C 38.644 8.286 38.691 8.379 38.694 8.516 C 38.695 8.61 38.66 8.701 38.597 8.771 L 38.626 8.771 C 38.844 8.765 38.955 8.889 38.961 9.147 C 38.964 9.235 38.932 9.419 38.87 9.695 C 38.807 9.963 38.737 10.302 38.657 10.707 C 38.577 11.114 38.509 11.565 38.452 12.058 C 38.394 12.55 38.371 13.045 38.384 13.54 C 38.393 13.965 38.561 14.172 38.887 14.164 C 39.251 14.155 39.619 14.064 39.989 13.886 C 40.366 13.707 40.727 13.495 41.069 13.254 C 41.419 13 41.739 12.752 42.029 12.507 C 42.319 12.254 42.566 12.041 42.768 11.868 C 42.971 11.695 43.117 11.608 43.206 11.607 C 43.285 11.605 43.354 11.627 43.415 11.676 C 43.474 11.723 43.506 11.802 43.509 11.91 C 43.511 12.009 43.418 12.188 43.225 12.45 C 42.694 13.145 42.078 13.771 41.391 14.314 C 41.011 14.616 40.601 14.879 40.166 15.096 C 39.746 15.303 39.345 15.411 38.961 15.422 C 38.668 15.429 38.38 15.342 38.141 15.173 C 37.9 14.991 37.7 14.681 37.542 14.241 C 37.394 13.8 37.31 13.191 37.29 12.411 L 37.283 12.041 C 36.843 12.815 36.351 13.558 35.811 14.266 C 35.304 14.939 34.793 15.479 34.28 15.885 C 33.777 16.291 33.293 16.5 32.83 16.512 Z M 37.956 9.229 L 37.752 9.323 C 37.268 9.56 36.8 9.828 36.35 10.124 C 35.865 10.449 35.399 10.801 34.955 11.179 C 34.509 11.564 34.11 11.963 33.754 12.377 C 33.398 12.789 33.117 13.206 32.91 13.624 C 32.713 14.001 32.611 14.42 32.614 14.845 C 32.616 14.972 32.644 15.07 32.694 15.138 C 32.755 15.206 32.854 15.238 32.993 15.235 C 33.19 15.231 33.443 15.102 33.754 14.848 C 34.063 14.583 34.4 14.241 34.764 13.817 C 35.14 13.394 35.512 12.926 35.885 12.414 C 36.258 11.902 36.61 11.386 36.944 10.865 C 37.288 10.345 37.58 9.864 37.827 9.425 C 37.865 9.356 37.908 9.291 37.956 9.229 Z M 45.073 16.046 C 44.632 16.067 44.194 15.965 43.808 15.75 C 43.467 15.54 43.185 15.246 42.99 14.896 C 42.799 14.565 42.694 14.191 42.682 13.809 C 42.656 13.069 42.78 12.331 43.046 11.641 C 43.307 10.973 43.638 10.383 44.04 9.87 C 44.452 9.348 44.876 8.904 45.313 8.539 C 45.756 8.173 46.16 7.897 46.52 7.71 C 46.89 7.515 47.154 7.414 47.313 7.411 C 47.628 7.404 47.789 7.559 47.796 7.874 C 47.799 8.022 47.705 8.197 47.512 8.398 C 47.32 8.59 47.074 8.818 46.774 9.081 C 46.474 9.345 46.156 9.644 45.819 9.976 C 45.468 10.314 45.15 10.684 44.867 11.08 C 44.572 11.481 44.33 11.931 44.145 12.428 C 43.959 12.916 43.873 13.45 43.887 14.033 C 43.901 14.624 44.148 14.914 44.632 14.902 C 45.076 14.892 45.527 14.799 45.987 14.618 C 46.456 14.441 46.915 14.213 47.363 13.935 C 47.819 13.649 48.255 13.352 48.672 13.047 C 49.089 12.741 49.468 12.451 49.807 12.176 C 50.145 11.892 50.431 11.664 50.663 11.491 C 50.895 11.318 51.063 11.229 51.16 11.228 C 51.357 11.223 51.459 11.328 51.464 11.546 C 51.468 11.713 51.36 11.938 51.138 12.219 C 50.919 12.5 50.62 12.809 50.243 13.144 C 49.866 13.478 49.444 13.818 48.98 14.164 C 48.514 14.5 48.043 14.812 47.567 15.101 C 47.125 15.36 46.666 15.588 46.191 15.783 C 45.836 15.934 45.458 16.023 45.073 16.046 Z M 49.567 10.999 C 49.301 10.984 49.174 10.815 49.185 10.49 C 49.193 10.411 49.245 10.315 49.342 10.204 C 49.421 10.094 49.543 10.021 49.678 10.004 C 49.983 9.968 50.356 9.916 50.798 9.845 C 51.294 9.757 51.79 9.667 52.286 9.574 C 52.375 9.087 52.48 8.577 52.606 8.041 C 52.731 7.506 52.872 6.985 53.027 6.478 C 53.182 5.962 53.35 5.494 53.527 5.076 C 53.668 4.72 53.859 4.386 54.095 4.084 C 54.178 3.992 54.277 3.915 54.387 3.857 C 54.457 3.811 54.538 3.784 54.622 3.778 C 54.753 3.772 54.879 3.836 54.95 3.947 C 55.095 4.125 55.134 4.366 55.054 4.581 C 54.87 5.138 54.674 5.824 54.466 6.638 C 54.259 7.451 54.037 8.339 53.804 9.3 C 54.706 9.132 55.611 8.953 56.514 8.763 C 57.291 8.602 58.066 8.431 58.839 8.25 C 59.026 8.167 59.169 8.179 59.27 8.286 C 59.381 8.391 59.437 8.499 59.44 8.607 C 59.443 8.744 59.406 8.849 59.329 8.92 C 59.264 8.989 59.191 9.05 59.111 9.102 L 59.097 9.117 C 58.901 9.201 58.608 9.302 58.216 9.42 C 57.824 9.527 57.373 9.647 56.863 9.777 C 55.759 10.037 54.65 10.27 53.535 10.476 L 52.903 13.169 C 52.701 14.067 52.495 14.964 52.286 15.861 C 52.196 16.219 52.088 16.444 51.961 16.536 C 51.857 16.632 51.722 16.687 51.58 16.692 C 51.424 16.697 51.272 16.636 51.162 16.525 C 51.051 16.408 51.03 16.167 51.101 15.8 L 52.063 10.732 C 51.472 10.836 50.952 10.911 50.499 10.962 C 50.055 11.012 49.745 11.024 49.567 10.999 Z M 76.923 14.648 C 76.921 14.798 76.854 14.94 76.74 15.037 C 76.627 15.137 76.481 15.193 76.33 15.194 C 76.164 15.202 76.002 15.142 75.882 15.027 C 75.761 14.911 75.697 14.731 75.693 14.484 C 75.678 13.843 75.69 13.148 75.731 12.398 C 75.773 11.636 75.829 10.885 75.901 10.144 C 75.972 9.392 76.045 8.7 76.119 8.067 C 75.804 8.539 75.46 9.059 75.089 9.63 C 74.728 10.201 74.357 10.766 73.975 11.328 C 73.594 11.891 73.221 12.407 72.857 12.879 C 72.493 13.342 72.162 13.719 71.863 14.012 C 71.564 14.294 71.315 14.439 71.119 14.444 C 70.756 14.453 70.407 14.305 70.162 14.037 C 69.885 13.738 69.733 13.345 69.737 12.938 C 69.736 12.695 69.75 12.453 69.779 12.212 C 69.811 11.895 69.848 11.564 69.889 11.218 L 69.999 10.253 C 70.027 10.027 70.042 9.799 70.043 9.571 C 70.043 9.451 70.025 9.331 69.99 9.216 C 69.968 9.11 69.916 9.056 69.838 9.058 C 69.719 9.061 69.56 9.198 69.36 9.469 C 69.118 9.792 68.893 10.127 68.688 10.475 C 68.452 10.886 68.205 11.321 67.949 11.781 L 67.253 13.083 C 67.083 13.406 66.898 13.722 66.7 14.03 C 66.609 14.205 66.493 14.367 66.355 14.51 C 66.249 14.612 66.108 14.669 65.96 14.669 C 65.773 14.673 65.598 14.578 65.435 14.385 C 65.279 14.178 65.195 13.925 65.197 13.666 C 65.193 13.497 65.216 13.237 65.267 12.879 C 65.317 12.513 65.382 12.112 65.46 11.676 C 65.549 11.24 65.632 10.814 65.712 10.398 C 65.801 9.972 65.875 9.61 65.938 9.312 C 66.009 8.975 66.101 8.746 66.218 8.624 C 66.314 8.513 66.451 8.445 66.598 8.438 C 66.77 8.427 66.937 8.5 67.046 8.635 C 67.168 8.76 67.231 8.96 67.239 9.237 C 67.239 9.287 67.213 9.42 67.159 9.639 L 66.955 10.413 C 66.884 10.71 66.802 11.024 66.71 11.351 C 66.629 11.678 66.563 11.981 66.509 12.259 C 66.718 11.889 66.935 11.49 67.163 11.059 C 67.4 10.63 67.637 10.204 67.873 9.784 C 68.11 9.355 68.347 8.965 68.585 8.614 C 68.784 8.3 69.021 8.011 69.29 7.754 C 69.521 7.541 69.746 7.432 69.962 7.428 C 70.218 7.421 70.469 7.499 70.678 7.648 C 70.909 7.8 71.097 8.007 71.24 8.269 C 71.385 8.534 71.46 8.827 71.468 9.152 C 71.464 9.476 71.432 9.799 71.372 10.117 C 71.297 10.557 71.223 10.998 71.151 11.439 C 71.086 11.886 71.048 12.337 71.036 12.789 C 71.037 12.886 71.068 12.936 71.128 12.933 C 71.176 12.933 71.236 12.896 71.302 12.827 C 71.582 12.504 71.888 12.117 72.222 11.666 C 72.557 11.204 72.895 10.718 73.239 10.206 C 73.592 9.695 73.94 9.194 74.284 8.703 C 74.628 8.2 74.947 7.75 75.243 7.348 C 75.549 6.936 75.818 6.608 76.049 6.367 C 76.29 6.124 76.478 6.002 76.617 5.999 C 76.913 5.991 77.142 6.07 77.304 6.235 C 77.466 6.398 77.551 6.678 77.56 7.071 C 77.564 7.481 77.549 7.892 77.515 8.3 C 77.487 8.803 77.446 9.354 77.391 9.947 C 77.347 10.539 77.29 11.138 77.225 11.74 C 77.174 12.294 77.119 12.848 77.058 13.401 C 77.011 13.816 76.966 14.232 76.925 14.648 Z M 85.668 8.509 C 85.67 8.842 85.575 9.169 85.394 9.448 C 85.204 9.749 84.95 10.04 84.631 10.324 C 84.311 10.598 83.957 10.857 83.568 11.104 C 82.864 11.551 82.114 11.921 81.33 12.207 C 81.265 12.544 81.233 12.886 81.236 13.229 C 81.24 13.417 81.287 13.549 81.379 13.626 C 81.468 13.703 81.608 13.738 81.796 13.734 C 82.21 13.725 82.647 13.641 83.107 13.482 C 83.565 13.323 84.036 13.12 84.512 12.871 C 84.99 12.624 85.447 12.361 85.885 12.084 C 86.323 11.808 86.721 11.547 87.08 11.302 C 87.45 11.056 87.755 10.858 87.997 10.703 C 88.241 10.55 88.403 10.472 88.481 10.47 C 88.599 10.468 88.688 10.504 88.75 10.581 C 88.82 10.646 88.859 10.737 88.86 10.831 C 88.861 10.91 88.741 11.065 88.5 11.299 C 88.202 11.59 87.887 11.864 87.558 12.12 C 87.16 12.425 86.715 12.741 86.219 13.068 C 85.724 13.395 85.207 13.704 84.672 13.993 C 84.179 14.266 83.665 14.501 83.135 14.694 C 82.647 14.873 82.203 14.967 81.81 14.976 C 81.298 14.988 80.892 14.806 80.598 14.429 C 80.302 14.05 80.147 13.457 80.128 12.649 C 80.116 12.096 80.173 11.543 80.296 11.003 C 80.549 9.93 81.013 8.917 81.662 8.025 C 81.968 7.614 82.29 7.291 82.631 7.056 C 82.971 6.811 83.302 6.686 83.628 6.678 C 84.249 6.663 84.74 6.826 85.104 7.161 C 85.466 7.497 85.654 7.947 85.668 8.509 Z M 81.614 11.061 C 81.916 10.865 82.227 10.661 82.546 10.447 C 82.853 10.243 83.149 10.024 83.434 9.79 C 83.683 9.591 83.902 9.357 84.085 9.095 C 84.247 8.874 84.333 8.607 84.332 8.333 C 84.324 7.969 84.122 7.79 83.728 7.8 C 83.481 7.806 83.224 7.969 82.955 8.291 C 82.658 8.664 82.41 9.073 82.215 9.507 C 81.978 10.01 81.777 10.529 81.614 11.061 Z M 94.981 15.334 C 94.794 15.35 94.609 15.284 94.474 15.154 C 94.352 15.037 94.286 14.74 94.274 14.256 C 94.264 13.812 94.33 13.234 94.471 12.519 C 94.611 11.796 94.805 10.993 95.051 10.108 C 95.582 8.235 96.19 6.384 96.873 4.561 C 97.197 3.708 97.537 2.862 97.894 2.022 C 98.015 1.743 98.145 1.549 98.278 1.436 C 98.415 1.324 98.587 1.262 98.764 1.262 C 98.883 1.256 99.001 1.296 99.092 1.373 C 99.193 1.439 99.244 1.556 99.249 1.723 C 99.249 1.783 99.19 1.976 99.07 2.305 C 98.92 2.741 98.762 3.174 98.596 3.604 L 97.944 5.408 C 97.703 6.076 97.457 6.777 97.209 7.513 C 96.96 8.249 96.725 8.99 96.506 9.734 C 96.287 10.469 96.101 11.175 95.95 11.849 C 95.798 12.522 95.699 13.127 95.651 13.661 C 95.882 13.37 96.144 12.999 96.44 12.547 C 96.736 12.096 97.049 11.611 97.382 11.09 C 97.715 10.57 98.054 10.053 98.395 9.541 C 98.738 9.031 99.079 8.565 99.413 8.142 C 99.749 7.72 100.062 7.382 100.352 7.129 C 100.651 6.865 100.914 6.729 101.141 6.725 C 101.478 6.703 101.809 6.824 102.052 7.059 C 102.293 7.281 102.422 7.651 102.432 8.175 C 102.44 8.47 102.388 8.825 102.28 9.244 C 102.182 9.66 102.064 10.098 101.926 10.555 C 101.789 11.01 101.666 11.448 101.556 11.865 C 101.467 12.214 101.421 12.573 101.42 12.933 C 101.429 13.337 101.588 13.537 101.894 13.53 C 102.367 13.518 102.836 13.404 103.305 13.185 C 103.783 12.967 104.237 12.7 104.663 12.385 C 105.089 12.059 105.481 11.734 105.838 11.408 L 106.75 10.559 C 107.021 10.306 107.25 10.178 107.437 10.175 C 107.673 10.167 107.795 10.289 107.801 10.534 C 107.801 10.615 107.788 10.695 107.762 10.772 C 107.709 10.902 107.631 11.019 107.533 11.118 C 107.32 11.363 107.098 11.6 106.869 11.828 C 106.554 12.155 106.226 12.469 105.885 12.769 C 105.518 13.104 105.116 13.42 104.679 13.716 C 104.252 14.012 103.809 14.259 103.349 14.456 C 102.931 14.637 102.482 14.739 102.025 14.754 C 101.434 14.769 100.971 14.611 100.638 14.284 C 100.314 13.945 100.145 13.476 100.132 12.874 C 100.123 12.5 100.17 12.046 100.277 11.51 C 100.383 10.975 100.518 10.41 100.681 9.814 C 100.854 9.207 101.028 8.617 101.201 8.041 C 100.824 8.331 100.484 8.667 100.19 9.041 C 99.835 9.473 99.462 9.966 99.07 10.518 C 98.678 11.059 98.286 11.612 97.895 12.173 C 97.514 12.735 97.141 13.256 96.778 13.738 C 96.423 14.21 96.092 14.593 95.784 14.886 C 95.474 15.179 95.207 15.328 94.981 15.334 Z M 111.903 7.657 C 111.917 8.287 111.63 8.905 111.045 9.512 C 110.456 10.118 109.551 10.681 108.33 11.203 C 108.299 11.408 108.285 11.616 108.286 11.824 C 108.295 12.22 108.351 12.504 108.454 12.679 C 108.567 12.855 108.746 12.939 108.993 12.933 C 109.358 12.925 109.764 12.802 110.212 12.564 C 110.66 12.317 111.122 12.006 111.596 11.629 C 112.07 11.244 112.534 10.837 112.987 10.413 C 113.451 9.988 113.876 9.587 114.262 9.215 C 114.647 8.83 114.977 8.522 115.247 8.289 C 115.516 8.046 115.701 7.923 115.801 7.92 C 115.938 7.917 116.052 7.979 116.145 8.105 C 116.244 8.246 116.295 8.416 116.289 8.589 C 116.295 8.846 116.289 9.142 116.265 9.476 C 116.244 9.803 116.218 10.149 116.187 10.515 C 116.426 9.79 116.731 9.155 117.104 8.614 C 117.45 8.104 117.862 7.641 118.329 7.238 C 118.765 6.874 119.193 6.598 119.611 6.41 C 120.031 6.223 120.395 6.126 120.7 6.118 C 120.985 6.111 121.2 6.161 121.34 6.266 C 121.469 6.351 121.549 6.492 121.556 6.645 C 121.559 6.784 121.497 6.913 121.373 7.034 C 121.256 7.147 120.984 7.296 120.555 7.484 C 120.068 7.687 119.598 7.93 119.151 8.212 C 118.724 8.488 118.329 8.862 117.965 9.334 C 117.601 9.796 117.28 10.411 117.002 11.178 C 116.724 11.942 116.494 12.925 116.315 14.123 C 116.281 14.359 116.216 14.53 116.12 14.63 C 116.034 14.736 115.906 14.799 115.769 14.802 C 115.658 14.799 115.551 14.754 115.471 14.676 C 115.37 14.599 115.287 14.408 115.219 14.104 C 115.154 13.79 115.113 13.297 115.096 12.627 C 115.087 12.134 115.095 11.641 115.122 11.148 C 115.158 10.614 115.215 10.055 115.289 9.47 C 114.846 9.973 114.357 10.504 113.817 11.059 C 113.277 11.605 112.718 12.115 112.136 12.593 C 111.601 13.03 111.025 13.415 110.417 13.743 C 109.852 14.043 109.323 14.198 108.83 14.21 C 108.308 14.222 107.883 14.049 107.561 13.692 C 107.235 13.334 107.065 12.796 107.049 12.077 C 107.023 11.306 107.115 10.535 107.321 9.791 C 107.521 9.096 107.789 8.493 108.122 7.982 C 108.454 7.462 108.817 7.058 109.203 6.772 C 109.592 6.488 109.968 6.34 110.333 6.331 C 110.826 6.321 111.207 6.439 111.48 6.689 C 111.752 6.931 111.894 7.252 111.903 7.657 Z M 108.542 10.118 C 108.833 9.904 109.148 9.664 109.487 9.399 C 109.836 9.135 110.13 8.867 110.37 8.595 C 110.622 8.314 110.743 8.059 110.737 7.831 C 110.734 7.694 110.697 7.595 110.627 7.539 C 110.556 7.481 110.438 7.454 110.269 7.459 C 110.003 7.465 109.761 7.604 109.54 7.874 C 109.318 8.136 109.126 8.472 108.957 8.88 C 108.788 9.282 108.65 9.696 108.543 10.118 Z M 127.595 7.525 C 127.601 7.84 127.509 8.154 127.32 8.463 C 127.129 8.763 126.876 9.055 126.556 9.34 C 126.237 9.614 125.883 9.873 125.494 10.12 C 124.79 10.567 124.04 10.937 123.256 11.223 C 123.191 11.56 123.159 11.903 123.161 12.246 C 123.166 12.433 123.213 12.565 123.303 12.642 C 123.395 12.719 123.534 12.754 123.721 12.75 C 124.135 12.741 124.573 12.657 125.031 12.499 C 125.514 12.33 125.985 12.125 126.438 11.888 C 126.916 11.639 127.373 11.377 127.811 11.101 C 128.249 10.824 128.647 10.564 129.006 10.318 C 129.376 10.073 129.681 9.874 129.923 9.719 C 130.167 9.565 130.327 9.488 130.407 9.487 C 130.525 9.484 130.614 9.521 130.676 9.598 C 130.746 9.662 130.785 9.753 130.786 9.848 C 130.786 9.926 130.667 10.081 130.426 10.314 C 130.128 10.605 129.813 10.88 129.484 11.136 C 129.086 11.441 128.641 11.757 128.145 12.084 C 127.65 12.411 127.133 12.72 126.598 13.009 C 126.104 13.282 125.59 13.517 125.059 13.71 C 124.571 13.889 124.13 13.984 123.735 13.993 C 123.222 14.004 122.818 13.823 122.524 13.445 C 122.228 13.067 122.073 12.473 122.053 11.664 C 122.04 11.123 122.098 10.574 122.222 10.019 C 122.475 8.946 122.939 7.934 123.587 7.041 C 123.894 6.63 124.216 6.308 124.555 6.073 C 124.895 5.827 125.228 5.703 125.553 5.694 C 126.175 5.679 126.666 5.84 127.03 6.178 C 127.392 6.513 127.58 6.963 127.593 7.524 Z M 123.54 10.077 C 123.84 9.882 124.153 9.678 124.472 9.463 C 124.779 9.259 125.075 9.04 125.36 8.806 C 125.609 8.607 125.828 8.373 126.011 8.111 C 126.172 7.89 126.259 7.623 126.258 7.349 C 126.249 6.984 126.048 6.806 125.653 6.817 C 125.407 6.821 125.15 6.985 124.88 7.308 C 124.584 7.681 124.336 8.089 124.141 8.524 C 123.904 9.027 123.703 9.546 123.54 10.077 Z M 138.707 7.886 C 138.284 7.895 137.982 7.824 137.8 7.67 C 137.615 7.508 137.512 7.271 137.519 7.025 C 137.51 6.71 137.574 6.457 137.707 6.266 C 137.832 6.084 138.002 5.937 138.201 5.84 C 138.38 5.751 138.576 5.701 138.775 5.694 C 139.031 5.688 139.282 5.765 139.49 5.914 C 139.712 6.056 139.826 6.351 139.836 6.794 C 139.854 7.08 139.753 7.36 139.558 7.57 C 139.366 7.772 139.081 7.877 138.707 7.886 Z M 137.463 14.129 C 137.216 14.135 136.993 14.033 136.79 13.82 C 136.598 13.618 136.491 13.351 136.491 13.073 C 136.477 12.861 136.546 12.652 136.684 12.491 C 136.819 12.34 136.99 12.224 137.181 12.154 C 137.376 12.07 137.562 12.027 137.74 12.021 C 137.966 12.015 138.189 12.077 138.38 12.198 C 138.58 12.323 138.684 12.553 138.691 12.888 C 138.694 13.093 138.637 13.295 138.528 13.469 C 138.422 13.661 138.267 13.823 138.08 13.938 C 137.897 14.06 137.683 14.127 137.463 14.13 Z M 141.645 15.858 C 141.281 15.867 141.095 15.74 141.089 15.473 C 141.086 15.334 141.161 15.209 141.317 15.096 C 141.861 14.719 142.402 14.283 142.944 13.786 C 143.494 13.3 143.994 12.735 144.442 12.093 C 144.891 11.451 145.244 10.718 145.500 9.894 C 145.768 9.059 145.888 8.11 145.862 7.044 C 145.853 6.323 145.762 5.606 145.590 4.905 C 145.457 4.315 145.265 3.74 145.018 3.188 C 144.827 2.734 144.604 2.294 144.351 1.871 C 144.135 1.502 143.950 1.195 143.796 0.953 C 143.652 0.698 143.578 0.509 143.576 0.38 C 143.571 0.289 143.601 0.199 143.658 0.127 C 143.716 0.046 143.833 0.005 144.010 0 C 144.207 -0.004 144.482 0.151 144.836 0.469 C 145.188 0.786 145.549 1.252 145.919 1.864 C 146.289 2.468 146.607 3.21 146.874 4.09 C 147.141 4.972 147.289 5.979 147.315 7.114 C 147.332 7.948 147.217 8.78 146.973 9.578 C 146.728 10.399 146.394 11.191 145.978 11.939 C 145.586 12.653 145.121 13.323 144.589 13.939 C 144.080 14.524 143.568 14.985 143.053 15.323 C 142.539 15.67 142.070 15.849 141.645 15.858 Z"
              style={{ fill: 'var(--color-text-secondary)' }}
            />
            <path
              d="M 9.072 33.194 C 3.88 42.75 -6.577 58.574 5.837 66.936 C 8.879 68.984 12.027 68.762 15.493 68.762 C 15.643 68.762 19.109 68.18 18.728 67.859 C 17.703 67.004 11.74 61.867 15.636 65.16 C 16.05 65.507 19.231 67.379 19.231 67.961 C 19.231 69.544 13.657 73.43 12.522 74.614"
              fill="transparent"
              style={{ stroke: 'var(--color-text-secondary)' }}
              strokeWidth={1.08}
              strokeLinecap="round"
              strokeMiterlimit={10}
            />
          </svg>
        </div>
      </motion.div>

    </div>
  )
}
