export default function RightFade() {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: 148.539,
        height: '100%',
        background: 'linear-gradient(270deg, rgb(252, 252, 252) -55%, rgba(252, 252, 252, 0) 100%)',
        zIndex: 20,
        pointerEvents: 'none',
        overflow: 'clip',
      }}
    />
  )
}
