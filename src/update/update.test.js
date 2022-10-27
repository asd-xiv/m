import test from "tape"

import { update, updateMany, updateWith } from "./update.js"

const inc = x => x + 1

test("update", t => {
  t.deepEqual(
    update({ test: "changed" }, { test: "Lorem Ipsum" }),
    { test: "changed" },
    "Updating existing property should return changed object"
  )

  t.deepEqual(
    update({ test: inc })({ test: 2 }),
    { test: 3 },
    "Updating existing property with function should return changed object"
  )

  t.deepEqual(
    update({ notExist: 2 }, { test: "Lorem Ipsum" }),
    { test: "Lorem Ipsum", notExist: 2 },
    "Updating non-existing property should return changed object"
  )

  t.deepEqual(
    update(
      {
        test: (input, item) => `${input} ${item.foo}`,
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
    "Updating existing property based on other field should return changed object"
  )

  t.end()
})

test("updateMany", t => {
  t.deepEqual(
    updateMany(
      {
        id: (input = 0) => input + 1,
      },
      [{ id: 1 }, { id: 2 }, { test: "dolor" }]
    ),
    [{ id: 2 }, { id: 3 }, { id: 1, test: "dolor" }],
    "Updating existing and unexisting properties should return changed object"
  )

  t.end()
})

test("updateWith", t => {
  t.deepEqual(
    updateWith(
      {
        id: 2,
      },
      {
        count: inc,
        other: 2,
      },
      [{ id: 1 }, { id: 2, count: 1 }]
    ),
    [{ id: 1 }, { id: 2, count: 2, other: 2 }],
    "Mutating item inside array should return new array with changed object"
  )

  t.end()
})
