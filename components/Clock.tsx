'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Clock() {
  const [time, setTime] = useState('')

  useEffect(() => {
    function tick() {
      setTime(
        new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
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
    fontFamily: 'var(--font-spline-sans-mono)',
    fontSize: 'calc(1rem * 0.7)',
    letterSpacing: '-0.02em',
    color: 'rgba(0,0,0,0.35)',
    lineHeight: 1.6,
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: 'spring', bounce: 0.1, delay: 0.4, duration: 0.8 }}
      style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <p style={textStyle}>{time}</p>
      <p style={textStyle}>PARIS, FR</p>
    </motion.div>
  )
}
