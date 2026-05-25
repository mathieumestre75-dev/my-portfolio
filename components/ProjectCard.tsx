'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Project } from '@/lib/projects'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      style={{ borderRadius: 16, overflow: 'hidden' }}
    >
      <Link href={`/work/${project.slug}`} style={{ display: 'block', textDecoration: 'none' }}>
        <div
          style={{
            width: '100%',
            aspectRatio: '4/3',
            background: project.gradient,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: 24,
            position: 'relative',
          }}
        >
          {/* Overlay for legibility */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(0deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 50%)',
            }}
          />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <p
              style={{
                fontFamily: 'var(--font-spline-sans-mono)',
                fontSize: 11,
                color: 'rgba(255,255,255,0.7)',
                marginBottom: 4,
                letterSpacing: '0.04em',
              }}
            >
              {project.category}
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-lora)',
                fontSize: 20,
                color: '#ffffff',
                fontWeight: 500,
                lineHeight: 1.3,
              }}
            >
              {project.title}
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 13,
                color: 'rgba(255,255,255,0.75)',
                marginTop: 4,
              }}
            >
              {project.description}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
