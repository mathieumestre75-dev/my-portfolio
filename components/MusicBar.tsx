'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { springs } from '@/lib/springs'

export default function MusicBar() {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play()
        .then(() => setPlaying(true))
        .catch(err => console.error('Audio play failed:', err))
    }
  }

  return (
    <>
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...springs.drag, delay: 0.6 }}
      onClick={toggle}
      style={{
        position: 'fixed',
        bottom: 20,
        left: 20,
        zIndex: 50,
        cursor: 'pointer',
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          height: 30,
          background: '#eceff4',
          borderRadius: 100,
          padding: '0 13px 0 7px',
          border: 'none',
        }}
      >
        {/* Status dot */}
        <div
          style={{
            width: 17,
            height: 17,
            borderRadius: '50%',
            background: 'var(--color-dot-outer)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <motion.div
            animate={playing ? { scale: [1, 1.25, 1] } : { scale: 1 }}
            transition={playing ? { duration: 1.2, repeat: Infinity, ease: 'easeInOut' } : {}}
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#F07055',
            }}
          />
        </div>

        {/* Status text */}
        <span
          style={{
            fontFamily: "'Spline Sans Mono', var(--font-spline-sans-mono), monospace",
            fontSize: 10,
            fontWeight: 500,
            color: 'var(--color-status-text)',
            letterSpacing: '0.05em',
            lineHeight: 1,
            flexShrink: 0,
          }}
        >
          {playing ? 'PLAYING' : 'PAUSED'}
        </span>

        {/* Divider */}
        <div
          style={{
            width: 1,
            height: 12,
            background: 'var(--color-music-divider)',
            flexShrink: 0,
          }}
        />

        {/* Song title — scrolls when playing */}
        {playing && (
          <style>{`
            @keyframes marquee {
              0%   { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .marquee { animation: marquee 9s linear infinite; }
          `}</style>
        )}
        <div style={{ maxWidth: 148, overflow: 'hidden' }}>
          <span
            className={playing ? 'marquee' : ''}
            style={{
              display: 'inline-block',
              whiteSpace: 'nowrap',
              fontFamily: "'PP Neue Montreal Medium', sans-serif",
              fontSize: 11,
              color: 'var(--color-text-primary)',
            }}
          >
            <span style={{ fontWeight: 500 }}>Manhã de Carnaval</span>
            <span style={{ fontWeight: 400, opacity: 0.5 }}>{' by João Donato'}</span>
            {playing && (
              <span>
                <span style={{ opacity: 0.3 }}>&nbsp;&nbsp;·&nbsp;&nbsp;</span>
                <span style={{ fontWeight: 500 }}>Manhã de Carnaval</span>
                <span style={{ fontWeight: 400, opacity: 0.5 }}>{' by João Donato'}</span>
              </span>
            )}
          </span>
        </div>
      </div>
    </motion.div>
    <audio ref={audioRef} src="/manha-de-carnaval.mp3" loop />
    </>
  )
}
