'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import ClockWidget from '@/components/ClockWidget'
import GridBackground from '@/components/GridBackground'
import TagChip from '@/components/TagChip'

const CDN = 'https://framerusercontent.com'

const playProjects = [
  { id: 'canvas-exploration', title: 'Canvas Exploration — 2025', video: `${CDN}/assets/9XDlTpVn73XU7zCAmeX7kr13vo.mp4`, bg: 'rgba(0,0,0,0.03)' },
  { id: 'card-interaction',   title: 'Card Reveal Interaction — 2024', video: `${CDN}/assets/wbsalJ1kRyo9MscVWjfpwNkxuFU.mp4`, bg: 'rgba(0,0,0,0.03)' },
  { id: 'zany',               title: 'Zany — 2023', video: `${CDN}/assets/cWCSCVbSygJF4qsUYOKhOWrD9Y.mp4`, bg: 'rgb(254,244,216)' },
  { id: 'nps-redesign',       title: 'National Park App Redesign — 2023', video: `${CDN}/assets/YsSTnImYXKJjV2KunbahLeQtXM.mp4`, bg: 'rgb(252,253,249)' },
  { id: 'nps-badges',         title: 'National Park Badges — 2023', image: `${CDN}/images/AWMfUQBElW9HSDro600Ev2CKT4.png`, bg: 'rgb(252,252,247)' },
  { id: 'loosely',            title: 'Loosely — 2024', video: `${CDN}/assets/DmNvMsTYP0oswLvNL45zBw3gHc.mp4`, bg: 'rgba(0,0,0,0.03)' },
  { id: 'lumen',              title: 'Lumen (AR/VR) — 2025', video: `${CDN}/assets/T0qaFSj94Xu7pF04l5PwP2JdsMY.mp4`, bg: 'rgba(0,0,0,0.03)' },
  { id: 'astrology',          title: 'My Alignment with Astrology — 2024', video: `${CDN}/assets/3osJ4m33VXgYLE6tUzkk8WE8iG4.mp4`, bg: 'rgba(0,0,0,0.03)' },
  { id: 'data-viz',           title: 'cont. Data Visualizations — 2024', image: `${CDN}/images/fEn0bUESI6uez0luRLMYg6HRyoY.jpg`, bg: 'rgba(0,0,0,0.03)' },
  { id: 'wiz',                title: 'Wiz — 2025', video: `${CDN}/assets/Mzfxg1sUVddvvSCvyqxwas4cwJ0.mp4`, bg: 'rgb(238,232,252)' },
  { id: 'boothd',             title: 'boothd — 2024', video: `${CDN}/assets/D9wZDQvAt0q3LBp8tOZWp6Pcs.mp4`, bg: 'linear-gradient(rgb(110,57,0), rgb(0,0,0))' },
  { id: 'uw-website',         title: 'UW Design Show Website — 2025', video: `${CDN}/assets/54g9cmbs8vkWA8mkMEyELWji4yU.mp4`, bg: 'rgb(228,255,4)' },
  { id: 'uw-posters',         title: 'UW Design Show Poster Concepts — 2025', video: `${CDN}/assets/e5EUUhSiFBa4rEzO2E8w8VOdo.mp4`, bg: 'rgba(0,0,0,0.03)' },
  { id: 'seedbed',            title: 'Plant Personality Quiz — 2024', image: `${CDN}/images/epjSsUYvo1jD7o859ERfIKnl4w.png`, bg: 'rgb(247,247,247)' },
  { id: 'lost-in-color',      title: 'Lost In Color, Short Animation — 2022', video: `${CDN}/assets/Lz3jiUdjcfgxu6KU9YFb2aHyrRk.mp4`, bg: 'rgba(0,0,0,0.03)' },
]

type Project = typeof playProjects[0]

const CARD_KEYFRAME = `@keyframes work-rise { from { opacity:0; transform:translateY(28px) } to { opacity:1; transform:translateY(0) } }`

function PlayCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false)
  const delay = `${(0.1 + index * 0.05).toFixed(2)}s`

  return (
    <div style={{ animation: `work-rise 1s cubic-bezier(0.25,0.46,0.45,0.94) ${delay} both` }}>
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        cursor: 'pointer',
        borderRadius: 8,
        border: '1px solid rgba(0,0,0,0.08)',
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)',
        background: project.bg,
        aspectRatio: '1.56478',
        transform: hovered ? 'scale(1.012)' : 'scale(1)',
        transition: 'transform 0.3s ease',
        overflow: 'hidden',
      }}
    >
      {project.video && (
        <video
          src={project.video}
          autoPlay muted loop playsInline
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      )}
      {project.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={project.image}
          alt={project.title}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      )}

      {/* Tag chips — identical to homepage FloatingCard */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: 10,
          left: 10,
          display: 'flex',
          flexDirection: 'row',
          gap: 6,
          pointerEvents: 'none',
          zIndex: 2,
        }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <TagChip label={project.title} />
      </motion.div>
    </div>
    </div>
  )
}

const monoStyle: React.CSSProperties = {
  fontFamily: "'Spline Sans Mono', var(--font-spline-sans-mono), monospace",
  fontSize: 11.2, fontWeight: 400, lineHeight: '13.44px',
  color: 'var(--color-text-secondary)',
}

export default function Work() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-page-bg)', position: 'relative' }}>
      <style>{CARD_KEYFRAME}</style>

      {/* Grid background — slightly reduced opacity so it matches homepage feel */}
      <div aria-hidden style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.65 }}>
        <GridBackground />
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1500, margin: '0 auto', padding: '0 20px 120px' }}>

        {/* Text — pure opacity fade, no movement */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          style={{
            paddingTop: 20, paddingBottom: 16,
            display: 'flex', flexDirection: 'row',
            alignItems: 'flex-start', justifyContent: 'space-between',
          }}
        >
          <Link href="/" style={{ textDecoration: 'none' }}>
            <span style={{ ...monoStyle, cursor: 'pointer' }}>MATHIEU MESTRE</span>
          </Link>
          <ClockWidget />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.08 }}
          style={{ padding: '24px 0 28px' }}
        >
          <p style={{
            fontFamily: "'P22 Mackinac Medium', sans-serif",
            fontSize: 14, fontWeight: 500,
            color: 'var(--color-text-primary)',
            marginBottom: 6,
          }}>
            One-off projects and some explorations along the years.
          </p>
          <p style={monoStyle}>2022 — Present</p>
        </motion.div>

        {/* Cards — fade up with stagger */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 10,
        }}>
          {playProjects.map((project, i) => (
            <PlayCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
