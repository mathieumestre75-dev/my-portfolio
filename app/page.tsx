'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { homeProjects, type HomeProject } from '@/lib/projects'
import { useView } from '@/app/providers'
import GridBackground from '@/components/GridBackground'
import DotParticles from '@/components/DotParticles'
import RightFade from '@/components/RightFade'
import HomeTopBar from '@/components/HomeTopBar'
import TextBlock from '@/components/TextBlock'
import PreviewCard from '@/components/PreviewCard'
import FloatingCard from '@/components/FloatingCard'
export default function Home() {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null)
  const hoveredProject: HomeProject | null = hoveredSlug ? (homeProjects.find(p => p.slug === hoveredSlug) ?? null) : null
  const { view } = useView()
  const isOrganized = view === 'organized'

  return (
    <main
      style={{
        background: 'var(--color-page-bg)',
        width: '100vw',
        height: '100vh',
        overflow: 'clip',
        position: 'relative',
      }}
    >
      <div
        style={{
          background: 'var(--color-inner-bg)',
          width: '100%',
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
          boxShadow:
            'rgba(117, 117, 117, 0.01) 0px 1px 40px 0px inset, rgba(156, 156, 156, 0.01) 0px 0px 40px 10px inset',
        }}
      >
        <GridBackground />

        {/* Top color wash — 101px */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 101,
            background: 'linear-gradient(180deg, rgba(217,235,252,0.46) 0%, rgba(255,235,242,0.32) 27.9%, rgba(255,249,242,0.53) 62.25%, rgba(252,252,252,0) 100%)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        <DotParticles />
<RightFade />
        <HomeTopBar />

        {/* Left panel */}
        <motion.div
          style={{
            position: 'absolute',
            left: 20,
            top: 20,
            width: 300,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            gap: 50,
            zIndex: 10,
          }}
        >
          <TextBlock hoveredProject={hoveredProject} />
          <PreviewCard hoveredSlug={hoveredSlug} />
        </motion.div>

        {/* Cards cluster */}
        <div style={{
          position: 'absolute',
          top: '38%',
          left: '47%',
          transform: 'translateY(-50%)',
          width: 820,
          height: 560,
          overflow: 'visible',
          zIndex: 5,
          pointerEvents: 'auto',
        }}>
          {/* Noto — front dominant card, top-left of cluster → grid bottom-left */}
          <FloatingCard project={homeProjects[0]} positionStyle={{ top: 80, left: 56, width: 386, height: 261, zIndex: 4 }} onHover={setHoveredSlug} isGrid={isOrganized} gridOffset={{ x: -120, y: 288 }} hoverRotate={-3} />
          {/* Omro — slightly higher than Noto, peeks right → grid top-right */}
          <FloatingCard project={homeProjects[1]} positionStyle={{ top: 27, left: 255, width: 386, height: 261, zIndex: 1 }} onHover={setHoveredSlug} isGrid={isOrganized} gridOffset={{ x: 83, y: 64 }} hoverRotate={3} gridHoverRotate={-3} />
          {/* Azure IoT — bottom-left → grid top-left */}
          <FloatingCard project={homeProjects[2]} positionStyle={{ top: 365, left: 6, width: 386, height: 261, zIndex: 2 }} onHover={setHoveredSlug} isGrid={isOrganized} gridOffset={{ x: -70, y: -274 }} hoverRotate={-3} gridHoverRotate={3} />
          {/* Motra — bottom-right → grid bottom-right */}
          <FloatingCard project={homeProjects[3]} positionStyle={{ top: 305, left: 320, width: 386, height: 261, zIndex: 6 }} onHover={setHoveredSlug} isGrid={isOrganized} gridOffset={{ x: 18, y: 63 }} hoverRotate={3} />
        </div>

      </div>
    </main>
  )
}
