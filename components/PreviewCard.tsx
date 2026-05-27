'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { homeProjects } from '@/lib/projects'

interface PreviewCardProps {
  hoveredSlug: string | null
}

export default function PreviewCard({ hoveredSlug }: PreviewCardProps) {
  const project = hoveredSlug
    ? homeProjects.find(p => p.slug === hoveredSlug) ?? null
    : null

  return (
    <div
      style={{
        width: 300,
        height: 395,
        background: 'var(--color-preview-bg)',
        borderRadius: 8,
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)',
        border: '1px solid rgba(0,0,0,0.06)',
        boxShadow: 'rgba(79, 44, 9, 0.06) 0px 5px 25px 3px',
        overflow: 'clip',
        position: 'relative',
        flexShrink: 0,
      }}
    >
      <AnimatePresence mode="wait">
        {!project ? (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'absolute',
              top: 12, bottom: 12, left: 16, right: 16,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            <div style={{ position: 'relative', width: 67, height: 63, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src="https://framerusercontent.com/images/0dCPqqRu4fUorwKpVyneDoZZs.png?width=318&height=293"
                alt=""
                style={{ width: 67, height: 63, objectFit: 'contain', display: 'block' }}
              />
            </div>
            <p
              style={{
                fontFamily: "'Caveat', var(--font-caveat), sans-serif",
                fontSize: 19.2,
                fontWeight: 400,
                lineHeight: '23.04px',
                letterSpacing: -0.384,
                color: 'var(--color-text-faint)',
                textAlign: 'center',
              }}
            >
              hover a project
            </p>
          </motion.div>
        ) : (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              top: 12, bottom: 12, left: 16, right: 16,
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
            }}
          >
            <p style={{
              fontFamily: "'Spline Sans Mono', var(--font-spline-sans-mono), monospace",
              fontSize: 10,
              fontWeight: 400,
              color: 'var(--color-text-secondary)',
              lineHeight: '1.4',
              marginBottom: 4,
              flexShrink: 0,
            }}>
              Highlights
            </p>
            {project.highlights.map((img, i) => (
              img ? (
                <img
                  key={i}
                  src={img}
                  alt=""
                  style={{ width: '100%', flex: 1, minHeight: 0, objectFit: 'cover', borderRadius: 6, display: 'block' }}
                />
              ) : (
                <div
                  key={i}
                  style={{ width: '100%', flex: 1, minHeight: 0, borderRadius: 6, background: project.gradient, opacity: 0.7 }}
                />
              )
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
