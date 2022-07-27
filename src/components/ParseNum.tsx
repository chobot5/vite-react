import { useState } from 'react'
import { constVoid, flow, pipe, absurd } from 'fp-ts/lib/function'
import * as TE from 'fp-ts/lib/TaskEither'

const getString = async (a: string): Promise<string> => a

const parseNum = (stringNum: string) =>
  pipe(
    TE.tryCatch(
      () => getString(stringNum),
      () => constVoid as never
    ),
    TE.chain(
      flow(
        TE.fromPredicate(
          (a) => {
            const num = parseInt(a)
            return !isNaN(num)
          },
          () => constVoid as never
        ),
        TE.map((a) => parseInt(a))
      )
    ),
    TE.getOrElse(absurd)
  )()

export const ParseNum = () => {
  const [data, setData] = useState<number | null>(null)
  const handleData = async () => {
    const resp = await parseNum('666')
    setData(resp)
  }

  return (
    <div>
      {data}
      <button type='button' onClick={handleData}>
        Parse
      </button>
    </div>
  )
}
