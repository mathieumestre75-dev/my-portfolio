'use client'

import { usePathname } from 'next/navigation'
import Dock from '@/components/Dock'

export default function ClientDock() {
  const pathname = usePathname()
  if (pathname === '/') return null
  return <Dock />
}
