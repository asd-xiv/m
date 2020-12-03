import test from "tape"

import { pluck } from "./pluck"

test("pluck", t => {
  t.deepEqual(
    pluck(["dolor", "lorem"])({
      lorem: "ipsum",
      dolor: "amet",
    }),
    { lorem: "ipsum", dolor: "amet" },
    "Plucking existing keys should return trimmed object (curried)"
  )

  t.deepEqual(
    pluck(["dolor", "lorem"], {
      lorem: "ipsum",
      dolor: "amet",
    }),
    { lorem: "ipsum", dolor: "amet" },
    "Plucking existing keys should return trimmed object (uncurried)"
  )

  t.deepEqual(
    pluck(["lorem", "not-exist"], {
      lorem: "ipsum",
      dolor: "amet",
    }),
    { lorem: "ipsum" },
    "Some non-existing keys"
  )

  t.deepEqual(
    pluck(["not-exist"], {
      lorem: "ipsum",
      dolor: "amet",
    }),
    {},
    "All non-existing keys"
  )

  t.deepEqual(
    pluck(
      ["id"],
      [
        {
          id: "ipsum",
          title: "amet",
        },
        {
          id: "lorem",
          title: "amet",
        },
      ]
    ),
    [{ id: "ipsum" }, { id: "lorem" }],
    "Plucking existing keys should return trimmed object (uncurried)"
  )

  t.end()
})
