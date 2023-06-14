import { useEffect, useState } from 'react'
import './App.css'
import { Canvas } from './components/Canvas'
import { ThemeSelector } from './components/ThemeSelector'
import { ThemeProvider } from './contexts/themeContext'
import { Header } from './components/Header'
import { EmulationProvider } from './contexts/emulationContext'

function App() {
  const [pixels, setPixels] = useState<number[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      const newPixels = Array.from({ length: 2048 }, () => Math.floor(Math.random() * 2));
      setPixels(newPixels);
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <EmulationProvider>
      <ThemeProvider>
        <Header />
        <ThemeSelector />
        <Canvas pixelBuffer={ pixels ?? [] } />
      </ThemeProvider>
    </EmulationProvider>
  )
}

export default App
