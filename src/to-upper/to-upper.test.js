import test from "tape"
import { toUpper } from "./to-upper"

test("toUpper", t => {
  const source = "Lorem Opsum"

  t.equals(toUpper(source), "LOREM OPSUM", "Convert chars into uppercase")

  t.end()
})
