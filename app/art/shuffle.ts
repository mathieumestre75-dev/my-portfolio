// Client-side shuffle for the Art page grids.
// Distributes a flat pool of photos into 3 masonry columns while diversifying
// adjacent items on category, dominant color, and orientation.

type ShufflePhoto = {
  id: string
  ratio: number
  src?: string
  displayRatio?: number
}

type Meta = {
  cat?: string
  pal: string[]
}

const COL_WIDTH = 480
const GAP = 10

const hexToRgb = (h: string): [number, number, number] => [
  parseInt(h.slice(1, 3), 16),
  parseInt(h.slice(3, 5), 16),
  parseInt(h.slice(5, 7), 16),
]

function paletteDistance(a: string[], b: string[]): number {
  let best = Infinity
  for (const ha of a) {
    const [r1, g1, b1] = hexToRgb(ha)
    for (const hb of b) {
      const [r2, g2, b2] = hexToRgb(hb)
      const d = (r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2
      if (d < best) best = d
    }
  }
  return best
}

function orient(ratio: number): 'L' | 'P' | 'S' {
  if (ratio > 1.05) return 'L'
  if (ratio < 0.95) return 'P'
  return 'S'
}

function colHeight(items: ShufflePhoto[]): number {
  if (items.length === 0) return 0
  let sum = 0
  for (const it of items) sum += COL_WIDTH / it.ratio
  return sum + GAP * (items.length - 1)
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function packColumns(pool: ShufflePhoto[]): ShufflePhoto[][] {
  const cols: ShufflePhoto[][] = [[], [], []]
  const heights = [0, 0, 0]
  for (const it of pool) {
    let target = 0
    for (let i = 1; i < 3; i++) if (heights[i] < heights[target]) target = i
    cols[target].push(it)
    heights[target] += COL_WIDTH / it.ratio + GAP
  }
  return cols
}

type Cache = {
  h: Record<string, number>
  pdRow: Record<string, Record<string, number>>
  cat: Record<string, string>
  ori: Record<string, 'L' | 'P' | 'S'>
  ids: string[]
}

// Precompute per-pool tables so the inner swap loop is O(1) lookups.
function buildCache(pool: ShufflePhoto[], meta: Record<string, Meta>): Cache {
  const h: Record<string, number> = {}
  const cat: Record<string, string> = {}
  const ori: Record<string, 'L' | 'P' | 'S'> = {}
  const pdRow: Record<string, Record<string, number>> = {}
  const ids = pool.map(p => p.id)
  for (const p of pool) {
    h[p.id] = COL_WIDTH / p.ratio
    cat[p.id] = meta[p.id]?.cat ?? 'misc'
    ori[p.id] = orient(p.ratio)
  }
  for (let i = 0; i < pool.length; i++) {
    const a = pool[i]
    const ma = meta[a.id]?.pal ?? []
    pdRow[a.id] = {}
    for (let j = 0; j < pool.length; j++) {
      if (i === j) continue
      const b = pool[j]
      const mb = meta[b.id]?.pal ?? []
      pdRow[a.id][b.id] = paletteDistance(ma, mb)
    }
  }
  return { h, pdRow, cat, ori, ids }
}

// Fast within-column score using cached tables.
function scoreColumn(items: ShufflePhoto[], c: Cache): number {
  let s = 0
  for (let i = 0; i < items.length - 1; i++) {
    const idA = items[i].id, idB = items[i + 1].id
    const ca = c.cat[idA], cb = c.cat[idB]
    if (ca !== 'misc' && ca === cb) s += 900
    const pd = c.pdRow[idA][idB]
    if (pd < 2000) s += (2000 - pd) * 0.3
    if (c.ori[idA] === c.ori[idB]) s += 55
  }
  return s
}

// Cross-column score using cached heights + palette distances.
function scoreCross(cols: ShufflePhoto[][], c: Cache): number {
  const positions = cols.map(col => {
    const arr: Array<{ id: string; y1: number; y2: number }> = []
    let y = 0
    for (const it of col) {
      const hh = c.h[it.id]
      arr.push({ id: it.id, y1: y, y2: y + hh })
      y += hh + GAP
    }
    return arr
  })
  let s = 0
  const pairs: Array<[number, number]> = [[0, 1], [1, 2], [0, 2]]
  for (const [ca, cb] of pairs) {
    for (const a of positions[ca]) {
      for (const b of positions[cb]) {
        if (a.y1 < b.y2 && b.y1 < a.y2) {
          const cataA = c.cat[a.id], cataB = c.cat[b.id]
          if (cataA !== 'misc' && cataA === cataB) s += 700
          const pd = c.pdRow[a.id][b.id]
          if (pd < 1500) s += (1500 - pd) * 0.14
        }
      }
    }
  }
  return s
}

function totalScore(cols: ShufflePhoto[][], c: Cache, spreadWeight: number): number {
  let s = 0
  const heights = cols.map(col => {
    let sum = 0
    for (const it of col) sum += c.h[it.id]
    return sum + GAP * (col.length - 1)
  })
  const spread = Math.max(...heights) - Math.min(...heights)
  s += spread * spreadWeight
  for (const col of cols) s += scoreColumn(col, c)
  s += scoreCross(cols, c)
  return s
}

/**
 * Shuffle a pool of photos into 3 masonry columns.
 * Diversifies adjacent items on category (if provided), palette, and orientation.
 * Attempts to keep column heights near-flush; accepts the result even if not perfect.
 */
export function shuffleGrid(
  pool: ShufflePhoto[],
  meta: Record<string, Meta>,
  opts: { attemptFlush?: boolean } = {},
): ShufflePhoto[][] {
  const attemptFlush = opts.attemptFlush ?? true
  const spreadWeight = attemptFlush ? 50 : 0

  const cache = buildCache(pool, meta)

  // Iteration budget scales with pool size — small pools get more trials.
  const trials = pool.length > 60 ? 2 : 3
  const iterations = pool.length > 60 ? 220 : 280

  let best: ShufflePhoto[][] | null = null
  let bestScore = Infinity

  for (let trial = 0; trial < trials; trial++) {
    const shuffled = shuffleArray(pool)
    const cols = packColumns(shuffled)
    let curScore = totalScore(cols, cache, spreadWeight)
    for (let iter = 0; iter < iterations; iter++) {
      const ca = Math.floor(Math.random() * 3)
      let cb = Math.floor(Math.random() * 3)
      if (cb === ca) cb = (cb + 1) % 3
      if (cols[ca].length === 0 || cols[cb].length === 0) continue
      const ia = Math.floor(Math.random() * cols[ca].length)
      const ib = Math.floor(Math.random() * cols[cb].length)
      ;[cols[ca][ia], cols[cb][ib]] = [cols[cb][ib], cols[ca][ia]]
      const nScore = totalScore(cols, cache, spreadWeight)
      if (nScore < curScore) {
        curScore = nScore
      } else {
        ;[cols[ca][ia], cols[cb][ib]] = [cols[cb][ib], cols[ca][ia]]
      }
    }
    if (curScore < bestScore) {
      bestScore = curScore
      best = cols.map(c => [...c])
    }
  }

  // Ensure at least one portrait in the first row
  if (best) {
    const hasPortrait = best.some(col => col.length > 0 && orient(col[0].ratio) === 'P')
    if (!hasPortrait) {
      for (const col of best) {
        const pi = col.findIndex(p => orient(p.ratio) === 'P')
        if (pi > 0) { [col[0], col[pi]] = [col[pi], col[0]]; break }
      }
    }
  }

  return best!
}
