'use client'

import { useEffect, useState } from 'react'

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'problem', label: 'Problem' },
  { id: 'solution', label: 'Solution' },
  { id: 'outcome', label: 'Outcome' },
  { id: 'learned', label: 'What I Learned' },
]

export default function CaseStudySidebar() {
  const [activeId, setActiveId] = useState('overview')

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id) },
        { rootMargin: '-25% 0px -65% 0px', threshold: 0 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <nav style={{ position: 'sticky', top: 40, width: 220, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
      {sections.map(({ id, label }) => {
        const isActive = activeId === id
        return (
          <button
            key={id}
            onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
              padding: '6px 0',
              fontFamily: 'var(--font-inter)',
              fontSize: 12.48,
              fontWeight: 500,
              color: isActive ? 'var(--fg)' : 'var(--fg-muted)',
              transition: 'color 0.2s ease',
            }}
          >
            {label}
          </button>
        )
      })}
    </nav>
  )
}
