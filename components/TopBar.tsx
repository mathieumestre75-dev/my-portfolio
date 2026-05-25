import Link from 'next/link'

interface TopBarProps {
  backHref?: string
  backLabel?: string
  label?: string
}

export default function TopBar({ backHref, backLabel = '← Back', label }: TopBarProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 20px 0',
      }}
    >
      {backHref ? (
        <Link
          href={backHref}
          style={{
            fontFamily: 'var(--font-spline-sans-mono)',
            fontSize: 13,
            color: 'var(--fg-secondary)',
            textDecoration: 'none',
            transition: 'color 0.2s ease',
          }}
        >
          {backLabel}
        </Link>
      ) : label ? (
        <p
          style={{
            fontFamily: 'var(--font-spline-sans-mono)',
            fontSize: 11.2,
            color: 'rgba(0,0,0,0.6)',
            letterSpacing: '0.04em',
          }}
        >
          {label}
        </p>
      ) : (
        <div />
      )}
    </div>
  )
}
