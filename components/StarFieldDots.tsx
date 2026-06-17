'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

type Layer = {
  src: string
  aspectRatio: string
  width: string
  top: string
  left: string
}

// Each SVG's natural viewBox aspect, placed at a different region so they
// behave as a scattered field rather than a tiled full-viewport background.
const LAYERS: Layer[] = [
  { src: '/stars-1.svg', aspectRatio: '600.128 / 475.806', width: '55vw', top: '-5%',  left: '-8%'  }, // upper-left cluster
  { src: '/stars-2.svg', aspectRatio: '654.73 / 779.106',  width: '38vw', top: '15%',  left: '55%'  }, // right column
  { src: '/stars-3.svg', aspectRatio: '600.128 / 550.75',  width: '50vw', top: '50%',  left: '15%'  }, // lower-center cluster
]

export default function StarFieldDots() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted || resolvedTheme !== 'dark') return null

  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        opacity: 0.3,
      }}
    >
      {LAYERS.map((layer, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: layer.top,
            left: layer.left,
            width: layer.width,
            aspectRatio: layer.aspectRatio,
            backgroundImage: `url(${layer.src})`,
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
            imageRendering: 'pixelated',
          }}
        />
      ))}
    </div>
  )
}
