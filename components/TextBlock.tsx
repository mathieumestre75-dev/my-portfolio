'use client'

import { motion } from 'framer-motion'

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

export default function TextBlock() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        gap: 15.4,
        zIndex: 10,
      }}
    >
      <motion.h1
        variants={item}
        style={{
          fontFamily: "'Caveat', var(--font-caveat), sans-serif",
          fontSize: 32.64,
          fontWeight: 400,
          lineHeight: '39.168px',
          letterSpacing: -0.6528,
          color: 'rgba(0, 0, 0, 0.75)',
          whiteSpace: 'pre-wrap',
          width: 225,
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
          color: 'rgba(0, 0, 0, 0.75)',
          width: 224.617,
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
          color: 'rgba(0, 0, 0, 0.35)',
          width: 224.617,
        }}
      >
        Prev. designed for Flowdesk, Arcal &amp; Nucleus.
      </motion.p>
    </motion.div>
  )
}
