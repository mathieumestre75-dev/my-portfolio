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
  { id: 'p01', ratio: 1.4923, src: '/photos/R1-08704-0000.JPG', scale: 1.14 },
  { id: 'p02', ratio: 0.6701, src: '/photos/R1-08704-0001.JPG', scale: 1.14 },
  { id: 'p03', ratio: 0.6701, src: '/photos/R1-08704-0002.JPG', scale: 1.14 },
  { id: 'p04', ratio: 1.4923, src: '/photos/R1-08704-0003.JPG', scale: 1.14 },
  { id: 'p05', ratio: 1.4923, src: '/photos/R1-08704-0005.JPG', scale: 1.14 },
  { id: 'p06', ratio: 0.6701, src: '/photos/R1-08704-0010.JPG', scale: 1.14 },
  { id: 'p07', ratio: 0.8601, src: '/photos/R1-08704-0011.JPG' },
  { id: 'p08', ratio: 1.4923, src: '/photos/R1-08704-0012.JPG', scale: 1.14 },
  { id: 'p09', ratio: 0.6701, src: '/photos/R1-08704-0013.JPG', scale: 1.14 },
  { id: 'p10', ratio: 1.4923, src: '/photos/R1-08704-0015.JPG', scale: 1.14 },
  { id: 'p11', ratio: 1.7664, src: '/photos/R1-08704-0016.JPG' },
  { id: 'p12', ratio: 0.6701, src: '/photos/R1-08704-0019.JPG', scale: 1.14 },
  { id: 'p13', ratio: 1.4923, src: '/photos/R1-08704-0022.JPG', scale: 1.14 },
  { id: 'p14', ratio: 1.4923, src: '/photos/R1-08704-0024.JPG', scale: 1.14 },
  { id: 'p15', ratio: 0.6701, src: '/photos/R1-08704-0025.JPG', scale: 1.14 },
  { id: 'p16', ratio: 0.6701, src: '/photos/R1-08704-0026.JPG', scale: 1.14 },
  { id: 'p17', ratio: 1.4923, src: '/photos/R1-08704-0027.JPG', scale: 1.14 },
  { id: 'p18', ratio: 1.4923, src: '/photos/R1-08704-0028.JPG', scale: 1.14 },
  { id: 'p19', ratio: 1.4923, src: '/photos/R1-08704-0030.JPG', scale: 1.14 },
  { id: 'p20', ratio: 1.4923, src: '/photos/R1-08704-0033.JPG', scale: 1.14 },
  { id: 'p21', ratio: 0.6701, src: '/photos/R1-08704-0034.JPG', scale: 1.14 },
  // R1-08705 — Portugal surf trip (medium border → 1.10)
  { id: 'p22', ratio: 1.4923, src: '/photos/R1-08705-0003.JPG', scale: 1.14 },
  { id: 'p23', ratio: 1.4923, src: '/photos/R1-08705-0006.JPG', scale: 1.14 },
  { id: 'p24', ratio: 0.6701, src: '/photos/R1-08705-0007.JPG', scale: 1.14 },
  { id: 'p25', ratio: 1.4923, src: '/photos/R1-08705-0008.JPG', scale: 1.14 },
  { id: 'p26', ratio: 1.4923, src: '/photos/R1-08705-0014.JPG', scale: 1.14 },
  { id: 'p27', ratio: 0.6701, src: '/photos/R1-08705-0016.JPG', scale: 1.14 },
  { id: 'p28', ratio: 1.4923, src: '/photos/R1-08705-0023.JPG', scale: 1.14 },
  { id: 'p29', ratio: 1.4923, src: '/photos/R1-08705-0024.JPG', scale: 1.14 },
  { id: 'p30', ratio: 0.6701, src: '/photos/R1-08705-0025.JPG', scale: 1.14 },
  { id: 'p31', ratio: 1.4923, src: '/photos/R1-08705-0026.JPG', scale: 1.14 },
  { id: 'p32', ratio: 1.4923, src: '/photos/R1-08705-0027.JPG', scale: 1.14 },
  { id: 'p33', ratio: 1.4923, src: '/photos/R1-08705-0028.JPG', scale: 1.14 },
  // R1-08706 — Brazil boat trip + Lisbon (medium border → 1.10; p47 no border → 1.0)
  { id: 'p34', ratio: 1.4923, src: '/photos/R1-08706-0000.JPG', scale: 1.14 },
  { id: 'p35', ratio: 1.4923, src: '/photos/R1-08706-0004.JPG', scale: 1.14 },
  { id: 'p36', ratio: 1.4923, src: '/photos/R1-08706-0007.JPG', scale: 1.14 },
  { id: 'p37', ratio: 0.6701, src: '/photos/R1-08706-0008.JPG', scale: 1.14 },
  { id: 'p38', ratio: 1.4923, src: '/photos/R1-08706-0010.JPG', scale: 1.14 },
  { id: 'p39', ratio: 0.6701, src: '/photos/R1-08706-0012.JPG', scale: 1.14 },
  { id: 'p40', ratio: 1.4923, src: '/photos/R1-08706-0013.JPG', scale: 1.14 },
  { id: 'p41', ratio: 1.4923, src: '/photos/R1-08706-0014.JPG', scale: 1.14 },
  { id: 'p42', ratio: 1.4923, src: '/photos/R1-08706-0015.JPG', scale: 1.14 },
  { id: 'p43', ratio: 1.4923, src: '/photos/R1-08706-0017.JPG', scale: 1.14 },
  { id: 'p44', ratio: 1.4923, src: '/photos/R1-08706-0018.JPG', scale: 1.14 },
  { id: 'p45', ratio: 0.6701, src: '/photos/R1-08706-0026.JPG', scale: 1.14 },
  { id: 'p46', ratio: 1.4923, src: '/photos/R1-08706-0032.JPG', scale: 1.14 },
  { id: 'p47', ratio: 0.8685, src: '/photos/R1-08706-0034.JPG' },
  // R1-08900 — Brazil + Portugal coast (border → 1.14)
  { id: 'p48', ratio: 1.4923, src: '/photos/R1-08900-0000.JPG', scale: 1.14 },
  { id: 'p49', ratio: 0.6701, src: '/photos/R1-08900-0005.JPG', scale: 1.14 },
  { id: 'p50', ratio: 1.4923, src: '/photos/R1-08900-0028.JPG', scale: 1.14 },
  { id: 'p51', ratio: 1.4923, src: '/photos/R1-08900-0029.JPG', scale: 1.14 },
  { id: 'p52', ratio: 1.4923, src: '/photos/R1-08900-0030.JPG', scale: 1.14 },
  // R1-08901 — Brazil urban + beach (border → 1.14)
  { id: 'p53', ratio: 0.6701, src: '/photos/R1-08901-0000.JPG', scale: 1.14 },
  { id: 'p54', ratio: 1.4923, src: '/photos/R1-08901-0001.JPG', scale: 1.14 },
  { id: 'p55', ratio: 1.4923, src: '/photos/R1-08901-0002.JPG', scale: 1.14 },
  { id: 'p56', ratio: 1.4923, src: '/photos/R1-08901-0016.JPG', scale: 1.14 },
  { id: 'p57', ratio: 1.4923, src: '/photos/R1-08901-0018.JPG', scale: 1.14 },
  { id: 'p58', ratio: 0.6701, src: '/photos/R1-08901-0022.JPG', scale: 1.14 },
  { id: 'p59', ratio: 1.4923, src: '/photos/R1-08901-0030.JPG', scale: 1.14 },
  { id: 'p60', ratio: 1.4923, src: '/photos/R1-08901-0031.JPG', scale: 1.14 },
  { id: 'p61', ratio: 0.6701, src: '/photos/R1-08901-0032.JPG', scale: 1.14 },
  { id: 'p62', ratio: 0.6701, src: '/photos/R1-08901-0033.JPG', scale: 1.14 },
  { id: 'p63', ratio: 1.4923, src: '/photos/R1-08901-0034.JPG', scale: 1.14 },
  // Lanzarote / portrait frames — p64/p65/p66 removed as duplicates of m101/m102/m103

  // ── New batch ─────────────────────────────────────────────────────────────
  // 000xxx — Sicily / fish market / surf backyard / Lisbon B&W / dunes (scale 1.10 for borders)
  { id: 'n01', ratio: 0.6704, src: '/photos/000002-5-2.jpg', scale: 1.14 },
  { id: 'n02', ratio: 0.6704, src: '/photos/000002-6.jpg',   scale: 1.14 },
  { id: 'n03', ratio: 1.4914, src: '/photos/000003-5.jpg',   scale: 1.14 },
  { id: 'n04', ratio: 0.6704, src: '/photos/000003-6.jpg',   scale: 1.14 },
  { id: 'n05', ratio: 0.6704, src: '/photos/000004-6.jpg',   scale: 1.14 },
  { id: 'n06', ratio: 0.6704, src: '/photos/000005-6.jpg',   scale: 1.14 },
  { id: 'n07', ratio: 0.6704, src: '/photos/000005-7.jpg',   scale: 1.14 },
  { id: 'n08', ratio: 0.6704, src: '/photos/000006-6.jpg',   scale: 1.14 },
  { id: 'n09', ratio: 0.7422, src: '/photos/000007-5.jpg',   scale: 1.14 },
  { id: 'n10', ratio: 0.6704, src: '/photos/000007-7.jpg',   scale: 1.14 },
  { id: 'n11', ratio: 1.4914, src: '/photos/000007.jpg',     scale: 1.14 },
  { id: 'n12', ratio: 1.4914, src: '/photos/000008-6.jpg',   scale: 1.14 },
  { id: 'n13', ratio: 0.6704, src: '/photos/000008.jpg',     scale: 1.14 },
  { id: 'n14', ratio: 0.6704, src: '/photos/000009-5.jpg',   scale: 1.14 },
  { id: 'n15', ratio: 1.4914, src: '/photos/000010-4.jpg',   scale: 1.14 },
  { id: 'n16', ratio: 0.6704, src: '/photos/000010-5.jpg',   scale: 1.14 },
  { id: 'n17', ratio: 0.7650, src: '/photos/000010.jpg',     scale: 1.14 },
  { id: 'n18', ratio: 1.4914, src: '/photos/000012-4.jpg',   scale: 1.14 },
  { id: 'n19', ratio: 1.4914, src: '/photos/000012.jpg',     scale: 1.14 },
  { id: 'n20', ratio: 1.4914, src: '/photos/000014-4.jpg',   scale: 1.14 },
  { id: 'n21', ratio: 0.6704, src: '/photos/000014-5.jpg',   scale: 1.14 },
  { id: 'n22', ratio: 0.6704, src: '/photos/000014.jpg',     scale: 1.14 },
  { id: 'n23', ratio: 0.6704, src: '/photos/000015-5.jpg',   scale: 1.14 },
  { id: 'n24', ratio: 1.4914, src: '/photos/000015.jpg',     scale: 1.14 },
  { id: 'n25', ratio: 0.7933, src: '/photos/000016-6.jpg' },
  { id: 'n26', ratio: 0.6704, src: '/photos/000016.jpg',     scale: 1.14 },
  { id: 'n27', ratio: 0.6704, src: '/photos/000017-4.jpg',   scale: 1.14 },
  { id: 'n28', ratio: 1.4914, src: '/photos/000017-6.jpg',   scale: 1.14 },
  { id: 'n29', ratio: 1.4914, src: '/photos/000017.jpg',     scale: 1.14 },
  { id: 'n30', ratio: 0.6704, src: '/photos/000018-4.jpg',   scale: 1.14 },
  { id: 'n31', ratio: 0.6704, src: '/photos/000018-5.jpg',   scale: 1.14 },
  { id: 'n32', ratio: 0.6704, src: '/photos/000018-6.jpg',   scale: 1.14 },
  { id: 'n33', ratio: 0.6704, src: '/photos/000019-4.jpg',   scale: 1.14 },
  { id: 'n34', ratio: 0.6704, src: '/photos/000020-4.jpg',   scale: 1.14 },
  { id: 'n35', ratio: 0.6704, src: '/photos/000020-5.jpg',   scale: 1.14 },
  { id: 'n36', ratio: 1.4914, src: '/photos/000020-6.jpg',   scale: 1.14 },
  { id: 'n37', ratio: 1.4914, src: '/photos/000020-7.jpg',   scale: 1.14 },
  { id: 'n38', ratio: 1.4914, src: '/photos/000022-5.jpg',   scale: 1.14 },
  { id: 'n39', ratio: 0.6704, src: '/photos/000022-6.jpg',   scale: 1.14 },
  { id: 'n40', ratio: 0.6704, src: '/photos/000023-4.jpg',   scale: 1.14 },
  { id: 'n41', ratio: 0.6704, src: '/photos/000023-6.jpg',   scale: 1.14 },
  { id: 'n42', ratio: 1.4914, src: '/photos/000024-4.jpg',   scale: 1.14 },
  { id: 'n43', ratio: 1.4914, src: '/photos/000024-7.jpg',   scale: 1.14 },
  { id: 'n44', ratio: 1.4914, src: '/photos/000025-5.jpg',   scale: 1.14 },
  { id: 'n45', ratio: 0.6704, src: '/photos/000025-6.jpg',   scale: 1.14 },
  { id: 'n46', ratio: 1.4914, src: '/photos/000026-4.jpg',   scale: 1.14 },
  { id: 'n47', ratio: 1.4914, src: '/photos/000027-4.jpg',   scale: 1.14 },
  { id: 'n48', ratio: 0.6704, src: '/photos/000028-4.jpg',   scale: 1.14 },
  { id: 'n49', ratio: 0.6704, src: '/photos/000028-6.jpg',   scale: 1.14 },
  { id: 'n50', ratio: 1.4914, src: '/photos/000030-3.jpg',   scale: 1.14 },
  { id: 'n51', ratio: 0.6704, src: '/photos/000030-4.jpg',   scale: 1.14 },
  { id: 'n52', ratio: 1.4914, src: '/photos/000031-4.jpg',   scale: 1.14 },
  { id: 'n53', ratio: 1.4914, src: '/photos/000031-5.jpg',   scale: 1.14 },
  { id: 'n54', ratio: 1.4914, src: '/photos/000032-3.jpg',   scale: 1.14 },
  { id: 'n55', ratio: 0.6704, src: '/photos/000034.jpg',     scale: 1.14 },
  { id: 'n56', ratio: 0.6704, src: '/photos/000035-3.jpg',   scale: 1.14 },
  { id: 'n57', ratio: 1.4914, src: '/photos/000035.jpg',     scale: 1.14 },
  { id: 'n58', ratio: 1.4914, src: '/photos/000036-3.jpg',   scale: 1.14 },
  { id: 'n59', ratio: 1.4914, src: '/photos/000036.jpg',     scale: 1.14 },
  // J7QYW — tropical beach (light border → 1.08)
  { id: 'n60', ratio: 1.5078, src: '/photos/J7QYW.jpeg',          scale: 1.08 },
  // Loren Oakley — urban street / café (light border → 1.08)
  { id: 'n61', ratio: 0.6689, src: '/photos/Loren-Oakley-119.jpg', scale: 1.08 },
  { id: 'n62', ratio: 0.6689, src: '/photos/Loren-Oakley-122.jpg', scale: 1.08 },
  { id: 'n63', ratio: 1.4948, src: '/photos/Loren-Oakley-38.jpg',  scale: 1.08 },
  { id: 'n64', ratio: 0.6689, src: '/photos/Loren-Oakley-39.jpg',  scale: 1.08 },
  { id: 'n65', ratio: 1.4948, src: '/photos/Loren-Oakley-5.jpg',   scale: 1.08 },
  { id: 'n66', ratio: 1.4948, src: '/photos/Loren-Oakley-54.jpg',  scale: 1.08 },
  { id: 'n67', ratio: 0.6689, src: '/photos/Loren-Oakley-6.jpg',   scale: 1.08 },
  { id: 'n68', ratio: 1.4948, src: '/photos/Loren-Oakley-75.jpg',  scale: 1.08 },
  // R1-08143 — coastal / ocean (border → 1.10)
  { id: 'n69', ratio: 1.4928, src: '/photos/R1-08143-000A.JPG',  scale: 1.14 },
  { id: 'n70', ratio: 1.4928, src: '/photos/R1-08143-005A.JPG',  scale: 1.14 },
  { id: 'n71', ratio: 1.4928, src: '/photos/R1-08143-007A.JPG',  scale: 1.14 },
  { id: 'n72', ratio: 1.4928, src: '/photos/R1-08143-00XA.JPG',  scale: 1.14 },
  { id: 'n73', ratio: 0.6698, src: '/photos/R1-08143-013A.JPG',  scale: 1.14 },
  { id: 'n74', ratio: 1.4928, src: '/photos/R1-08143-014A.JPG',  scale: 1.14 },
  { id: 'n75', ratio: 1.4928, src: '/photos/R1-08143-019A.JPG',  scale: 1.14 },
  { id: 'n76', ratio: 1.4928, src: '/photos/R1-08143-020A.JPG',  scale: 1.14 },
  { id: 'n77', ratio: 1.4928, src: '/photos/R1-08143-024A.JPG',  scale: 1.14 },
  { id: 'n78', ratio: 1.4928, src: '/photos/R1-08143-026A.JPG',  scale: 1.14 },
  // R1-08144 — Brazil / Rio (border → 1.14)
  { id: 'n79', ratio: 0.7473, src: '/photos/R1-08144-003A.JPG',  scale: 1.14 },
  { id: 'n80', ratio: 1.4928, src: '/photos/R1-08144-004A.JPG',  scale: 1.14 },
  { id: 'n81', ratio: 0.7303, src: '/photos/R1-08144-005A.JPG',  scale: 1.14 },
  { id: 'n82', ratio: 1.4928, src: '/photos/R1-08144-00XA.JPG',  scale: 1.14 },
  { id: 'n83', ratio: 1.4928, src: '/photos/R1-08144-018A.JPG',  scale: 1.14 },
  { id: 'n84', ratio: 1.4928, src: '/photos/R1-08144-027A.JPG',  scale: 1.14 },
  { id: 'n85', ratio: 1.4928, src: '/photos/R1-08144-029A.JPG',  scale: 1.14 },
  { id: 'n86', ratio: 1.2444, src: '/photos/R1-08144-030A.JPG',  scale: 1.14 },
  { id: 'n87', ratio: 1.3152, src: '/photos/R1-08144-031A.JPG',  scale: 1.14 },
  { id: 'n88', ratio: 0.6698, src: '/photos/R1-08144-032A.JPG',  scale: 1.14 },
  { id: 'n89', ratio: 0.6698, src: '/photos/R1-08144-033A.JPG',  scale: 1.14 },
  // R1-08707 — Lisbon / cliff beaches / surf (border → 1.10)
  { id: 'n90', ratio: 0.6701, src: '/photos/R1-08707-0000-copy.JPG', scale: 1.14 },
  { id: 'n91', ratio: 1.4922, src: '/photos/R1-08707-0003.JPG',  scale: 1.14 },
  { id: 'n92', ratio: 0.6701, src: '/photos/R1-08707-0012.JPG',  scale: 1.14 },
  { id: 'n93', ratio: 1.4922, src: '/photos/R1-08707-0020.JPG',  scale: 1.14 },
  { id: 'n94', ratio: 0.6701, src: '/photos/R1-08707-0021.JPG',  scale: 1.14 },
  { id: 'n95', ratio: 0.6701, src: '/photos/R1-08707-0022.JPG',  scale: 1.14 },
  { id: 'n96', ratio: 1.4922, src: '/photos/R1-08707-0024.JPG',  scale: 1.14 },
  { id: 'n97', ratio: 1.4922, src: '/photos/R1-08707-0026.JPG',  scale: 1.14 },
  { id: 'n98', ratio: 1.4922, src: '/photos/R1-08707-0029.JPG',  scale: 1.14 },
  { id: 'n99', ratio: 0.6701, src: '/photos/R1-08707-0030.JPG',  scale: 1.14 },
  { id: 'n100', ratio: 1.4922, src: '/photos/R1-08707-0032.JPG', scale: 1.14 },
  { id: 'n101', ratio: 0.6701, src: '/photos/R1-08707-0034.JPG', scale: 1.14 },
  { id: 'n102', ratio: 1.4922, src: '/photos/R1-08707-0035.JPG', scale: 1.14 },
  // Lanzarote terrace — F3 featured big photo
  { id: 'n103', ratio: 1.4914, src: '/photos/mm-106.jpg', scale: 1.14 },
  // n104 (mm-106-beach.jpg) removed — same content as m100 (Mathieu-Mestre-106.jpg)

  // ── Mathieu Mestre personal archive (m-series) ───────────────────────────
  // Standard L=1.4914, standard P=0.6704. Thick borders → scale 1.15; no-border noted.
  { id: 'm01', ratio: 0.6704, src: '/photos/Mathieu-Mestre-3.jpg',    scale: 1.12 },
  { id: 'm02', ratio: 1.4914, src: '/photos/Mathieu-Mestre-4.jpg',    scale: 1.12 },
  { id: 'm03', ratio: 1.4914, src: '/photos/Mathieu-Mestre-5.jpg',    scale: 1.12 },
  { id: 'm04', ratio: 1.4914, src: '/photos/Mathieu-Mestre-7.jpg',    scale: 1.12 },
  { id: 'm05', ratio: 1.4914, src: '/photos/Mathieu-Mestre-8.jpg',    scale: 1.12 },
  { id: 'm06', ratio: 0.6704, src: '/photos/Mathieu-Mestre-19-2.jpg', scale: 1.12 },
  { id: 'm07', ratio: 1.4914, src: '/photos/Mathieu-Mestre-23.jpg',   scale: 1.12 },
  { id: 'm08', ratio: 1.4914, src: '/photos/Mathieu-Mestre-27.jpg',   scale: 1.12 },
  { id: 'm09', ratio: 0.6704, src: '/photos/Mathieu-Mestre-29.jpg',   scale: 1.12 },
  { id: 'm10', ratio: 1.4914, src: '/photos/Mathieu-Mestre-31.jpg',   scale: 1.12 },
  { id: 'm11', ratio: 1.4914, src: '/photos/Mathieu-Mestre-35.jpg',   scale: 1.12 },
  { id: 'm12', ratio: 1.4914, src: '/photos/Mathieu-Mestre-37.jpg',   scale: 1.12 },
  { id: 'm13', ratio: 0.6704, src: '/photos/Mathieu-Mestre-38.jpg',   scale: 1.12 },
  { id: 'm14', ratio: 0.6704, src: '/photos/Mathieu-Mestre-39.jpg',   scale: 1.12 },
  { id: 'm15', ratio: 1.4914, src: '/photos/Mathieu-Mestre-40.jpg',   scale: 1.12 },
  { id: 'm16', ratio: 1.4914, src: '/photos/Mathieu-Mestre-41.jpg',   scale: 1.12 },
  { id: 'm17', ratio: 1.4914, src: '/photos/Mathieu-Mestre-42.jpg',   scale: 1.12 },
  { id: 'm18', ratio: 1.4914, src: '/photos/Mathieu-Mestre-43.jpg',   scale: 1.12 },
  { id: 'm19', ratio: 0.6704, src: '/photos/Mathieu-Mestre-44.jpg',   scale: 1.12 },
  { id: 'm20', ratio: 1.4914, src: '/photos/Mathieu-Mestre-45.jpg',   scale: 1.12 },
  { id: 'm21', ratio: 0.6704, src: '/photos/Mathieu-Mestre-46.jpg',   scale: 1.12 },
  { id: 'm22', ratio: 0.6704, src: '/photos/Mathieu-Mestre-47.jpg',   scale: 1.12 },
  { id: 'm23', ratio: 1.4914, src: '/photos/Mathieu-Mestre-52.jpg',   scale: 1.12 },
  { id: 'm24', ratio: 0.6704, src: '/photos/Mathieu-Mestre-53-2.jpg', scale: 1.12 },
  { id: 'm25', ratio: 0.6704, src: '/photos/Mathieu-Mestre-54.jpg',   scale: 1.12 },
  { id: 'm26', ratio: 0.6704, src: '/photos/Mathieu-Mestre-56.jpg',   scale: 1.12 },
  { id: 'm27', ratio: 0.9860, src: '/photos/Mathieu-Mestre-60.jpg',    scale: 1.12 },
  { id: 'm28', ratio: 0.6704, src: '/photos/Mathieu-Mestre-61.jpg',   scale: 1.12 },
  { id: 'm29', ratio: 1.4914, src: '/photos/Mathieu-Mestre-64.jpg',   scale: 1.12 },
  { id: 'm30', ratio: 1.4914, src: '/photos/Mathieu-Mestre-66.jpg',   scale: 1.12 },
  { id: 'm31', ratio: 0.6704, src: '/photos/Mathieu-Mestre-68.jpg',   scale: 1.12 },
  { id: 'm32', ratio: 0.6704, src: '/photos/Mathieu-Mestre-69.jpg',   scale: 1.12 },
  { id: 'm33', ratio: 0.6704, src: '/photos/Mathieu-Mestre-70.jpg',   scale: 1.12 },
  { id: 'm34', ratio: 1.4914, src: '/photos/Mathieu-Mestre-72.jpg',   scale: 1.12 },
  { id: 'm35', ratio: 1.4499, src: '/photos/Mathieu-Mestre-74.jpg',    scale: 1.12 },
  { id: 'm36', ratio: 1.4914, src: '/photos/Mathieu-Mestre-78.jpg',   scale: 1.12 },
  { id: 'm37', ratio: 0.9918, src: '/photos/Mathieu-Mestre-81.jpg' },
  { id: 'm38', ratio: 0.6704, src: '/photos/Mathieu-Mestre-91.jpg',   scale: 1.12 },
  { id: 'm39', ratio: 1.2225, src: '/photos/Mathieu-Mestre-92.jpg' },
  { id: 'm40', ratio: 1.4914, src: '/photos/Mathieu-Mestre-96.jpg',   scale: 1.12 },
  { id: 'm41', ratio: 1.4914, src: '/photos/Mathieu-Mestre-98.jpg',   scale: 1.12 },
  { id: 'm42', ratio: 0.6704, src: '/photos/Mathieu-Mestre-102.jpg',  scale: 1.12 },
  { id: 'm43', ratio: 0.6704, src: '/photos/Mathieu-Mestre-105.jpg',  scale: 1.12 },
  { id: 'm44', ratio: 1.4914, src: '/photos/Mathieu-Mestre-107.jpg',  scale: 1.12 },
  { id: 'm45', ratio: 0.6704, src: '/photos/Mathieu-Mestre-109.jpg',  scale: 1.12 },
  { id: 'm46', ratio: 1.4914, src: '/photos/Mathieu-Mestre-110.jpg',  scale: 1.12 },
  { id: 'm47', ratio: 0.9824, src: '/photos/Mathieu-Mestre-111.jpg',  scale: 1.12 },
  { id: 'm48', ratio: 1.4914, src: '/photos/Mathieu-Mestre-115.jpg',  scale: 1.12 },
  { id: 'm49', ratio: 0.6704, src: '/photos/Mathieu-Mestre-116.jpg',  scale: 1.12 },
  { id: 'm50', ratio: 0.6704, src: '/photos/Mathieu-Mestre-117.jpg',  scale: 1.12 },
  { id: 'm51', ratio: 0.6704, src: '/photos/Mathieu-Mestre-119.jpg',  scale: 1.12 },
  { id: 'm52', ratio: 1.4914, src: '/photos/Mathieu-Mestre-121.jpg',  scale: 1.12 },
  { id: 'm53', ratio: 1.4914, src: '/photos/Mathieu-Mestre-126.jpg',  scale: 1.12 },
  { id: 'm54', ratio: 0.6704, src: '/photos/Mathieu-Mestre-130.jpg',  scale: 1.12 },
  { id: 'm55', ratio: 0.6704, src: '/photos/Mathieu-Mestre-135.jpg',  scale: 1.12 },
  { id: 'm56', ratio: 1.4914, src: '/photos/Mathieu-Mestre-136.jpg',  scale: 1.12 },
  { id: 'm57', ratio: 0.6704, src: '/photos/Mathieu-Mestre-139.jpg',  scale: 1.12 },
  { id: 'm58', ratio: 0.6704, src: '/photos/Mathieu-Mestre-140.jpg',  scale: 1.12 },
  { id: 'm59', ratio: 1.4914, src: '/photos/Mathieu-Mestre-141.jpg',  scale: 1.12 },
  { id: 'm60', ratio: 0.6704, src: '/photos/Mathieu-Mestre-142.jpg',  scale: 1.12 },
  { id: 'm61', ratio: 0.6704, src: '/photos/Mathieu-Mestre-144.jpg',  scale: 1.12 },
  { id: 'm62', ratio: 1.0104, src: '/photos/Mathieu-Mestre-148.jpg' },
  { id: 'm63', ratio: 1.2103, src: '/photos/Mathieu-Mestre-149.jpg' },
  { id: 'm64', ratio: 0.6704, src: '/photos/Mathieu-Mestre-182.jpg',  scale: 1.12 },
  { id: 'm65', ratio: 1.4914, src: '/photos/Mathieu-Mestre-184.jpg',  scale: 1.12 },
  { id: 'm66', ratio: 1.0797, src: '/photos/Mathieu-Mestre-185.jpg' },
  { id: 'm67', ratio: 0.7542, src: '/photos/Mathieu-Mestre-186.jpg',    scale: 1.12 },
  { id: 'm68', ratio: 0.6704, src: '/photos/Mathieu-Mestre-189.jpg',  scale: 1.12 },
  { id: 'm69', ratio: 0.6704, src: '/photos/Mathieu-Mestre-190.jpg',  scale: 1.12 },
  { id: 'm70', ratio: 0.6704, src: '/photos/Mathieu-Mestre-191.jpg',  scale: 1.12 },
  { id: 'm71', ratio: 0.6704, src: '/photos/Mathieu-Mestre-192.jpg',  scale: 1.12 },
  { id: 'm72', ratio: 0.6704, src: '/photos/Mathieu-Mestre-197.jpg',  scale: 1.12 },
  { id: 'm73', ratio: 0.6704, src: '/photos/Mathieu-Mestre-198.jpg',  scale: 1.12 },
  { id: 'm74', ratio: 0.6704, src: '/photos/Mathieu-Mestre-200.jpg',  scale: 1.12 },
  { id: 'm75', ratio: 0.6704, src: '/photos/Mathieu-Mestre-202.jpg',  scale: 1.12 },
  { id: 'm76', ratio: 0.6704, src: '/photos/Mathieu-Mestre-203.jpg',  scale: 1.12 },
  { id: 'm77', ratio: 0.6704, src: '/photos/Mathieu-Mestre-206.jpg',  scale: 1.12 },
  { id: 'm78', ratio: 0.6704, src: '/photos/Mathieu-Mestre-207.jpg',  scale: 1.12 },
  { id: 'm79', ratio: 0.6704, src: '/photos/Mathieu-Mestre-208.jpg',  scale: 1.12 },
  { id: 'm80', ratio: 1.3323, src: '/photos/Mathieu-Mestre-210.jpg' },
  { id: 'm81', ratio: 0.6704, src: '/photos/Mathieu-Mestre-211.jpg',  scale: 1.12 },
  { id: 'm82', ratio: 0.6704, src: '/photos/Mathieu-Mestre-214.jpg',  scale: 1.12 },

  // ── New 000xxx rolls ──────────────────────────────────────────────────────
  // Ratios ~1.508/0.663 (3130×2075 or 2075×3130). Clean scans — no scale.
  { id: 'n105', ratio: 1.5084, src: '/photos/000033740001.jpg' },
  { id: 'n106', ratio: 1.5084, src: '/photos/000033740007.jpg' },
  { id: 'n107', ratio: 0.6629, src: '/photos/000033740017.jpg' },
  { id: 'n108', ratio: 1.5084, src: '/photos/000033750020.jpg' },
  { id: 'n109', ratio: 1.5084, src: '/photos/000034760017.jpg' },
  { id: 'n110', ratio: 1.5084, src: '/photos/000034760019.jpg' },
  { id: 'n111', ratio: 1.5079, src: '/photos/000069810011.jpg' },

  // ── A-series R1 rolls (2433×3601, Paris + tropical) ─────────────────────
  { id: 'n112', ratio: 0.6756, src: '/photos/A912250-R1-16-20.JPG' },
  { id: 'n113', ratio: 0.6756, src: '/photos/A914253-R1-25-11A.JPG' },
  { id: 'n114', ratio: 0.6756, src: '/photos/A914253-R1-30-6A.JPG' },
  { id: 'n115', ratio: 0.6756, src: '/photos/A914253-R1-32-4A.JPG' },

  // ── R1 short series (1818×1228 or 1228×1818) ─────────────────────────────
  { id: 'n116', ratio: 1.4805, src: '/photos/R1-18.JPG' },
  { id: 'n117', ratio: 1.4805, src: '/photos/R1-20.JPG' },
  { id: 'n118', ratio: 1.4805, src: '/photos/R1-21.JPG' },
  { id: 'n119', ratio: 0.6755, src: '/photos/R1-21A.JPG' },
  { id: 'n120', ratio: 0.6755, src: '/photos/R1-23.JPG' },
  { id: 'n121', ratio: 0.6755, src: '/photos/R1-24A.JPG' },
  { id: 'n122', ratio: 1.4805, src: '/photos/R1-32A.JPG' },
  { id: 'n123', ratio: 0.7638, src: '/photos/R1-4A.JPG' },

  // ── New Loren Oakley (light border → 1.08) ───────────────────────────────
  { id: 'n124', ratio: 0.6705, src: '/photos/Loren-Oakley-1.jpg',    scale: 1.08 },
  { id: 'n125', ratio: 1.4914, src: '/photos/Loren-Oakley-20.jpg',   scale: 1.08 },
  { id: 'n126', ratio: 1.4914, src: '/photos/Loren-Oakley-28-2.jpg', scale: 1.08 },
  { id: 'n127', ratio: 0.6705, src: '/photos/Loren-Oakley-28.jpg',   scale: 1.08 },
  { id: 'n128', ratio: 0.6705, src: '/photos/Loren-Oakley-7.jpg',    scale: 1.08 },
  { id: 'n129', ratio: 0.6705, src: '/photos/Loren-Oakley-9.jpg',    scale: 1.08 },

  // ── New Mathieu Mestre archive (border → 1.12) ────────────────────────────
  { id: 'm83', ratio: 0.6705, src: '/photos/Mathieu-Mestre-1.jpg',   scale: 1.12 },
  { id: 'm84', ratio: 1.4914, src: '/photos/Mathieu-Mestre-6.jpg',   scale: 1.12 },
  { id: 'm85', ratio: 0.6705, src: '/photos/Mathieu-Mestre-12.jpg',  scale: 1.12 },
  { id: 'm86', ratio: 0.6705, src: '/photos/Mathieu-Mestre-13.jpg',  scale: 1.12 },
  { id: 'm87', ratio: 0.6705, src: '/photos/Mathieu-Mestre-15.jpg',  scale: 1.12 },
  { id: 'm88', ratio: 0.6705, src: '/photos/Mathieu-Mestre-25.jpg',  scale: 1.12 },
  { id: 'm89', ratio: 1.4914, src: '/photos/Mathieu-Mestre-2.jpg',   scale: 1.12 },
  { id: 'm90', ratio: 1.4914, src: '/photos/Mathieu-Mestre-14.jpg',  scale: 1.12 },
  { id: 'm91', ratio: 0.6705, src: '/photos/Mathieu-Mestre-32.jpg',  scale: 1.12 },
  { id: 'm92', ratio: 1.4914, src: '/photos/Mathieu-Mestre-57.jpg',  scale: 1.12 },
  { id: 'm93', ratio: 1.4914, src: '/photos/Mathieu-Mestre-63.jpg',  scale: 1.12 },
  { id: 'm94', ratio: 0.6705, src: '/photos/Mathieu-Mestre-71.jpg',  scale: 1.12 },
  { id: 'm95', ratio: 1.4914, src: '/photos/Mathieu-Mestre-73.jpg',  scale: 1.12 },
  { id: 'm96', ratio: 0.6705, src: '/photos/Mathieu-Mestre-95.jpg',  scale: 1.12 },
  { id: 'm97', ratio: 0.6705, src: '/photos/Mathieu-Mestre-97.jpg',  scale: 1.12 },
  { id: 'm98', ratio: 1.4914, src: '/photos/Mathieu-Mestre-100.jpg', scale: 1.12 },
  { id: 'm99', ratio: 1.4914, src: '/photos/Mathieu-Mestre-104.jpg', scale: 1.12 },
  { id: 'm100', ratio: 0.6705, src: '/photos/Mathieu-Mestre-106.jpg', scale: 1.12 },
  { id: 'm101', ratio: 1.4914, src: '/photos/Mathieu-Mestre-112.jpg', scale: 1.12 },
  { id: 'm102', ratio: 1.4914, src: '/photos/Mathieu-Mestre-193.jpg', scale: 1.12 },
  { id: 'm103', ratio: 0.6705, src: '/photos/Mathieu-Mestre-213.jpg', scale: 1.12 },

  // ── Previously filtered batch (comma-prefix, Copie de, Matthieu typo, copy variants) ──
  // lf-series — loose frames from various rolls (ratio 1.5 / 0.6667, clean scans)
  { id: 'lf01', ratio: 0.6667, src: '/photos/lf-07.jpg' },
  { id: 'lf02', ratio: 1.5000, src: '/photos/lf-11.jpg' },
  { id: 'lf03', ratio: 1.5000, src: '/photos/lf-21.jpg' },
  { id: 'lf04', ratio: 1.5000, src: '/photos/lf-22.jpg' },
  { id: 'lf05', ratio: 0.7192, src: '/photos/lf-26.jpg' },
  { id: 'lf06', ratio: 1.5000, src: '/photos/lf-26b.jpg' },
  { id: 'lf07', ratio: 0.6667, src: '/photos/lf-31.jpg' },

  // Extended Mathieu-Mestre archive (border → 1.12)
  { id: 'm104', ratio: 0.6705, src: '/photos/Mathieu-Mestre-26.jpg',    scale: 1.12 },
  { id: 'm105', ratio: 0.6705, src: '/photos/Mathieu-Mestre-189b.jpg',  scale: 1.12 },
  { id: 'm106', ratio: 0.6705, src: '/photos/Mathieu-Mestre-200b.jpg',  scale: 1.12 },
  { id: 'm107', ratio: 1.4914, src: '/photos/Mathieu-Mestre-253.jpg',   scale: 1.12 },
  { id: 'm108', ratio: 0.8109, src: '/photos/Mathieu-Mestre-42b.jpg',   scale: 1.12 },
  { id: 'm109', ratio: 0.7229, src: '/photos/Mathieu-Mestre-49.jpg',    scale: 1.12 },
  { id: 'm110', ratio: 0.6705, src: '/photos/Mathieu-Mestre-7b.jpg',    scale: 1.12 },
  { id: 'm111', ratio: 1.4914, src: '/photos/Mathieu-Mestre-7c.jpg',    scale: 1.12 },
  { id: 'm112', ratio: 0.6705, src: '/photos/Mathieu-Mestre-2b.jpg',    scale: 1.12 },
  { id: 'm113', ratio: 0.6705, src: '/photos/Mathieu-Mestre-4b.jpg',    scale: 1.12 },
  { id: 'm114', ratio: 0.6705, src: '/photos/Mathieu-Mestre-4c.jpg',    scale: 1.12 },
  { id: 'm115', ratio: 0.6705, src: '/photos/Mathieu-Mestre-5b.jpg',    scale: 1.12 },
  { id: 'm116', ratio: 0.6705, src: '/photos/Mathieu-Mestre-14b.jpg',   scale: 1.12 },
  { id: 'm117', ratio: 0.6705, src: '/photos/Mathieu-Mestre-15b.jpg',   scale: 1.12 },
  { id: 'm118', ratio: 0.6705, src: '/photos/Mathieu-Mestre-23b.jpg',   scale: 1.12 },
  { id: 'm119', ratio: 0.6705, src: '/photos/Mathieu-Mestre-29b.jpg',   scale: 1.12 },
  { id: 'm120', ratio: 0.6705, src: '/photos/Mathieu-Mestre-31b.jpg',   scale: 1.12 },
  { id: 'm121', ratio: 0.6705, src: '/photos/Mathieu-Mestre-32b.jpg',   scale: 1.12 },
  { id: 'm122', ratio: 1.4914, src: '/photos/Mathieu-Mestre-39b.jpg',   scale: 1.12 },
  { id: 'm123', ratio: 1.4914, src: '/photos/Mathieu-Mestre-40b.jpg',   scale: 1.12 },
  { id: 'm124', ratio: 0.6705, src: '/photos/Mathieu-Mestre-41b.jpg',   scale: 1.12 },
  { id: 'm125', ratio: 0.6705, src: '/photos/Mathieu-Mestre-43b.jpg',   scale: 1.12 },
  { id: 'm126', ratio: 0.6705, src: '/photos/Mathieu-Mestre-44b.jpg',   scale: 1.12 },
  { id: 'm127', ratio: 0.6705, src: '/photos/Mathieu-Mestre-47b.jpg',   scale: 1.12 },
  { id: 'm128', ratio: 1.4914, src: '/photos/Mathieu-Mestre-47c.jpg',   scale: 1.12 },
  { id: 'm129', ratio: 0.6705, src: '/photos/Mathieu-Mestre-52b.jpg',   scale: 1.12 },
  { id: 'm130', ratio: 0.6705, src: '/photos/Mathieu-Mestre-56b.jpg',   scale: 1.12 },
  { id: 'm131', ratio: 1.4914, src: '/photos/Mathieu-Mestre-56c.jpg',   scale: 1.12 },
  { id: 'm132', ratio: 1.4914, src: '/photos/Mathieu-Mestre-61b.jpg',   scale: 1.12 },
  { id: 'm133', ratio: 0.6705, src: '/photos/Mathieu-Mestre-61c.jpg',   scale: 1.12 },
  { id: 'm134', ratio: 1.4914, src: '/photos/Mathieu-Mestre-61d.jpg',   scale: 1.12 },
  { id: 'm135', ratio: 1.6420, src: '/photos/Mathieu-Mestre-64b.jpg' },
  { id: 'm136', ratio: 0.6705, src: '/photos/Mathieu-Mestre-68b.jpg',   scale: 1.12 },
  { id: 'm137', ratio: 1.4914, src: '/photos/Mathieu-Mestre-130b.jpg',  scale: 1.12 },
  { id: 'm138', ratio: 0.6705, src: '/photos/Mathieu-Mestre-136b.jpg',  scale: 1.12 },
  { id: 'm139', ratio: 0.6705, src: '/photos/Mathieu-Mestre-185b.jpg',  scale: 1.12 },
  { id: 'm140', ratio: 1.4914, src: '/photos/Mathieu-Mestre-198b.jpg',  scale: 1.12 },

  // Loren-Oakley extended (light border → 1.08)
  { id: 'n130', ratio: 1.4914, src: '/photos/Loren-Oakley-6b.jpg',      scale: 1.08 },
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
// ── Shortest-column masonry — rebuilt from scratch ───────────────────────────
// All 252 photos placed using the shortest-column algorithm: each photo goes into
// whichever column currently has the least content. This eliminates all gap issues
// caused by cursor-sync in the old segment approach.
// Row span = Math.round(colWidth / ratio) + GAP (gap baked in, image fills span-GAP).
// Featured photos (2-col) placed dynamically at ~¼, ½, ¾ of the total run.
//
// ── Photo column assignments ──────────────────────────────────────────────────
// Groups interleaved for diversity, then assigned to columns by shortest-first
// so all three columns end at approximately the same height (flush last row).
// PhotoTile uses CSS aspectRatio so photos display at their exact natural ratio.
function interleave(...gs: Photo[][]): Photo[] {
  const out: Photo[] = []
  const max = Math.max(...gs.map(g => g.length))
  for (let i = 0; i < max; i++) for (const g of gs) if (i < g.length) out.push(g[i])
  return out
}

