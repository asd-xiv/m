import test from "tape"
import { toLower } from "./to-lower"

test("toLower", t => {
  const source = "Lorem Opsum"

  t.equals(toLower(source), "lorem opsum", "Convert chars into lowercase")

  t.end()
})
