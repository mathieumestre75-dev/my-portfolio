'use client'

import { useEffect, useState } from 'react'

const sections = [
  { id: 'overview-section', label: 'Overview' },
  { id: 'problem-section', label: 'Problem' },
  { id: 'solution-section', label: 'Solution' },
  { id: 'user-research', label: 'Research' },
  { id: 'iteration', label: 'Iteration' },
  { id: 'outcome', label: 'Outcome' },
  { id: 'next-steps', label: 'Next Steps' },
  { id: 'reflection', label: 'What I learned' },
]

export default function CaseStudyAzureNav() {
  const [activeId, setActiveId] = useState('overview-section')

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id)
        },
        { rootMargin: '-20% 0px -70% 0px', threshold: 0 },
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <nav
      style={{
        position: 'sticky',
        top: 150,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      {sections.map(({ id, label }) => {
        const isActive = activeId === id
        return (
          <button
            key={id}
            onClick={() =>
              document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
            style={{
              background: 'none',
              border: 'none',
              cursor: 'none',
              textAlign: 'left',
              padding: 0,
              fontFamily: "'PP Neue Montreal Medium', sans-serif",
              fontSize: 12.48,
              fontWeight: 500,
              color: isActive ? 'var(--cs-text-active)' : 'var(--cs-text-muted)',
              transition: 'color 0.2s cubic-bezier(0.44, 0, 0.56, 1)',
              lineHeight: '16px',
            }}
          >
            {label}
          </button>
        )
      })}
    </nav>
  )
}