// 8 thematic groups — L/P alternated within each group to prevent orientation clusters.
// Interleave order: BRAZIL → LANZAROT → DUNES → PORTUGAL → SICILY → COASTAL → MOROCCO → BW
// (separates similar vibes; first three give L/P/L first row).
const GP_BRAZIL   = pick(_pm, ['p02','p04','p03','p05','p06','p08','p07','p10','p09',
  'p11','p12','p13','p15','p14','p16','p17','p21','p18','p37',
  'p19','p39','p20','p45','p34','p01','p47','p35','p49','p36','p53',
  'p38','p58','p40','p61','p41','p62','p42','p43','p44','p46',
  'p48','p50','p51','p54','p55','p56','p57','p59','p60','p63'])
const GP_PORTUGAL = pick(_pm, ['p22','p24','p23','p27','p25','p30','p26','p28','n119',
  'p29','p31','p32','p33','p52',
  'm104','m105','m106','m108','m116','m117','m122','m137',
  'lf03'])
const GP_SICILY   = pick(_pm, ['n01','n03','n02','n04','n05','n06','n07','n08','n10','n14','n16','m123'])
const GP_BW       = pick(_pm, ['n11','n13','n19','n17','n29','n22','n57','n55','n59'])
const GP_DUNES    = pick(_pm, ['n12','n09','n15','n21','n18','n23','n20','n25','n24','n26',
  'n28','n27','n36','n30','n37','n31','n38','n32','n42','n33',
  'n43','n34','n44','n35','n46','n39','n47','n40','n50','n41',
  'n52','n45','n53','n48','n54','n49','n58','n51','n60','n56',
  'n105','n107','n106','n108','n109','n110','n111',
  'm107','m109','m111','m122','m126','m128','m131','lf01','lf06'])
