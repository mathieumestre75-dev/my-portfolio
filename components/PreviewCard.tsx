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
        width: 224.617,
        height: 261.727,
        background: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 8,
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)',
        boxShadow: 'rgba(79, 44, 9, 0.06) 0px 5px 25px 3px',
        padding: '12px 16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
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
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              width: '100%',
              height: '100%',
            }}
          >
            <span style={{ fontSize: 40, lineHeight: 1, display: 'block', width: 67, height: 63, textAlign: 'center' }}>🪐</span>
            <p
              style={{
                fontFamily: "'Caveat', var(--font-caveat), sans-serif",
                fontSize: 19.2,
                fontWeight: 400,
                lineHeight: '23.04px',
                letterSpacing: -0.384,
                color: 'rgba(0, 0, 0, 0.23)',
                textAlign: 'center',
              }}
            >
              hover a project
            </p>
          </motion.div>
        ) : (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: '100%',
                height: 120,
                borderRadius: 6,
                background: project.gradient,
                flexShrink: 0,
              }}
            />
            <p
              style={{
                fontFamily: "'PP Neue Montreal Medium', sans-serif",
                fontSize: 14,
                fontWeight: 500,
                color: 'rgba(0, 0, 0, 0.75)',
                lineHeight: '1.4',
              }}
            >
              {project.title}
            </p>
            <p
              style={{
                fontFamily: "'P22 Mackinac Medium', serif",
                fontSize: 12,
                color: 'rgba(0, 0, 0, 0.5)',
                lineHeight: '1.5',
              }}
            >
              {project.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
