import test from "tape"

import { pick } from "./pick"

test("pick", t => {
  const source = {
    lorem: "ipsum",
    dolor: "amet",
  }

  t.deepEqual(
    pick(["dolor", "lorem"])(source),
    { lorem: "ipsum", dolor: "amet" },
    "All existing keys"
  )

  t.deepEqual(
    pick(["lorem", "not-exist"])(source),
    { lorem: "ipsum" },
    "Some non-existing keys"
  )

  t.deepEqual(pick(["not-exist"])(source), {}, "All non-existing keys")

  t.end()
})