const GP_COASTAL  = pick(_pm, ['n63','n61','n65','n62','n66','n64','n68','n67','n69','n73',
  'n70','n79','n71','n81','n72','n88','n74','n89','n75','n90',
  'n76','n92','n77','n94','n78','n95','n80','n99','n82','n101',
  'n83','n84','n112','n85','n113','n86','n114','n87','n115',
  'n91','n120','n93','n121','n96','n123','n97','n124','n98','n127',
  'n100','n128','n102','n129','n103','n116','n117','n118','n122','n125','n126',
  'm112','m124','m125','m127','m132','m134','m140','n130','lf02','lf04','lf05','lf07'])
const GP_MOROCCO  = pick(_pm, ['m06','m08','m09','m10','m13','m12','m14','m20','m19','m23',
  'm25','m29','m26','m30','m28','m34','m31','m35','m32','m36',
  'm33','m39','m37','m41','m38','m84','m42','m43','m83','m85',
  'm86','m87','m88',
  'm110','m113','m114','m115','m118','m119','m120','m121','m129','m130','m136'])
const GP_LANZAROT = pick(_pm, ['m01','m02','m21','m03','m22','m04','m24','m05','m27','m07',
  'm45','m11','m47','m15','m49','m16','m50','m17','m51','m18',
  'm54','m40','m55','m44','m57','m46','m58','m48','m60','m52',
  'm61','m53','m64','m56','m67','m59','m68','m62','m69','m63',
  'm70','m65','m71','m66','m72','m80','m73','m89','m74','m90',
  'm75','m92','m76','m93','m77','m95','m78','m98','m79','m99',
  'm81','m101','m82','m102','m91','m94','m96','m97','m100','m103',
  'm132','m133','m135','m137','m138','m139'])

