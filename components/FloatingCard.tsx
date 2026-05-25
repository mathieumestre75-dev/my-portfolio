'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import TagChip from './TagChip'
import { springs } from '@/lib/springs'

export interface HomeProject {
  slug: string
  title: string
  description: string
  gradient: string
  tags: string[]
  top: number
  left: number
}

interface FloatingCardProps {
  project: HomeProject
  index: number
  onHover: (slug: string | null) => void
}

export default function FloatingCard({ project, index, onHover }: FloatingCardProps) {
  const [isDragging, setIsDragging] = useState(false)
  const router = useRouter()

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: project.top,
        left: project.left,
        width: 388,
        height: 261,
        cursor: 'pointer',
        zIndex: 10 - index,
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
        zIndex: 20,
        transition: springs.card,
      }}
      whileDrag={{ scale: 1.04, cursor: 'grabbing', zIndex: 30 }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setTimeout(() => setIsDragging(false), 50)}
      onMouseEnter={() => onHover(project.slug)}
      onMouseLeave={() => onHover(null)}
      onClick={() => { if (!isDragging) router.push(`/work/${project.slug}`) }}
    >
      <div
        style={{
          background: 'rgba(0, 0, 0, 0.03)',
          borderRadius: 12,
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
          padding: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          width: '100%',
          height: '100%',
        }}
      >
        <div
          style={{
            borderRadius: 8,
            overflow: 'clip',
            width: 372,
            height: 245,
            backgroundImage: `${project.gradient}`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              bottom: 12,
              left: 12,
              display: 'flex',
              flexDirection: 'row',
              gap: 6,
              flexWrap: 'wrap',
            }}
          >
            {project.tags.map((tag, i) => (
              <TagChip key={i} label={tag} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
