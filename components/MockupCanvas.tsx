'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence, useSpring } from 'framer-motion'
import Link from 'next/link'
import { Project } from '@/lib/projects'

interface CardConfig {
  left: number
  top: number
  width: number
  height: number
  floatAmplitude: number
  floatDuration: number
  rotate: number
}

interface EntryConfig {
  x: number
  y: number
  rotate: number
  delay: number
}

const cardConfigs: CardConfig[] = [
  { left: 640, top: 80,  width: 380, height: 260, floatAmplitude: 10, floatDuration: 5.0, rotate: -1.5 },
  { left: 920, top: 30,  width: 340, height: 240, floatAmplitude: 8,  floatDuration: 6.2, rotate: 1.2  },
  { left: 660, top: 330, width: 360, height: 250, floatAmplitude: 12, floatDuration: 4.8, rotate: 0.8  },
  { left: 980, top: 265, width: 320, height: 230, floatAmplitude: 9,  floatDuration: 5.5, rotate: -0.6 },
]

const entryConfigs: EntryConfig[] = [
  { x:  160, y: -110, rotate:  20, delay: 0    },
  { x:  130, y:  100, rotate:  10, delay: 0.15 },
  { x: -100, y:  200, rotate: -10, delay: 0.3  },
  { x: -160, y:  -80, rotate: -16, delay: 0.2  },
]

// Phase offsets so each card starts at a different point in the sine wave
const PHASES = [0, Math.PI * 0.7, Math.PI * 1.4, Math.PI * 0.3]

function useCardFloat(amplitude: number, duration: number, phase: number) {
  const springY = useSpring(0, { stiffness: 18, damping: 8 })

  useEffect(() => {
    let rafId: number
    const startTime = performance.now()

    function tick(now: number) {
      const elapsed = (now - startTime) / 1000
      const raw = Math.sin((elapsed / duration) * Math.PI * 2 + phase) * amplitude
      springY.set(raw)
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [amplitude, duration, phase, springY])

  return springY
}

interface FloatingCardProps {
  project: Project
  cfg: CardConfig
  entry: EntryConfig
  phase: number
  index: number
  isHovered: boolean
  isDimmed: boolean
  onHoverChange: (p: Project | null) => void
}

function FloatingCard({ project, cfg, entry, phase, index, isHovered, isDimmed, onHoverChange }: FloatingCardProps) {
  const floatY = useCardFloat(cfg.floatAmplitude, cfg.floatDuration, phase)

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: cfg.left,
        top: cfg.top,
        width: cfg.width,
        height: cfg.height,
        zIndex: isHovered ? 20 : 10 - index,
      }}
      initial={{ x: entry.x, y: entry.y, rotate: entry.rotate, opacity: 0 }}
      animate={{ x: 0, y: 0, rotate: cfg.rotate, opacity: 1 }}
      transition={{ type: 'spring', bounce: 0.2, duration: 1, delay: entry.delay }}
    >
      <motion.div
        style={{ width: '100%', height: '100%', y: floatY }}
        animate={{
          opacity: isDimmed ? 0.6 : 1,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{
          opacity: { duration: 0.3 },
          scale: { duration: 0.2 },
        }}
        onMouseEnter={() => onHoverChange(project)}
        onMouseLeave={() => onHoverChange(null)}
      >
        <Link
          href={`/work/${project.slug}`}
          style={{ display: 'block', width: '100%', height: '100%', textDecoration: 'none' }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(5px)',
              WebkitBackdropFilter: 'blur(5px)',
              borderRadius: 12,
              overflow: 'hidden',
              position: 'relative',
              cursor: 'pointer',
              border: '1px solid rgba(0,0,0,0.03)',
              boxShadow: isHovered ? 'var(--card-shadow)' : 'none',
              transition: 'box-shadow 0.2s ease',
            }}
          >
            {/* Media area */}
            <div
              style={{
                width: 'calc(100% - 16px)',
                height: 'calc(100% - 16px)',
                margin: 8,
                borderRadius: 8,
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.4)',
                position: 'relative',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url(/mockups/${project.slug}.png), ${project.gradient}`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            </div>

            {/* Hover: tag pills */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    position: 'absolute',
                    bottom: 12,
                    left: 12,
                    display: 'flex',
                    gap: 4,
                    flexWrap: 'wrap',
                  }}
                >
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      style={{
                        background: 'rgba(0,0,0,0.3)',
                        borderRadius: 6,
                        padding: '4px 8px',
                        fontFamily: 'var(--font-spline-sans-mono)',
                        fontSize: 10.24,
                        fontWeight: 500,
                        color: '#ffffff',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  )
}

interface MockupCanvasProps {
  projects: Project[]
  hoveredProject: Project | null
  onHoverChange: (p: Project | null) => void
}

export default function MockupCanvas({ projects, hoveredProject, onHoverChange }: MockupCanvasProps) {
  return (
    <>
      {projects.map((project, i) => (
        <FloatingCard
          key={project.slug}
          project={project}
          cfg={cardConfigs[i]}
          entry={entryConfigs[i]}
          phase={PHASES[i]}
          index={i}
          isHovered={hoveredProject?.slug === project.slug}
          isDimmed={hoveredProject !== null && hoveredProject?.slug !== project.slug}
          onHoverChange={onHoverChange}
        />
      ))}
    </>
  )
}
