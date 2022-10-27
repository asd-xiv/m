import test from "tape"

import { toLower } from "./to-lower.js"

test("toLower", t => {
  const input = "Lorem Opsum"

  t.equals(toLower(input), "lorem opsum", "Convert chars into lowercase")

  t.end()
})
