import { useEffect, useState } from 'react'
import './App.css'
import { Canvas } from './components/Canvas'
import { ThemeSelector } from './components/ThemeSelector'
import { ThemeProvider } from './contexts/themeContext'
import { Header } from './components/Header'
import { EmulationProvider } from './contexts/emulationContext'
import { RomSelector } from './components/RomSelector'

function App() {

  return (
    <EmulationProvider>
      <ThemeProvider>
        <Header />
        <RomSelector />
        <ThemeSelector />
        <Canvas />
      </ThemeProvider>
    </EmulationProvider>
  )
}

export default App
