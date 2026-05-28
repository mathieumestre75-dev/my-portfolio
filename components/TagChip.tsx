interface TagChipProps {
  label: string
}

export default function TagChip({ label }: TagChipProps) {
  return (
    <span
      style={{
        background: 'rgba(0, 0, 0, 0.62)',
        borderRadius: 5,
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)',
        padding: '4px 8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'PP Neue Montreal Medium', sans-serif",
        fontSize: 10.24,
        fontWeight: 500,
        lineHeight: '14.336px',
        letterSpacing: 0.08192,
        color: 'rgb(255, 255, 255)',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  )
}
