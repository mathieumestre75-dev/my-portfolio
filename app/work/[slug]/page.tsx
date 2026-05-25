import { notFound } from 'next/navigation'
import Link from 'next/link'
import { projects } from '@/lib/projects'
import CaseStudySidebar from '@/components/CaseStudySidebar'

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

const pill = (text: string) => (
  <span
    key={text}
    style={{
      fontFamily: 'var(--font-spline-sans-mono)',
      fontSize: 11,
      background: 'rgba(0,0,0,0.06)',
      borderRadius: 999,
      padding: '4px 12px',
      color: 'rgba(0,0,0,0.75)',
      display: 'inline-block',
    }}
  >
    {text}
  </span>
)

const h2Style: React.CSSProperties = {
  fontFamily: 'var(--font-lora)',
  fontSize: 22.4,
  color: 'rgba(0,0,0,0.75)',
  fontWeight: 500,
  lineHeight: 1.4,
  marginTop: 40,
  marginBottom: 16,
}

const bodyStyle: React.CSSProperties = {
  fontFamily: 'var(--font-inter)',
  fontSize: 13.6,
  color: 'rgba(0,0,0,0.75)',
  lineHeight: 1.75,
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) notFound()

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#F1F5FB',
        paddingBottom: 120,
      }}
    >
      {/* Top bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 20px 0',
        }}
      >
        <Link
          href="/work"
          style={{
            fontFamily: 'var(--font-spline-sans-mono)',
            fontSize: 13,
            color: 'rgba(0,0,0,0.45)',
            textDecoration: 'none',
            transition: 'color 0.2s ease',
          }}
        >
          ← Back
        </Link>
      </div>

      {/* Body: sidebar + content */}
      <div
        style={{
          display: 'flex',
          gap: 40,
          padding: '48px 20px 0',
          maxWidth: 900,
          margin: '0 auto',
          alignItems: 'flex-start',
        }}
      >
        <CaseStudySidebar />

        {/* Main content — 648px max */}
        <article style={{ flex: 1, maxWidth: 648 }}>
          {/* Breadcrumb */}
          <p
            style={{
              fontFamily: 'var(--font-spline-sans-mono)',
              fontSize: 13.28,
              color: 'rgba(0,0,0,0.45)',
              marginBottom: 16,
            }}
          >
            Project / {project.category}
          </p>

          {/* H1 */}
          <h1
            style={{
              fontFamily: 'var(--font-lora)',
              fontSize: 32,
              color: 'rgba(0,0,0,0.75)',
              lineHeight: 1.2,
              marginBottom: 24,
            }}
          >
            {project.title}
          </h1>

          {/* Metadata grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 16,
              padding: 20,
              background: 'rgba(0,0,0,0.03)',
              borderRadius: 12,
              marginBottom: 40,
            }}
          >
            {[
              { label: 'Role', value: project.role },
              { label: 'Timeline', value: project.timeline },
              { label: 'Team', value: project.team },
            ].map(({ label, value }) => (
              <div key={label}>
                <p style={{ fontFamily: 'var(--font-spline-sans-mono)', fontSize: 11, color: 'rgba(0,0,0,0.35)', marginBottom: 6 }}>
                  {label}
                </p>
                <p style={{ fontFamily: 'var(--font-inter)', fontSize: 13.6, color: 'rgba(0,0,0,0.75)' }}>
                  {value}
                </p>
              </div>
            ))}
            <div>
              <p style={{ fontFamily: 'var(--font-spline-sans-mono)', fontSize: 11, color: 'rgba(0,0,0,0.35)', marginBottom: 6 }}>
                Skills
              </p>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {project.skills.map(pill)}
              </div>
            </div>
          </div>

          {/* Gradient hero */}
          <div
            style={{
              width: '100%',
              height: 280,
              background: project.gradient,
              borderRadius: 12,
              marginBottom: 40,
            }}
          />

          {/* Sections */}
          <section id="overview">
            <h2 style={h2Style}>Overview</h2>
            <p style={bodyStyle}>{project.overview}</p>
          </section>

          <section id="problem">
            <h2 style={h2Style}>Problem</h2>
            <p style={bodyStyle}>{project.problem}</p>
          </section>

          <section id="solution">
            <h2 style={h2Style}>Solution</h2>
            <p style={bodyStyle}>{project.solution}</p>
            {/* Placeholder mockup blocks */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 24 }}>
              {[0.9, 0.7].map((op, i) => (
                <div
                  key={i}
                  style={{
                    width: '100%',
                    height: 200,
                    background: project.gradient,
                    borderRadius: 8,
                    opacity: op,
                  }}
                />
              ))}
            </div>
          </section>

          <section id="outcome">
            <h2 style={h2Style}>Outcome</h2>
            <p style={bodyStyle}>{project.outcome}</p>

            {/* Highlights */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 24 }}>
              {project.highlights.map((h) => (
                <div
                  key={h}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 12,
                    padding: '12px 16px',
                    background: 'rgba(0,0,0,0.03)',
                    borderRadius: 8,
                  }}
                >
                  <span style={{ color: 'rgba(0,0,0,0.35)', flexShrink: 0 }}>→</span>
                  <p style={{ fontFamily: 'var(--font-inter)', fontSize: 13.6, color: 'rgba(0,0,0,0.75)', lineHeight: 1.6 }}>
                    {h}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section id="learned">
            <h2 style={h2Style}>What I Learned</h2>
            <p style={bodyStyle}>{project.learned}</p>
          </section>
        </article>
      </div>
    </div>
  )
}
