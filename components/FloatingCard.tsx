'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import TagChip from './TagChip'
import type { HomeProject } from '@/lib/projects'

interface FloatingCardProps {
  project: HomeProject
  positionStyle: React.CSSProperties
  onHover: (slug: string | null) => void
  isGrid?: boolean
  gridOffset?: { x: number; y: number }
  hoverRotate?: number
  gridHoverRotate?: number
}

export default function FloatingCard({ project, positionStyle, onHover, isGrid = false, gridOffset, hoverRotate = 0, gridHoverRotate }: FloatingCardProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const router = useRouter()

  const { zIndex: rowZIndex, ...posRest } = positionStyle as React.CSSProperties & { zIndex?: number }

  return (
    <motion.div
      style={{
        position: 'absolute',
        width: 386,
        height: 261,
        cursor: isDragging ? 'grabbing' : 'pointer',
        zIndex: isGrid ? 1 : (isHovered ? 20 : (rowZIndex ?? project.zIndex)),
        ...posRest,
      }}
      initial={{
        x: project.initialX,
        y: project.initialY,
        rotate: project.initialRotate,
        opacity: 0,
      }}
      animate={{
        x: isGrid ? (gridOffset?.x ?? 0) : 0,
        y: isGrid ? (gridOffset?.y ?? 0) : 0,
        rotate: 0,
        opacity: 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 160,
        damping: 22,
        mass: 1,
        delay: project.animDelay * 0.6,
      }}
      drag={!isGrid}
      dragConstraints={{ top: -30, bottom: 30, left: -30, right: 30 }}
      dragElastic={0.12}
      dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
      whileDrag={{ scale: 1.04 }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setTimeout(() => setIsDragging(false), 50)}
      onMouseEnter={() => { setIsHovered(true); onHover(project.slug); videoRef.current?.play() }}
      onMouseLeave={() => { setIsHovered(false); onHover(null); if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0 } }}
      onClick={() => { if (!isDragging) router.push(`/work/${project.slug}`) }}
    >
      {/* Card shell */}
      <div
        style={{
          background: 'var(--color-card-bg)',
          border: '1px solid var(--color-card-border)',
          borderRadius: 12,
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
          padding: 8,
          width: '100%',
          height: '100%',
          transform: isHovered ? `rotate(${isGrid && gridHoverRotate !== undefined ? gridHoverRotate : hoverRotate}deg)` : 'none',
          boxShadow: isHovered ? '0 8px 30px rgba(0,0,0,0.12)' : 'none',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        {/* Media area */}
        <div
          style={{
            borderRadius: 8,
            overflow: 'clip',
            width: '100%',
            height: '100%',
            background: project.gradient,
            position: 'relative',
          }}
        >
          {project.video && (
            <video
              ref={videoRef}
              src={project.video}
              muted
              loop
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          )}

          {/* Title overlay (Noto only) */}
          {project.titleOverlay && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: "'Caveat', var(--font-caveat), sans-serif",
                fontSize: 72,
                fontWeight: 400,
                color: 'rgba(255, 255, 255, 0.9)',
                pointerEvents: 'none',
              }}
            >
              {project.titleOverlay}
            </div>
          )}

          {/* Tag chips — hidden until hover */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: 10,
              left: 10,
              display: 'flex',
              flexDirection: 'row',
              gap: 6,
            }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {project.tags.map((tag, i) => (
              <TagChip key={i} label={tag} />
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