// All photos in diversity order.
// COASTAL moved to pos 7 (was pos 5) so DUNES(2) and COASTAL(7) are 5 apart —
// seascape photos can no longer land in adjacent columns at the same visual height.
const _allPhotos = interleave(GP_BRAZIL, GP_LANZAROT, GP_DUNES, GP_PORTUGAL,
                               GP_SICILY, GP_MOROCCO, GP_BW, GP_COASTAL)

// One tag per photo. GP_DUNES and GP_COASTAL both contain ocean/beach shots
// so they share the 'seascape' tag — the penalty fires between them too.
const _tag: Record<string, string> = {}
const _tagGroup = (g: Photo[], t: string) => g.forEach(p => { _tag[p.id] = t })
_tagGroup(GP_BRAZIL,   'beach')
_tagGroup(GP_LANZAROT, 'lanzarot')
_tagGroup(GP_DUNES,    'seascape')
_tagGroup(GP_PORTUGAL, 'portugal')
_tagGroup(GP_SICILY,   'urban')
_tagGroup(GP_COASTAL,  'seascape')
_tagGroup(GP_MOROCCO,  'morocco')
_tagGroup(GP_BW,       'bw')

// Per-column history window. ~2.7 photos per column per interleave round,
// so 5 slots covers ~1.8 rounds — enough to catch same-tag photos 8 apart.
const COL_HISTORY    = 5
// Global recency window: covers one full 8-group round + 1.
const GLOBAL_WIN     = 9
const CROSS_COL_PENALTY = 1.0   // soft nudge for cross-column visual proximity

