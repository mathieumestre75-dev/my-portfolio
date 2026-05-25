'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import TagChip from './TagChip'
import { springs } from '@/lib/springs'
import type { HomeProject } from '@/lib/projects'

interface FloatingCardProps {
  project: HomeProject
  index: number
  onHover: (slug: string | null) => void
}

export default function FloatingCard({ project, index, onHover }: FloatingCardProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const router = useRouter()

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: project.top,
        left: project.left,
        width: 388,
        height: 261,
        cursor: isDragging ? 'grabbing' : 'pointer',
        zIndex: isHovered ? 20 : project.zIndex,
        rotate: project.rotate,
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...springs.card, delay: index * 0.12 }}
      drag
      dragConstraints={{ top: -40, bottom: 40, left: -40, right: 40 }}
      dragElastic={0.12}
      dragTransition={{ bounceStiffness: 300, bounceDamping: 30 }}
      whileHover={{
        boxShadow: 'rgba(102, 46, 0, 0.10) 0px 8px 32px 4px',
        scale: 1.02,
        transition: springs.card,
      }}
      whileDrag={{ scale: 1.04 }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setTimeout(() => setIsDragging(false), 50)}
      onMouseEnter={() => { setIsHovered(true); onHover(project.slug) }}
      onMouseLeave={() => { setIsHovered(false); onHover(null) }}
      onClick={() => { if (!isDragging) router.push(`/work/${project.slug}`) }}
    >
      {/* Card shell */}
      <div
        style={{
          background: 'rgba(0, 0, 0, 0.03)',
          borderRadius: 12,
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
          padding: 8,
          width: '100%',
          height: '100%',
        }}
      >
        {/* Media area */}
        <div
          style={{
            borderRadius: 8,
            overflow: 'clip',
            width: 372,
            height: 245,
            background: project.gradient,
            position: 'relative',
          }}
        >
          {project.video && (
            <video
              src={project.video}
              autoPlay
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
                top: 12,
                left: 16,
                fontFamily: "'Caveat', var(--font-caveat), sans-serif",
                fontSize: 22,
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
              bottom: 20,
              left: 20,
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
