import test from "tape"
import { all, allWith, is } from ".."

const isEven = source => source % 2 === 0
const hasId = source => is(source.id)

test("all(With)", t => {
  t.equal(all(isEven)([2, 6, 4]), true, "Check all number are even")

  t.equal(
    all(hasId)([{}, { id: 2 }, {}]),
    false,
    'Check all elements have "id" property'
  )

  t.equal(
    allWith({
      id: value => is(value),
    })([{}, { id: 2 }, {}]),
    false,
    'Not all elements have "id" property via match subset'
  )

  t.equal(
    allWith({
      id: value => is(value),
    })([{ id: 1 }, { id: 2 }, { id: 3, name: "test" }]),
    true,
    'All elements have "id" property via match subset'
  )

  t.end()
})
