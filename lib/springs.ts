export const springs = {
  snappy:   { type: 'spring' as const, stiffness: 500, damping: 35 },
  card:     { type: 'spring' as const, stiffness: 280, damping: 28, mass: 1 },
  smooth:   { type: 'spring' as const, stiffness: 250, damping: 28, mass: 0.8 },
  drag:     { type: 'spring' as const, stiffness: 300, damping: 30, restDelta: 0.001 },
  text:     { type: 'spring' as const, stiffness: 350, damping: 28, mass: 0.7 },
  entrance: { type: 'spring' as const, stiffness: 300, damping: 28 },
}
