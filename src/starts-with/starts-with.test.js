/* eslint-disable unicorn/no-null */
import test from "tape"

import { startsWith } from "./starts-with.js"

test("startsWith", t => {
  t.equals(
    startsWith("lorem", "lorem ipsum"),
    true,
    "Source string starts with search string (uncurried)"
  )

  t.equals(
    startsWith("lorem")("lorem ipsum"),
    true,
    "Source string starts with search string (curried)"
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

  t.equals(
    startsWith("lorem")(["lorem", "ipsum"]),
    true,
    "Search item inside array"
  )

  t.equals(
    startsWith("lorem")(["lorem", "ipsum"]),
    true,
    "Search in Array should returns true if the entry if its the exactly the first"
  )

  t.equals(
    startsWith("lorem")(["loremipsum", "ipsum"]),
    false,
    "Search in Array should not return true if the entry if its just starting but not exactly the first"
  )

  t.equals(
    startsWith("")(["lorem"]),
    false,
    "Search in Array should returns false if searching for empty string"
  )

  t.equals(
    startsWith("lorem")([]),
    false,
    "Search in Array should returns false if empty"
  )

  t.equals(
    startsWith(null)([]),
    false,
    "Search in Array should returns false if empty, even if searching for null"
  )

  t.equals(
    startsWith(null)([null]),
    false,
    "Search null in Array should returns false, even if it matches the first entry"
  )

  t.equals(startsWith("lorem")(null), false, "Search null returns false")

  t.equals(startsWith("lorem")(), false, "Search undefined returns false")

  t.equals(
    startsWith("lorem")({ lorem: "lorem" }),
    false,
    "Search in Object should returns false"
  )

  t.end()
})
