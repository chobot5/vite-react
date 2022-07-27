import { flow, pipe } from 'fp-ts/lib/function'
import * as T from 'fp-ts/Task'
import * as TE from 'fp-ts/lib/TaskEither'
import * as O from 'fp-ts/Option'
import * as A from 'fp-ts/Array'
import { useState } from 'react'

const getNums = async () => [3, 4, 5]

const sumNumsList = (acc: number, curr: number) => acc + curr

const sumNums = pipe(
  TE.tryCatch(getNums, () => 0),
  TE.chainW(
    flow(
      O.fromPredicate(A.isNonEmpty),
      TE.fromOption(() => 0)
    )
  ),
  TE.map((a) => A.reduce(0, sumNumsList)(a)),
  TE.fold(T.of, T.of)
)

export const SumPromise = () => {
  const [count, setCount] = useState<number | null>(null)
  const handleSum = async () => {
    const resp = await sumNums()
    setCount(resp)
  }

  return (
    <div>
      {count}
      <button type='button' onClick={handleSum}>
        Sum
      </button>
    </div>
  )
}