// startTags seeds each column's history from its final pin tag.
function assignByHeight(
  photos: Photo[],
  startHeights: number[] = [0, 0, 0],
  startTags: (string | undefined)[] = [undefined, undefined, undefined],
): [Photo[], Photo[], Photo[]] {
  const cols: [Photo[], Photo[], Photo[]] = [[], [], []]
  const h = [...startHeights]
  const colHistory: (string | undefined)[][] = startTags.map(t => [t])
  const recentGlobal: (string | undefined)[] = []

  for (const p of photos) {
    const tag = _tag[p.id]

    // Hard constraint: if this tag appears in a column's recent history,
    // that column is completely off-limits (Infinity) — no height difference
    // can override it. Falls back to soft penalty only when all 3 columns
    // are blocked (unavoidable with very small groups).
    const blocked = tag
      ? colHistory.map(hist => hist.includes(tag))
      : [false, false, false]
    const allBlocked = blocked.every(Boolean)

    const eff = h.map((hi, i) => {
      if (!allBlocked && blocked[i]) return Infinity
      const crossP = (tag && recentGlobal.includes(tag)) ? CROSS_COL_PENALTY : 0
      return hi + crossP
    })

    let ci = 0
    if (eff[1] < eff[ci]) ci = 1
    if (eff[2] < eff[ci]) ci = 2

    cols[ci].push(p)
    h[ci] += 1 / (p.displayRatio ?? p.ratio)
    colHistory[ci].push(tag)
    if (colHistory[ci].length > COL_HISTORY) colHistory[ci].shift()
    recentGlobal.push(tag)
    if (recentGlobal.length > GLOBAL_WIN) recentGlobal.shift()
  }
  return cols
}

