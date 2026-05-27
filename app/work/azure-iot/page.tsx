'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import StarCanvas from '@/components/StarCanvas'
import GridBackground from '@/components/GridBackground'
import DotParticles from '@/components/DotParticles'
import MusicBar from '@/components/MusicBar'
import CaseStudyAzureNav from '@/components/CaseStudyAzureNav'

/* ─── fade-in wrapper ─── */
function FadeIn({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px 0px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
      style={{ willChange: 'transform' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─── shared typography styles ─── */
const mono = (size: number, color: string, weight = 400): React.CSSProperties => ({
  fontFamily: "'Spline Sans Mono', var(--font-spline-sans-mono), monospace",
  fontSize: size,
  fontWeight: weight,
  color,
  lineHeight: `${size * 1.2}px`,
})

const mackinac = (size: number, weight: 400 | 500, color: string, ls = 0): React.CSSProperties => ({
  fontFamily: "'P22 Mackinac', serif",
  fontSize: size,
  fontWeight: weight,
  color,
  letterSpacing: ls,
})

const montreal = (size: number, color: string, ls = 0.12): React.CSSProperties => ({
  fontFamily: "'PP Neue Montreal Medium', sans-serif",
  fontSize: size,
  fontWeight: 500,
  color,
  letterSpacing: ls,
  lineHeight: `${size * 1.5}px`,
})

/* ─── section label + heading pattern ─── */
function SectionBlock({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: 30 }}>
      <span
        style={{
          ...mono(11.68, 'var(--cs-text-muted)', 500),
          flexShrink: 0,
          width: 100,
          paddingTop: 4,
        }}
      >
        {label}
      </span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, flex: 1 }}>
        {children}
      </div>
    </div>
  )
}

/* ─── image placeholder wrapper ─── */
function ImagePlaceholder({
  bg = 'rgb(232, 246, 255)',
  height = 400,
  children,
}: {
  bg?: string
  height?: number
  children?: React.ReactNode
}) {
  return (
    <div
      style={{
        width: 680,
        maxWidth: '100%',
        height,
        borderRadius: 8,
        overflow: 'clip',
        background: bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </div>
  )
}

/* ─── UI flow item (numbered) ─── */
function FlowItem({
  number,
  label,
  title,
  description,
  bg = 'rgb(254, 252, 249)',
}: {
  number: string
  label: string
  title: string
  description: string
  bg?: string
}) {
  return (
    <FadeIn>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28, width: 680, maxWidth: '100%' }}>
        <span style={mono(11.68, 'var(--cs-text-muted)', 500)}>
          {number} {label}
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <p style={montreal(15.52, 'var(--cs-text-strong)')}>{title}</p>
          <p style={montreal(15.52, 'var(--cs-text-body)')}>{description}</p>
        </div>
        <ImagePlaceholder bg={bg} height={380} />
      </div>
    </FadeIn>
  )
}

/* ─── arrow bullet ─── */
function Arrow() {
  return (
    <span style={{ color: 'var(--cs-text-strong)', flexShrink: 0, fontSize: 13, lineHeight: '20px' }}>
      →
    </span>
  )
}

