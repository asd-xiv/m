import test from "tape"

import { allWith } from "./all-with.js"
import { is } from "../is/is.js"

test("allWith", t => {
  t.equal(
    allWith({ id: is }, [{}, { id: 2 }, {}]),
    false,
    "given [array of objects who's items dont all satisfy matcher subset] should [return false]"
  )

  t.equal(
    allWith({
      id: is,
      name: "test",
    })([{ id: 1 }, { id: 2 }, { id: 3, name: "test" }]),
    false,
    "given [array of objects who's items dont all satisfy matcher subset (multiple fields)] should [return false]"
  )

  t.equal(
    allWith({
      id: is,
      name: is,
    })([
      { id: 1, name: "lorem" },
      { id: 2, name: "foo" },
      { id: 3, name: "test" },
    ]),
    true,
    "given [array of objects who's items all satisfy matcher subset (multiple fields)] should [return true]"
  )

  t.end()
})
