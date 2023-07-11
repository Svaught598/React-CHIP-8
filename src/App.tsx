import { Canvas } from './components/Canvas'
import { ThemeProvider } from './contexts/themeContext'
import { Header } from './components/Header'
import { EmulationProvider } from './contexts/emulationContext'
import { Menu } from './components/menu/Menu'

function App() {

  return (
    <EmulationProvider>
      <ThemeProvider>
        <div className='flex flex-row w-3/5 h-screen mx-auto mt-36 gap-8'>
          <div className='flex flex-col flex-2 gap-4'>
            <Header />
            <Canvas />
          </div>
          <Menu />
        </div>
      </ThemeProvider>
    </EmulationProvider>
  )
}

export default App