/* ═══════════════════════════════════════════════════════════════ */
export default function AzureIoTCaseStudy() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const isDark = mounted && theme === 'dark'

  return (
    <div
      style={{
        background: 'var(--color-page-bg)',
        minHeight: '100vh',
        position: 'relative',
        transition: 'background 0.4s ease',
        cursor: 'none',
      }}
    >
      {/* ── CSS variables for this page ── */}
      <style>{`
        :root {
          --cs-text-strong: rgba(0,0,0,0.75);
          --cs-text-body: rgba(0,0,0,0.6);
          --cs-text-muted: rgba(0,0,0,0.35);
          --cs-text-active: rgba(0,0,0,0.75);
          --cs-text-subtle: rgba(0,0,0,0.45);
        }
        .dark {
          --cs-text-strong: rgba(255,255,255,0.85);
          --cs-text-body: rgba(255,255,255,0.6);
          --cs-text-muted: rgba(255,255,255,0.35);
          --cs-text-active: rgba(255,255,255,0.85);
          --cs-text-subtle: rgba(255,255,255,0.45);
        }
      `}</style>

      {/* ── Background layers ── */}
      <StarCanvas />
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          transition: 'background 0.4s ease',
        }}
      >
        <GridBackground />
        <DotParticles />
      </div>

      {/* ── Back button (fixed) ── */}
      <Link
        href="/"
        style={{
          position: 'fixed',
          top: 20,
          left: 20,
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          ...mono(11.2, 'var(--cs-text-muted)'),
          textDecoration: 'none',
          borderRadius: 100,
          padding: '6px 12px',
          background: 'rgba(0,0,0,0.03)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          cursor: 'none',
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5" />
          <path d="M12 19l-7-7 7-7" />
        </svg>
        Back
      </Link>

      {/* ── Theme toggle (fixed) ── */}
      <button
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
        style={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 10,
          background: 'rgb(255, 95, 51)',
          border: 'none',
          borderRadius: 100,
          padding: '6px 12px',
          fontFamily: "'Spline Sans Mono', var(--font-spline-sans-mono), monospace",
          fontSize: 12,
          fontWeight: 400,
          color: '#fff',
          cursor: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        {isDark ? 'Starry Mode' : 'Sun Mode'}
      </button>

      {/* ── Footer bar ── */}
      <div
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          display: 'flex',
          gap: 16,
          zIndex: 10,
        }}
      >
        <span style={mono(11.68, 'var(--cs-text-muted)')}>elishayjeon@gmail.com</span>
        <span style={mono(11.68, 'var(--cs-text-muted)')}>updated 12.18.25</span>
      </div>

      {/* ── Music player ── */}
      <MusicBar />

      {/* ═══ Three-column layout ═══ */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: 1091,
          maxWidth: '100%',
          margin: '0 auto',
          position: 'relative',
          zIndex: 3,
        }}
      >
        {/* ── Left sidebar ── */}
        <div
          style={{
            width: 327,
            flexShrink: 0,
            paddingLeft: 20,
            paddingTop: 150,
          }}
        >
          <CaseStudyAzureNav />
        </div>

        {/* ── Main content ── */}
        <main
          style={{
            flexGrow: 1,
            width: 720,
            padding: '150px 20px 250px',
            display: 'flex',
            flexDirection: 'column',
            gap: 100,
          }}
        >
          {/* ─── HERO ─── */}
          <section id="hero-section" style={{ display: 'flex', flexDirection: 'column', gap: 52, width: 680, maxWidth: '100%' }}>
            <FadeIn>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {/* Breadcrumb */}
                <span style={{ ...mono(13.28, 'var(--cs-text-subtle)'), letterSpacing: -0.53 }}>
                  Azure IoT / Dashboard & App
                </span>

                {/* Title */}
                <h1 style={{ ...mackinac(32, 400, 'var(--cs-text-strong)', -1.28), lineHeight: '38.4px', margin: 0 }}>
                  Intelligente production line.
                </h1>

                {/* Description */}
                <p style={montreal(15.52, 'var(--cs-text-body)')}>
                  Designing an AI-powered dashboard and mobile companion that helps Operation Technicians manage thousands of machines without cognitive overload.
                </p>
              </div>
            </FadeIn>

            {/* Project details */}
            <FadeIn>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
                  {/* Role */}
                  <div style={{ minWidth: 200 }}>
                    <p style={{ ...montreal(12.8, 'var(--cs-text-muted)', 0.1), marginBottom: 6 }}>Role</p>
                    <p style={montreal(14.08, 'var(--cs-text-strong)', 0.11)}>UX/UI Designer</p>
                  </div>
                  {/* Timeline */}
                  <div style={{ minWidth: 200 }}>
                    <p style={{ ...montreal(12.8, 'var(--cs-text-muted)', 0.1), marginBottom: 6 }}>Timeline</p>
                    <p style={montreal(14.08, 'var(--cs-text-strong)', 0.11)}>6 months / January – June 2025</p>
                  </div>
                </div>
                {/* Team */}
                <div>
                  <p style={{ ...montreal(12.8, 'var(--cs-text-muted)', 0.1), marginBottom: 6 }}>Team</p>
                  <p style={montreal(14.08, 'var(--cs-text-strong)', 0.11)}>
                    Sahal Abdi, Madelyn Lee, Thomas Emnetu, Emily Hao, & Elisha Jeon
                  </p>
                </div>
                {/* Skills */}
                <div>
                  <p style={{ ...montreal(12.8, 'var(--cs-text-muted)', 0.1), marginBottom: 8 }}>Skills</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {['UX/UI', 'Product Strategy', 'User Research', 'Prototyping', 'Design Systems'].map((tag) => (
                      <span
                        key={tag}
                        style={{
                          background: 'rgba(65,70,77,0.03)',
                          borderRadius: 5,
                          padding: '5px 11px',
                          ...montreal(12, 'var(--cs-text-strong)', 0.096),
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Hero image */}
            <FadeIn>
              <ImagePlaceholder bg="rgb(232, 246, 255)" height={440} />
            </FadeIn>
          </section>

          {/* Divider */}
          <div style={{ height: 1, width: 680, maxWidth: '100%', background: 'rgba(0,0,0,0.08)' }} />

          {/* ─── OVERVIEW ─── */}
          <section id="overview-section" style={{ display: 'flex', flexDirection: 'column', gap: 52, width: 680, maxWidth: '100%' }}>
            <FadeIn>
              <SectionBlock label="Overview">
                <h2 style={{ ...mackinac(22.4, 500, 'var(--cs-text-strong)', -0.896), margin: 0 }}>
                  How might we help Operation Technicians monitor thousands of machines without being overwhelmed by data?
                </h2>
                <p style={montreal(16.8, 'var(--cs-text-strong)', 0)}>
                  A 6-month journey redesigning enterprise monitoring.
                </p>
                <p style={montreal(15.52, 'var(--cs-text-body)')}>
                  As one of five designers on this sponsored capstone for Microsoft, I reimagined how Operation Technicians use Azure IoT. The first three months focused on dashboard redesign with AI Copilot integration. The next three explored net-new mobile experiences for on-the-go monitoring. I personally led the design of glanceable summaries and remote monitoring on the mobile app.
                </p>
              </SectionBlock>
            </FadeIn>
          </section>

          {/* ─── PROBLEM ─── */}
          <section id="problem-section" style={{ display: 'flex', flexDirection: 'column', gap: 52, width: 680, maxWidth: '100%' }}>
            <FadeIn>
              <SectionBlock label="The Problem">
                <h2 style={{ ...mackinac(22.4, 500, 'var(--cs-text-strong)', -0.896), margin: 0 }}>
                  Monitoring thousands of machines creates cognitive overload.
                </h2>
                <p style={{ ...montreal(16.8, 'var(--cs-text-strong)', 0), fontStyle: 'italic' }}>
                  &ldquo;When everything is urgent, nothing is.&rdquo;
                </p>
                <p style={montreal(15.52, 'var(--cs-text-body)')}>
                  Azure IoT helps Operation Technicians manage production lines — think donut factories or automotive plants with hundreds of machines. But the platform had critical gaps...
                </p>

                {/* KEY GAPS */}
                <span style={mono(11.68, 'var(--cs-text-muted)', 500)}>KEY GAPS</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                  {[
                    'Dashboard floods with alerts during critical situations with no priority system.',
                    'Wastes time piecing together information from multiple sources.',
                    'Must physically leave station to investigate, leaving the dashboard behind.',
                    'No mobile access — OTs can\'t monitor on-the-go.',
                  ].map((gap) => (
                    <div key={gap} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                      <Arrow />
                      <p style={montreal(14.88, 'var(--cs-text-strong)', 0.12)}>{gap}</p>
                    </div>
                  ))}
                </div>
              </SectionBlock>
            </FadeIn>
            <FadeIn>
              <ImagePlaceholder bg="rgb(232, 246, 255)" height={458} />
            </FadeIn>
          </section>

          {/* ─── SOLUTION ─── */}
          <section id="solution-section" style={{ display: 'flex', flexDirection: 'column', gap: 52, width: 680, maxWidth: '100%' }}>
            <FadeIn>
              <SectionBlock label="The Solution">
                <h2 style={{ ...mackinac(22.4, 500, 'var(--cs-text-strong)', -0.896), margin: 0 }}>
                  AI-powered monitoring across platforms.
                </h2>
                <p style={montreal(15.52, 'var(--cs-text-body)')}>
                  We redesigned the Azure IoT experience across two platforms: an intelligent desktop dashboard with Copilot integration for the control room, and a companion mobile app for on-the-go monitoring.
                </p>
                <span style={mono(11.68, 'var(--cs-text-muted)', 500)}>Core flows</span>
              </SectionBlock>
            </FadeIn>

            {/* 5 numbered flows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 80 }}>
              <FlowItem
                number="01"
                label="WIDGETS"
                title="Customizable dashboard widgets for at-a-glance monitoring."
                description="OTs can configure their dashboard with drag-and-drop widgets showing real-time machine health, production KPIs, and alert summaries."
                bg="rgb(254, 252, 249)"
              />
              <FlowItem
                number="02"
                label="COPILOT AI"
                title="AI Copilot surfaces the most relevant insights proactively."
                description="Copilot analyzes patterns across all machines and highlights what needs attention first, reducing the time to identify critical issues."
                bg="rgb(247, 247, 247)"
              />
              <FlowItem
                number="03"
                label="PRIORITIZED ALERTS"
                title="Smart alert prioritization replaces noise with clarity."
                description="Alerts are automatically ranked by severity, impact radius, and historical context so OTs always know what to address first."
                bg="rgba(0,0,0,0.03)"
              />
              <FlowItem
                number="04"
                label="COPILOT CHAT"
                title="Conversational AI for deeper investigation."
                description="OTs can ask Copilot natural-language questions about machine behavior, get root-cause suggestions, and receive step-by-step troubleshooting guides."
                bg="rgb(254, 252, 249)"
              />
              <FlowItem
                number="05"
                label="RECORDINGS"
                title="Session recordings for post-incident review."
                description="Critical events are automatically recorded, enabling OTs and engineers to replay incidents and understand exactly what happened."
                bg="rgb(247, 247, 247)"
              />
            </div>
          </section>

          {/* ─── USER RESEARCH ─── */}
          <section id="user-research" style={{ display: 'flex', flexDirection: 'column', gap: 52, width: 680, maxWidth: '100%' }}>
            <FadeIn>
              <SectionBlock label="Research">
                <h2 style={{ ...mackinac(22.4, 500, 'var(--cs-text-strong)', -0.896), margin: 0 }}>
                  Designing for both new and experienced OTs.
                </h2>
                <p style={montreal(15.52, 'var(--cs-text-body)')}>
                  Using internal user role cards and meeting with Azure IoT stakeholders, we synthesized and developed two user personas...
                </p>
              </SectionBlock>
            </FadeIn>

            {/* Persona 1 */}
            <FadeIn>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingLeft: 130 }}>
                <span style={mono(11.68, 'var(--cs-text-muted)', 500)}>DAY 0 USER</span>
                <h3 style={{ ...mackinac(24, 500, 'var(--cs-text-strong)'), margin: 0 }}>Lucia</h3>
                <p style={montreal(15.52, 'var(--cs-text-subtle)')}>
                  A junior OT, 6 months into the role. She monitors a smaller section of the production line but is overwhelmed by the amount of data and alerts she receives daily.
                </p>
                <span style={mono(11.68, 'var(--cs-text-muted)', 500)}>PAIN POINTS</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    'Doesn\'t know which alerts are truly critical vs. noise.',
                    'Spends too long searching for relevant documentation.',
                    'Feels unsupported when senior OTs are unavailable.',
                  ].map((p) => (
                    <div key={p} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                      <Arrow />
                      <p style={montreal(14.08, 'var(--cs-text-strong)', 0.11)}>{p}</p>
                    </div>
                  ))}
                </div>
                <span style={mono(11.68, 'var(--cs-text-muted)', 500)}>NEEDS</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    'Guided troubleshooting that walks her through diagnosis.',
                    'Contextual learning integrated into workflows.',
                  ].map((n) => (
                    <div key={n} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                      <Arrow />
                      <p style={montreal(14.08, 'var(--cs-text-strong)', 0.11)}>{n}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Persona 2 */}
            <FadeIn>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingLeft: 130 }}>
                <span style={mono(11.68, 'var(--cs-text-muted)', 500)}>EXPERT USER</span>
                <h3 style={{ ...mackinac(24, 500, 'var(--cs-text-strong)'), margin: 0 }}>Marcus</h3>
                <p style={montreal(15.52, 'var(--cs-text-subtle)')}>
                  A veteran OT with 15+ years of experience. He oversees the entire production floor and is responsible for training junior OTs. He relies on instinct built over years of pattern recognition.
                </p>
                <span style={mono(11.68, 'var(--cs-text-muted)', 500)}>PAIN POINTS</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    'Can\'t be everywhere at once — needs remote monitoring.',
                    'Alert fatigue from hundreds of non-critical notifications.',
                    'Relies on memory for machine history instead of data.',
                  ].map((p) => (
                    <div key={p} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                      <Arrow />
                      <p style={montreal(14.08, 'var(--cs-text-strong)', 0.11)}>{p}</p>
                    </div>
                  ))}
                </div>
                <span style={mono(11.68, 'var(--cs-text-muted)', 500)}>NEEDS</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    'Mobile access to monitor production from anywhere.',
                    'AI-powered summaries that match his expert mental model.',
                  ].map((n) => (
                    <div key={n} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                      <Arrow />
                      <p style={montreal(14.08, 'var(--cs-text-strong)', 0.11)}>{n}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Competitive analysis */}
            <FadeIn>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingLeft: 130 }}>
                <span style={mono(11.68, 'var(--cs-text-muted)', 500)}>Desktop competitors</span>
                <p style={montreal(15.52, 'var(--cs-text-body)')}>
                  We analyzed enterprise IoT dashboards from major competitors to understand current patterns in data visualization, alert management, and AI integration.
                </p>
                <div style={{ display: 'flex', flexDirection: 'row', gap: 40, flexWrap: 'wrap' }}>
                  {['IBM', 'AWS', 'ClickUp', 'Notion'].map((name) => (
                    <div
                      key={name}
                      style={{
                        width: 102,
                        height: 101,
                        borderRadius: 16,
                        background: 'rgba(0,0,0,0.03)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        ...montreal(13, 'var(--cs-text-muted)'),
                      }}
                    >
                      {name}
                    </div>
                  ))}
                </div>
                <h4 style={{ ...mackinac(18.4, 500, 'var(--cs-text-subtle)', -0.15), margin: 0 }}>
                  For mobile apps...
                </h4>
                <div style={{ display: 'flex', flexDirection: 'row', gap: 40, flexWrap: 'wrap' }}>
                  {['Arlo', 'Google Nest'].map((name) => (
                    <div
                      key={name}
                      style={{
                        width: 102,
                        height: 101,
                        borderRadius: 16,
                        background: 'rgba(0,0,0,0.03)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        ...montreal(13, 'var(--cs-text-muted)'),
                      }}
                    >
                      {name}
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Ideation — Desktop */}
            <FadeIn>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingLeft: 130 }}>
                <span style={mono(11.68, 'var(--cs-text-muted)', 500)}>Ideation — Desktop</span>
                <h4 style={{ ...mackinac(22.4, 500, 'var(--cs-text-strong)', -0.896), margin: 0 }}>
                  How might we reduce alert overload on the dashboard?
                </h4>
                <p style={montreal(15.52, 'var(--cs-text-body)')}>
                  We explored four key concepts for the desktop dashboard, each addressing a different aspect of information overload.
                </p>
                <span style={mono(11.68, 'var(--cs-text-muted)', 500)}>KEY CONCEPTS</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {[
                    { title: 'AI-prioritized alert queue', desc: 'Copilot ranks alerts by severity and context so the most critical issues surface first.' },
                    { title: 'Contextual widget grouping', desc: 'Related metrics are grouped spatially so OTs can scan related data at a glance.' },
                    { title: 'Progressive disclosure', desc: 'Details are revealed on demand — summary first, drill-down second.' },
                    { title: 'Proactive Copilot nudges', desc: 'AI surfaces patterns and anomalies before they become critical alerts.' },
                  ].map((c) => (
                    <div key={c.title} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <p style={montreal(14.88, 'var(--cs-text-strong)')}>{c.title}</p>
                      <p style={montreal(14.88, 'var(--cs-text-body)')}>{c.desc}</p>
                    </div>
                  ))}
                </div>
                <ImagePlaceholder bg="rgba(0,0,0,0.03)" height={350} />
              </div>
            </FadeIn>

            {/* Ideation — Mobile */}
            <FadeIn>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingLeft: 130 }}>
                <span style={mono(11.68, 'var(--cs-text-muted)', 500)}>Ideation — Mobile</span>
                <h4 style={{ ...mackinac(22.4, 500, 'var(--cs-text-strong)', -0.896), margin: 0 }}>
                  How might we enable effective monitoring on a small screen?
                </h4>
                <p style={montreal(15.52, 'var(--cs-text-body)')}>
                  Mobile required a fundamentally different approach — glanceable summaries over comprehensive dashboards.
                </p>
                <span style={mono(11.68, 'var(--cs-text-muted)', 500)}>KEY CONCEPTS</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {[
                    { title: 'Glanceable health cards', desc: 'Production line status at a glance with color-coded severity indicators.' },
                    { title: 'Push notification triage', desc: 'Smart notifications that group related alerts and allow quick triage from the lock screen.' },
                    { title: 'Remote camera integration', desc: 'Live feeds from production floor cameras, accessible from anywhere.' },
                    { title: 'Voice-activated Copilot', desc: 'Hands-free querying while walking the production floor.' },
                  ].map((c) => (
                    <div key={c.title} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <p style={montreal(14.88, 'var(--cs-text-strong)')}>{c.title}</p>
                      <p style={montreal(14.88, 'var(--cs-text-body)')}>{c.desc}</p>
                    </div>
                  ))}
                </div>
                <ImagePlaceholder bg="rgba(0,0,0,0.03)" height={350} />
              </div>
            </FadeIn>

            {/* Concept Validation */}
            <FadeIn>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingLeft: 130 }}>
                <span style={mono(11.68, 'var(--cs-text-muted)', 500)}>Concept Validation</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '11px 0 0' }}>
                  <span style={mono(11.68, 'var(--cs-text-muted)', 500)}>WHAT WORKED</span>
                  {[
                    'AI-prioritized alerts resonated strongly with both personas.',
                    'Glanceable health cards tested well for mobile use cases.',
                    'Progressive disclosure reduced perceived complexity significantly.',
                  ].map((item) => (
                    <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                      <span style={{ color: '#22c55e', flexShrink: 0, fontSize: 16 }}>✓</span>
                      <p style={montreal(14.88, 'var(--cs-text-strong)')}>{item}</p>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '11px 0 0' }}>
                  <span style={mono(11.68, 'var(--cs-text-muted)', 500)}>WHAT DIDN&apos;T WORK</span>
                  {[
                    'Voice-activated Copilot felt intrusive in noisy factory environments.',
                    'Camera feeds required too much bandwidth for reliable mobile use.',
                  ].map((item) => (
                    <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                      <span style={{ color: '#ef4444', flexShrink: 0, fontSize: 16 }}>✗</span>
                      <p style={montreal(14.88, 'var(--cs-text-strong)')}>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </section>

          {/* ─── ITERATION ─── */}
          <section id="iteration" style={{ display: 'flex', flexDirection: 'column', gap: 52, width: 680, maxWidth: '100%' }}>
            <FadeIn>
              <SectionBlock label="Iterations">
                <h2 style={{ ...mackinac(22.4, 500, 'var(--cs-text-strong)', -0.896), margin: 0 }}>
                  How our designs evolved.
                </h2>
                <p style={montreal(15.52, 'var(--cs-text-body)')}>
                  Through multiple rounds of feedback from stakeholders, usability tests, and design critiques, we refined our solutions into production-ready designs.
                </p>
              </SectionBlock>
            </FadeIn>

            {/* Iteration 01 */}
            <FadeIn>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 28, paddingLeft: 130 }}>
                <span style={mono(11.68, 'var(--cs-text-muted)', 500)}>01 ITERATION</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <p style={montreal(14.08, 'var(--cs-text-strong)', 0.11)}>The Problem</p>
                  <p style={montreal(14.08, 'var(--cs-text-body)', 0.11)}>
                    The initial alert panel showed all alerts in a flat list with identical visual weight, making it impossible to distinguish critical from routine.
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <p style={montreal(14.08, 'var(--cs-text-strong)', 0.11)}>The Solution</p>
                  <p style={montreal(14.08, 'var(--cs-text-body)', 0.11)}>
                    Introduced a severity-based visual hierarchy with color-coded lanes, time-decay for resolved alerts, and AI-generated impact summaries.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: 16 }}>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <span style={mono(11.68, 'var(--cs-text-muted)', 500)}>BEFORE</span>
                    <ImagePlaceholder bg="rgba(0,0,0,0.03)" height={280} />
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <span style={mono(11.68, 'var(--cs-text-muted)', 500)}>AFTER</span>
                    <ImagePlaceholder bg="rgba(0,0,0,0.03)" height={280} />
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Iteration 02 */}
            <FadeIn>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 28, paddingLeft: 130 }}>
                <span style={mono(11.68, 'var(--cs-text-muted)', 500)}>02 ITERATION</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <p style={montreal(14.08, 'var(--cs-text-strong)', 0.11)}>The Problem</p>
                  <p style={montreal(14.08, 'var(--cs-text-body)', 0.11)}>
                    Copilot suggestions appeared as intrusive modals that interrupted workflow and required immediate action.
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <p style={montreal(14.08, 'var(--cs-text-strong)', 0.11)}>The Solution</p>
                  <p style={montreal(14.08, 'var(--cs-text-body)', 0.11)}>
                    Moved Copilot insights to a persistent sidebar panel with gentle nudge animations, allowing OTs to engage when ready.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: 16 }}>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <span style={mono(11.68, 'var(--cs-text-muted)', 500)}>BEFORE</span>
                    <ImagePlaceholder bg="rgba(0,0,0,0.03)" height={280} />
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <span style={mono(11.68, 'var(--cs-text-muted)', 500)}>AFTER</span>
                    <ImagePlaceholder bg="rgba(0,0,0,0.03)" height={280} />
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Iteration 03 */}
            <FadeIn>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 28, paddingLeft: 130 }}>
                <span style={mono(11.68, 'var(--cs-text-muted)', 500)}>03 ITERATION</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <p style={montreal(14.08, 'var(--cs-text-strong)', 0.11)}>The Problem</p>
                  <p style={montreal(14.08, 'var(--cs-text-body)', 0.11)}>
                    Mobile health cards showed too much data, defeating the purpose of glanceable monitoring.
                  </p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <p style={montreal(14.08, 'var(--cs-text-strong)', 0.11)}>The Solution</p>
                  <p style={montreal(14.08, 'var(--cs-text-body)', 0.11)}>
                    Reduced each card to three key metrics with a single status indicator. Detailed data is one tap away.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: 16 }}>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <span style={mono(11.68, 'var(--cs-text-muted)', 500)}>BEFORE</span>
                    <ImagePlaceholder bg="rgba(0,0,0,0.03)" height={280} />
                  </div>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <span style={mono(11.68, 'var(--cs-text-muted)', 500)}>AFTER</span>
                    <ImagePlaceholder bg="rgba(0,0,0,0.03)" height={280} />
                  </div>
                </div>
              </div>
            </FadeIn>
          </section>

          {/* ─── OUTCOME ─── */}
          <section id="outcome" style={{ display: 'flex', flexDirection: 'column', gap: 52, width: 680, maxWidth: '100%' }}>
            <FadeIn>
              <SectionBlock label="Outcome">
                <h2 style={{ ...mackinac(22.4, 500, 'var(--cs-text-strong)', -0.896), margin: 0 }}>
                  Introducing a Copilot AI integrated dashboard + mobile companion.
                </h2>
                <p style={montreal(15.52, 'var(--cs-text-body)')}>
                  Our redesigned Azure IoT experience was presented to Microsoft stakeholders and received strong positive feedback. The project demonstrated how AI integration can reduce cognitive load in complex enterprise environments.
                </p>
              </SectionBlock>
            </FadeIn>
            <FadeIn>
              <ImagePlaceholder bg="rgb(247, 247, 247)" height={440} />
            </FadeIn>
          </section>

          {/* ─── NEXT STEPS ─── */}
          <section id="next-steps" style={{ display: 'flex', flexDirection: 'column', gap: 52, width: 680, maxWidth: '100%' }}>
            <FadeIn>
              <SectionBlock label="Next Steps">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
                  {[
                    { num: '01', text: 'User research with actual OTs' },
                    { num: '02', text: 'Outlining empty and error states for development' },
                    { num: '03', text: 'Iterate based on real-world usage' },
                  ].map((step) => (
                    <div key={step.num} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                      <span style={mono(11.68, 'var(--cs-text-muted)', 500)}>{step.num}</span>
                      <p style={montreal(14.08, 'var(--cs-text-strong)', 0.11)}>{step.text}</p>
                    </div>
                  ))}
                </div>
              </SectionBlock>
            </FadeIn>
          </section>

          {/* ─── REFLECTION ─── */}
          <section id="reflection" style={{ display: 'flex', flexDirection: 'column', gap: 52, width: 680, maxWidth: '100%' }}>
            <FadeIn>
              <SectionBlock label="Looking Back">
                <h2 style={{ ...mackinac(22.4, 500, 'var(--cs-text-strong)', -0.896), margin: 0 }}>
                  Looking back on the most ambitious project I&apos;ve worked on so far.
                </h2>
                <p style={montreal(15.52, 'var(--cs-text-body)')}>
                  I learned how to navigate complex spaces, work with ambiguous requirements, and ship design decisions with confidence — even when the &ldquo;right&rdquo; answer wasn&apos;t obvious.
                </p>
              </SectionBlock>
            </FadeIn>

            <FadeIn>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 40, paddingLeft: 130 }}>
                <span style={mono(11.68, 'var(--cs-text-muted)', 500)}>WHAT I LEARNED</span>

                {[
                  {
                    title: 'The value of a good design system.',
                    desc: 'Having a shared component library across five designers meant we could iterate faster and maintain consistency across two platforms. Every hour spent on the system saved ten hours of duplicated work.',
                  },
                  {
                    title: 'Finding my footing in ambiguity.',
                    desc: 'Enterprise design is messy. Requirements shift, stakeholders disagree, and the "right" solution depends on who you ask. I learned to use constraints as creative fuel rather than blockers.',
                  },
                  {
                    title: 'The power of asking good questions.',
                    desc: 'The best design insights didn\'t come from looking at screens — they came from asking OTs "walk me through your last bad day." Understanding context revealed problems no dashboard audit ever could.',
                  },
                ].map((lesson) => (
                  <div key={lesson.title} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <h3 style={{ ...mackinac(22.4, 500, 'var(--cs-text-strong)'), margin: 0 }}>{lesson.title}</h3>
                    <p style={montreal(15.52, 'var(--cs-text-body)')}>{lesson.desc}</p>
                  </div>
                ))}

                <p style={montreal(15.52, 'var(--cs-text-subtle)')}>
                  Special thanks to my amazing peers and the ACX team at Microsoft for their invaluable support!
                </p>
              </div>
            </FadeIn>
          </section>
        </main>

        {/* ── Space column ── */}
        <div style={{ width: 44, flexShrink: 0 }} />
      </div>
    </div>
  )
}
