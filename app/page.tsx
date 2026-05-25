'use client'

import { useState } from 'react'
import { homeProjects } from '@/lib/projects'
import GridBackground from '@/components/GridBackground'
import DotParticles from '@/components/DotParticles'
import RightFade from '@/components/RightFade'
import HomeTopBar from '@/components/HomeTopBar'
import TextBlock from '@/components/TextBlock'
import PreviewCard from '@/components/PreviewCard'
import FloatingCard from '@/components/FloatingCard'
import FloatingLabels from '@/components/FloatingLabels'
import DockNavigation from '@/components/DockNavigation'
import MusicBar from '@/components/MusicBar'

export default function Home() {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null)

  return (
    <main
      style={{
        background: 'rgb(241, 245, 251)',
        width: '100vw',
        height: '100vh',
        overflow: 'clip',
        position: 'relative',
      }}
    >
      <div
        style={{
          background: 'rgb(255, 255, 255)',
          width: '100%',
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
          boxShadow:
            'rgba(117, 117, 117, 0.01) 0px 1px 40px 0px inset, rgba(156, 156, 156, 0.01) 0px 0px 40px 10px inset',
        }}
      >
        <GridBackground />
        <DotParticles />
        <FloatingLabels />
        <RightFade />
        <HomeTopBar />

        {/* Left panel — top-left anchored */}
        <div
          style={{
            position: 'absolute',
            left: 20,
            top: 20,
            width: 225,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            gap: 50,
            zIndex: 10,
          }}
        >
          <TextBlock />
          <PreviewCard hoveredSlug={hoveredSlug} />
        </div>

        {/* Cards — absolutely positioned on the page */}
        {homeProjects.map((p, i) => (
          <FloatingCard
            key={p.slug}
            project={p}
            index={i}
            onHover={setHoveredSlug}
          />
        ))}

        <DockNavigation />
        <MusicBar />
      </div>
    </main>
  )
}
