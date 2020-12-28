import test from "tape"

import { mutate, mutateMany, mutateWith } from "./mutate"

const inc = x => x + 1

test("mutate", t => {
  t.deepEqual(
    mutate({ test: "changed" }, { test: "Lorem Ipsum" }),
    { test: "changed" },
    "Mutating existing property should return changed object"
  )

  t.deepEqual(
    mutate({ test: inc })({ test: 2 }),
    { test: 3 },
    "Mutating existing property with function should return changed object"
  )

  t.deepEqual(
    mutate({ test: [inc, inc] })({ test: 2 }),
    { test: 4 },
    "Mutating existing property with array if piped functions should return changed object"
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

  t.deepEqual(
    mutate(
      {
        test: (source, item) => `${source} ${item.foo}`,
      },
      {
        foo: "bar",
        test: "Lorem Ipsum",
      }
    ),
    {
      foo: "bar",
      test: "Lorem Ipsum bar",
    },
    "Mutating existing property based on other field should return changed object"
  )

  t.end()
})

test("mutateMany", t => {
  t.deepEqual(
    mutateMany({ id: source => source + 1 }, [
      { id: 1 },
      { id: 2 },
      { test: "dolor" },
    ]),
    [{ id: 2 }, { id: 3 }, { test: "dolor" }],
    "Mutating existing but undefined property should return changed object"
  )

  t.end()
})

test("mutateWith", t => {
  t.deepEqual(
    mutateWith({ id: 2 }, { count: [inc], other: 2 }, [
      { id: 1 },
      { id: 2, count: 1 },
    ]),
    [{ id: 1 }, { id: 2, count: 2 }],
    "Mutating item inside array should return new array with changed object"
  )

  t.end()
})
