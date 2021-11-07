import test from "tape"

import { hasKey } from "./has-key.js"

test("hasKey", t => {
  t.equals(hasKey("test")({}), false, "Key does not exist")

  t.equals(hasKey("test", { test: "1" }), true, "Key exists")

  t.equals(
    hasKey("test", { test: undefined }),
    true,
    "Key exists even if undefined"
  )

  t.end()
})
