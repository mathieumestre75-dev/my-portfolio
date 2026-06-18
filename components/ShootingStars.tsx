'use client'

import { motion } from 'framer-motion'

type Streak = { top: string; left: string; delay: number }

// Scattered across the full upper half of the viewport; delays spread 0–12s.
const STREAKS: Streak[] = [
  { top: '15%', left: '20%', delay: 0    },
  { top: '5%',  left: '45%', delay: 2.4  },
  { top: '25%', left: '70%', delay: 4.8  },
  { top: '10%', left: '8%',  delay: 7.2  },
  { top: '35%', left: '55%', delay: 9.6  },
  { top: '18%', left: '80%', delay: 12   },
]

export default function ShootingStars() {
  return (
    <>
      {STREAKS.map((s, i) => (
        <motion.div
          key={i}
          aria-hidden
          initial={{ x: 0, y: 0 }}
          animate={{ x: 600, y: 600 }}
          transition={{
            duration: 1.8,
            ease: 'easeIn',
            delay: s.delay,
            repeat: Infinity,
            repeatType: 'loop',
            repeatDelay: 2.4,
          }}
          style={{
            position: 'fixed',
            top: s.top,
            left: s.left,
            width: 1.5,
            height: 180,
            background:
              'linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.3) 40%, transparent)',
            borderRadius: 999,
            rotate: '-45deg',
            opacity: 1,
            zIndex: i % 2 === 0 ? 0 : 20,
            pointerEvents: 'none',
          }}
        />
      ))}
    </>
  )
}
