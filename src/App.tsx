import { useState } from 'react'
import { Eq } from 'fp-ts/Eq'
import { SumPromise } from './components/SumPromise'
import './App.css'
import { ListPromise } from './components/ListPromise'
import { ParseNum } from './components/ParseNum'
import { EitherTest } from './components/EitherTest'
import { Binding } from './components/Binding'
import { Patterns } from './components/Patterns'

const eqNumber: Eq<number> = {
  equals: (x, y) => x === y,
}

eqNumber.equals(6, 5)

const sum = (a: number, mult: number) => a * mult

const curry = (fcn: (a: number, b: number) => number) => (a: number) => (b: number) => fcn(a, b)

const x = curry(sum)
const a = x(6)(5)

function App() {
  const [count, setCount] = useState(5)

  const handleFetch = async () => {}

  return (
    <div className='App'>
      <header className='App-header'>
        <Patterns />
        <EitherTest />
        <ParseNum />
        <Binding />
        <ListPromise />
        <SumPromise />
        <p>{JSON.stringify({})}</p>
        <p>
          <button type='button' onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
          <button type='button' onClick={handleFetch}>
            Download
          </button>
        </p>
      </header>
    </div>
  )
}

export default App
