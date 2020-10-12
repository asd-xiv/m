import test from "tape"
import { all, allWith } from "./all"

import { is } from "../is/is"
import { read } from "../read/read"

const isEven = source => source % 2 === 0

test("all(With)", t => {
  t.equal(all(isEven, [2, 6, 4]), true, "Check all number are even")

  t.equal(
    all(item => is(item.id), [{}, { id: 2 }, {}]),
    false,
    'Check all elements have "id" property'
  )

  t.equal(
    all([read("id"), is], [{}, { id: 2 }, {}]),
    false,
    'Check all elements have "id" property using pipe functions'
  )

  t.end()
})

test("allWith", t => {
  t.equal(
    allWith(
      {
        id: value => is(value),
      },
      [{}, { id: 2 }, {}]
    ),
    false,
    'Not all elements have "id" property via match subset'
  )

  t.equal(
    allWith(
      {
        id: value => is(value),
      },
      [{ id: 1 }, { id: 2 }, { id: 3, name: "test" }]
    ),
    true,
    'All elements have "id" property via match subset'
  )

  t.end()
})
