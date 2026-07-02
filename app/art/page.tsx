'use client'

import { useState, useTransition } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import ClockWidget from '@/components/ClockWidget'
import GridBackground from '@/components/GridBackground'
import { INSPIRATION_META, PHOTO_META } from './imageMeta'
import { shuffleGrid } from './shuffle'

type Tab = 'photos' | 'inspirations'

type Photo = { id: string; ratio: number; src?: string; displayRatio?: number }

/* My Photos — film roll R1-08704 (36 frames, 35mm), scanner frame
   cropped out. Order mixes LP / LLP / LLLP chunks so the 3-column
   masonry has natural rhythm — varied, never a single orientation
   in a long run, but not metronome-predictable either. */
const PHOTOS: Photo[] = [
  { id: 'p0000', ratio: 1.501, src: '/photos/R1-08704-0000.JPG' },
  { id: 'p0001', ratio: 0.667, src: '/photos/R1-08704-0001.JPG' },
  { id: 'p0003', ratio: 1.501, src: '/photos/R1-08704-0003.JPG' },
  { id: 'p0004', ratio: 1.501, src: '/photos/R1-08704-0004.JPG' },
  { id: 'p0002', ratio: 0.667, src: '/photos/R1-08704-0002.JPG' },
  { id: 'p0005', ratio: 1.501, src: '/photos/R1-08704-0005.JPG' },
  { id: 'p0006', ratio: 1.501, src: '/photos/R1-08704-0006.JPG' },
  { id: 'p0010', ratio: 0.667, src: '/photos/R1-08704-0010.JPG' },
  { id: 'p0007', ratio: 1.501, src: '/photos/R1-08704-0007.JPG' },
  { id: 'p0008', ratio: 1.501, src: '/photos/R1-08704-0008.JPG' },
  { id: 'p0009', ratio: 1.501, src: '/photos/R1-08704-0009.JPG' },
  { id: 'p0013', ratio: 0.667, src: '/photos/R1-08704-0013.JPG' },
  { id: 'p0011', ratio: 1.501, src: '/photos/R1-08704-0011.JPG' },
  { id: 'p0017', ratio: 0.667, src: '/photos/R1-08704-0017.JPG' },
  { id: 'p0012', ratio: 1.501, src: '/photos/R1-08704-0012.JPG' },
  { id: 'p0014', ratio: 1.501, src: '/photos/R1-08704-0014.JPG' },
  { id: 'p0015', ratio: 1.501, src: '/photos/R1-08704-0015.JPG' },
  { id: 'p0018', ratio: 0.667, src: '/photos/R1-08704-0018.JPG' },
  { id: 'p0016', ratio: 1.501, src: '/photos/R1-08704-0016.JPG' },
  { id: 'p0019', ratio: 0.667, src: '/photos/R1-08704-0019.JPG' },
  { id: 'p0020', ratio: 1.501, src: '/photos/R1-08704-0020.JPG' },
  { id: 'p0022', ratio: 1.501, src: '/photos/R1-08704-0022.JPG' },
  { id: 'p0021', ratio: 0.667, src: '/photos/R1-08704-0021.JPG' },
  { id: 'p0023', ratio: 1.501, src: '/photos/R1-08704-0023.JPG' },
  { id: 'p0024', ratio: 1.501, src: '/photos/R1-08704-0024.JPG' },
  { id: 'p0027', ratio: 1.501, src: '/photos/R1-08704-0027.JPG' },
  { id: 'p0025', ratio: 0.667, src: '/photos/R1-08704-0025.JPG' },
  { id: 'p0028', ratio: 1.501, src: '/photos/R1-08704-0028.JPG' },
  { id: 'p0026', ratio: 0.667, src: '/photos/R1-08704-0026.JPG' },
  { id: 'p0029', ratio: 1.501, src: '/photos/R1-08704-0029.JPG' },
  { id: 'p0030', ratio: 1.501, src: '/photos/R1-08704-0030.JPG' },
  { id: 'p0031', ratio: 1.501, src: '/photos/R1-08704-0031.JPG' },
  { id: 'p0034', ratio: 0.667, src: '/photos/R1-08704-0034.JPG' },
  { id: 'p0032', ratio: 1.501, src: '/photos/R1-08704-0032.JPG' },
  { id: 'p0035', ratio: 0.667, src: '/photos/R1-08704-0035.JPG' },
  { id: 'p0033', ratio: 1.501, src: '/photos/R1-08704-0033.JPG' },
]

