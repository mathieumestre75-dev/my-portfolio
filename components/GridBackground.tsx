export default function GridBackground() {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        backgroundColor: 'rgb(252, 252, 252)',
        backgroundImage: `
          linear-gradient(rgba(98, 141, 227, 0.12) 1px, transparent 1px),
          linear-gradient(90deg, rgba(98, 141, 227, 0.12) 1px, transparent 1px)
        `,
        backgroundSize: '25px 25px',
      }}
    />
  )
}
