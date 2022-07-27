import { pipe, flow } from 'fp-ts/lib/function'
import * as O from 'fp-ts/Option'

const sum: number = pipe(
  7,
  O.fromPredicate((a) => a > 5),
  O.bindTo('a'),
  O.bind(
    'b',
    flow(
      O.fromPredicate((c) => c.a > 6),
      O.map((c) => c.a)
    )
  ),
  O.map((c) => c.a + c.b),
  O.getOrElse(() => 0)
)

export const Binding = () => {
  return (
    <div>
      Binding: <span>{sum}</span>
    </div>
  )
}