/* Inspirations — design references / posters I keep returning to.
   All portraits (ratios 0.67–0.84). Order alternates tall vs. wider
   portraits so the 3-column masonry has visible size rhythm without
   clustering similar heights side by side. */
const INSPIRATIONS: Photo[] = [
  { id: 'i-42c6a912', ratio: 0.673, src: '/inspirations/i-42c6a912.jpg' },
  { id: 'i-08a8fb3c', ratio: 1.598, src: '/inspirations/i-08a8fb3c.jpg' },
  { id: 'i-7c4eb8b5', ratio: 0.838, src: '/inspirations/i-7c4eb8b5.jpg' },
  { id: 'i-67d4cecb', ratio: 0.716, src: '/inspirations/i-67d4cecb.jpg' },
  { id: 'i-4f62bce0', ratio: 0.669, src: '/inspirations/i-4f62bce0.jpg' },
  { id: 'i-5dc234be', ratio: 0.662, src: '/inspirations/i-5dc234be.jpg' },
  { id: 'i-95048160', ratio: 0.750, src: '/inspirations/i-95048160.jpg' },
  { id: 'i-b29e2baa', ratio: 0.700, src: '/inspirations/i-b29e2baa.jpg' },
  { id: 'i-54d4d27f', ratio: 1.766, src: '/inspirations/i-54d4d27f.jpg' },
  { id: 'i-4f256aae', ratio: 0.812, src: '/inspirations/i-4f256aae.jpg' },
  { id: 'i-44a29719', ratio: 0.750, src: '/inspirations/i-44a29719.jpg' },
  { id: 'i-fd65770f', ratio: 0.707, src: '/inspirations/i-fd65770f.jpg' },
  { id: 'i-813d4f14', ratio: 0.811, src: '/inspirations/i-813d4f14.jpg' },
  { id: 'i-23d3b899', ratio: 0.800, src: '/inspirations/i-23d3b899.jpg' },
  { id: 'i-a0110c59', ratio: 1.049, src: '/inspirations/i-a0110c59.jpg' },
  { id: 'i-3e0e5b89', ratio: 0.771, src: '/inspirations/i-3e0e5b89.jpg' },
  { id: 'i-adb52e73', ratio: 1.425, src: '/inspirations/i-adb52e73.jpg' },
  { id: 'i-daad0cf3', ratio: 0.790, src: '/inspirations/i-daad0cf3.jpg' },
  { id: 'i-b38dd289', ratio: 1.158, src: '/inspirations/i-b38dd289.jpg' },
  { id: 'i-a139e400', ratio: 0.774, src: '/inspirations/i-a139e400.jpg' },
  { id: 'i-c94f104a', ratio: 0.786, src: '/inspirations/i-c94f104a.jpg' },
  { id: 'i-e4d86a35', ratio: 0.986, src: '/inspirations/i-e4d86a35.jpg' },
  { id: 'i-497de80d', ratio: 0.692, src: '/inspirations/i-497de80d.jpg' },
  { id: 'i-834e1e35', ratio: 0.804, src: '/inspirations/i-834e1e35.jpg' },
  { id: 'i-b8ada175', ratio: 0.725, src: '/inspirations/i-b8ada175.jpg' },
  { id: 'i-b8cdd956', ratio: 0.785, src: '/inspirations/i-b8cdd956.jpg' },
  { id: 'i-c059de0f', ratio: 0.804, src: '/inspirations/i-c059de0f.jpg' },
  { id: 'i-cf8aef5a', ratio: 1.000, src: '/inspirations/i-cf8aef5a.jpg' },
  { id: 'i-e84b1870', ratio: 0.913, src: '/inspirations/i-e84b1870.jpg' },

  // Second batch — appended after row 7 of the existing masonry.
  { id: 'i-0dc15efe', ratio: 1.000, src: '/inspirations/i-0dc15efe.jpg' },
  { id: 'i-18cfd324', ratio: 0.667, src: '/inspirations/i-18cfd324.jpg' },
  { id: 'i-1dbc0808', ratio: 0.800, src: '/inspirations/i-1dbc0808.jpg' },
  { id: 'i-20aeb916', ratio: 0.939, src: '/inspirations/i-20aeb916.jpg' },
  { id: 'i-2ca715f0', ratio: 1.329, src: '/inspirations/i-2ca715f0.jpg' },
  { id: 'i-37c27a0b', ratio: 0.678, src: '/inspirations/i-37c27a0b.jpg' },
  { id: 'i-39af9563', ratio: 0.857, src: '/inspirations/i-39af9563.jpg' },
  { id: 'i-4453533a', ratio: 0.847, src: '/inspirations/i-4453533a.jpg' },
  { id: 'i-4a07538f', ratio: 0.765, src: '/inspirations/i-4a07538f.jpg' },
  { id: 'i-61d609d9', ratio: 0.820, src: '/inspirations/i-61d609d9.jpg' },
  { id: 'i-6d9e679b', ratio: 1.472, src: '/inspirations/i-6d9e679b.jpg' },
  { id: 'i-7df10804', ratio: 0.750, src: '/inspirations/i-7df10804.jpg' },
  { id: 'i-7efb4f5e', ratio: 0.750, src: '/inspirations/i-7efb4f5e.jpg' },
  { id: 'i-88451454', ratio: 0.821, src: '/inspirations/i-88451454.jpg' },
  { id: 'i-8a5ab776', ratio: 0.981, src: '/inspirations/i-8a5ab776.jpg' },
  { id: 'i-96dd0151', ratio: 0.750, src: '/inspirations/i-96dd0151.jpg' },
  { id: 'i-9796963c', ratio: 1.500, src: '/inspirations/i-9796963c.jpg' },
  { id: 'i-9de43a48', ratio: 1.401, src: '/inspirations/i-9de43a48.jpg' },
  { id: 'i-a0e5751c', ratio: 0.752, src: '/inspirations/i-a0e5751c.jpg' },
  { id: 'i-a3ddd1dc', ratio: 1.000, src: '/inspirations/i-a3ddd1dc.jpg' },
  { id: 'i-a52f90d5', ratio: 0.800, src: '/inspirations/i-a52f90d5.jpg' },
  { id: 'i-a68e3342', ratio: 0.562, src: '/inspirations/i-a68e3342.jpg' },
  { id: 'i-a996a516', ratio: 0.802, src: '/inspirations/i-a996a516.jpg' },
  { id: 'i-afb0f378', ratio: 1.333, src: '/inspirations/i-afb0f378.jpg' },
  { id: 'i-bc7c9384', ratio: 1.497, src: '/inspirations/i-bc7c9384.jpg' },
  { id: 'i-bcf59f0c', ratio: 0.668, src: '/inspirations/i-bcf59f0c.jpg' },
  { id: 'i-c4290c3e', ratio: 0.667, src: '/inspirations/i-c4290c3e.jpg' },
  { id: 'i-c5e25cdb', ratio: 1.548, src: '/inspirations/i-c5e25cdb.jpg' },
  { id: 'i-cef9374f', ratio: 0.750, src: '/inspirations/i-cef9374f.jpg' },
  { id: 'i-e78d797e', ratio: 0.740, src: '/inspirations/i-e78d797e.jpg' },
  { id: 'i-ea8d7942', ratio: 0.759, src: '/inspirations/i-ea8d7942.jpg' },
  { id: 'i-eb0d6f2d', ratio: 1.000, src: '/inspirations/i-eb0d6f2d.jpg' },
  { id: 'i-f3da9619', ratio: 0.803, src: '/inspirations/i-f3da9619.jpg' },
  { id: 'i-ffa6224c', ratio: 0.713, src: '/inspirations/i-ffa6224c.jpg' },

  // Third batch — appended after the flush-bottom fix. Distribution
  // computed to keep all three columns at equal final height.
  { id: 'i-00028592', ratio: 0.772, src: '/inspirations/i-00028592.jpg' },
  { id: 'i-0bd146ef', ratio: 0.632, src: '/inspirations/i-0bd146ef.jpg' },
  { id: 'i-0c8b31a0', ratio: 0.707, src: '/inspirations/i-0c8b31a0.jpg' },
  { id: 'i-0f74bab2', ratio: 0.858, src: '/inspirations/i-0f74bab2.jpg' },
  { id: 'i-15a67397', ratio: 0.740, src: '/inspirations/i-15a67397.jpg' },
  { id: 'i-1d430978', ratio: 0.801, src: '/inspirations/i-1d430978.jpg' },
  { id: 'i-20a3ac77', ratio: 1.000, src: '/inspirations/i-20a3ac77.jpg' },
  { id: 'i-262ee033', ratio: 0.820, src: '/inspirations/i-262ee033.jpg' },
  { id: 'i-2cbf09fa', ratio: 0.758, src: '/inspirations/i-2cbf09fa.jpg' },
  { id: 'i-31bdde48', ratio: 0.687, src: '/inspirations/i-31bdde48.jpg' },
  { id: 'i-36ea6305', ratio: 1.005, src: '/inspirations/i-36ea6305.jpg' },
  { id: 'i-3a1ab08d', ratio: 0.773, src: '/inspirations/i-3a1ab08d.jpg' },
  { id: 'i-3abd23f0', ratio: 0.750, src: '/inspirations/i-3abd23f0.jpg' },
  { id: 'i-42b42a89', ratio: 0.993, src: '/inspirations/i-42b42a89.jpg' },
  { id: 'i-47c1fb1f', ratio: 0.800, src: '/inspirations/i-47c1fb1f.jpg' },
  { id: 'i-4a50670b', ratio: 0.707, src: '/inspirations/i-4a50670b.jpg' },
  { id: 'i-4e0d754a', ratio: 0.800, src: '/inspirations/i-4e0d754a.jpg' },
  { id: 'i-5040ee6b', ratio: 1.000, src: '/inspirations/i-5040ee6b.jpg' },
  { id: 'i-557e0f48', ratio: 0.695, src: '/inspirations/i-557e0f48.jpg' },
  { id: 'i-5a007a4c', ratio: 0.789, src: '/inspirations/i-5a007a4c.jpg' },
  { id: 'i-692dea80', ratio: 0.690, src: '/inspirations/i-692dea80.jpg' },
  { id: 'i-70fa1a7e', ratio: 0.711, src: '/inspirations/i-70fa1a7e.jpg' },
  { id: 'i-782d3a82', ratio: 0.738, src: '/inspirations/i-782d3a82.jpg' },
  { id: 'i-8363a93c', ratio: 0.808, src: '/inspirations/i-8363a93c.jpg' },
  { id: 'i-9c9793ce', ratio: 1.000, src: '/inspirations/i-9c9793ce.jpg' },
  { id: 'i-9dc84ecd', ratio: 0.750, src: '/inspirations/i-9dc84ecd.jpg' },
  { id: 'i-b5e44651', ratio: 1.453, src: '/inspirations/i-b5e44651.jpg' },
  { id: 'i-b819c443', ratio: 0.707, src: '/inspirations/i-b819c443.jpg' },
  { id: 'i-b95e6dce', ratio: 1.000, src: '/inspirations/i-b95e6dce.jpg' },
  { id: 'i-baced945', ratio: 1.333, src: '/inspirations/i-baced945.jpg' },
  { id: 'i-c26be60c', ratio: 0.562, src: '/inspirations/i-c26be60c.jpg' },
  { id: 'i-c2b1c781', ratio: 0.800, src: '/inspirations/i-c2b1c781.jpg' },
  { id: 'i-d078c37b', ratio: 0.750, src: '/inspirations/i-d078c37b.jpg' },
  { id: 'i-d3ed4d9f', ratio: 0.771, src: '/inspirations/i-d3ed4d9f.jpg' },
  { id: 'i-e47a7706', ratio: 0.706, src: '/inspirations/i-e47a7706.jpg' },
  { id: 'i-e5376e27', ratio: 0.706, src: '/inspirations/i-e5376e27.jpg' },
  { id: 'i-ec1ee0c7', ratio: 0.997, src: '/inspirations/i-ec1ee0c7.jpg' },
  { id: 'i-ef5a06aa', ratio: 0.815, src: '/inspirations/i-ef5a06aa.jpg' },
  { id: 'i-faa67c13', ratio: 0.746, src: '/inspirations/i-faa67c13.jpg' },
  { id: 'i-fc9d2b7e', ratio: 0.998, src: '/inspirations/i-fc9d2b7e.jpg' },

  // Fourth batch — flush-bottom partition (0px spread across columns).
  { id: 'i-0fe00c5b', ratio: 1.108, src: '/inspirations/i-0fe00c5b.jpg' },
  { id: 'i-11d3a502', ratio: 0.750, src: '/inspirations/i-11d3a502.jpg' },
  { id: 'i-3372b50e', ratio: 0.672, src: '/inspirations/i-3372b50e.jpg' },
  { id: 'i-36091bd2', ratio: 1.000, src: '/inspirations/i-36091bd2.jpg' },
  { id: 'i-3704d673', ratio: 1.087, src: '/inspirations/i-3704d673.jpg' },
  { id: 'i-3d845413', ratio: 0.800, src: '/inspirations/i-3d845413.jpg' },
  { id: 'i-4a1feaf1', ratio: 0.677, src: '/inspirations/i-4a1feaf1.jpg' },
  { id: 'i-5350df9b', ratio: 0.753, src: '/inspirations/i-5350df9b.jpg' },
  { id: 'i-63fbc624', ratio: 1.435, src: '/inspirations/i-63fbc624.jpg' },
  { id: 'i-65bd6de1', ratio: 1.006, src: '/inspirations/i-65bd6de1.jpg' },
  { id: 'i-6773e3f1', ratio: 1.000, src: '/inspirations/i-6773e3f1.jpg' },
  { id: 'i-6dced705', ratio: 0.994, src: '/inspirations/i-6dced705.jpg' },
  { id: 'i-7046cfaf', ratio: 1.480, src: '/inspirations/i-7046cfaf.jpg' },
  { id: 'i-7377ed38', ratio: 1.175, src: '/inspirations/i-7377ed38.jpg' },
  { id: 'i-739becfb', ratio: 1.009, src: '/inspirations/i-739becfb.jpg' },
  { id: 'i-749d1f96', ratio: 0.780, src: '/inspirations/i-749d1f96.jpg' },
  { id: 'i-8618f269', ratio: 1.258, src: '/inspirations/i-8618f269.jpg' },
  { id: 'i-9b72d85f', ratio: 0.949, src: '/inspirations/i-9b72d85f.jpg' },
  { id: 'i-a10c1f14', ratio: 0.563, src: '/inspirations/i-a10c1f14.jpg' },
  { id: 'i-a2814262', ratio: 1.000, src: '/inspirations/i-a2814262.jpg' },
  { id: 'i-a9232bb8', ratio: 1.379, src: '/inspirations/i-a9232bb8.jpg' },
  { id: 'i-c4d0a9fb', ratio: 1.787, src: '/inspirations/i-c4d0a9fb.jpg' },
  { id: 'i-d3405709', ratio: 0.754, src: '/inspirations/i-d3405709.jpg' },
  { id: 'i-d9fbcb21', ratio: 0.998, src: '/inspirations/i-d9fbcb21.jpg' },
  { id: 'i-e5577c14', ratio: 0.757, src: '/inspirations/i-e5577c14.jpg' },
  { id: 'i-eb6db00f', ratio: 1.562, src: '/inspirations/i-eb6db00f.jpg' },
  { id: 'i-f64611b2', ratio: 0.563, src: '/inspirations/i-f64611b2.jpg' },

  // Fifth batch
  { id: 'i-3bb4dcbc', ratio: 1.018, src: '/inspirations/i-3bb4dcbc.jpg' },
  { id: 'i-6dbb8115', ratio: 1.050, src: '/inspirations/i-6dbb8115.jpg' },
  { id: 'i-7f0fd34e', ratio: 0.621, src: '/inspirations/i-7f0fd34e.jpg' },
  { id: 'i-9d32f8a5', ratio: 0.750, src: '/inspirations/i-9d32f8a5.jpg' },
  { id: 'i-a15bb450', ratio: 1.176, src: '/inspirations/i-a15bb450.jpg' },
]

