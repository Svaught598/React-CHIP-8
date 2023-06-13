import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Canvas } from './components/Canvas'
import { ThemeSelector } from './components/ThemeSelector'
import { ThemeProvider } from './contexts/themeContext'
import { Header } from './components/Header'

function App() {
  const [count, setCount] = useState(0)
  const [pixels, setPixels] = useState<number[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      const newPixels = Array.from({ length: 2048 }, () => Math.floor(Math.random() * 2));
      setPixels(newPixels);
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <ThemeProvider>
      <Header />
      <ThemeSelector />
      <Canvas pixelBuffer={ pixels ?? [] } />
    </ThemeProvider>
  )
}

export default App
