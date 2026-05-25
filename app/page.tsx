'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { homeProjects } from '@/lib/projects'
import GridBackground from '@/components/GridBackground'
import DotParticles from '@/components/DotParticles'
import RightFade from '@/components/RightFade'
import HomeTopBar from '@/components/HomeTopBar'
import TextBlock from '@/components/TextBlock'
import PreviewCard from '@/components/PreviewCard'
import FloatingCard from '@/components/FloatingCard'
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
      {/* White page surface */}
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
        <RightFade />
        <HomeTopBar />

        {/* Main content row */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 210,
            padding: 20,
            width: '100%',
            height: '100%',
            overflow: 'clip',
            position: 'relative',
          }}
        >
          {/* Left panel */}
          <div
            style={{
              width: 224.617,
              height: 566,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              gap: 50,
              paddingBottom: 80,
              position: 'relative',
              zIndex: 10,
              flexShrink: 0,
            }}
          >
            <TextBlock />
            <PreviewCard hoveredSlug={hoveredSlug} />
          </div>

          {/* Cards area */}
          <div
            style={{
              width: 586.383,
              height: 566,
              position: 'relative',
              overflow: 'visible',
              zIndex: 10,
              flexShrink: 0,
            }}
          >
            {/* Floating canvas */}
            <div
              style={{
                position: 'absolute',
                width: 1271.18,
                height: 665,
                top: -82,
                left: -80,
              }}
            >
              <AnimatePresence>
                {homeProjects.map((p, i) => (
                  <FloatingCard
                    key={p.slug}
                    project={p}
                    index={i}
                    onHover={setHoveredSlug}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <DockNavigation />
        <MusicBar />
      </div>
    </main>
  )
}
