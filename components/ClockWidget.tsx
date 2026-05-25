'use client'

import { useEffect, useState } from 'react'

export default function ClockWidget() {
  const [time, setTime] = useState('')

  useEffect(() => {
    function tick() {
      setTime(
        new Date().toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
          timeZone: 'Europe/Paris',
        })
      )
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const textStyle: React.CSSProperties = {
    fontFamily: "'Spline Sans Mono', var(--font-spline-sans-mono), monospace",
    fontSize: 11.2,
    fontWeight: 400,
    lineHeight: '13.44px',
    color: 'rgba(0, 0, 0, 0.35)',
    textAlign: 'right',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-end', textAlign: 'right' }}>
      <p style={textStyle}>{time}</p>
      <p style={textStyle}>PARIS, FR</p>
    </div>
  )
}
