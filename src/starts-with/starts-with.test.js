import test from "tape"
import { startsWith } from ".."

test("startsWith", t => {
  t.equals(
    startsWith("lorem")("lorem ipsum"),
    true,
    "Source string starts with search string"
  )

  t.equals(
    startsWith("ipsum")("lorem ipsum"),
    false,
    "Search string exists but not at starting"
  )

  t.equals(
    startsWith("lorem ipsum dolor")("lorem ipsum"),
    false,
    "Search string is longer than source string"
  )

  t.equals(
    startsWith("asd")("lorem ipsum"),
    false,
    "Search string does not exist in source"
  )

  t.end()
})
