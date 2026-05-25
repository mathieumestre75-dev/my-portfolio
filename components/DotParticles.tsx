'use client'

import { motion } from 'framer-motion'

const clouds = [
  { left: -407, top: 0, width: 600,  height: 476, delay: 0 },
  { left:  203, top: 0, width: 655,  height: 779, delay: 2 },
  { left:  868, top: 0, width: 600,  height: 551, delay: 4 },
]

const circleSets: { cx: number; cy: number; opacity: number }[][] = [
  [
    { cx: 45.2,  cy: 82.4,  opacity: 0.4 }, { cx: 123.7, cy: 156.8, opacity: 0.2 },
    { cx: 289.1, cy: 43.2,  opacity: 0.7 }, { cx: 178.5, cy: 234.6, opacity: 0.4 },
    { cx: 67.3,  cy: 312.8, opacity: 1   }, { cx: 345.8, cy: 189.3, opacity: 0.2 },
    { cx: 234.2, cy: 98.7,  opacity: 0.4 }, { cx: 98.6,  cy: 201.4, opacity: 0.7 },
    { cx: 412.3, cy: 267.5, opacity: 0.2 }, { cx: 156.8, cy: 389.2, opacity: 0.4 },
    { cx: 523.4, cy: 134.7, opacity: 0.7 }, { cx: 312.1, cy: 445.8, opacity: 0.2 },
    { cx: 87.4,  cy: 56.3,  opacity: 1   }, { cx: 445.6, cy: 378.9, opacity: 0.4 },
    { cx: 201.3, cy: 312.7, opacity: 0.2 }, { cx: 378.9, cy: 78.4,  opacity: 0.7 },
    { cx: 134.2, cy: 178.6, opacity: 0.4 }, { cx: 267.8, cy: 456.2, opacity: 0.2 },
    { cx: 489.5, cy: 201.3, opacity: 1   }, { cx: 56.7,  cy: 423.8, opacity: 0.4 },
    { cx: 334.6, cy: 334.5, opacity: 0.7 }, { cx: 112.4, cy: 289.1, opacity: 0.2 },
    { cx: 467.3, cy: 145.6, opacity: 0.4 }, { cx: 223.8, cy: 67.4,  opacity: 1   },
    { cx: 389.2, cy: 423.7, opacity: 0.2 }, { cx: 145.6, cy: 145.6, opacity: 0.4 },
    { cx: 501.3, cy: 312.1, opacity: 0.7 }, { cx: 312.7, cy: 23.4,  opacity: 0.2 },
    { cx: 23.8,  cy: 245.6, opacity: 0.4 }, { cx: 189.4, cy: 412.3, opacity: 0.7 },
    { cx: 456.2, cy: 56.7,  opacity: 0.2 }, { cx: 78.3,  cy: 167.8, opacity: 1   },
    { cx: 434.7, cy: 289.4, opacity: 0.4 }, { cx: 267.1, cy: 201.7, opacity: 0.7 },
    { cx: 145.3, cy: 345.2, opacity: 0.2 },
  ],
  [
    { cx: 89.4,  cy: 112.3, opacity: 0.4 }, { cx: 234.7, cy: 45.6,  opacity: 0.7 },
    { cx: 378.2, cy: 234.8, opacity: 0.2 }, { cx: 145.6, cy: 367.4, opacity: 1   },
    { cx: 512.3, cy: 123.7, opacity: 0.4 }, { cx: 67.8,  cy: 512.6, opacity: 0.2 },
    { cx: 423.4, cy: 389.2, opacity: 0.7 }, { cx: 289.1, cy: 678.3, opacity: 0.4 },
    { cx: 156.7, cy: 234.5, opacity: 0.2 }, { cx: 578.4, cy: 289.6, opacity: 1   },
    { cx: 312.3, cy: 145.8, opacity: 0.4 }, { cx: 89.7,  cy: 645.3, opacity: 0.7 },
    { cx: 467.8, cy: 512.4, opacity: 0.2 }, { cx: 201.4, cy: 78.9,  opacity: 0.4 },
    { cx: 545.6, cy: 423.7, opacity: 1   }, { cx: 134.2, cy: 489.3, opacity: 0.2 },
    { cx: 389.7, cy: 56.8,  opacity: 0.4 }, { cx: 234.5, cy: 712.4, opacity: 0.7 },
    { cx: 612.3, cy: 178.6, opacity: 0.2 }, { cx: 78.4,  cy: 356.8, opacity: 0.4 },
    { cx: 445.6, cy: 267.3, opacity: 1   }, { cx: 178.3, cy: 623.4, opacity: 0.2 },
    { cx: 523.8, cy: 545.7, opacity: 0.4 }, { cx: 312.6, cy: 423.8, opacity: 0.7 },
    { cx: 56.4,  cy: 178.9, opacity: 0.2 }, { cx: 634.7, cy: 378.3, opacity: 0.4 },
    { cx: 267.4, cy: 534.2, opacity: 1   }, { cx: 412.8, cy: 145.6, opacity: 0.2 },
    { cx: 145.3, cy: 712.7, opacity: 0.4 }, { cx: 589.2, cy: 89.4,  opacity: 0.7 },
    { cx: 334.7, cy: 645.8, opacity: 0.2 }, { cx: 112.6, cy: 289.4, opacity: 0.4 },
    { cx: 489.3, cy: 734.6, opacity: 1   }, { cx: 223.7, cy: 167.3, opacity: 0.2 },
    { cx: 378.5, cy: 567.8, opacity: 0.4 },
  ],
  [
    { cx: 134.6, cy: 89.3,  opacity: 0.4 }, { cx: 289.2, cy: 234.7, opacity: 0.7 },
    { cx: 445.8, cy: 56.4,  opacity: 0.2 }, { cx: 67.3,  cy: 378.9, opacity: 1   },
    { cx: 378.1, cy: 312.6, opacity: 0.4 }, { cx: 212.5, cy: 145.8, opacity: 0.2 },
    { cx: 523.4, cy: 423.7, opacity: 0.7 }, { cx: 89.7,  cy: 234.5, opacity: 0.4 },
    { cx: 334.8, cy: 489.3, opacity: 0.2 }, { cx: 456.3, cy: 178.6, opacity: 1   },
    { cx: 178.4, cy: 512.7, opacity: 0.4 }, { cx: 312.6, cy: 67.8,  opacity: 0.7 },
    { cx: 56.8,  cy: 445.6, opacity: 0.2 }, { cx: 489.3, cy: 289.4, opacity: 0.4 },
    { cx: 145.7, cy: 156.3, opacity: 1   }, { cx: 423.6, cy: 523.8, opacity: 0.2 },
    { cx: 234.8, cy: 378.4, opacity: 0.4 }, { cx: 567.2, cy: 134.7, opacity: 0.7 },
    { cx: 112.4, cy: 312.5, opacity: 0.2 }, { cx: 378.7, cy: 445.3, opacity: 0.4 },
    { cx: 267.3, cy: 89.6,  opacity: 1   }, { cx: 534.8, cy: 367.4, opacity: 0.2 },
    { cx: 89.2,  cy: 512.1, opacity: 0.4 }, { cx: 412.6, cy: 223.8, opacity: 0.7 },
    { cx: 189.4, cy: 445.7, opacity: 0.2 }, { cx: 345.8, cy: 134.5, opacity: 0.4 },
    { cx: 512.3, cy: 478.2, opacity: 1   }, { cx: 156.7, cy: 267.8, opacity: 0.2 },
    { cx: 423.1, cy: 56.3,  opacity: 0.4 }, { cx: 78.6,  cy: 189.4, opacity: 0.7 },
    { cx: 289.4, cy: 534.6, opacity: 0.2 }, { cx: 467.8, cy: 312.3, opacity: 0.4 },
    { cx: 201.3, cy: 423.7, opacity: 1   }, { cx: 545.6, cy: 89.2,  opacity: 0.2 },
    { cx: 134.8, cy: 356.4, opacity: 0.4 },
  ],
]

export default function DotParticles() {
  return (
    <div
      aria-hidden
      style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'clip' }}
    >
      {clouds.map((cloud, ci) => (
        <motion.div
          key={ci}
          style={{
            position: 'absolute',
            left: cloud.left,
            top: cloud.top,
            width: cloud.width,
            height: cloud.height,
          }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: cloud.delay }}
        >
          <svg width={cloud.width} height={cloud.height} style={{ overflow: 'visible' }}>
            {circleSets[ci].map((c, i) => (
              <circle
                key={i}
                cx={c.cx}
                cy={c.cy}
                r={1.27}
                fill={c.opacity === 1 ? 'rgb(255,255,255)' : `rgba(255,255,255,${c.opacity})`}
              />
            ))}
          </svg>
        </motion.div>
      ))}
    </div>
  )
}
