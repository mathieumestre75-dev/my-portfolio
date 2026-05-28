'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutGrid, Mail, Sun, Home, Ghost, Notebook } from 'lucide-react'
import GridBackground from '@/components/GridBackground'

const mono: React.CSSProperties = {
  fontFamily: "'Spline Sans Mono', monospace",
  fontSize: 10.5, fontWeight: 400,
  color: 'var(--color-text-secondary)',
  letterSpacing: '0.04em',
}

// ─── 5 smooth, subtle, clean options ─────────────────────────────────────────
const OPTIONS = [
  {
    id: '1',
    label: 'Dissolve',
    desc: 'Pure opacity · no movement at all',
    exit: { opacity: 0, transition: { duration: 0.22, ease: 'easeOut' } },
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
  },
  {
    id: '2',
    label: 'Sink',
    desc: 'Gently sinks and fades · rises on entry',
    exit: { opacity: 0, y: 5, scale: 0.86, transition: { duration: 0.26, ease: [0.4, 0, 1, 1] } },
    initial: { opacity: 0, y: -5, scale: 0.9 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { type: 'spring', stiffness: 420, damping: 28 },
  },
  {
    id: '3',
    label: 'Pinch',
    desc: 'Scales cleanly to zero · springs back',
    exit: { scale: 0, opacity: 0, transition: { duration: 0.18, ease: [0.4, 0, 1, 1] } },
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { type: 'spring', stiffness: 500, damping: 24 },
  },
  {
    id: '4',
    label: 'Slide',
    desc: 'Slides left and fades · enters from right',
    exit: { x: -8, opacity: 0, transition: { duration: 0.22, ease: [0.4, 0, 0.6, 1] } },
    initial: { x: 7, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { type: 'spring', stiffness: 440, damping: 28 },
  },
  {
    id: '5',
    label: 'Blur Fade',
    desc: 'Defocuses and fades · clears on entry',
    exit: { opacity: 0, filter: 'blur(4px)', scale: 0.9, transition: { duration: 0.26, ease: 'easeOut' } },
    initial: { opacity: 0, filter: 'blur(4px)', scale: 0.92 },
    animate: { opacity: 1, filter: 'blur(0px)', scale: 1 },
    transition: { type: 'spring', stiffness: 380, damping: 28 },
  },
]

type Option = typeof OPTIONS[0]

// ─── One icon slot ────────────────────────────────────────────────────────────
function IconSlot({ Icon, active = false }: { Icon: React.ElementType; active?: boolean }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      width: 20, height: 20,
      color: 'var(--color-icon)',
      opacity: active ? 1 : 0.3,
    }}>
      <Icon size={16} strokeWidth={1.5} />
    </div>
  )
}

// ─── Particle angles / distances (deterministic) ─────────────────────────────
const PARTICLES = [
  { angle: 0,   dist: 15 }, { angle: 52,  dist: 13 },
  { angle: 103, dist: 16 }, { angle: 154, dist: 12 },
  { angle: 206, dist: 15 }, { angle: 257, dist: 13 },
  { angle: 309, dist: 14 },
]

