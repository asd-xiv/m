import test from "tape"
import { toLower } from ".."

test("toLower", t => {
  const source = "Lorem Opsum"

  t.equals(
    toLower(source),
    "lorem opsum",
    "Convert uppercase chars into lowercase"
  )

  t.end()
})
