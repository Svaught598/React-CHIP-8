import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Canvas } from './components/Canvas'

const theme = {
  light: '#7f3400',
  dark : '#326f53',
}

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
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Canvas pixelBuffer={ pixels ?? [] } theme={ theme }/>
    </>
  )
}

export default App
