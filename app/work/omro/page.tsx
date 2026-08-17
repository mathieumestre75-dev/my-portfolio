'use client'

import { Fragment, useState, useEffect, useRef } from 'react'
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
  { id: 'overview',       label: 'Overview'       },
  { id: 'problem',        label: 'Problem'        },
  { id: 'solution',       label: 'Solution'       },
  { id: 'research',       label: 'Research'       },
  { id: 'next-steps',     label: 'Next Steps'     },
  { id: 'what-i-learned', label: 'What I Learned' },
]

// ─── Benchmark wallet data ────────────────────────────────────────────────────
type WalletCheck = { label: string; pass: boolean; detail?: string }
type WalletEntry = { initials: string; name: string; note: string; checks: WalletCheck[] }

const WALLETS: WalletEntry[] = [
  {
    initials: 'BW', name: 'Best Wallet (existing)',
    note: "Best Wallet's own screen was the weakest: no purchase amount at the top, no fiat equivalents anywhere, and gas fees had no tooltip or explanation.",
    checks: [
      { label: 'Max Total shown', pass: true, detail: 'no tooltip' },
      { label: 'Network fee shown', pass: true, detail: 'no tooltip' },
      { label: 'Purchase amount on top', pass: false },
      { label: 'Fiat equivalents', pass: false },
      { label: 'Gas fee explanation', pass: false },
    ],
  },
  {
    initials: 'TW', name: 'Trust Wallet',
    note: 'Purchase amount is prominent and the fee has a tooltip, but fiat equivalents and the destination contract are both missing.',
    checks: [
      { label: 'Purchase amount on top', pass: true, detail: 'with tooltip' },
      { label: 'Max Total', pass: true },
      { label: 'Fiat equivalents', pass: false },
      { label: 'Destination smart contract', pass: false },
    ],
  },
  {
    initials: 'CB', name: 'Coinbase Wallet',
    note: 'Clear on the main amount with a tooltip, but the total has no explanation and fiat equivalents are absent.',
    checks: [
      { label: 'Purchase amount on top', pass: true },
      { label: 'Network fee', pass: true, detail: 'with tooltip' },
      { label: 'Max Total', pass: true },
      { label: 'Fiat equivalents', pass: false },
      { label: 'Destination smart contract', pass: false },
    ],
  },
  {
    initials: 'RB', name: 'Rainbow',
    note: 'Amount and gas are both visible, but there\'s no total, so the user has to do the addition themselves.',
    checks: [
      { label: 'Purchase amount', pass: true, detail: 'no tooltip' },
      { label: 'Network fee', pass: true, detail: 'with tooltip' },
      { label: 'Total shown', pass: false },
      { label: 'Fiat equivalents', pass: false },
    ],
  },
  {
    initials: '1I', name: '1Inch',
    note: 'Same pattern as Rainbow: amount and gas visible, no total.',
    checks: [
      { label: 'Purchase amount', pass: true, detail: 'no tooltip' },
      { label: 'Network fee', pass: true, detail: 'with tooltip' },
      { label: 'Total shown', pass: false },
      { label: 'Fiat equivalents', pass: false },
    ],
  },
  {
    initials: 'UNI', name: 'Uniswap',
    note: 'Same pattern: no total, no fiat equivalents, no explanation.',
    checks: [
      { label: 'Purchase amount', pass: true, detail: 'no tooltip' },
      { label: 'Network fee', pass: true, detail: 'with tooltip' },
      { label: 'Total shown', pass: false },
      { label: 'Fiat equivalents', pass: false },
    ],
  },
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
const bulletText: React.CSSProperties = {
  fontFamily: SANS, fontSize: 14.88, fontWeight: 500,
  letterSpacing: '0.008em', lineHeight: '1.6em',
  color: 'var(--color-text-primary)', margin: 0,
}
const flowLabel: React.CSSProperties = {
  fontFamily: MONO, fontSize: 11.68, fontWeight: 500,
  lineHeight: '1.4em', letterSpacing: 0, color: 'var(--color-text-secondary)', margin: 0,
}
const flowHeading: React.CSSProperties = {
  fontFamily: SANS, fontSize: 16, fontWeight: 500,
  lineHeight: '1.4em', color: 'var(--color-text-primary)', margin: 0,
}

// ─── Arrow bullet SVG ────────────────────────────────────────────────────────
function ArrowBullet({ color }: { color?: string } = {}) {
  return (
    <svg
      viewBox="0 0 6 10" width={6} height={10}
      overflow="visible" fill="transparent"
      style={{ transform: 'rotate(-90deg)', flexShrink: 0, marginTop: 6 }}
    >
      <path
        d="M 3 0 L 3 10 M 0 6.552 C 0 6.552 0.75 7.414 1.5 8.276 C 2.25 9.138 3 10 3 10 L 6 6.552"
        strokeWidth="1.26" style={{ stroke: color ?? 'var(--noto-bullet-arrow)' }}
      />
    </svg>
  )
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
export default function OmroPage() {
  const [activeSection, setActiveSection] = useState('')
  const [hoveredWallet, setHoveredWallet] = useState<number | null>(null)
  const [contactVisible, setContactVisible] = useState(false)
  const [themeToggleHover, setThemeToggleHover] = useState(false)
  const [decidedCardHeight, setDecidedCardHeight] = useState<number | undefined>(undefined)
  const decidedCardRefs = useRef<(HTMLDivElement | null)[]>([])
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  const isDark = mounted && resolvedTheme === 'dark'

  useEffect(() => {
    const heights = decidedCardRefs.current.filter(Boolean).map(el => el!.offsetHeight)
    if (heights.length) setDecidedCardHeight(Math.max(...heights))
  }, [])

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
          background: 'linear-gradient(180deg, rgb(10, 10, 10) 0%, rgb(44, 49, 77) 8%, rgb(81, 81, 112) 75%, rgb(81, 81, 112) 100%)',
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
        @keyframes coin-tilt-l {
          0%, 48% { transform: rotate(0deg); }
          50%, 98% { transform: rotate(-8deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes coin-tilt-r {
          0%, 48% { transform: rotate(0deg); }
          50%, 98% { transform: rotate(8deg); }
          100% { transform: rotate(0deg); }
        }
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
        style={{
          position: 'fixed', top: 20, left: 20, zIndex: 50,
          fontFamily: MONO, fontSize: 11.2, fontWeight: 400,
          color: 'var(--color-status-text)', textDecoration: 'none',
          letterSpacing: '-0.224px', lineHeight: '15.68px',
          display: 'flex', alignItems: 'center', gap: 6,
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

            <p style={{
              fontFamily: MONO, fontSize: 13.28, fontWeight: 400,
              color: 'var(--color-status-text)', lineHeight: '18.592px',
              letterSpacing: '-0.5312px', margin: 0,
            }}>
              Best Wallet / App
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
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
                {'A crypto wallet feature for buying tokens before launch.'.split(' ').map((word, i, arr) => (
                  <Fragment key={i}>
                    <motion.span variants={titleWord} style={{ display: 'inline-block' }}>{word}</motion.span>
                    {i < arr.length - 1 && ' '}
                  </Fragment>
                ))}
              </motion.h1>

              <p style={{
                fontFamily: SANS, fontSize: 15.52, fontWeight: 500,
                color: 'var(--color-noto-body)', lineHeight: '25.608px',
                letterSpacing: '0.12416px', margin: 0,
              }}>
                Designing a token presale experience for a crypto wallet that makes buying in feel exciting and safe every step of the way.
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
                  <p style={metaLabel}>Client</p>
                  <p style={metaValue}>Best Wallet</p>
                </div>
              </div>
              <div style={{ display: 'flex' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <p style={metaLabel}>Studio</p>
                  <p style={metaValue}>Tech Alchemy</p>
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <p style={metaLabel}>Skills</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {['UX/UI Design', 'Mobile Design', 'Web3', 'Fintech', 'Edge Case Design'].map(s => (
                      <span key={s} style={skillTag}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Hero visual */}
            <Placeholder
              label={'ANIMATED FLOW PREVIEW\nToken discovery → widget → transaction review → success\n(looping, to be replaced with exported Figma motion)'}
              aspectRatio={1.51053}
            />

          </section>

          {DIVIDER}

          {/* ════ OVERVIEW CONTENT ════════════════════════════════════════════ */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
            <p style={sectionLabel}>Overview</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <h2 style={sectionH2}>
                An end-to-end presale experience for a crypto wallet.
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <h4 style={sectionH4}>Quick context: in crypto, a presale lets you buy into a new token before it launches publicly, usually at a lower price than it&apos;ll trade at after launch</h4>
                <div>
                  <p style={bodyText}>
                    I worked on this at Tech Alchemy, a studio that builds web3 products, for the client Best Wallet. Best Wallet is a mobile app where you can buy, store, and swap crypto. My role was to design the presale feature from scratch: the page that introduces a token and makes the case for buying in, the purchase flow, and all the edge cases where that purchase can go wrong.
                  </p>
                  <p style={{ ...bodyText, marginTop: '1.65em' }}>
                    Without a presale feature, users looking to buy early were leaving the app to do it on other platforms. Building it meant keeping those users inside the app while opening up a new source of engagement and revenue for Best Wallet.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ════ PROBLEM ═══════════════════════════════════════════════════ */}
          <section id="problem" style={{ display: 'flex', flexDirection: 'column', gap: 52, marginTop: 100 }}>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
              <p style={sectionLabel}>The Problem</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <h2 style={sectionH2}>
                  Crypto presales live on excitement and involve real money.
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <h4 style={sectionH4}>Two challenges: making it worth joining, and safe to trust</h4>
                  <div>
                    <p style={bodyText}>
                      While working on this project, I had to keep in mind that this feature lives inside a financial app. Users are speculating and spending real money here. That meant every edge case needed careful handling, with clear feedback so users always know what&apos;s happening to their funds and their transaction. A confusing error at the wrong moment could make users decide they can&apos;t trust the app.
                    </p>
                    <p style={{ ...bodyText, marginTop: '1.65em' }}>
                      And before any of that, there was a different stake: making the presale feel worth joining in the first place since crypto presales run on excitement and community. In general, I needed to make the presale tokens discoverable, exciting to join, and easy to purchase.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* What was missing — two columns */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <h5 style={{
                  fontFamily: MONO, fontSize: 11.68, fontWeight: 500,
                  lineHeight: '1.4em', color: 'var(--color-text-secondary)', margin: 0,
                }}>
                  WHAT WAS MISSING
                </h5>
                <div style={{ height: 1, background: 'var(--color-border)' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', gap: 46 }}>
                <div style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    'No page to introduce a token or make the case for buying in',
                    'No purchase flow',
                    'No designed behavior for when a purchase goes wrong',
                  ].map((text, i) => (
                    <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                      <ArrowBullet />
                      <p style={bulletText}>{text}</p>
                    </div>
                  ))}
                </div>
                <div style={{ flex: '1 0 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    'No way to see what a purchase actually costs in real dollars',
                    'No explanation of network fees',
                    'No clear transaction review and reassurance',
                  ].map((text, i) => (
                    <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                      <ArrowBullet />
                      <p style={bulletText}>{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Task flow visual */}
            <Placeholder
              label={'TASK FLOW OVERVIEW\nThe complete system: five edge cases alongside the happy path,\nmapped before a screen was built.'}
              aspectRatio={2.1}
              caption="The complete system, five edge cases alongside the happy path, mapped before a screen was built."
            />

          </section>

          {/* ════ SOLUTION ══════════════════════════════════════════════════ */}
          <section id="solution" style={{ display: 'flex', flexDirection: 'column', gap: 52, marginTop: 100 }}>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
              <p style={sectionLabel}>Solution</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <h2 style={sectionH2}>Building the full presale experience, from discovery to purchase and confirmation.</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <h4 style={sectionH4}>The full purchase flow and five edge cases</h4>
                  <p style={bodyText}>
                    With these stakes in mind, I designed the full presale flow, from discovering the token to purchase and confirmation. Alongside that, I mapped and designed every edge case where the transaction could fall short.
                  </p>
                </div>
              </div>
            </div>

            {/* Happy path sequence */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <h5 style={flowLabel}>HAPPY PATH</h5>
              <div style={{ height: 1, background: 'var(--color-border)' }} />
              <Placeholder
                label={'HAPPY PATH\nHome → Token info → Widget → Review → Success'}
                aspectRatio={2.4}
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {[
                  { num: '01', title: 'Home', caption: 'Browse upcoming presale tokens from the home screen.' },
                  { num: '02', title: 'Token info', caption: 'The page that builds the case for buying in.' },
                  { num: '03', title: 'Buy widget', caption: 'Set an amount and see exactly what it\'ll cost you.' },
                  { num: '04', title: 'Review', caption: 'Every number explained before you confirm.' },
                  { num: '05', title: 'Success', caption: 'Confirmation that your purchase went through.' },
                ].map((item, i, arr) => (
                  <div key={item.num} style={{
                    display: 'flex', gap: 14, alignItems: 'baseline',
                    padding: '10px 0',
                    borderBottom: i < arr.length - 1 ? '1px solid var(--color-border)' : 'none',
                  }}>
                    <p style={{ ...flowLabel, flexShrink: 0, width: 18 }}>{item.num}</p>
                    <p style={{ ...sectionLabel, margin: 0 }}>
                      <span style={{ color: 'var(--color-text-primary)' }}>{item.title}.</span>
                      {' '}{item.caption}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Edge cases — full cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <h5 style={flowLabel}>EDGE CASES</h5>
              <div style={{ height: 1, background: 'var(--color-border)' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 52 }}>
                {([
                  {
                    num: '01', title: 'PAYMENT CHAIN MISMATCH',
                    heading: 'Staking requires Ethereum. Other chains don\'t qualify.',
                    body: 'Staking locks your tokens for a period in exchange for extra rewards. If you pay with a non-Ethereum token, it gets grayed out with a warning explaining why. You can still buy, just without the stake. No dead end.',
                  },
                  {
                    num: '02', title: 'NOT ENOUGH GAS',
                    heading: 'Tokens to spend, but nothing to move them with.',
                    body: 'If you have tokens but not enough ETH to cover the network fee, an inline warning appears with a quick way to buy more ETH. Your amount and balance stay visible so you can see exactly how close you are.',
                  },
                  {
                    num: '03', title: 'INSUFFICIENT PURCHASE TOKENS',
                    heading: 'Amount entered exceeds balance.',
                    body: 'If you enter more than your balance allows, the warning appears right away, with your balance and a Max button there to fix it.',
                  },
                  {
                    num: '04', title: 'ZERO BALANCE, NO GAS',
                    heading: 'Neither tokens to spend nor gas to send them.',
                    body: 'If you have no tokens and no gas, you get two ways out: connect a different wallet, or pay with card. The card route uses a third-party flow but lands back at the same success state.',
                  },
                  {
                    num: '05', title: 'TRANSACTION FAILS POST-SUBMISSION',
                    heading: 'Network error or gas spike after confirmation.',
                    body: 'If the transaction fails, the screen makes it clear: nothing was deducted, and you can try again. On retry, the gas fee is checked fresh, so if it changed, you\'ll see the updated warning before confirming.',
                  },
                ] as const).map(flow => (
                  <div key={flow.num} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                    <div style={{
                      position: 'relative',
                      background: 'var(--color-card-bg)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 8,
                      overflow: 'hidden',
                    }}>
                      <h5 style={{ ...flowLabel, position: 'absolute', top: 20, left: 20, zIndex: 1 }}>
                        {flow.num} {flow.title}
                      </h5>
                      <div style={{
                        width: '100%', aspectRatio: '1.30455',
                        background: 'var(--color-noto-card-image)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        overflow: 'hidden',
                      }}>
                        <p style={{ ...flowLabel, textAlign: 'center', padding: '0 20px', opacity: 0.45 }}>
                          ANIMATED FLOW PREVIEW{'\n'}(state transition, to be replaced)
                        </p>
                      </div>
                      <div style={{ height: 1, width: '100%', background: 'var(--color-border)' }} />
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: 24 }}>
                        <h6 style={flowHeading}>{flow.heading}</h6>
                        <p style={{ ...bodyText, color: 'var(--color-status-text)' }}>{flow.body}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </section>

          {/* ════ RESEARCH ══════════════════════════════════════════════════ */}
          <section id="research" style={{ display: 'flex', flexDirection: 'column', gap: 52, marginTop: 100 }}>

            {/* ─── Opening ─────────────────────────────────────────────────── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
              <p style={sectionLabel}>Research and design challenges</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <h2 style={sectionH2}>Competitive analysis at every stage.</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <h4 style={sectionH4}>I kept coming back to the same competitors throughout the project</h4>
                  <p style={bodyText}>
                    While I was designing this flow, and specifically at each major decision point I would check our crypto wallet competitors that you can see below. For example for the upcoming token card design, the token info page, the buy widget or the transaction review screen. This allowed me to check the industry standards but also to identify any gaps or setbacks in how information was presented to users.
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', gap: 12, flexWrap: 'wrap' }}>
                {[
                  { initials: 'RB', name: 'Rainbow' },
                  { initials: 'TW', name: 'Trust' },
                  { initials: 'CB', name: 'Coinbase' },
                  { initials: 'UNI', name: 'Uniswap' },
                  { initials: 'EX', name: 'Exodus' },
                  { initials: 'PH', name: 'Phantom' },
                ].map((w) => (
                  <div key={w.initials} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 10,
                      background: 'var(--color-noto-tag-bg)',
                      border: '1px solid var(--color-border)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <p style={{ ...flowLabel, fontSize: 9.5 }}>{w.initials}</p>
                    </div>
                    <p style={{ ...flowLabel, fontSize: 9.5, textAlign: 'center', width: 50, whiteSpace: 'normal', wordBreak: 'break-word' }}>
                      {w.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* ─── Building Desire ─────────────────────────────────────────── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <h2 style={sectionH2}>Building discoverability and desire for presales.</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <h4 style={sectionH4}>The Upcoming Tokens list lives on the home screen, not buried in a menu</h4>
                  <p style={bodyText}>
                    Having the list on the homepage was a deliberate placement decision. I didn&apos;t want users to have to navigate to find presales because then only the people who already know they want one would find them. Putting it on the home screen makes it discoverable when users are just browsing, which is exactly how presale interest tends to start.
                  </p>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <h4 style={sectionH4}>The token card is designed to prompt action without overselling</h4>
              <p style={bodyText}>
                I wanted the card focused, not overloaded. I added tags like &ldquo;Hot,&rdquo; &ldquo;New,&rdquo; and &ldquo;Ending Soon&rdquo; for scanability and momentum, and a countdown to the next price increase to give a concrete reason to act. With Geri, the UX researcher, I looked at competitor cards to understand what information users are usually seeking: i.e their balance in tokens, the next price rise, and enough visual difference to tell presales apart. The most common caveat I saw was competitors making this card too dense and possibly overwhelming for users.
              </p>
            </div>

<div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <h4 style={sectionH4}>The token info page: a crucial step of the flow</h4>
              <p style={bodyText}>
                By the time you open the buy widget, the decision should already feel made. The hardest job is actually building trust and desire before any purchase. This is why I designed the token info page to be adaptable and follow each token&apos;s own visual identity. This is because in crypto you&apos;re not just buying a financial instrument but you&apos;re buying into a community and a token personality.
              </p>
              <p style={{ ...bodyText, marginTop: '1.65em' }}>
                On this screen, I wanted each element to answer something a skeptical buyer is silently asking. The fundraising progress bar answers &ldquo;are other people buying this?&rdquo;, the Achievements section answers &ldquo;is this project credible?&rdquo;, and links to the project and its white paper are there for anyone who wants to dig deeper. Also, I made the buy CTA sticky so that it stays visible as you scroll, so the action is one tap away the moment someone decides they&apos;re in.
              </p>
            </div>

            {/* ─── Making the Buy Flow Clear ───────────────────────────────── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <h2 style={sectionH2}>Making the buy flow clear.</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <h4 style={sectionH4}>By the time you reach the widget, the goal is clarity, not persuasion</h4>
                  <p style={bodyText}>
                    I optimized for three things: how many tokens you&apos;re buying, at what rate, and what it costs in real dollars. My competitive analysis at this stage was about clarity: what to display, what to simplify, and where apps commonly fail.
                  </p>
                </div>
              </div>
            </div>

            {/* Key insights */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <h5 style={flowLabel}>KEY INSIGHTS</h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {[
                  {
                    title: 'Most apps required selecting a payment token before showing an amount.',
                    body: "That’s a decision point almost no user changes, since ETH is what nearly every presale requires. So I defaulted to ETH and removed the step. You can still switch, you just don’t have to start there.",
                  },
                  {
                    title: 'Several apps also hid the token receive count behind a confirmation step.',
                    body: 'You’d type an amount, tap a button, then see what you’d get. I wanted that number live, updating as you type, so “how many tokens am I actually getting?” never needs an extra tap to answer.',
                  },
                ].map((insight, i) => (
                  <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <ArrowBullet color="var(--color-text-secondary)" />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <p style={flowHeading}>{insight.title}</p>
                      <p style={{ ...bodyText, color: 'var(--color-status-text)' }}>{insight.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>


            {/* ─── Making the Transaction Reviewable ───────────────────────── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <h2 style={sectionH2}>Making the transaction reviewable.</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <h4 style={sectionH4}>The review screen needs to make users feel confident before their money moves</h4>
                <p style={bodyText}>
                  I benchmarked the same wallet apps again, specifically for this screen. The pattern was consistent: Trust Wallet, Coinbase Wallet, Rainbow, 1inch, and Uniswap all put the purchase amount up top with the network fee below. However, Rainbow, 1inch, and Uniswap never gave you the total in dollars (leaving users to do the math), and several screens crowded the decision with information users do not need at that moment (like the source code, function name, contract creation date, etc.).
                </p>
              </div>
            </div>

            {/* Benchmark card with hoverable wallet badges */}
            <div style={{
              position: 'relative', overflow: 'visible',
              display: 'flex', flexDirection: 'row', gap: 20,
              padding: '40px 30px',
              background: 'var(--color-noto-card-blue)',
              border: '1px solid var(--color-border)',
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {WALLETS.map((wallet, i) => (
                <div
                  key={i}
                  style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, position: 'relative', overflow: 'visible' }}
                  onMouseEnter={() => setHoveredWallet(i)}
                  onMouseLeave={() => setHoveredWallet(null)}
                >
                  {/* Avatar + popup anchor */}
                  <div style={{ position: 'relative', width: 50, height: 50, overflow: 'visible', flexShrink: 0 }}>
                    <div style={{
                      width: 50, height: 50, borderRadius: 11,
                      background: 'var(--color-noto-tag-bg)',
                      border: '1px solid var(--color-border)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'default',
                    }}>
                      <p style={{ ...flowLabel, fontSize: 10 }}>{wallet.initials}</p>
                    </div>

                    {/* Checklist popup */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredWallet === i ? 1 : 0 }}
                      transition={{ duration: 0.2, ease: 'easeInOut' }}
                      style={{
                        position: 'absolute', top: 65, left: i < 3 ? 0 : undefined, right: i >= 3 ? 0 : undefined,
                        zIndex: 3, pointerEvents: 'none', width: 230,
                        background: 'var(--color-card-bg)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 8, padding: '12px 14px',
                      }}
                    >
                      <p style={{ ...flowLabel, marginBottom: 6 }}>{wallet.name.toUpperCase()}</p>
                      <p style={{
                        fontFamily: SANS, fontSize: 11.68, fontWeight: 500,
                        letterSpacing: '0.008em', lineHeight: '1.5em',
                        color: 'var(--color-status-text)', margin: '0 0 8px',
                      }}>
                        {wallet.note}
                      </p>
                      <div style={{ height: 1, background: 'var(--color-border)', margin: '6px 0 8px' }} />
                      {wallet.checks.map((check, j) => (
                        <div key={j} style={{ display: 'flex', gap: 6, alignItems: 'flex-start', marginTop: j === 0 ? 0 : 4 }}>
                          <span style={{
                            fontFamily: MONO, fontSize: 10, lineHeight: '1.6em', flexShrink: 0,
                            color: check.pass ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                          }}>
                            {check.pass ? '✓' : '✗'}
                          </span>
                          <p style={{
                            fontFamily: SANS, fontSize: 11.68, fontWeight: 500,
                            letterSpacing: '0.008em', lineHeight: '1.5em',
                            color: 'var(--color-text-primary)', margin: 0,
                          }}>
                            {check.label}
                            {check.detail && (
                              <span style={{ color: 'var(--color-text-secondary)' }}> ({check.detail})</span>
                            )}
                          </p>
                        </div>
                      ))}
                    </motion.div>
                  </div>

                  {/* Wallet name label below avatar */}
                  <p style={{ ...flowLabel, fontSize: 9.5, textAlign: 'center', width: 54, whiteSpace: 'normal', wordBreak: 'break-word' }}>
                    {wallet.name.replace(' (existing)', '')}
                  </p>
                </div>
              ))}

              {/* Hover annotation */}
              <div style={{
                position: 'absolute', top: '50%', left: 'calc(100% + 20px)',
                transform: 'translateY(-50%)',
                display: 'flex', flexDirection: 'row', gap: 10,
                alignItems: 'center', width: 'min-content', pointerEvents: 'none',
              }}>
                <svg viewBox="0 0 17.101 20.082" width={23} height={23} overflow="visible" aria-hidden="true" style={{ flexShrink: 0 }}>
                  <path d="M 6.75 0 C 7.164 0 7.5 0.336 7.5 0.75 L 7.5 3.25 C 7.5 3.664 7.164 4 6.75 4 C 6.336 4 6 3.664 6 3.25 L 6 0.75 C 6 0.336 6.336 0 6.75 0 Z M 1.97 1.97 C 2.263 1.678 2.737 1.678 3.03 1.97 L 4.78 3.72 C 4.981 3.907 5.063 4.189 4.995 4.454 C 4.928 4.72 4.72 4.928 4.454 4.995 C 4.189 5.063 3.907 4.981 3.72 4.78 L 1.97 3.03 C 1.678 2.737 1.678 2.263 1.97 1.97 Z M 11.53 1.97 C 11.822 2.263 11.822 2.737 11.53 3.03 L 9.78 4.78 C 9.593 4.981 9.311 5.063 9.046 4.995 C 8.78 4.928 8.572 4.72 8.505 4.454 C 8.437 4.189 8.519 3.907 8.72 3.72 L 10.47 1.97 C 10.763 1.678 11.237 1.678 11.53 1.97 Z M 0 6.75 C 0 6.336 0.336 6 0.75 6 L 3.25 6 C 3.664 6 4 6.336 4 6.75 C 4 7.164 3.664 7.5 3.25 7.5 L 0.75 7.5 C 0.336 7.5 0 7.164 0 6.75 Z M 6 7.487 C 6 6.36 7.322 5.752 8.177 6.486 L 16.638 13.738 C 17.548 14.518 17.03 16.009 15.833 16.058 L 11.993 16.211 C 11.58 16.227 11.192 16.411 10.916 16.718 L 8.302 19.64 C 7.495 20.543 6 19.971 6 18.76 Z" style={{ fill: 'var(--color-text-secondary)' }} />
                </svg>
                <p style={{ fontFamily: SANS, fontSize: 12.8, fontWeight: 500, letterSpacing: '0.008em', lineHeight: '1.4em', color: 'var(--color-text-secondary)', margin: 0, width: 73, wordBreak: 'break-word' }}>
                  Hover to see breakdown
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <h5 style={flowLabel}>KEY DESIGN DECISIONS</h5>
              <div style={{ height: 1, background: 'var(--color-border)' }} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  {[
                    {
                      label: 'Keeping users in context',
                      body: 'Like Coinbase and Rainbow, I made it so that the review opens over your purchase as a bottom sheet instead of taking you to a separate screen to keep the users in context with their purchase.',
                    },
                    {
                      label: 'Making crypto legible',
                      body: 'I added for each crypto amount its USD value beside it to make it less confusing. I also wrapped the total in its own container at the bottom, and added tooltips for both the total and the gas fee to give users more context.',
                    },
                    {
                      label: 'Adding trust signals',
                      body: "I added the token's website and its smart contract one tap away, so users can get reassurance and check where their money is going right at the moment they commit.",
                    },
                    {
                      label: 'Keeping the screen minimal',
                      body: "Some benchmarked screens surfaced elements like source code, function names, and contract creation dates. I cut everything that didn't help users decide, so nothing competes for attention.",
                    },
                  ].map((item, i) => (
                    <div key={i} ref={(el) => { decidedCardRefs.current[i] = el }} style={{
                      background: 'var(--color-card-bg)',
                      border: '1px solid var(--color-border)',
                      borderRadius: 8, padding: 20,
                      display: 'flex', flexDirection: 'column', gap: 8,
                      height: decidedCardHeight,
                    }}>
                      <h6 style={{ fontFamily: SANS, fontSize: 14.08, fontWeight: 500, lineHeight: '1.4em', color: 'var(--color-text-primary)', margin: 0 }}>
                        {item.label}
                      </h6>
                      <p style={{ fontFamily: SANS, fontSize: 13.44, fontWeight: 500, letterSpacing: '0.008em', lineHeight: '1.6em', color: 'var(--color-status-text)', margin: 0 }}>
                        {item.body}
                      </p>
                    </div>
                  ))}
              </div>
            </div>

          </section>

          {/* ════ NEXT STEPS ═════════════════════════════════════════════════ */}
          <div id="next-steps" style={{ display: 'flex', flexDirection: 'column', gap: 30, marginTop: 100 }}>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
              <p style={sectionLabel}>Next Steps</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <h2 style={sectionH2}>Handover to the engineering team.</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <h4 style={sectionH4}>Specs, annotations, and every state in between</h4>
                  <p style={bodyText}>
                    I handed the designs over with component annotations and interaction specs ready for engineering, including every edge case. Besides the main ones presented in this case study, I worked on the smaller ones where the work goes unseen but decides whether the flow holds up: i.e insufficient balance behavior, skeleton and loading states, empty and error states, character limits on the input fields (since presale token amounts can run long). We ended up shipping this as the first presale flow in the wallet, and it became a new source of engagement and revenue for Best Wallet.
                  </p>
                </div>
              </div>
            </div>

            <Placeholder
              label={'SPEC DETAIL\nComponent behavior annotations from Prep for Handover to DEV section'}
              aspectRatio={1.8}
              caption="Component behavior annotations from the handover section."
            />

          </div>

          {/* ════ WHAT I LEARNED ═════════════════════════════════════════════ */}
          <div id="what-i-learned" style={{ display: 'flex', flexDirection: 'column', gap: 52, marginTop: 100 }}>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
                <p style={sectionLabel}>Looking back</p>
                <h2 style={sectionH2}>What I learned from Best Wallet.</h2>
              </div>

              <Placeholder
                label={'APP SCREENSHOT\nTo be replaced with a screenshot of the shipped app'}
                aspectRatio={1.6}
              />
            </div>

            {/* Pull quote */}
            <div style={{ display: 'flex', flexDirection: 'row', gap: 16, alignItems: 'center' }}>
              <div style={{ width: 3, alignSelf: 'stretch', background: 'var(--color-noto-accent)', flexShrink: 0 }} />
              <h2 style={{ fontFamily: SERIFM, fontSize: 19.2, fontWeight: 500, lineHeight: '1.4em', letterSpacing: '-0.04em', color: 'var(--color-status-text)', margin: 0 }}>
                Every design detail carries weight in a financial app where users are spending real money.
              </h2>
            </div>

            {/* Coin illustration */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: -10, marginBottom: -10 }}>
              <svg width={180} height={80} viewBox="0 0 180 80" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="white" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.9 }}>
                {/* Coin 1 — left, leaning -15deg */}
                <g style={{ animation: 'coin-tilt-l 1.4s linear infinite', transformBox: 'fill-box', transformOrigin: 'center' }}>
                  <g transform="rotate(-15, 38, 38)">
                    <path d="M 39 28 C 51 27 61 32 61 38 C 61 44 51 48 38 47 C 25 46 15 43 15 38 C 15 32 26 28 39 28 Z" />
                    <path d="M 15 38 C 15 41 15 43 15 46" />
                    <path d="M 61 38 C 61 41 61 43 61 46" />
                    <path d="M 15 46 C 25 55 51 55 61 46" />
                    <path d="M 25 38 C 30 34 46 42 51 38" />
                  </g>
                </g>
                {/* Coin 2 — centre, slightly larger */}
                <g style={{ animation: 'coin-tilt-r 1.4s linear infinite', transformBox: 'fill-box', transformOrigin: 'center' }}>
                  <g transform="rotate(4, 90, 35)">
                    <path d="M 91 24 C 105 23 116 29 116 35 C 116 41 105 46 90 45 C 75 44 64 40 64 35 C 64 29 77 24 91 24 Z" />
                    <path d="M 64 35 C 64 38 64 41 64 45" />
                    <path d="M 116 35 C 116 38 116 41 116 45" />
                    <path d="M 64 45 C 75 55 105 55 116 45" />
                    <path d="M 77 35 C 82 31 98 39 103 35" />
                  </g>
                </g>
                {/* Coin 3 — right, leaning +18deg */}
                <g style={{ animation: 'coin-tilt-l 1.4s linear infinite', transformBox: 'fill-box', transformOrigin: 'center' }}>
                  <g transform="rotate(18, 142, 38)">
                    <path d="M 143 28 C 155 27 165 32 165 38 C 165 44 155 48 142 47 C 129 46 119 43 119 38 C 119 32 130 28 143 28 Z" />
                    <path d="M 119 38 C 119 41 119 43 119 46" />
                    <path d="M 165 38 C 165 41 165 43 165 46" />
                    <path d="M 119 46 C 129 55 155 55 165 46" />
                    <path d="M 129 38 C 134 34 150 42 155 38" />
                  </g>
                </g>
              </svg>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center' }}>
              <h5 style={flowLabel}>WHAT I LEARNED</h5>
            </div>

            {/* Three lessons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>

              <div style={{ display: 'flex', flexDirection: 'row', gap: 60, alignItems: 'flex-start' }}>
                <div style={{ width: '28%', flexShrink: 0 }}>
                  <h3 style={{ fontFamily: SERIFM, fontSize: 15.2, fontWeight: 500, lineHeight: '1.4em', letterSpacing: '-0.008em', color: 'var(--color-text-primary)', margin: 0 }}>
                    Edge cases aren&apos;t the footnote. They&apos;re the product.
                  </h3>
                </div>
                <div style={{ flex: '1 0 0' }}>
                  <p style={{ fontFamily: SANS, fontSize: 14.08, fontWeight: 500, lineHeight: '1.7em', letterSpacing: '0.008em', color: 'var(--color-status-text)', margin: 0 }}>
                    The edge cases mattered as much as the happy path here. In a financial app, it&apos;s important to map situations where things can go wrong. When something fails, people need to know where their money went and why it didn&apos;t work.
                  </p>
                </div>
              </div>

              <div style={{ height: 1, width: '100%', background: 'var(--color-border)' }} />

              <div style={{ display: 'flex', flexDirection: 'row', gap: 60, alignItems: 'flex-start' }}>
                <div style={{ width: '28%', flexShrink: 0 }}>
                  <h3 style={{ fontFamily: SERIFM, fontSize: 15.2, fontWeight: 500, lineHeight: '1.4em', letterSpacing: '-0.008em', color: 'var(--color-text-primary)', margin: 0 }}>
                    A pattern everyone follows isn&apos;t a pattern that works.
                  </h3>
                </div>
                <div style={{ flex: '1 0 0' }}>
                  <p style={{ fontFamily: SANS, fontSize: 14.08, fontWeight: 500, lineHeight: '1.7em', letterSpacing: '0.008em', color: 'var(--color-status-text)', margin: 0 }}>
                    Most wallet apps in the benchmark lacked clarity: technical jargon with no explanation, missing conversions, numbers you had to add up yourself. Nothing was hidden, but in a presale it reads as confusing, and confusing reads as untrustworthy. Benchmarking showed me the convention and pushed me to display information transparently.
                  </p>
                </div>
              </div>

              <div style={{ height: 1, width: '100%', background: 'var(--color-border)' }} />

              <div style={{ display: 'flex', flexDirection: 'row', gap: 60, alignItems: 'flex-start' }}>
                <div style={{ width: '28%', flexShrink: 0 }}>
                  <h3 style={{ fontFamily: SERIFM, fontSize: 15.2, fontWeight: 500, lineHeight: '1.4em', letterSpacing: '-0.008em', color: 'var(--color-text-primary)', margin: 0 }}>
                    On working in an unfamiliar domain.
                  </h3>
                </div>
                <div style={{ flex: '1 0 0' }}>
                  <p style={{ fontFamily: SANS, fontSize: 14.08, fontWeight: 500, lineHeight: '1.7em', letterSpacing: '0.008em', color: 'var(--color-status-text)', margin: 0 }}>
                    Designing for crypto meant learning it first. I came in without deep crypto knowledge, and a lot of the early work was just understanding what a presale actually is and why people join one. You can&apos;t simplify something you don&apos;t understand yourself.
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
              d="M 3.132 17.031 C 2.692 17.052 2.254 16.95 1.869 16.735 C 1.527 16.525 1.245 16.231 1.05 15.88 C 0.859 15.549 0.754 15.175 0.743 14.793 C 0.716 14.053 0.84 13.315 1.106 12.624 C 1.366 11.957 1.697 11.367 2.1 10.855 C 2.477 10.369 2.904 9.923 3.372 9.524 C 3.816 9.157 4.22 8.882 4.581 8.695 C 4.95 8.5 5.214 8.399 5.372 8.395 C 5.687 8.388 5.85 8.543 5.857 8.858 C 5.86 9.006 5.765 9.181 5.573 9.382 C 5.381 9.574 5.134 9.802 4.834 10.065 C 4.535 10.328 4.217 10.627 3.878 10.962 C 3.528 11.299 3.211 11.668 2.928 12.064 C 2.625 12.477 2.382 12.931 2.205 13.413 C 2.018 13.901 1.933 14.433 1.946 15.016 C 1.961 15.608 2.209 15.898 2.692 15.886 C 3.135 15.876 3.588 15.783 4.047 15.604 C 4.515 15.425 4.974 15.197 5.422 14.92 C 5.878 14.633 6.316 14.337 6.733 14.031 C 7.15 13.725 7.527 13.435 7.866 13.161 C 8.205 12.877 8.49 12.648 8.724 12.475 C 8.956 12.302 9.122 12.215 9.22 12.212 C 9.418 12.207 9.518 12.314 9.523 12.53 C 9.527 12.698 9.419 12.923 9.199 13.204 C 8.978 13.485 8.681 13.793 8.304 14.127 C 7.927 14.462 7.505 14.802 7.039 15.148 C 6.575 15.485 6.103 15.797 5.626 16.084 C 5.185 16.344 4.725 16.573 4.251 16.768 C 3.822 16.935 3.449 17.024 3.134 17.031 Z M 17.329 17.022 C 17.042 17.03 16.838 16.941 16.715 16.756 C 16.592 16.571 16.526 16.253 16.515 15.799 C 16.513 15.342 16.547 14.886 16.616 14.435 C 16.702 13.891 16.807 13.291 16.93 12.638 L 17.31 10.587 C 16.78 11.365 16.121 12.046 15.36 12.599 C 14.65 13.101 13.84 13.443 12.986 13.604 C 12.803 14.068 12.575 14.514 12.307 14.935 C 12.051 15.336 11.767 15.66 11.458 15.902 C 11.147 16.146 10.82 16.272 10.474 16.281 C 10.054 16.293 9.652 16.111 9.382 15.788 C 9.089 15.45 8.934 14.951 8.919 14.29 C 8.907 13.837 8.958 13.432 9.067 13.074 C 9.178 12.706 9.304 12.441 9.449 12.28 C 9.295 11.88 9.215 11.456 9.212 11.028 C 9.197 10.447 9.32 9.931 9.575 9.481 C 9.818 9.035 10.178 8.663 10.616 8.405 C 11.052 8.139 11.529 8 12.041 7.988 C 12.455 7.978 12.829 8.161 13.165 8.539 C 13.498 8.916 13.674 9.463 13.69 10.183 C 13.706 10.854 13.606 11.601 13.388 12.425 C 13.925 12.204 14.461 11.877 14.993 11.439 C 15.565 10.973 16.088 10.45 16.554 9.879 C 17.065 9.257 17.515 8.588 17.899 7.88 C 17.985 7.711 18.159 7.603 18.35 7.602 C 18.505 7.59 18.658 7.646 18.768 7.756 C 18.883 7.861 18.945 8.011 18.94 8.166 C 18.941 8.216 18.916 8.383 18.863 8.672 C 18.82 8.959 18.76 9.324 18.683 9.771 C 18.615 10.215 18.536 10.706 18.45 11.241 L 18.193 12.86 C 18.116 13.404 18.054 13.908 18.007 14.373 C 18.503 13.37 19.027 12.381 19.579 11.407 C 19.872 10.896 20.153 10.431 20.419 10.01 C 20.696 9.59 20.938 9.253 21.15 9.002 C 21.372 8.74 21.545 8.608 21.674 8.605 C 21.903 8.597 22.126 8.676 22.299 8.827 C 22.481 8.981 22.573 9.141 22.578 9.309 C 22.583 9.536 22.566 9.882 22.529 10.345 C 22.484 10.859 22.437 11.374 22.387 11.888 L 22.22 13.608 C 22.165 14.182 22.116 14.701 22.079 15.166 C 22.046 15.51 22.029 15.855 22.029 16.201 C 22.03 16.356 21.964 16.504 21.847 16.607 C 21.735 16.722 21.583 16.789 21.422 16.794 C 21.319 16.799 21.217 16.764 21.138 16.697 C 21.067 16.639 21.011 16.503 20.965 16.287 C 20.911 15.954 20.883 15.618 20.884 15.281 C 20.872 14.837 20.876 14.355 20.894 13.831 C 20.91 13.299 20.938 12.771 20.974 12.247 C 21.021 11.713 21.075 11.234 21.134 10.808 C 20.876 11.259 20.625 11.713 20.381 12.172 C 20.107 12.701 19.819 13.246 19.517 13.805 C 19.231 14.334 18.938 14.859 18.637 15.379 C 18.404 15.79 18.146 16.187 17.865 16.567 C 17.635 16.868 17.456 17.019 17.329 17.022 Z M 12.092 12.692 C 12.202 12.314 12.285 11.913 12.344 11.487 C 12.413 11.056 12.442 10.62 12.433 10.183 C 12.437 9.966 12.381 9.752 12.27 9.565 C 12.168 9.41 12.033 9.334 11.866 9.339 C 11.599 9.348 11.339 9.431 11.116 9.578 C 10.867 9.728 10.659 9.936 10.51 10.185 C 10.353 10.466 10.278 10.785 10.294 11.107 C 10.304 11.55 10.481 11.926 10.823 12.234 C 11.175 12.53 11.598 12.683 12.092 12.692 Z M 11.717 13.722 C 11.045 13.707 10.499 13.524 10.076 13.169 L 10.026 13.538 C 10.009 13.647 10.001 13.756 10.004 13.865 C 10.011 14.172 10.066 14.413 10.169 14.587 C 10.278 14.75 10.466 14.842 10.662 14.827 C 10.839 14.823 11.02 14.719 11.203 14.518 C 11.385 14.317 11.557 14.05 11.717 13.722 Z M 23.702 11.607 C 23.436 11.592 23.307 11.423 23.32 11.096 C 23.328 11.018 23.379 10.923 23.475 10.812 C 23.554 10.701 23.676 10.628 23.811 10.611 C 24.116 10.575 24.49 10.522 24.933 10.453 C 25.384 10.373 25.879 10.283 26.421 10.181 C 26.508 9.695 26.613 9.185 26.739 8.649 C 26.864 8.114 27.005 7.592 27.162 7.086 C 27.303 6.609 27.47 6.141 27.662 5.682 C 27.803 5.327 27.994 4.993 28.23 4.692 C 28.313 4.6 28.411 4.523 28.521 4.465 C 28.591 4.419 28.672 4.391 28.755 4.385 C 28.887 4.378 29.013 4.443 29.085 4.555 C 29.229 4.733 29.268 4.973 29.188 5.188 C 29.005 5.746 28.808 6.431 28.601 7.244 C 28.394 8.058 28.172 8.945 27.938 9.907 C 28.841 9.738 29.745 9.559 30.649 9.371 C 31.426 9.21 32.201 9.039 32.974 8.858 C 33.159 8.775 33.302 8.786 33.403 8.892 C 33.515 8.999 33.572 9.105 33.575 9.213 C 33.577 9.352 33.541 9.456 33.464 9.527 C 33.398 9.596 33.324 9.658 33.245 9.71 L 33.23 9.725 C 33.036 9.808 32.742 9.908 32.35 10.027 C 31.958 10.135 31.506 10.253 30.998 10.383 C 29.894 10.644 28.784 10.877 27.669 11.083 C 27.462 11.956 27.252 12.854 27.038 13.775 C 26.832 14.689 26.626 15.586 26.421 16.469 C 26.329 16.827 26.221 17.05 26.095 17.142 C 25.991 17.239 25.856 17.295 25.714 17.3 C 25.557 17.304 25.406 17.243 25.296 17.132 C 25.186 17.016 25.163 16.775 25.234 16.407 L 26.196 11.34 C 25.607 11.444 25.086 11.518 24.632 11.57 C 24.19 11.618 23.879 11.63 23.7 11.605 Z M 32.829 16.512 C 32.455 16.519 32.141 16.355 31.887 16.015 C 31.641 15.666 31.512 15.21 31.499 14.648 C 31.487 14.126 31.603 13.605 31.847 13.086 C 32.101 12.568 32.438 12.065 32.863 11.583 C 33.285 11.099 33.748 10.655 34.252 10.249 C 34.755 9.831 35.258 9.47 35.765 9.163 C 36.22 8.885 36.694 8.641 37.184 8.433 C 37.613 8.256 37.956 8.164 38.212 8.158 C 38.332 8.15 38.451 8.178 38.555 8.238 C 38.644 8.286 38.691 8.379 38.694 8.516 C 38.695 8.61 38.66 8.701 38.597 8.771 L 38.626 8.771 C 38.844 8.765 38.955 8.889 38.961 9.147 C 38.964 9.235 38.932 9.419 38.87 9.695 C 38.807 9.963 38.737 10.302 38.657 10.707 C 38.577 11.114 38.509 11.565 38.452 12.058 C 38.394 12.55 38.371 13.045 38.384 13.54 C 38.393 13.965 38.561 14.172 38.887 14.164 C 39.251 14.155 39.619 14.064 39.989 13.886 C 40.366 13.707 40.727 13.495 41.069 13.254 C 41.419 13 41.739 12.752 42.029 12.507 C 42.319 12.254 42.566 12.041 42.768 11.868 C 42.971 11.695 43.117 11.608 43.206 11.607 C 43.285 11.605 43.354 11.627 43.415 11.676 C 43.474 11.723 43.506 11.802 43.509 11.91 C 43.511 12.009 43.418 12.188 43.225 12.45 C 42.694 13.145 42.078 13.771 41.391 14.314 C 41.011 14.616 40.601 14.879 40.166 15.096 C 39.746 15.303 39.345 15.411 38.961 15.422 C 38.668 15.429 38.38 15.342 38.141 15.173 C 37.9 14.991 37.7 14.681 37.542 14.241 C 37.394 13.8 37.31 13.191 37.29 12.411 L 37.283 12.041 C 36.843 12.815 36.351 13.558 35.811 14.266 C 35.304 14.939 34.793 15.479 34.28 15.885 C 33.777 16.291 33.293 16.5 32.83 16.512 Z M 37.956 9.229 L 37.752 9.323 C 37.268 9.56 36.8 9.828 36.35 10.124 C 35.865 10.449 35.399 10.801 34.955 11.179 C 34.509 11.564 34.11 11.963 33.754 12.377 C 33.398 12.789 33.117 13.206 32.91 13.624 C 32.713 14.001 32.611 14.42 32.614 14.845 C 32.616 14.972 32.644 15.07 32.694 15.138 C 32.755 15.206 32.854 15.238 32.993 15.235 C 33.19 15.231 33.443 15.102 33.754 14.848 C 34.063 14.583 34.4 14.241 34.764 13.817 C 35.14 13.394 35.512 12.926 35.885 12.414 C 36.258 11.902 36.61 11.386 36.944 10.865 C 37.288 10.345 37.58 9.864 37.827 9.425 C 37.865 9.356 37.908 9.291 37.956 9.229 Z M 45.073 16.046 C 44.632 16.067 44.194 15.965 43.808 15.75 C 43.467 15.54 43.185 15.246 42.99 14.896 C 42.799 14.565 42.694 14.191 42.682 13.809 C 42.656 13.069 42.78 12.331 43.046 11.641 C 43.307 10.973 43.638 10.383 44.04 9.87 C 44.452 9.348 44.876 8.904 45.313 8.539 C 45.756 8.173 46.16 7.897 46.52 7.71 C 46.89 7.515 47.154 7.414 47.313 7.411 C 47.628 7.404 47.789 7.559 47.796 7.874 C 47.799 8.022 47.705 8.197 47.512 8.398 C 47.32 8.59 47.074 8.818 46.774 9.081 C 46.474 9.345 46.156 9.644 45.819 9.976 C 45.468 10.314 45.15 10.684 44.867 11.08 C 44.572 11.481 44.33 11.931 44.145 12.428 C 43.959 12.916 43.873 13.45 43.887 14.033 C 43.901 14.624 44.148 14.914 44.632 14.902 C 45.076 14.892 45.527 14.799 45.987 14.618 C 46.456 14.441 46.915 14.213 47.363 13.935 C 47.819 13.649 48.255 13.352 48.672 13.047 C 49.089 12.741 49.468 12.451 49.807 12.176 C 50.145 11.892 50.431 11.664 50.663 11.491 C 50.895 11.318 51.063 11.229 51.16 11.228 C 51.357 11.223 51.459 11.328 51.464 11.546 C 51.468 11.713 51.36 11.938 51.138 12.219 C 50.919 12.5 50.62 12.809 50.243 13.144 C 49.866 13.478 49.444 13.818 48.98 14.164 C 48.514 14.5 48.043 14.812 47.567 15.101 C 47.125 15.36 46.666 15.588 46.191 15.783 C 45.836 15.934 45.458 16.023 45.073 16.046 Z M 49.567 10.999 C 49.301 10.984 49.174 10.815 49.185 10.49 C 49.193 10.411 49.245 10.315 49.342 10.204 C 49.421 10.094 49.543 10.021 49.678 10.004 C 49.983 9.968 50.356 9.916 50.798 9.845 C 51.294 9.757 51.79 9.667 52.286 9.574 C 52.375 9.087 52.48 8.577 52.606 8.041 C 52.731 7.506 52.872 6.985 53.027 6.478 C 53.182 5.962 53.35 5.494 53.527 5.076 C 53.668 4.72 53.859 4.386 54.095 4.084 C 54.178 3.992 54.277 3.915 54.387 3.857 C 54.457 3.811 54.538 3.784 54.622 3.778 C 54.753 3.772 54.879 3.836 54.95 3.947 C 55.095 4.125 55.134 4.366 55.054 4.581 C 54.87 5.138 54.674 5.824 54.466 6.638 C 54.259 7.451 54.037 8.339 53.804 9.3 C 54.706 9.132 55.611 8.953 56.514 8.763 C 57.291 8.602 58.066 8.431 58.839 8.25 C 59.026 8.167 59.169 8.179 59.27 8.286 C 59.381 8.391 59.437 8.499 59.44 8.607 C 59.443 8.744 59.406 8.849 59.329 8.92 C 59.264 8.989 59.191 9.05 59.111 9.102 L 59.097 9.117 C 58.901 9.201 58.608 9.302 58.216 9.42 C 57.824 9.527 57.373 9.647 56.863 9.777 C 55.759 10.037 54.65 10.27 53.535 10.476 L 52.903 13.169 C 52.701 14.067 52.495 14.964 52.286 15.861 C 52.196 16.219 52.088 16.444 51.961 16.536 C 51.857 16.632 51.722 16.687 51.58 16.692 C 51.424 16.697 51.272 16.636 51.162 16.525 C 51.051 16.408 51.03 16.167 51.101 15.8 L 52.063 10.732 C 51.472 10.836 50.952 10.911 50.499 10.962 C 50.055 11.012 49.745 11.024 49.567 10.999 Z"
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