// Pre-computed column assignments.
// PHOTOS: exactly 8L+4P per column → identical column heights → mathematically flush bottom.
//   Portraits are grouped in pairs/bursts rather than evenly spaced, creating dramatic
//   contrast between tall portrait blocks and wide landscape runs across the three columns.
// INSPIRATIONS: hand-optimised so col pixel heights are 2982/2985/2979 at 400px col width
//   (6px max spread — the extra gap in the 7-item column is accounted for).
const _pm = Object.fromEntries(PHOTOS.map(p => [p.id, p]))
const _im = Object.fromEntries(INSPIRATIONS.map(p => [p.id, p]))
const pick = (map: Record<string, Photo>, ids: string[]) => ids.map(id => map[id])

// Col0: PP LLLL PP LLLL  Col1: LLLL PP LLLL PP  Col2: LL PP LL PP LLLL
const PHOTOS_C0 = pick(_pm, ['p0001','p0002','p0000','p0003','p0004','p0005','p0010','p0018','p0006','p0007','p0008','p0009'])
const PHOTOS_C1 = pick(_pm, ['p0011','p0012','p0014','p0015','p0013','p0017','p0016','p0020','p0022','p0023','p0019','p0025'])
const PHOTOS_C2 = pick(_pm, ['p0024','p0027','p0021','p0026','p0028','p0029','p0034','p0035','p0030','p0031','p0032','p0033'])

