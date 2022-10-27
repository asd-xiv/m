/* eslint-disable unicorn/no-null */
import test from "tape"

import { endsWith } from "./ends-with.js"

test("endsWith", t => {
  t.equals(
    endsWith("ipsum")("lorem ipsum"),
    true,
    "Source string ends with search string - curried"
  )

  t.equals(
    endsWith("ipsum", "lorem ipsum"),
    true,
    "Source string ends with search string - uncurried"
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

  t.equals(
    endsWith("ipsum")(["lorem", "ipsum"]),
    true,
    "Search in Array should return true if the entry is the exactly the last"
  )

  t.equals(
    endsWith("ipsum")(["lorem", "loremipsum"]),
    false,
    "Search in Array should not return true if the entry if its just starting but not exactly the last"
  )

  t.equals(
    endsWith("")(["lorem"]),
    false,
    "Search in Array should returns false if searching for empty string"
  )

  t.equals(
    endsWith("lorem")([]),
    false,
    "Search in Array should returns false if empty"
  )

  t.equals(
    endsWith(null)([]),
    false,
    "Search in Array should returns false if empty, even if searching for null"
  )

  t.equals(
    endsWith(null)([null]),
    false,
    "Search in Array should not consider a 'null' entry as searchable, even if it matches the last entry"
  )

  t.equals(endsWith("lorem")(null), false, "Search null returns false")

  t.equals(endsWith("lorem")(), false, "Search undefined returns false")

  t.equals(
    endsWith("lorem")({ lorem: "lorem" }),
    false,
    "Search in Object should returns false"
  )

  t.end()
})
