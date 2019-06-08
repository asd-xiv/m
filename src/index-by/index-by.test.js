import test from "tape"
import { indexBy } from ".."

test("indexBy", t => {
  t.deepEqual(
    indexBy("id")([{ id: 1, label: "test" }, { id: 2, label: "foo" }]),
    {
      1: { id: 1, label: "test" },
      2: { id: 2, label: "foo" },
    },
    "index object array by existing field"
  )

  t.deepEqual(
    indexBy("id")([
      { id: 1, label: "test" },
      { id: 2, label: "foo" },
      { label: "foo bar" },
    ]),
    {
      1: { id: 1, label: "test" },
      2: { id: 2, label: "foo" },
    },
    "index object array by existing field"
  )

  t.end()
})
