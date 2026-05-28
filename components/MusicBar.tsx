'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { springs } from '@/lib/springs'

const PLAYLIST = [
  { src: '/manha-de-carnaval.mp3',  title: 'Manhã de Carnaval',  artist: 'João Donato' },
  { src: '/chega-de-saudade.mp3',   title: 'Chega de Saudade',   artist: 'João Gilberto' },
  { src: '/samba-da-bencao.mp3',    title: 'Samba da Benção',    artist: 'Baden Powell' },
  { src: '/desafinado.mp3',         title: 'Desafinado',         artist: 'Stan Getz & João Gilberto' },
  { src: '/brazil.mp3',             title: 'Brazil',             artist: 'Antonio Carlos Jobim' },
  { src: '/insensatez.mp3',         title: 'Insensatez',         artist: 'Maria Creuza' },
  { src: '/chambre-avec-vue.mp3',   title: 'Chambre avec vue',   artist: 'Henri Salvador' },
]

function shuffle(arr: number[]): number[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// Builds a fresh shuffled queue of all songs except `current`
function buildQueue(current: number): number[] {
  return shuffle(PLAYLIST.map((_, i) => i).filter(i => i !== current))
}

const INITIAL = Math.floor(Math.random() * PLAYLIST.length)

export default function MusicBar() {
  const [playing, setPlaying] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [index,   setIndex]   = useState(INITIAL)
  const audioRef  = useRef<HTMLAudioElement>(null)
  const queueRef  = useRef<number[]>(buildQueue(INITIAL))

  const song = PLAYLIST[index]

  // Set initial src once on mount — fully imperative from here on
  useEffect(() => {
    if (audioRef.current) audioRef.current.src = song.src
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const nextIndex = useCallback((current: number): number => {
    if (queueRef.current.length === 0) {
      queueRef.current = buildQueue(current)
    }
    return queueRef.current.shift()!
  }, [])

  const advanceTo = useCallback((next: number, autoplay: boolean) => {
    const audio = audioRef.current
    if (!audio) return
    audio.pause()
    audio.src = PLAYLIST[next].src
    setIndex(next)
    if (autoplay) {
      audio.play()
        .then(() => setPlaying(true))
        .catch(err => { if (err.name !== 'AbortError') console.error(err) })
    } else {
      setPlaying(false)
    }
  }, [])

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

  const skip = (e: React.MouseEvent) => {
    e.stopPropagation()
    advanceTo(nextIndex(index), playing)
  }

  const handleEnded = useCallback(() => {
    const next = nextIndex(index)
    advanceTo(next, true)
  }, [index, nextIndex, advanceTo])

  return (
    <>
      <motion.div
        variants={{
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0, transition: { ...springs.drag, delay: 0.6 } },
          hover:   { scale: 1.04,       transition: { duration: 0.16, ease: 'easeOut' } },
        }}
        initial="initial"
        animate="animate"
        whileHover="hover"
        onClick={toggle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ position: 'fixed', bottom: 20, left: 20, zIndex: 50, cursor: 'pointer' }}
      >
        <div
          style={{
            display: 'inline-flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 0,
            height: 30,
            background: '#eceff4',
            borderRadius: 100,
            padding: '0 10px 0 7px',
            border: 'none',
          }}
        >
          {/* Status dot */}
          <div
            style={{
              width: 17, height: 17, borderRadius: '50%',
              background: 'var(--color-dot-outer)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, marginRight: 8,
            }}
          >
            <motion.div
              animate={playing ? { scale: [1, 1.25, 1] } : { scale: 1 }}
              transition={playing ? { duration: 1.2, repeat: Infinity, ease: 'easeInOut' } : {}}
              style={{ width: 6, height: 6, borderRadius: '50%', background: '#F07055' }}
            />
          </div>

          {/* Status text */}
          <span
            style={{
              fontFamily: "'Spline Sans Mono', var(--font-spline-sans-mono), monospace",
              fontSize: 10, fontWeight: 500,
              color: 'var(--color-status-text)',
              letterSpacing: '0.05em', lineHeight: 1,
              flexShrink: 0, minWidth: 46, marginRight: 8,
            }}
          >
            {playing ? 'PLAYING' : 'PAUSED'}
          </span>

          {/* Divider */}
          <div style={{ width: 1, height: 12, background: 'var(--color-music-divider)', flexShrink: 0, marginRight: 8 }} />

          {/* Song title */}
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
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className={playing ? 'marquee' : ''}
                style={{
                  display: 'inline-block', whiteSpace: 'nowrap',
                  fontFamily: "'PP Neue Montreal Medium', sans-serif",
                  fontSize: 11, color: 'var(--color-text-primary)',
                }}
              >
                <span style={{ fontWeight: 500 }}>{song.title}</span>
                <span style={{ fontWeight: 400, opacity: 0.5 }}>{` by ${song.artist}`}</span>
                {playing && (
                  <span>
                    <span style={{ opacity: 0.3 }}>&nbsp;&nbsp;·&nbsp;&nbsp;</span>
                    <span style={{ fontWeight: 500 }}>{song.title}</span>
                    <span style={{ fontWeight: 400, opacity: 0.5 }}>{` by ${song.artist}`}</span>
                  </span>
                )}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Skip section — width-animated, zero space when hidden */}
          <motion.div
            animate={{ width: hovered ? 28 : 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            style={{ overflow: 'hidden', flexShrink: 0, display: 'flex', alignItems: 'center', height: '100%' }}
          >
            <div style={{ paddingLeft: 8, display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
              <div style={{ width: 1, height: 12, background: 'var(--color-music-divider)', flexShrink: 0 }} />
              <motion.button
                animate={{ opacity: hovered ? 0.5 : 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.12 }}
                onClick={skip}
                style={{
                  background: 'none', border: 'none', padding: 0,
                  cursor: 'pointer', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', flexShrink: 0,
                  color: 'var(--color-status-text)',
                  pointerEvents: hovered ? 'auto' : 'none',
                }}
                title="Skip to random song"
              >
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <path d="M1.5 2L6 5.5L1.5 9V2Z" fill="currentColor" />
                  <rect x="7.5" y="2" width="1.5" height="7" rx="0.75" fill="currentColor" />
                </svg>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <audio ref={audioRef} onEnded={handleEnded} />
    </>
  )
}
