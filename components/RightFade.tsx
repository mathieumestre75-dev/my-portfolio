export default function RightFade() {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: 594,
        height: '100%',
        background: 'linear-gradient(90deg, rgb(252, 252, 252) 0%, transparent 100%)',
        zIndex: 3,
        pointerEvents: 'none',
        overflow: 'clip',
      }}
    />
  )
}
