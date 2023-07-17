import { Canvas } from './components/Canvas'
import { ThemeProvider } from './contexts/themeContext'
import { Header } from './components/Header'
import { EmulationProvider } from './contexts/emulationContext'
import { Menu } from './components/menu/Menu'
import { useBreakpoint } from './useBreakpoint'
import { Keypad } from './components/Keypad'

function App() {
  const breakpoint = useBreakpoint();
  console.log('%cApp.tsx line:11 breakpoint', 'color: #26bfa5;', breakpoint);

  return (
    <EmulationProvider>
      <ThemeProvider>
        <div className='flex flex-col w-screen h-screen md:flex-row md:w-3/5 md:mx-auto md:mt-36 md:gap-8 overflow-y-auto overflow-x-hidden md:overflow-y-hidden'>
          <div className='flex flex-col flex-2 gap-4 mb-4 md:mb-0'>
            <Header />
            <Canvas />
          </div>
          <Menu />
          { (breakpoint === 'xs' || breakpoint === 'sm') &&
            <Keypad />
          }
        </div>
      </ThemeProvider>
    </EmulationProvider>
  )
}

export default App
