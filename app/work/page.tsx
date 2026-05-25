import TopBar from '@/components/TopBar'
import ProjectCard from '@/components/ProjectCard'
import { projects } from '@/lib/projects'

export default function Work() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#F1F5FB',
        paddingBottom: 120,
      }}
    >
      <TopBar label="MATHIEU MESTRE" />

      <div style={{ padding: '40px 20px 0' }}>
        <h1
          style={{
            fontFamily: 'var(--font-lora)',
            fontSize: 32,
            color: 'rgba(0,0,0,0.75)',
            lineHeight: 1.2,
            marginBottom: 8,
          }}
        >
          All Work
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: 13.6,
            color: 'rgba(0,0,0,0.45)',
            lineHeight: '23.8px',
            marginBottom: 40,
          }}
        >
          Selected projects from 2023–2024
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 24,
            maxWidth: 960,
          }}
        >
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </div>
  )
}