// Photos pinned to the top of each column in the default view.
const C0_PINS = pick(_pm, ['m101'])
const C1_PINS = pick(_pm, ['n89',  'n81'])
const C2_PINS = pick(_pm, ['p14',  'n17'])
const _pinIds = new Set(['m101', 'n89', 'n81', 'p14', 'n17'])
const _pinH   = (pins: Photo[]) => pins.reduce((h, p) => h + 1 / (p.displayRatio ?? p.ratio), 0)
const _lastPinTag = (pins: Photo[]) => _tag[pins[pins.length - 1]?.id]
const [REST_C0, REST_C1, REST_C2] = assignByHeight(
  _allPhotos.filter(p => !_pinIds.has(p.id)),
  [_pinH(C0_PINS), _pinH(C1_PINS), _pinH(C2_PINS)],
  [_lastPinTag(C0_PINS), _lastPinTag(C1_PINS), _lastPinTag(C2_PINS)],
)
const PHOTOS_C0 = [...C0_PINS, ...REST_C0]
const PHOTOS_C1 = [...C1_PINS, ...REST_C1]
const PHOTOS_C2 = [...C2_PINS, ...REST_C2]

// Inspirations grid columns (unchanged)
const INSP_C0 = pick(_im, ['i-23d3b899','i-a0110c59','i-b8ada175','i-daad0cf3','i-3e0e5b89','i-c94f104a','i-a139e400','i-7df10804','i-0f74bab2','i-4a07538f','i-15a67397','i-5dc234be','i-9796963c','i-ef5a06aa','i-3a1ab08d','i-42c6a912','i-a9232bb8','i-eb6db00f','i-67d4cecb','i-8618f269','i-5040ee6b','i-47c1fb1f','i-3372b50e','i-6dced705','i-31bdde48','i-6d9e679b','i-20aeb916','i-88451454','i-c4290c3e','i-bcf59f0c','i-ffa6224c','i-cef9374f','i-a10c1f14','i-a15bb450','i-9b72d85f','i-813d4f14','i-8363a93c','i-a52f90d5','i-6773e3f1','i-11d3a502','i-9c9793ce','i-a2814262','i-7377ed38','i-2ca715f0','i-1dbc0808'])
const INSP_C1 = pick(_im, ['i-08a8fb3c','i-44a29719','i-adb52e73','i-7c4eb8b5','i-834e1e35','i-4f256aae','i-a68e3342','i-eb0d6f2d','i-1d430978','i-e5577c14','i-a3ddd1dc','i-b819c443','i-0dc15efe','i-63fbc624','i-61d609d9','i-7f0fd34e','i-d078c37b','i-c26be60c','i-5350df9b','i-36ea6305','i-7efb4f5e','i-65bd6de1','i-e78d797e','i-9de43a48','i-cf8aef5a','i-fc9d2b7e','i-9d32f8a5','i-b5e44651','i-8a5ab776','i-e5376e27','i-5a007a4c','i-2cbf09fa','i-4a50670b','i-ec1ee0c7','i-95048160','i-a0e5751c','i-d3405709','i-00028592','i-c2b1c781','i-39af9563','i-36091bd2','i-20a3ac77','i-b95e6dce','i-d3ed4d9f','i-4453533a'])
const INSP_C2 = pick(_im, ['i-fd65770f','i-54d4d27f','i-b29e2baa','i-e4d86a35','i-e84b1870','i-497de80d','i-b8cdd956','i-4a1feaf1','i-ea8d7942','i-b38dd289','i-42b42a89','i-bc7c9384','i-0fe00c5b','i-692dea80','i-3704d673','i-d9fbcb21','i-782d3a82','i-96dd0151','i-6dbb8115','i-0c8b31a0','i-3abd23f0','i-37c27a0b','i-baced945','i-afb0f378','i-0bd146ef','i-4f62bce0','i-3bb4dcbc','i-70fa1a7e','i-749d1f96','i-c5e25cdb','i-262ee033','i-faa67c13','i-739becfb','i-f64611b2','i-9dc84ecd','i-557e0f48','i-e47a7706','i-c4d0a9fb','i-f3da9619','i-7046cfaf','i-a996a516','i-18cfd324','i-c059de0f','i-4e0d754a','i-3d845413'])




