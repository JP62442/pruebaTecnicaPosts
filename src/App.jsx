import { useState } from 'react'
import { Index } from './components/Index/indesx'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Index />
    </>
  )
}

export default App
