import { useState } from 'react'
import { match, P } from 'ts-pattern'

type ValueType = 'a' | 'b' | 'c' | 'd'
enum Values {
  A = 'a',
  B = 'b',
  C = 'c',
  D = 'd',
}

export const Patterns = () => {
  const [value, setValue] = useState<Values>(Values.A)

  const handleClick = () => {
    const val = match<Values, Values>(value)
      .with(Values.A, () => Values.B)
      .with(Values.B, () => Values.C)
      .with(Values.C, Values.D, () => Values.A)
      .exhaustive()
    setValue(val)
  }

  return (
    <div>
      <h3>{value}</h3>
      <button type='button' onClick={handleClick}>
        pattern
      </button>
    </div>
  )
}
