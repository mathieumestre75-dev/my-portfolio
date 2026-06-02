// Deterministic seeded pseudo-random — avoids SSR/hydration mismatch
function sr(seed: number) {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}

// ~1 dot per 3000px² over a 1440×900 reference viewport → ~430 dots
// Use fewer since rgba(255,255,255,0.2) on near-white is pure texture
const DOTS = Array.from({ length: 320 }, (_, i) => ({
  cx: sr(i * 3)     * 1440,
  cy: sr(i * 3 + 1) * 900,
  r:  0.8 + sr(i * 3 + 2) * 1.0, // 0.8–1.8px
}))

export default function AboutBackground() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* 1 — Base fill */}
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgb(252,252,252)' }} />

      {/* 2 — Color wash */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: [
            'radial-gradient(ellipse 70% 55% at 60% 12%, rgba(253,250,240,0.9) 0%, rgba(253,250,240,0) 65%)',
            'radial-gradient(ellipse 45% 50% at 5% 50%, rgba(252,244,243,0.8) 0%, rgba(252,244,243,0) 60%)',
            'radial-gradient(ellipse 60% 45% at 50% 95%, rgba(255,245,240,0.6) 0%, rgba(255,245,240,0) 65%)',
            'radial-gradient(ellipse 55% 55% at 1% 100%, rgba(230,236,250,0.85) 0%, rgba(230,236,250,0) 60%)',
            'radial-gradient(ellipse 45% 50% at 0% 100%, rgba(232,237,250,0.7) 0%, rgba(232,237,250,0) 60%)',
          ].join(', '),
        }}
      />

      {/* 3 — Grid overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: [
            'linear-gradient(to right,  rgba(200,207,235,0.45) 1px, transparent 1px)',
            'linear-gradient(to bottom, rgba(200,207,235,0.45) 1px, transparent 1px)',
          ].join(', '),
          backgroundSize: '49px 49px',
        }}
      />

      {/* 4 — Dot field */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {DOTS.map((d, i) => (
          <circle key={i} cx={d.cx} cy={d.cy} r={d.r} fill="rgba(255,255,255,0.2)" />
        ))}
      </svg>

      {/* 5 — Edge fades */}
      {/* Top */}
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '30%',
          background: 'linear-gradient(0deg, rgba(252,252,252,0) 0%, rgb(252,252,252) 100%)',
        }}
      />
      {/* Bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '30%',
          background: 'linear-gradient(180deg, rgba(252,252,252,0) 0%, rgb(252,252,252) 100%)',
        }}
      />
      {/* Left */}
      <div
        style={{
          position: 'absolute',
          top: 0, bottom: 0, left: 0,
          width: '14%',
          background: 'linear-gradient(270deg, rgba(252,252,252,0) 100%, rgb(252,252,252) -55%)',
        }}
      />
      {/* Right */}
      <div
        style={{
          position: 'absolute',
          top: 0, bottom: 0, right: 0,
          width: '56%',
          background: 'linear-gradient(90deg, rgba(252,252,252,0) 0%, rgb(252,252,252) 100%)',
        }}
      />
    </div>
  )
}