// Rule: alternate color families (blue/warm/green/neutral), mix interior+graphic, vary shapes.
// The first 9 items in each column are the original layout; items after are the
// new batch — appended so each column starts with a landscape or square to break
// the trailing-portrait pattern from the first batch, and orientations/tones
// alternate down the column.
// Fully re-optimised: Djidjelli removed, new photo added, pavements
// separated (i-11d3a502 → C1, i-a10c1f14 → C2), Yucca Fins/Top Shop
// spaced with 2 non-brand items between them, interiors distributed
// 5/4/4 across columns, orientations alternated, 0px column-height
// spread (dead flush bottom).
// Full re-optimization: 3 new photos added, last-row-left swapped for a
// graphic/typography image (i-813d4f14 Sol Ecuador oval), C1 & C2 last
// items preserved (i-4453533a and i-3d845413). Pavements in different
// columns, Yucca/Top Shop in different columns, interiors 7/6/6, 0px
// column-height spread (dead flush bottom).
// Re-optimized with STRONG cross-column interior separation (1500× penalty).
// Result: 0 interior visual-adjacencies, 8/8/7 balanced, 0px flush bottom.
// Fixed lasts: C1=i-4453533a (surf), C2=i-3d845413 (Black Tusk).
// C0 last swapped for typography (i-1dbc0808 Rastro Tequila).
const INSP_C0 = pick(_im, [
  'i-23d3b899','i-a0110c59','i-b8ada175','i-daad0cf3','i-3e0e5b89','i-c94f104a','i-a139e400','i-7df10804','i-0f74bab2','i-4a07538f','i-15a67397','i-5dc234be','i-9796963c','i-ef5a06aa','i-3a1ab08d','i-42c6a912','i-a9232bb8','i-eb6db00f','i-67d4cecb','i-8618f269','i-5040ee6b','i-47c1fb1f','i-3372b50e','i-6dced705','i-31bdde48','i-6d9e679b','i-20aeb916','i-88451454','i-c4290c3e','i-bcf59f0c','i-ffa6224c','i-cef9374f','i-a10c1f14','i-a15bb450','i-9b72d85f','i-813d4f14','i-8363a93c','i-a52f90d5','i-6773e3f1','i-11d3a502','i-9c9793ce','i-a2814262','i-7377ed38','i-2ca715f0','i-1dbc0808',
])
const INSP_C1 = pick(_im, [
  'i-08a8fb3c','i-44a29719','i-adb52e73','i-7c4eb8b5','i-834e1e35','i-4f256aae','i-a68e3342','i-eb0d6f2d','i-1d430978','i-e5577c14','i-a3ddd1dc','i-b819c443','i-0dc15efe','i-63fbc624','i-61d609d9','i-7f0fd34e','i-d078c37b','i-c26be60c','i-5350df9b','i-36ea6305','i-7efb4f5e','i-65bd6de1','i-e78d797e','i-9de43a48','i-cf8aef5a','i-fc9d2b7e','i-9d32f8a5','i-b5e44651','i-8a5ab776','i-e5376e27','i-5a007a4c','i-2cbf09fa','i-4a50670b','i-ec1ee0c7','i-95048160','i-a0e5751c','i-d3405709','i-00028592','i-c2b1c781','i-39af9563','i-36091bd2','i-20a3ac77','i-b95e6dce','i-d3ed4d9f','i-4453533a',
])
const INSP_C2 = pick(_im, [
  'i-fd65770f','i-54d4d27f','i-b29e2baa','i-e4d86a35','i-e84b1870','i-497de80d','i-b8cdd956','i-4a1feaf1','i-ea8d7942','i-b38dd289','i-42b42a89','i-bc7c9384','i-0fe00c5b','i-692dea80','i-3704d673','i-d9fbcb21','i-782d3a82','i-96dd0151','i-6dbb8115','i-0c8b31a0','i-3abd23f0','i-37c27a0b','i-baced945','i-afb0f378','i-0bd146ef','i-4f62bce0','i-3bb4dcbc','i-70fa1a7e','i-749d1f96','i-c5e25cdb','i-262ee033','i-faa67c13','i-739becfb','i-f64611b2','i-9dc84ecd','i-557e0f48','i-e47a7706','i-c4d0a9fb','i-f3da9619','i-7046cfaf','i-a996a516','i-18cfd324','i-c059de0f','i-4e0d754a','i-3d845413',
])

