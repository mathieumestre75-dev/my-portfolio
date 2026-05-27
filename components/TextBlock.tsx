'use client'

import { motion, AnimatePresence } from 'framer-motion'
import type { HomeProject } from '@/lib/projects'

interface TextBlockProps {
  hoveredProject: HomeProject | null
}

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
}

const item = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 350, damping: 28, mass: 0.7 },
  },
}

export default function TextBlock({ hoveredProject }: TextBlockProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start', zIndex: 10, width: 300, height: 160, flexShrink: 0 }}>
      <AnimatePresence mode="wait">
        {hoveredProject ? (
          <motion.div
            key={hoveredProject.slug}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}
          >
            <p style={{
              fontFamily: "'Spline Sans Mono', var(--font-spline-sans-mono), monospace",
              fontSize: 13,
              fontWeight: 400,
              color: 'var(--color-text-secondary)',
              lineHeight: '1.4',
            }}>
              {hoveredProject.title}{hoveredProject.client !== hoveredProject.title ? `, ${hoveredProject.client}` : ''}
            </p>
            <p style={{
              fontFamily: "'P22 Mackinac Medium', serif",
              fontSize: 13,
              fontWeight: 500,
              lineHeight: '1.5',
              letterSpacing: -0.2,
              color: 'var(--color-text-primary)',
            }}>
              {hoveredProject.tagline}
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="idle"
            variants={container}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            style={{ display: 'flex', flexDirection: 'column', gap: 15.4, width: '100%' }}
          >
            <motion.h1
              variants={item}
              style={{
                fontFamily: "'Caveat', var(--font-caveat), sans-serif",
                fontSize: 32.64,
                fontWeight: 400,
                lineHeight: '39.168px',
                letterSpacing: -0.6528,
                color: 'var(--color-text-primary)',
                whiteSpace: 'pre-wrap',
              }}
            >
              {"Hiya! I'm Mathieu."}
            </motion.h1>
            <motion.p
              variants={item}
              style={{
                fontFamily: "'P22 Mackinac Medium', serif",
                fontSize: 14.08,
                fontWeight: 500,
                lineHeight: '21.12px',
                letterSpacing: -0.2816,
                color: 'var(--color-text-primary)',
              }}
            >
              I&apos;m a designer orbiting vision, craft, &amp; curiosity to create experiences that feel human.
            </motion.p>
            <motion.p
              variants={item}
              style={{
                fontFamily: "'Spline Sans Mono', var(--font-spline-sans-mono), monospace",
                fontSize: 12.8,
                fontWeight: 400,
                lineHeight: '20.48px',
                color: 'var(--color-text-secondary)',
              }}
            >
              Prev. designed for Flowdesk, Arcal &amp; Nucleus.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
