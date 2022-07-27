import { constVoid, flow, pipe, absurd, constant, increment } from 'fp-ts/lib/function'
import * as T from 'fp-ts/Task'
import * as TE from 'fp-ts/lib/TaskEither'
import * as A from 'fp-ts/Array'
import { useState } from 'react'

interface Data {
  data: {
    id: string
    content: {
      body?: string
      desc: string
    }
  }
}

const someAsyncFn = async (): Promise<Data[]> => {
  return [
    {
      data: {
        id: '1',
        content: {
          body: 'some body content',
          desc: 'some desc',
        },
      },
    },
    {
      data: {
        id: '2',
        content: {
          body: undefined,
          desc: 'some desc',
        },
      },
    },
  ]
}

type Error = {
  name: string
}

const apiData = pipe(
  TE.tryCatch<Error, Data[]>(someAsyncFn, (e) => ({ name: 'a' })),
  TE.map((d) => A.lookup(0, d)),
  TE.chain(
    flow(
      TE.fromOption(() => ({ name: 'xxx' })),
      TE.map((d) => d.data),
      TE.map((d) => ({ ...d, id: '666' }))
    )
  ),
  TE.map((d) => d),
  TE.fold((e) => {
    console.log(e.name)
    return absurd(0 as never)
  }, T.of)
)

export const ListPromise = () => {
  const [data, setData] = useState<string | null>(null)
  const handleData = async () => {
    const resp = await apiData()
    setData(resp.content.desc)
  }

  return (
    <div>
      {data}
      <button type='button' onClick={handleData}>
        Get data
      </button>
    </div>
  )
}