const CARD_KEYFRAME = `@keyframes photo-rise { from { opacity:0; transform:translateY(28px) } to { opacity:1; transform:translateY(0) } }`

const monoStyle: React.CSSProperties = {
  fontFamily: "'Spline Sans Mono', var(--font-spline-sans-mono), monospace",
  fontSize: 11.2,
  fontWeight: 400,
  lineHeight: '13.44px',
  color: 'var(--color-text-secondary)',
}

function PhotoTile({ src, ratio, displayRatio }: { src?: string; ratio: number; displayRatio?: number }) {
  const ar = String(displayRatio ?? ratio)
  return (
    <div style={{ breakInside: 'avoid', marginBottom: 10 }}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          loading="lazy"
          style={{
            width: '100%',
            aspectRatio: ar,
            objectFit: 'cover',
            display: 'block',
            background: 'var(--color-card-bg)',
          }}
        />
      ) : (
        <div
          aria-hidden
          style={{
            width: '100%',
            aspectRatio: ar,
            background: 'var(--color-card-bg)',
            border: '1px solid var(--color-card-border)',
            backdropFilter: 'blur(5px)',
            WebkitBackdropFilter: 'blur(5px)',
          }}
        />
      )}
    </div>
  )
}

// Subtle shuffle button — mono, uppercase, tracked (matches the top-left
// MATHIEU MESTRE label). Icon is static; the delight lives in the grid itself.
function ShuffleButton({ onShuffle }: { onShuffle: () => void }) {
  const [hover, setHover] = useState(false)
  return (
    <motion.button
      onClick={onShuffle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label="Shuffle grid"
      whileTap={{ scale: 0.94 }}
      transition={{ type: 'spring', stiffness: 500, damping: 22 }}
      style={{
        position: 'absolute',
        right: 0,
        top: '50%',
        y: '-50%',
        background: 'none',
        border: 'none',
        padding: '3px 5px',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        fontFamily: "'Inter', system-ui, sans-serif",
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: '-0.005em',
        color: hover ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
        transition: 'color 0.2s ease',
      }}
    >
      <span style={{ fontSize: 11.5, lineHeight: 1, display: 'inline-block' }}>↺</span>
      <span>Shuffle</span>
    </motion.button>
  )
}

export default function Art() {
  const { resolvedTheme } = useTheme()  // subscribe to theme changes
  // Read directly from the .dark class on <html> (set synchronously by
  // next-themes' inline script before React runs). This gives us the
  // correct value on the very first render of a client-side navigation,
  // with no one-tick gap that could flash the light-mode wash.
  const isDark = (typeof document !== 'undefined' && document.documentElement.classList.contains('dark'))
                 || resolvedTheme === 'dark'

  const [tab, setTab] = useState<Tab>('photos')

  // Shuffle state — nonce per tab (drives the tile ripple key on shuffle),
  // plus an instant "pulse" tick that flips on click (before the solver runs),
  // so the grid gives immediate feedback even when the Inspirations pool takes
  // a beat to re-solve.
  const [photosNonce, setPhotosNonce] = useState(0)
  const [inspNonce, setInspNonce] = useState(0)
  const [photosCols, setPhotosCols] = useState<Photo[][] | null>(null)
  const [inspCols, setInspCols] = useState<Photo[][] | null>(null)
  const [pulse, setPulse] = useState(0)
  const [, startTransition] = useTransition()

  const cols = tab === 'photos'
    ? (photosCols ?? [PHOTOS_C0, PHOTOS_C1, PHOTOS_C2])
    : (inspCols ?? [INSP_C0, INSP_C1, INSP_C2])
  const nonce = tab === 'photos' ? photosNonce : inspNonce

  const handleShuffle = () => {
    // Immediate acknowledgment — bump pulse so the current grid dips + settles
    // this frame, regardless of how long the solver takes.
    setPulse(p => p + 1)
    // Defer the solver to the next frame + mark the state update as a
    // transition so React can keep the UI responsive while it runs.
    requestAnimationFrame(() => {
      if (tab === 'photos') {
        const next = shuffleGrid([...PHOTOS], PHOTO_META, { attemptFlush: true })
        startTransition(() => {
          setPhotosCols(next)
          setPhotosNonce(n => n + 1)
        })
      } else {
        const next = shuffleGrid([...INSPIRATIONS], INSPIRATION_META, { attemptFlush: true })
        startTransition(() => {
          setInspCols(next)
          setInspNonce(n => n + 1)
        })
      }
    })
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-page-bg)', position: 'relative' }}>
      <style>{CARD_KEYFRAME}</style>

      {/* Grid background — same opacity as /work and /about */}
      <div aria-hidden style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.65 }}>
        <GridBackground />
      </div>

      {/* Top color wash — light mode only */}
      {!isDark && (
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 101,
            background: 'linear-gradient(180deg, rgba(217,235,252,0.46) 0%, rgba(255,235,242,0.32) 27.9%, rgba(255,249,242,0.53) 62.25%, rgba(252,252,252,0) 100%)',
            maskImage: 'linear-gradient(to right, transparent 0%, black 30%, black 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 30%, black 100%)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      )}

      {/* Bottom color wash — light mode only */}
      {!isDark && (
        <div
          aria-hidden
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 101,
            background: 'linear-gradient(0deg, rgba(217,235,252,0.46) 0%, rgba(255,235,242,0.32) 27.9%, rgba(255,249,242,0.53) 62.25%, rgba(252,252,252,0) 100%)',
            maskImage: 'linear-gradient(to right, transparent 0%, black 30%, black 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 30%, black 100%)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      )}

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1500, margin: '0 auto', padding: '0 20px 120px' }}>

        {/* Top bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          style={{
            paddingTop: 20,
            paddingBottom: 16,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}
        >
          <Link href="/" style={{ textDecoration: 'none', display: 'block' }}>
            <span style={{ ...monoStyle, cursor: 'pointer' }}>MATHIEU MESTRE</span>
          </Link>
          <ClockWidget />
        </motion.div>

        {/* Centered title + subtext */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.08 }}
          style={{ padding: '40px 0 20px', textAlign: 'center' }}
        >
          <p style={{
            fontFamily: "'P22 Mackinac Medium', sans-serif",
            fontSize: 14,
            fontWeight: 500,
            color: 'var(--color-text-primary)',
            marginBottom: 6,
          }}>
            Pictures I keep.
          </p>
          <p style={{ ...monoStyle, margin: 0 }}>
            My film photos and things I like looking at.
          </p>
        </motion.div>

        {/* Toggle — two mono labels with an active underline.
           Restrained, matches the portfolio's quiet typography.
           Shuffle button sits to the right, subtle by default. */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.16 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 28,
            padding: '0 0 40px',
            position: 'relative',
          }}
        >
          {(['photos', 'inspirations'] as Tab[]).map((t) => {
            const isActive = tab === t
            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '4px 2px',
                  cursor: 'pointer',
                  fontFamily: "'Spline Sans Mono', var(--font-spline-sans-mono), monospace",
                  fontSize: 11.2,
                  letterSpacing: '0.02em',
                  color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                  borderBottom: `1px solid ${isActive ? 'var(--color-text-primary)' : 'transparent'}`,
                  transition: 'color 0.2s ease, border-color 0.2s ease',
                }}
              >
                {t === 'photos' ? 'My photos' : 'Inspirations'}
              </button>
            )
          })}
          <ShuffleButton onShuffle={handleShuffle} />
        </motion.div>

        {/* Masonry — outer wrapper handles the tab-change fade AND an instant
           "dip" on shuffle click (via pulse key) that plays this frame while
           the solver runs on the next. Inner tiles animate on nonce change
           when the new arrangement arrives. */}
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ position: 'relative' }}
        >
          <motion.div
            key={`pulse-${pulse}`}
            initial={pulse === 0 ? false : { opacity: 0.6, scale: 0.995 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              opacity: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
              scale: { type: 'spring', stiffness: 240, damping: 26 },
            }}
            style={{ display: 'flex', gap: 10, alignItems: 'flex-start', transformOrigin: 'center top' }}
          >
            {cols.map((col, ci) => (
              <div key={ci} style={{ flex: 1 }}>
                {col.map((p, ri) => {
                  // Soft rise — clean slide up from 16px with a smooth fade.
                  // No tilt, no bounce. Diagonal cascade top-left → bottom-right.
                  // Slightly longer duration + softer easing than the preview
                  // so the fade feels unhurried.
                  const delay = nonce === 0 ? 0 : Math.min(0.7, ri * 0.035 + ci * 0.06)
                  return (
                    <motion.div
                      key={`${nonce}-${p.id}`}
                      initial={
                        nonce === 0
                          ? false
                          : { opacity: 0, y: 16 }
                      }
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 1.75,
                        ease: [0.16, 1, 0.3, 1],
                        delay,
                      }}
                    >
                      <PhotoTile src={p.src} ratio={p.ratio} displayRatio={p.displayRatio} />
                    </motion.div>
                  )
                })}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
