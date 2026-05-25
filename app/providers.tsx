'use client'

import { createContext, useContext, useState } from 'react'
import { ThemeProvider } from 'next-themes'

type View = 'scattered' | 'organized'

interface ViewContextType {
  view: View
  setView: (v: View) => void
}

export const ViewContext = createContext<ViewContextType>({
  view: 'scattered',
  setView: () => {},
})

export const useView = () => useContext(ViewContext)

export function Providers({ children }: { children: React.ReactNode }) {
  const [view, setView] = useState<View>('scattered')

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <ViewContext.Provider value={{ view, setView }}>
        {children}
      </ViewContext.Provider>
    </ThemeProvider>
  )
}
