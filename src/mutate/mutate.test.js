import test from "tape"

import { mutate } from "./mutate"

test("mutate", t => {
  t.deepEqual(
    mutate({ test: "changed" }, { test: "Lorem Ipsum" }),
    { test: "changed" },
    "Mutating existing property should return changed object"
  )

  t.deepEqual(
    mutate({ test: source => source + 1 })({ test: 2 }),
    { test: 3 },
    "Mutating existing property with function should return changed object"
  )

  t.deepEqual(
    mutate({ notExist: 2 }, { test: "Lorem Ipsum" }),
    { test: "Lorem Ipsum" },
    "Mutating non-existing property should return unchanged object"
  )

  t.deepEqual(
    mutate({ test: "changed" }, { test: undefined }),
    { test: "changed" },
    "Mutating existing but undefined property should return changed object"
  )

  t.end()
})