const CARD_KEYFRAME = `@keyframes photo-rise { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:translateY(0) } }`

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
    ? (photosCols ?? [PHOTOS_C0, PHOTOS_C1, PHOTOS_C2])
    : (inspCols ?? [INSP_C0, INSP_C1, INSP_C2])
  const nonce = tab === 'photos' ? photosNonce : inspNonce

  const handleShuffle = () => {
    // Step 1 — bump pulse immediately so the wrapper dips (opacity 0.6 → 1,
    // scale 0.995 → 1) on the CURRENT grid before the new one arrives.
    setPulse(p => p + 1)

    // Step 2 — defer the grid update to the next frame so the pulse render
    // commits first. Both tabs use the same pattern so the animation is
    // identical: pulse on old grid → tiles stagger into new grid.
    requestAnimationFrame(() => {
      if (tab === 'photos') {
        // O(n) shuffle — fast enough to run inline without startTransition.
        const arr = [...PHOTOS]
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]]
        }
        // Break consecutive same-orientation runs (light diversification pass).
        const isL = (p: Photo) => (p.displayRatio ?? p.ratio) > 1.05
        for (let i = 1; i < arr.length; i++) {
          if (isL(arr[i]) === isL(arr[i - 1])) {
            for (let j = i + 1; j < Math.min(i + 12, arr.length); j++) {
              if (isL(arr[j]) !== isL(arr[i - 1])) {
                ;[arr[i], arr[j]] = [arr[j], arr[i]]
                break
              }
            }
          }
        }
        // Pack into columns by height.
        const cols: Photo[][] = [[], [], []]
        const heights = [0, 0, 0]
        for (const p of arr) {
          let ci = 0
          if (heights[1] < heights[ci]) ci = 1
          if (heights[2] < heights[ci]) ci = 2
          cols[ci].push(p)
          heights[ci] += 1 / (p.displayRatio ?? p.ratio)
        }
        // Guarantee at least one portrait in the first row.
        const isP = (p: Photo) => (p.displayRatio ?? p.ratio) <= 1.05
        if (!cols.some(c => c.length > 0 && isP(c[0]))) {
          for (const col of cols) {
            const pi = col.findIndex(isP)
            if (pi > 0) { [col[0], col[pi]] = [col[pi], col[0]]; break }
          }
        }
        startTransition(() => {
          setPhotosCols(cols)
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
                  {col.map((p: Photo, ri: number) => {
                    // CSS @keyframes instead of motion.div: the animation runs
                    // on the GPU compositor so it never competes with Framer
                    // Motion's JS loop driving the pulse wrapper.
                    const delay = nonce === 0 ? 0 : Math.min(0.7, ri * 0.035 + ci * 0.06)
                    return (
                      <div
                        key={`${nonce}-${p.id}`}
                        style={nonce > 0 ? {
                          animation: `photo-rise 1.75s ${delay}s both cubic-bezier(0.16,1,0.3,1)`,
                        } : undefined}
                      >
                        <PhotoTile src={p.src} ratio={p.ratio} displayRatio={p.displayRatio} scale={p.scale} />
                      </div>
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
