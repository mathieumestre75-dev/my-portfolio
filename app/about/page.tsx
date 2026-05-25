import Clock from '@/components/Clock'

const socialLinks = [
  { label: 'Email', href: 'mailto:mathieumestre75@gmail.com' },
  { label: 'Resume', href: '#' },
  { label: 'LinkedIn', href: '#' },
  { label: 'Twitter', href: '#' },
]

const currents = [
  { label: 'Favorite song', value: '(They Long to Be) Close to You – The Carpenters' },
  { label: 'Reading', value: 'The Count of Monte Cristo' },
  { label: 'Learning', value: 'After Effects and Blender ;-;' },
]

const snippetGradients = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
]

const label14Style: React.CSSProperties = {
  fontFamily: 'var(--font-lora)',
  fontSize: 14,
  fontWeight: 500,
  color: 'rgba(0,0,0,0.35)',
  letterSpacing: '-0.28px',
  lineHeight: '24.5px',
  marginBottom: 16,
}

const bioStyle: React.CSSProperties = {
  fontFamily: 'var(--font-lora)',
  fontSize: 13.6,
  fontWeight: 500,
  color: 'rgba(0,0,0,0.75)',
  letterSpacing: '-0.272px',
  lineHeight: '23.8px',
}

export default function About() {
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
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: '20px 20px 0',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-spline-sans-mono)',
            fontSize: 11.2,
            color: 'rgba(0,0,0,0.6)',
            letterSpacing: '0.04em',
          }}
        >
          MATHIEU MESTRE
        </p>
        <Clock />
      </div>

      <div style={{ maxWidth: 640, padding: '40px 20px 0' }}>

        {/* About section */}
        <p style={label14Style}>About</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <p style={bioStyle}>
            I&apos;m Mathieu, a product designer based in Paris. I specialize in B2B and SaaS — the kind of software people use every day at work, whether they love it or not.
          </p>
          <p style={bioStyle}>
            I believe good design for work software is invisible. It gets out of the way and lets people do their job. Bad design for work software is something you endure eight hours a day.
          </p>
          <p style={bioStyle}>
            When I&apos;m not designing, I&apos;m probably reading, taking photos around the city, or figuring out how to make a decent croissant.
          </p>
        </div>

        {/* Signature */}
        <p
          style={{
            marginTop: 24,
            fontFamily: 'var(--font-caveat)',
            fontSize: 25.6,
            color: 'rgba(0,0,0,0.75)',
            letterSpacing: '-0.512px',
            lineHeight: '38.4px',
          }}
        >
          Mathieu Mestre :-)
        </p>

        {/* Social links */}
        <div style={{ marginTop: 24, display: 'flex', gap: 46, flexWrap: 'wrap' }}>
          {socialLinks.map(({ label, href }) => (
            <a key={label} href={href} className="social-link">
              {label}
            </a>
          ))}
        </div>

        <hr className="hr-divider" />

        {/* Currents section */}
        <p style={label14Style}>Currents</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {currents.map(({ label, value }) => (
            <div key={label}>
              <p
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: 15,
                  fontWeight: 500,
                  color: 'rgba(0,0,0,0.75)',
                  lineHeight: '18px',
                  marginBottom: 2,
                }}
              >
                {label}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: 15,
                  fontWeight: 500,
                  color: 'rgba(0,0,0,0.6)',
                  lineHeight: '21px',
                }}
              >
                {value}
              </p>
            </div>
          ))}
        </div>

        <hr className="hr-divider" />

        {/* Snippets section */}
        <p style={label14Style}>Snippets</p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 16,
          }}
        >
          {snippetGradients.map((gradient, i) => (
            <div
              key={i}
              style={{
                width: '100%',
                aspectRatio: '16/9',
                background: gradient,
                borderRadius: 8,
                opacity: 0.85,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
