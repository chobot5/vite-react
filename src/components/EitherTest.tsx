import { Eq } from 'fp-ts/Eq'
import { pipe } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import * as E from 'fp-ts/Either'
import * as A from 'fp-ts/Array'
import { json } from 'fp-ts'

type DataType = { name: string }

const hhh = (d: DataType[] | null) => {
  console.log(66)
  return O.fromNullable(d)
}

const eqString: Eq<string> = {
  equals: (x, y) => x === y,
}

const checkString = (e: Eq<string>) => (v1: string, v2: string) => e.equals(v1, v2)

const printSomething = (d: string) =>
  pipe(
    d,
    O.fromPredicate((i) => checkString(eqString)(i, 'c')),
    O.map((d) => d.toUpperCase()),
    O.map((d) => {
      console.log(d)
      return d
    }),
    E.fromOption(() => ({ errorek: '666' }))
  )

const logData = (d: string) => {
  console.log(d)
  return d
}

const clientData: string = pipe(
  hhh([{ name: 'a' }, { name: 'b' }]),
  O.map((d) => A.append({ name: 'c' })(d)),
  O.chain((data) => A.lookup(2, data)),
  O.map((d) => d.name),
  O.map(logData),
  E.fromOption(() => ({ error: '777' })),
  E.chainW(printSomething),
  E.getOrElse((e) => JSON.stringify(e))
)

export const EitherTest = () => {
  return (
    <div>
      <span>{clientData}</span>
    </div>
  )
}
