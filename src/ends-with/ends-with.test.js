import test from "tape"
import { endsWith } from ".."

test("string::endsWith", t => {
  t.equals(
    endsWith("ipsum")("lorem ipsum"),
    true,
    "Source string ends with search string"
  )

  t.equals(
    endsWith("lorem")("lorem ipsum"),
    false,
    "Search string exists but not at ending"
  )

  t.equals(
    endsWith("lorem ipsum dolor")("lorem ipsum"),
    false,
    "Search string is longer than source string"
  )

  t.equals(
    endsWith("asd")("lorem ipsum"),
    false,
    "Search string does not exist in source"
  )

  t.end()
})