// ─── Option A — particle burst dock ──────────────────────────────────────────
function SmokePuffDock({ showIcon }: { showIcon: boolean }) {
  const [puffActive, setPuffActive] = useState(false)
  const prevRef = useRef(showIcon)

  useEffect(() => {
    if (prevRef.current && !showIcon) {
      setPuffActive(true)
      const t = setTimeout(() => setPuffActive(false), 260)
      return () => clearTimeout(t)
    }
    prevRef.current = showIcon
  }, [showIcon])

  const dockStyle = {
    background: 'var(--color-dock-bg)',
    borderRadius: 1100 as const,
    border: '1px solid var(--color-dock-border)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    boxShadow: '0px 5px 25px 3px rgba(79,44,9,0.04)',
    padding: '10px 14px',
    display: 'flex',
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 14,
    height: 40,
  }

  return (
    <motion.div
      layout
      transition={{ type: 'spring', stiffness: 280, damping: 30, mass: 1 }}
      style={dockStyle}
    >
      <AnimatePresence mode="popLayout">
        <motion.div key="sun" layout style={{ display: 'flex' }}>
          <IconSlot Icon={Sun} />
        </motion.div>

        {/* Slot stays mounted during puff so dock holds its width */}
        {(showIcon || puffActive) && (
          <motion.div
            key="grid-slot"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0, scale: 0.6, transition: { duration: 0.15 } }}
            transition={{ type: 'spring', stiffness: 480, damping: 24 }}
            style={{ position: 'relative', width: 20, height: 20, overflow: 'visible', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
          >
            {/* Particles — appear when puffing */}
            <AnimatePresence>
              {puffActive && PARTICLES.map(p => (
                <motion.div
                  key={p.angle}
                  initial={{ x: 0, y: 0, scale: 1.2, opacity: 0.9 }}
                  animate={{
                    x: Math.cos(p.angle * Math.PI / 180) * p.dist,
                    y: Math.sin(p.angle * Math.PI / 180) * p.dist,
                    scale: 0, opacity: 0,
                  }}
                  transition={{ duration: 0.32, ease: [0.2, 0, 0.6, 1] }}
                  style={{
                    position: 'absolute',
                    width: 2.5, height: 2.5,
                    borderRadius: '50%',
                    background: 'var(--color-icon)',
                    pointerEvents: 'none',
                    zIndex: 10,
                  }}
                />
              ))}
            </AnimatePresence>

            {/* Icon — exits with a quick flash-shrink when puff starts */}
            <AnimatePresence>
              {showIcon && (
                <motion.div
                  key="icon"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{
                    scale: [1, 1.35, 0],
                    opacity: [0.3, 0.9, 0],
                    transition: { duration: 0.16, times: [0, 0.25, 1] },
                  }}
                  transition={{ type: 'spring', stiffness: 480, damping: 24 }}
                  style={{ position: 'absolute', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <LayoutGrid size={16} strokeWidth={1.5} style={{ color: 'var(--color-icon)', opacity: 0.3 }} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        <motion.div key="mail" layout style={{ display: 'flex' }}>
          <IconSlot Icon={Mail} />
        </motion.div>
      </AnimatePresence>

      <div style={{ width: 1, height: 12, background: 'var(--color-dock-divider)', flexShrink: 0 }} />
      <IconSlot Icon={Home} active />
      <IconSlot Icon={Ghost} />
      <IconSlot Icon={Notebook} />
    </motion.div>
  )
}

// ─── Mini dock replica ────────────────────────────────────────────────────────
function MiniDock({ opt, showIcon }: { opt: Option; showIcon: boolean }) {
  return (
    <motion.div
      layout
      transition={{ type: 'spring', stiffness: 280, damping: 30, mass: 1 }}
      style={{
        background: 'var(--color-dock-bg)',
        borderRadius: 1100,
        border: '1px solid var(--color-dock-border)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        boxShadow: '0px 5px 25px 3px rgba(79,44,9,0.04)',
        padding: '10px 14px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        height: 40,
      }}
    >
      <AnimatePresence mode="popLayout">
        <motion.div key="sun" layout style={{ display: 'flex' }}>
          <IconSlot Icon={Sun} />
        </motion.div>

        {showIcon && (
          <motion.div
            key="grid"
            initial={opt.initial}
            animate={opt.animate}
            exit={opt.exit}
            transition={opt.transition}
            style={{ display: 'flex' }}
          >
            <IconSlot Icon={LayoutGrid} />
          </motion.div>
        )}

        <motion.div key="mail" layout style={{ display: 'flex' }}>
          <IconSlot Icon={Mail} />
        </motion.div>
      </AnimatePresence>

      <div style={{ width: 1, height: 12, background: 'var(--color-dock-divider)', flexShrink: 0 }} />

      <IconSlot Icon={Home} active />
      <IconSlot Icon={Ghost} />
      <IconSlot Icon={Notebook} />
    </motion.div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function DockPreview() {
  const [allState, setAllState] = useState(true)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-page-bg)', position: 'relative' }}>
      <div aria-hidden style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.65 }}>
        <GridBackground />
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 960, margin: '0 auto', padding: '32px 24px 120px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
          <div>
            <div style={{
              fontFamily: "'P22 Mackinac Medium', sans-serif",
              fontSize: 16, fontWeight: 500,
              color: 'var(--color-text-primary)',
              marginBottom: 4,
            }}>
              Dock Icon Preview
            </div>
            <div style={mono}>Toggle the icon to compare exit · enter micro-interactions.</div>
          </div>
          <button
            onClick={() => setAllState(v => !v)}
            style={{
              background: 'var(--color-text-primary)', border: 'none',
              borderRadius: 100, padding: '8px 18px', cursor: 'pointer',
              fontFamily: "'Spline Sans Mono', monospace", fontSize: 10.5,
              color: 'var(--color-page-bg)', letterSpacing: '0.04em',
            }}
          >
            {allState ? 'ALL → /WORK' : 'ALL → HOME'}
          </button>
        </div>

        {/* grid — 2 columns, 5 items */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {OPTIONS.map(opt => (
            <OptionCardControlled key={opt.id} opt={opt} forceState={allState} />
          ))}
        </div>

        <div style={{ ...mono, textAlign: 'center', marginTop: 28, opacity: 0.6 }}>
          /work/preview-dock
        </div>
      </div>
    </div>
  )
}

// Controlled variant used by the "ALL" toggle
function OptionCardControlled({ opt, forceState }: { opt: Option; forceState: boolean }) {
  const [localOverride, setLocalOverride] = useState<boolean | null>(null)
  const showIcon = localOverride ?? forceState

  return (
    <div style={{
      background: 'var(--color-page-bg)',
      borderRadius: 12,
      border: '1px solid var(--color-border)',
      padding: '20px 20px 28px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
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
          onClick={() => setLocalOverride(v => v === null ? !forceState : !v)}
          style={{
            background: showIcon ? 'none' : 'var(--color-text-primary)',
            border: '1px solid var(--color-border)',
            borderRadius: 100, padding: '4px 12px', cursor: 'pointer',
            fontFamily: "'Spline Sans Mono', monospace", fontSize: 10,
            color: showIcon ? 'var(--color-text-secondary)' : 'var(--color-page-bg)',
            letterSpacing: '0.04em', flexShrink: 0,
            transition: 'background 0.2s, color 0.2s',
          }}
        >
          {showIcon ? '→ /WORK' : '→ HOME'}
        </button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <MiniDock opt={opt} showIcon={showIcon} />
      </div>
    </div>
  )
}
