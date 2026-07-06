'use client'

import { useState, useTransition, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import ClockWidget from '@/components/ClockWidget'
import GridBackground from '@/components/GridBackground'
import { INSPIRATION_META, PHOTO_META } from './imageMeta'
import { shuffleGrid } from './shuffle'

type Tab = 'photos' | 'inspirations'

type Photo = { id: string; ratio: number; src?: string; displayRatio?: number; scale?: number }

/* My Photos — 4 film rolls: R1-08704/05/06 (Brazil + Portugal), R1-08900/01 (Brazil + Portugal),
   plus a few frames from Lanzarote. Scale per photo based on border analysis:
   - medium border → 1.10 (~4.5% crop each edge, clears all medium film borders)
   - thick border (mm-*) → 1.15 (~6.5% crop each edge)
   - no border → no scale or 1.0 (no crop)
   Corrected orientations: p29/p38 are L (4547×3047), p30 is P (3047×4547).
   Total pool: 45L + 20P + 1S = 66 photos. */
const PHOTOS: Photo[] = [
  // R1-08704 — Brazil, Trindade/Paraty (medium border → 1.10)
  { id: 'p01', ratio: 1.4923, src: '/photos/R1-08704-0000.JPG', scale: 1.10 },
  { id: 'p02', ratio: 0.6701, src: '/photos/R1-08704-0001.JPG', scale: 1.10 },
  { id: 'p03', ratio: 0.6701, src: '/photos/R1-08704-0002.JPG', scale: 1.10 },
  { id: 'p04', ratio: 1.4923, src: '/photos/R1-08704-0003.JPG', scale: 1.10 },
  { id: 'p05', ratio: 1.4923, src: '/photos/R1-08704-0005.JPG', scale: 1.10 },
  { id: 'p06', ratio: 0.6701, src: '/photos/R1-08704-0010.JPG', scale: 1.10 },
  { id: 'p07', ratio: 1.4923, src: '/photos/R1-08704-0011.JPG', scale: 1.10 },
  { id: 'p08', ratio: 1.4923, src: '/photos/R1-08704-0012.JPG', scale: 1.10 },
  { id: 'p09', ratio: 0.6701, src: '/photos/R1-08704-0013.JPG', scale: 1.10 },
  { id: 'p10', ratio: 1.4923, src: '/photos/R1-08704-0015.JPG', scale: 1.10 },
  { id: 'p11', ratio: 1.4923, src: '/photos/R1-08704-0016.JPG', scale: 1.10 },
  { id: 'p12', ratio: 0.6701, src: '/photos/R1-08704-0019.JPG', scale: 1.10 },
  { id: 'p13', ratio: 1.4923, src: '/photos/R1-08704-0022.JPG', scale: 1.10 },
  { id: 'p14', ratio: 1.4923, src: '/photos/R1-08704-0024.JPG', scale: 1.10 },
  { id: 'p15', ratio: 0.6701, src: '/photos/R1-08704-0025.JPG', scale: 1.10 },
  { id: 'p16', ratio: 0.6701, src: '/photos/R1-08704-0026.JPG', scale: 1.10 },
  { id: 'p17', ratio: 1.4923, src: '/photos/R1-08704-0027.JPG', scale: 1.10 },
  { id: 'p18', ratio: 1.4923, src: '/photos/R1-08704-0028.JPG', scale: 1.10 },
  { id: 'p19', ratio: 1.4923, src: '/photos/R1-08704-0030.JPG', scale: 1.10 },
  { id: 'p20', ratio: 1.4923, src: '/photos/R1-08704-0033.JPG', scale: 1.10 },
  { id: 'p21', ratio: 0.6701, src: '/photos/R1-08704-0034.JPG', scale: 1.10 },
  // R1-08705 — Portugal surf trip (medium border → 1.10)
  { id: 'p22', ratio: 1.4923, src: '/photos/R1-08705-0003.JPG', scale: 1.10 },
  { id: 'p23', ratio: 1.4923, src: '/photos/R1-08705-0006.JPG', scale: 1.10 },
  { id: 'p24', ratio: 0.6701, src: '/photos/R1-08705-0007.JPG', scale: 1.10 },
  { id: 'p25', ratio: 1.4923, src: '/photos/R1-08705-0008.JPG', scale: 1.10 },
  { id: 'p26', ratio: 1.4923, src: '/photos/R1-08705-0014.JPG', scale: 1.10 },
  { id: 'p27', ratio: 0.6701, src: '/photos/R1-08705-0016.JPG', scale: 1.10 },
  { id: 'p28', ratio: 1.4923, src: '/photos/R1-08705-0023.JPG', scale: 1.10 },
  { id: 'p29', ratio: 1.4923, src: '/photos/R1-08705-0024.JPG', scale: 1.10 },
  { id: 'p30', ratio: 0.6701, src: '/photos/R1-08705-0025.JPG', scale: 1.10 },
  { id: 'p31', ratio: 1.4923, src: '/photos/R1-08705-0026.JPG', scale: 1.10 },
  { id: 'p32', ratio: 1.4923, src: '/photos/R1-08705-0027.JPG', scale: 1.10 },
  { id: 'p33', ratio: 1.4923, src: '/photos/R1-08705-0028.JPG', scale: 1.10 },
  // R1-08706 — Brazil boat trip + Lisbon (medium border → 1.10; p47 no border → 1.0)
  { id: 'p34', ratio: 1.4923, src: '/photos/R1-08706-0000.JPG', scale: 1.10 },
  { id: 'p35', ratio: 1.4923, src: '/photos/R1-08706-0004.JPG', scale: 1.10 },
  { id: 'p36', ratio: 1.4923, src: '/photos/R1-08706-0007.JPG', scale: 1.10 },
  { id: 'p37', ratio: 0.6701, src: '/photos/R1-08706-0008.JPG', scale: 1.10 },
  { id: 'p38', ratio: 1.4923, src: '/photos/R1-08706-0010.JPG', scale: 1.10 },
  { id: 'p39', ratio: 0.6701, src: '/photos/R1-08706-0012.JPG', scale: 1.10 },
  { id: 'p40', ratio: 1.4923, src: '/photos/R1-08706-0013.JPG', scale: 1.10 },
  { id: 'p41', ratio: 1.4923, src: '/photos/R1-08706-0014.JPG', scale: 1.10 },
  { id: 'p42', ratio: 1.4923, src: '/photos/R1-08706-0015.JPG', scale: 1.10 },
  { id: 'p43', ratio: 1.4923, src: '/photos/R1-08706-0017.JPG', scale: 1.10 },
  { id: 'p44', ratio: 1.4923, src: '/photos/R1-08706-0018.JPG', scale: 1.10 },
  { id: 'p45', ratio: 0.6701, src: '/photos/R1-08706-0026.JPG', scale: 1.10 },
  { id: 'p46', ratio: 1.4923, src: '/photos/R1-08706-0032.JPG', scale: 1.10 },
  { id: 'p47', ratio: 0.8685, src: '/photos/R1-08706-0034.JPG' },
  // R1-08900 — Brazil + Portugal coast (medium border → 1.10; p49 no border)
  { id: 'p48', ratio: 1.4923, src: '/photos/R1-08900-0000.JPG', scale: 1.10 },
  { id: 'p49', ratio: 0.6701, src: '/photos/R1-08900-0005.JPG' },
  { id: 'p50', ratio: 1.4923, src: '/photos/R1-08900-0028.JPG', scale: 1.10 },
  { id: 'p51', ratio: 1.4923, src: '/photos/R1-08900-0029.JPG', scale: 1.10 },
  { id: 'p52', ratio: 1.4923, src: '/photos/R1-08900-0030.JPG', scale: 1.10 },
  // R1-08901 — Brazil urban + beach
  // no border: p53,p54,p55,p59,p60,p61,p62 → no scale
  // medium border: p56,p57,p58,p63 → 1.10
  { id: 'p53', ratio: 0.6701, src: '/photos/R1-08901-0000.JPG' },
  { id: 'p54', ratio: 1.4923, src: '/photos/R1-08901-0001.JPG' },
  { id: 'p55', ratio: 1.4923, src: '/photos/R1-08901-0002.JPG' },
  { id: 'p56', ratio: 1.4923, src: '/photos/R1-08901-0016.JPG', scale: 1.10 },
  { id: 'p57', ratio: 1.4923, src: '/photos/R1-08901-0018.JPG', scale: 1.10 },
  { id: 'p58', ratio: 0.6701, src: '/photos/R1-08901-0022.JPG', scale: 1.10 },
  { id: 'p59', ratio: 1.4923, src: '/photos/R1-08901-0030.JPG' },
  { id: 'p60', ratio: 1.4923, src: '/photos/R1-08901-0031.JPG' },
  { id: 'p61', ratio: 0.6701, src: '/photos/R1-08901-0032.JPG' },
  { id: 'p62', ratio: 0.6701, src: '/photos/R1-08901-0033.JPG' },
  { id: 'p63', ratio: 1.4923, src: '/photos/R1-08901-0034.JPG', scale: 1.10 },
  // Lanzarote / portrait frames (thick border → 1.15)
  { id: 'p64', ratio: 1.4914, src: '/photos/mm-112.jpg', scale: 1.15 },
  { id: 'p65', ratio: 1.4914, src: '/photos/mm-193.jpg', scale: 1.15 },
  { id: 'p66', ratio: 0.6705, src: '/photos/mm-213.jpg', scale: 1.15 },

  // ── New batch ─────────────────────────────────────────────────────────────
  // 000xxx — Sicily / fish market / surf backyard / Lisbon B&W / dunes (scale 1.10 for borders)
  { id: 'n01', ratio: 0.6704, src: '/photos/000002-5-2.jpg', scale: 1.10 },
  { id: 'n02', ratio: 0.6704, src: '/photos/000002-6.jpg',   scale: 1.10 },
  { id: 'n03', ratio: 1.4914, src: '/photos/000003-5.jpg',   scale: 1.10 },
  { id: 'n04', ratio: 0.6704, src: '/photos/000003-6.jpg',   scale: 1.10 },
  { id: 'n05', ratio: 0.6704, src: '/photos/000004-6.jpg',   scale: 1.10 },
  { id: 'n06', ratio: 0.6704, src: '/photos/000005-6.jpg',   scale: 1.10 },
  { id: 'n07', ratio: 0.6704, src: '/photos/000005-7.jpg',   scale: 1.10 },
  { id: 'n08', ratio: 0.6704, src: '/photos/000006-6.jpg',   scale: 1.10 },
  { id: 'n09', ratio: 0.7422, src: '/photos/000007-5.jpg' },
  { id: 'n10', ratio: 0.6704, src: '/photos/000007-7.jpg',   scale: 1.10 },
  { id: 'n11', ratio: 1.4914, src: '/photos/000007.jpg',     scale: 1.10 },
  { id: 'n12', ratio: 1.4914, src: '/photos/000008-6.jpg',   scale: 1.10 },
  { id: 'n13', ratio: 0.6704, src: '/photos/000008.jpg',     scale: 1.10 },
  { id: 'n14', ratio: 0.6704, src: '/photos/000009-5.jpg',   scale: 1.10 },
  { id: 'n15', ratio: 1.4914, src: '/photos/000010-4.jpg',   scale: 1.10 },
  { id: 'n16', ratio: 0.6704, src: '/photos/000010-5.jpg',   scale: 1.10 },
  { id: 'n17', ratio: 0.7650, src: '/photos/000010.jpg',     scale: 1.10 },
  { id: 'n18', ratio: 1.4914, src: '/photos/000012-4.jpg',   scale: 1.10 },
  { id: 'n19', ratio: 1.4914, src: '/photos/000012.jpg',     scale: 1.10 },
  { id: 'n20', ratio: 1.4914, src: '/photos/000014-4.jpg',   scale: 1.10 },
  { id: 'n21', ratio: 0.6704, src: '/photos/000014-5.jpg',   scale: 1.10 },
  { id: 'n22', ratio: 0.6704, src: '/photos/000014.jpg',     scale: 1.10 },
  { id: 'n23', ratio: 0.6704, src: '/photos/000015-5.jpg',   scale: 1.10 },
  { id: 'n24', ratio: 1.4914, src: '/photos/000015.jpg',     scale: 1.10 },
  { id: 'n25', ratio: 0.7933, src: '/photos/000016-6.jpg' },
  { id: 'n26', ratio: 0.6704, src: '/photos/000016.jpg',     scale: 1.10 },
  { id: 'n27', ratio: 0.6704, src: '/photos/000017-4.jpg',   scale: 1.10 },
  { id: 'n28', ratio: 1.4914, src: '/photos/000017-6.jpg',   scale: 1.10 },
  { id: 'n29', ratio: 1.4914, src: '/photos/000017.jpg',     scale: 1.10 },
  { id: 'n30', ratio: 0.6704, src: '/photos/000018-4.jpg',   scale: 1.10 },
  { id: 'n31', ratio: 0.6704, src: '/photos/000018-5.jpg',   scale: 1.10 },
  { id: 'n32', ratio: 0.6704, src: '/photos/000018-6.jpg',   scale: 1.10 },
  { id: 'n33', ratio: 0.6704, src: '/photos/000019-4.jpg',   scale: 1.10 },
  { id: 'n34', ratio: 0.6704, src: '/photos/000020-4.jpg',   scale: 1.10 },
  { id: 'n35', ratio: 0.6704, src: '/photos/000020-5.jpg',   scale: 1.10 },
  { id: 'n36', ratio: 1.4914, src: '/photos/000020-6.jpg',   scale: 1.10 },
  { id: 'n37', ratio: 1.4914, src: '/photos/000020-7.jpg',   scale: 1.10 },
  { id: 'n38', ratio: 1.4914, src: '/photos/000022-5.jpg',   scale: 1.10 },
  { id: 'n39', ratio: 0.6704, src: '/photos/000022-6.jpg',   scale: 1.10 },
  { id: 'n40', ratio: 0.6704, src: '/photos/000023-4.jpg',   scale: 1.10 },
  { id: 'n41', ratio: 0.6704, src: '/photos/000023-6.jpg',   scale: 1.10 },
  { id: 'n42', ratio: 1.4914, src: '/photos/000024-4.jpg',   scale: 1.10 },
  { id: 'n43', ratio: 1.4914, src: '/photos/000024-7.jpg',   scale: 1.10 },
  { id: 'n44', ratio: 1.4914, src: '/photos/000025-5.jpg',   scale: 1.10 },
  { id: 'n45', ratio: 0.6704, src: '/photos/000025-6.jpg',   scale: 1.10 },
  { id: 'n46', ratio: 1.4914, src: '/photos/000026-4.jpg',   scale: 1.10 },
  { id: 'n47', ratio: 1.4914, src: '/photos/000027-4.jpg',   scale: 1.10 },
  { id: 'n48', ratio: 0.6704, src: '/photos/000028-4.jpg',   scale: 1.10 },
  { id: 'n49', ratio: 0.6704, src: '/photos/000028-6.jpg',   scale: 1.10 },
  { id: 'n50', ratio: 1.4914, src: '/photos/000030-3.jpg',   scale: 1.10 },
  { id: 'n51', ratio: 0.6704, src: '/photos/000030-4.jpg',   scale: 1.10 },
  { id: 'n52', ratio: 1.4914, src: '/photos/000031-4.jpg',   scale: 1.10 },
  { id: 'n53', ratio: 1.4914, src: '/photos/000031-5.jpg',   scale: 1.10 },
  { id: 'n54', ratio: 1.4914, src: '/photos/000032-3.jpg',   scale: 1.10 },
  { id: 'n55', ratio: 0.6704, src: '/photos/000034.jpg',     scale: 1.10 },
  { id: 'n56', ratio: 0.6704, src: '/photos/000035-3.jpg',   scale: 1.10 },
  { id: 'n57', ratio: 1.4914, src: '/photos/000035.jpg',     scale: 1.10 },
  { id: 'n58', ratio: 1.4914, src: '/photos/000036-3.jpg',   scale: 1.10 },
  { id: 'n59', ratio: 1.4914, src: '/photos/000036.jpg',     scale: 1.10 },
  // J7QYW — tropical beach (no border)
  { id: 'n60', ratio: 1.5078, src: '/photos/J7QYW.jpeg' },
  // Loren Oakley — urban street / café (no border)
  { id: 'n61', ratio: 0.6689, src: '/photos/Loren-Oakley-119.jpg' },
  { id: 'n62', ratio: 0.6689, src: '/photos/Loren-Oakley-122.jpg' },
  { id: 'n63', ratio: 1.4948, src: '/photos/Loren-Oakley-38.jpg' },
  { id: 'n64', ratio: 0.6689, src: '/photos/Loren-Oakley-39.jpg' },
  { id: 'n65', ratio: 1.4948, src: '/photos/Loren-Oakley-5.jpg' },
  { id: 'n66', ratio: 1.4948, src: '/photos/Loren-Oakley-54.jpg' },
  { id: 'n67', ratio: 0.6689, src: '/photos/Loren-Oakley-6.jpg' },
  { id: 'n68', ratio: 1.4948, src: '/photos/Loren-Oakley-75.jpg' },
  // R1-08143 — coastal / ocean (border → 1.10)
  { id: 'n69', ratio: 1.4928, src: '/photos/R1-08143-000A.JPG',  scale: 1.10 },
  { id: 'n70', ratio: 1.4928, src: '/photos/R1-08143-005A.JPG',  scale: 1.10 },
  { id: 'n71', ratio: 1.4928, src: '/photos/R1-08143-007A.JPG',  scale: 1.10 },
  { id: 'n72', ratio: 1.4928, src: '/photos/R1-08143-00XA.JPG',  scale: 1.10 },
  { id: 'n73', ratio: 0.6698, src: '/photos/R1-08143-013A.JPG',  scale: 1.10 },
  { id: 'n74', ratio: 1.4928, src: '/photos/R1-08143-014A.JPG',  scale: 1.10 },
  { id: 'n75', ratio: 1.4928, src: '/photos/R1-08143-019A.JPG',  scale: 1.10 },
  { id: 'n76', ratio: 1.4928, src: '/photos/R1-08143-020A.JPG',  scale: 1.10 },
  { id: 'n77', ratio: 1.4928, src: '/photos/R1-08143-024A.JPG',  scale: 1.10 },
  { id: 'n78', ratio: 1.4928, src: '/photos/R1-08143-026A.JPG',  scale: 1.10 },
  // R1-08144 — Brazil / Rio (mixed borders)
  { id: 'n79', ratio: 0.7473, src: '/photos/R1-08144-003A.JPG' },
  { id: 'n80', ratio: 1.4928, src: '/photos/R1-08144-004A.JPG',  scale: 1.10 },
  { id: 'n81', ratio: 0.7303, src: '/photos/R1-08144-005A.JPG' },
  { id: 'n82', ratio: 1.4928, src: '/photos/R1-08144-00XA.JPG',  scale: 1.10 },
  { id: 'n83', ratio: 1.4928, src: '/photos/R1-08144-018A.JPG',  scale: 1.10 },
  { id: 'n84', ratio: 1.4928, src: '/photos/R1-08144-027A.JPG',  scale: 1.10 },
  { id: 'n85', ratio: 1.4928, src: '/photos/R1-08144-029A.JPG',  scale: 1.10 },
  { id: 'n86', ratio: 1.2444, src: '/photos/R1-08144-030A.JPG' },
  { id: 'n87', ratio: 1.3152, src: '/photos/R1-08144-031A.JPG' },
  { id: 'n88', ratio: 0.6698, src: '/photos/R1-08144-032A.JPG',  scale: 1.10 },
  { id: 'n89', ratio: 0.6698, src: '/photos/R1-08144-033A.JPG',  scale: 1.10 },
  // R1-08707 — Lisbon / cliff beaches / surf (border → 1.10)
  { id: 'n90', ratio: 0.6701, src: '/photos/R1-08707-0000-copy.JPG', scale: 1.10 },
  { id: 'n91', ratio: 1.4922, src: '/photos/R1-08707-0003.JPG',  scale: 1.10 },
  { id: 'n92', ratio: 0.6701, src: '/photos/R1-08707-0012.JPG',  scale: 1.10 },
  { id: 'n93', ratio: 1.4922, src: '/photos/R1-08707-0020.JPG',  scale: 1.10 },
  { id: 'n94', ratio: 0.6701, src: '/photos/R1-08707-0021.JPG',  scale: 1.10 },
  { id: 'n95', ratio: 0.6701, src: '/photos/R1-08707-0022.JPG',  scale: 1.10 },
  { id: 'n96', ratio: 1.4922, src: '/photos/R1-08707-0024.JPG',  scale: 1.10 },
  { id: 'n97', ratio: 1.4922, src: '/photos/R1-08707-0026.JPG',  scale: 1.10 },
  { id: 'n98', ratio: 1.4922, src: '/photos/R1-08707-0029.JPG',  scale: 1.10 },
  { id: 'n99', ratio: 0.6701, src: '/photos/R1-08707-0030.JPG',  scale: 1.10 },
  { id: 'n100', ratio: 1.4922, src: '/photos/R1-08707-0032.JPG', scale: 1.10 },
  { id: 'n101', ratio: 0.6701, src: '/photos/R1-08707-0034.JPG', scale: 1.10 },
  { id: 'n102', ratio: 1.4922, src: '/photos/R1-08707-0035.JPG', scale: 1.10 },
  // Lanzarote terrace — F3 featured big photo
  { id: 'n103', ratio: 1.4914, src: '/photos/mm-106.jpg', scale: 1.10 },
  // mm-106-beach — missing from Portfolio folder (beach sunset cartwheel, portrait)
  { id: 'n104', ratio: 0.6704, src: '/photos/mm-106-beach.jpg', scale: 1.15 },
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

// Static layout: 3 masonry segments (A→B→C) separated by 2 featured moments.
// Shuffle bypasses this entirely — uses shuffleGrid on PHOTOS → flat 3 cols.
//
// Featured rows use aspectRatio:'2.25' + alignItems:'stretch' on the outer container.
//   Both columns are FORCED to identical height by CSS — 0px gap guaranteed at any viewport.
//   Proof: big_w = (W-10)×⅔, big_h = big_w/1.4923, container_ratio = W/big_h ≈ 2.25 for W≥1024.
//   Companions fill their share via height:100% objectFit:cover — no displayRatio approximation needed.
//
// Segment heights (at 400px col width): A = B = 2594px (5L+2P per col, equal ✓). C at page bottom.
//
// Segment A (21 photos, 7 per col, 5L+2P → 2594px each)
const SEG_A_C0 = pick(_pm, ['p06','p04','p28','p02','p25','p11','p17'])
const SEG_A_C1 = pick(_pm, ['p08','p01','p03','p21','p18','p20','p13'])
const SEG_A_C2 = pick(_pm, ['p19','p35','p39','p45','p34','p40','p41'])
// Featured 1 — Portugal cliff, golden hour
// Portrait companion (P, 0.6701) at 1/3 width ≈ 592px tall, big photo ≈ 531px — naturally close.
// Both photos show at their natural aspect ratios, no stretching or extra cropping.
const F1_BIG  = _pm['p52']
const F1_COMP = pick(_pm, ['p24'])  // P — Portugal surf crew (grey/muted, visual contrast)
// Segment B (21 photos, 7 per col, 5L+2P → equal heights)
const SEG_B_C0 = pick(_pm, ['p43','p10','p26','p27','p16','p22','p48'])
const SEG_B_C1 = pick(_pm, ['p14','p29','p30','p44','p46','p15','p36'])
const SEG_B_C2 = pick(_pm, ['p38','p37','p32','p49','p31','p23','p51'])
// Featured 2 — Brazil aerial secluded beach
// Portrait companion (P, 0.6701) at 1/3 width — same principle as F1.
const F2_BIG  = _pm['p05']
const F2_COMP = pick(_pm, ['p62'])  // P — Brazil boulders/figure, pink/teal (warm tones)
// Segment C (20 photos — returned: p50+p07 from old companions; gave p24+p62 to featured)
// SEG_C heights at 460px col: L=318 P=697 S(p47)=540
// C0: 5L+2P → 2984. C1 was 6L+1P=2605 (661px gap!). Fix: swap p42(L)↔p12(P).
// C1 new: 5L+2P → 2984. C2 new: 3L+2P+1S → 2887 (97px less, only at section boundary).
const SEG_C_C0 = pick(_pm, ['p54','p55','p09','p58','p59','p65','p33'])
const SEG_C_C1 = pick(_pm, ['p56','p57','p50','p53','p60','p63','p12'])
const SEG_C_C2 = pick(_pm, ['p61','p07','p64','p42','p66','p47'])

// New batch: 4 equal segments (4L+3P per col → equal heights) + F3 + bottom tail
// Themes spread: Sicily/Italy, dunes/surf, Lisbon B&W, Loren Oakley, R1-08143 coastal,
//                R1-08144 Rio/Brazil, R1-08707 Lisbon/cliffs — interleaved for diversity.
// SEG_D — Sicily market + dunes + surf backyard (between SEG_C and F3)
const SEG_D_C0 = pick(_pm, ['n04','n03','n05','n15','n06','n28','n50'])  // PLPLPLL
const SEG_D_C1 = pick(_pm, ['n12','n07','n18','n08','n42','n10','n46'])  // LPLPLPL
const SEG_D_C2 = pick(_pm, ['n20','n14','n29','n21','n44','n23','n47'])  // LPLPLPL
// Featured 3 — Lanzarote terrace with cliffs (big left), cliff stairs companion (right)
const F3_BIG  = _pm['n103']
const F3_COMP = pick(_pm, ['n94'])
// SEG_E — Lisbon B&W + dunes sunset + Loren Oakley street
const SEG_E_C0 = pick(_pm, ['n01','n11','n13','n19','n61','n57','n63'])  // PLPLPLL
const SEG_E_C1 = pick(_pm, ['n24','n02','n38','n16','n43','n62','n65'])  // LPLPLPL
const SEG_E_C2 = pick(_pm, ['n22','n37','n35','n52','n64','n53','n66'])  // PLPLPLL
// SEG_F — R1-08143 coastal + more Sicily + dunes
const SEG_F_C0 = pick(_pm, ['n69','n26','n70','n27','n36','n30','n54'])  // LPLPLPL
const SEG_F_C1 = pick(_pm, ['n31','n71','n32','n72','n33','n58','n59'])  // PLPLPLL
const SEG_F_C2 = pick(_pm, ['n74','n34','n75','n40','n96','n41','n68'])  // LPLPLPL — n60→n96 (1.5078→std L: equal heights)
// SEG_G — R1-08143 remaining + R1-08144 Rio + R1-08707 Lisbon/cliffs
const SEG_G_C0 = pick(_pm, ['n76','n39','n77','n45','n80','n48','n82'])  // LPLPLPL
const SEG_G_C1 = pick(_pm, ['n49','n78','n51','n83','n55','n84','n85'])  // PLPLPLL
const SEG_G_C2 = pick(_pm, ['n73','n97','n56','n100','n67','n91','n93'])  // PLPLPLL — n86→n97, n87→n100 (non-std→std L: equal heights)
// SEG_H — R1-08707 cliffs + odds (page bottom, unequal col heights fine)
// SEG_H — bottom of page. Non-std ratios isolated here.
// Heights at 460px col: n88/89/90/92/95/99/101/104≈697, n09=630,n81=640,n79=625,n17=611,n25=590
//                       n86=380,n87=360, n98=318(L),n102=318(L), n60=315(L-wide)
// Greedy bin-pack → C0=3394 C1=3399 C2=3569 (175px spread, vs 700px+ before)
const SEG_H_C0 = pick(_pm, ['n88','n92','n101','n79','n87','n98'])
const SEG_H_C1 = pick(_pm, ['n89','n95','n104','n17','n86','n102'])
const SEG_H_C2 = pick(_pm, ['n90','n99','n81','n09','n25','n60'])

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

// ── CSS Grid masonry placement ──────────────────────────────────────────────
// One unified grid for all photos. Each photo gets an explicit grid-row span
// computed from its actual pixel height (Math.round(colWidth / ratio)).
// GAP rows are baked into each span so consecutive items pack without gaps.
// Featured pairs share the SAME row span → zero drift at any viewport width.
type GridItem = { photo: Photo; gridColumn: string; gridRowStart: number; gridRowSpan: number }

function computeGridPlacements(colWidth: number): GridItem[] {
  const GAP = 10
  const items: GridItem[] = []
  const cur = [1, 1, 1] // row cursor per column (0-indexed → grid col 1/2/3)

  const add = (photo: Photo, col: number, colSpan: number, rowStart: number, rowSpan: number) =>
    items.push({ photo, gridColumn: colSpan > 1 ? `${col} / span ${colSpan}` : String(col), gridRowStart: rowStart, gridRowSpan: rowSpan })

  const seg = (c0: Photo[], c1: Photo[], c2: Photo[]) => {
    ;[c0, c1, c2].forEach((col, ci) => {
      let r = cur[ci]
      for (const p of col) { const span = Math.round(colWidth / p.ratio) + GAP; add(p, ci + 1, 1, r, span); r += span }
      cur[ci] = r
    })
    const max = Math.max(...cur); cur[0] = cur[1] = cur[2] = max
  }

  const feat = (big: Photo, comp: Photo, bigLeft: boolean) => {
    const span = Math.round((colWidth * 2 + GAP) / big.ratio) + GAP
    const r = cur[0]
    bigLeft ? (add(big, 1, 2, r, span), add(comp, 3, 1, r, span))
            : (add(comp, 1, 1, r, span), add(big, 2, 2, r, span))
    cur[0] = cur[1] = cur[2] = r + span
  }

  seg(SEG_A_C0, SEG_A_C1, SEG_A_C2)
  feat(F1_BIG!, F1_COMP[0], true)
  seg(SEG_B_C0, SEG_B_C1, SEG_B_C2)
  feat(F2_BIG!, F2_COMP[0], false)
  seg(SEG_C_C0, SEG_C_C1, SEG_C_C2)
  seg(SEG_D_C0, SEG_D_C1, SEG_D_C2)
  feat(F3_BIG!, F3_COMP[0], true)
  seg(SEG_E_C0, SEG_E_C1, SEG_E_C2)
  seg(SEG_F_C0, SEG_F_C1, SEG_F_C2)
  seg(SEG_G_C0, SEG_G_C1, SEG_G_C2)
  seg(SEG_H_C0, SEG_H_C1, SEG_H_C2)
  return items
}

const CARD_KEYFRAME = `@keyframes photo-rise { from { opacity:0; transform:translateY(28px) } to { opacity:1; transform:translateY(0) } }`

const monoStyle: React.CSSProperties = {
  fontFamily: "'Spline Sans Mono', var(--font-spline-sans-mono), monospace",
  fontSize: 11.2,
  fontWeight: 400,
  lineHeight: '13.44px',
  color: 'var(--color-text-secondary)',
}

function PhotoTile({ src, ratio, displayRatio, scale = 1 }: { src?: string; ratio: number; displayRatio?: number; scale?: number }) {
  const ar = String(displayRatio ?? ratio)
  return (
    <div style={{ breakInside: 'avoid', marginBottom: 10, overflow: 'hidden' }}>
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
            transform: scale !== 1 ? `scale(${scale})` : undefined,
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

  // CSS Grid masonry: measure actual column width so row spans are pixel-exact.
  const gridRef = useRef<HTMLDivElement>(null)
  const [gridColWidth, setGridColWidth] = useState(() => {
    if (typeof window === 'undefined') return 460
    return (Math.min(window.innerWidth, 1500) - 60) / 3  // fast first-render estimate
  })
  useEffect(() => {
    const el = gridRef.current
    if (!el) return
    const measure = () => { const w = el.getBoundingClientRect().width; if (w > 0) setGridColWidth((w - 20) / 3) }
    measure()
    const obs = new ResizeObserver(measure)
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

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

  // For static photos, cols is unused — segments + featured rows render instead.
  // For shuffled photos and inspirations, cols drives the flat-column render.
  const cols = tab === 'photos'
    ? (photosCols ?? [])
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
            marginTop: 10,
            marginBottom: 30,
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
                  fontFamily: "'PP Neue Montreal Medium', system-ui, sans-serif",
                  fontSize: 12.5,
                  fontWeight: 500,
                  letterSpacing: '0.005em',
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

        {/* Masonry — tab-change fade wraps everything. Static photos use
           segments + featured rows; shuffled photos and inspirations use
           the flat pulse+col layout so the ripple animation still works. */}
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ position: 'relative' }}
        >
          {tab === 'photos' && !photosCols ? (
            /* ── Static photos: single CSS Grid with explicit row spans ──
               All photos share one grid → identical row lines for every column.
               Row span = Math.round(colWidth / ratio) + 10 (gap baked in).
               Featured pairs use the same span → zero drift at any viewport. */
            <div
              ref={gridRef}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridAutoRows: '1px', columnGap: 10 }}
            >
              {computeGridPlacements(gridColWidth).map(item => (
                <div
                  key={item.photo.id}
                  style={{ gridColumn: item.gridColumn, gridRow: `${item.gridRowStart} / span ${item.gridRowSpan}` }}
                >
                  {/* Inner div clips scale-overflow; outer div's bottom 10px stays empty = gap */}
                  <div style={{ position: 'relative', overflow: 'hidden', height: 'calc(100% - 10px)' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.photo.src} alt="" loading="lazy"
                      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block', transform: item.photo.scale ? `scale(${item.photo.scale})` : undefined }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* ── Shuffled photos or inspirations: flat pulse+col layout ── */
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
                    const delay = nonce === 0 ? 0 : Math.min(0.7, ri * 0.035 + ci * 0.06)
                    return (
                      <motion.div
                        key={`${nonce}-${p.id}`}
                        initial={nonce === 0 ? false : { opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.75, ease: [0.16, 1, 0.3, 1], delay }}
                      >
                        <PhotoTile src={p.src} ratio={p.ratio} displayRatio={p.displayRatio} scale={p.scale} />
                      </motion.div>
                    )
                  })}
                </div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
