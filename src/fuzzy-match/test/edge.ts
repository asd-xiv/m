import test from "tape"

import { fuzzyMatch } from "../fuzzy-match.js"

test("fuzzyMatch - edge", t => {
  t.deepEqual(
    fuzzyMatch("", "CodeBlock"),
    { score: 0, indexes: [] },
    "given [an empty query] should [match with score 0 and no indexes]"
  )

  t.deepEqual(
    fuzzyMatch("", ""),
    { score: 0, indexes: [] },
    "given [an empty query and an empty text] should [match with score 0 and no indexes]"
  )

  t.deepEqual(
    fuzzyMatch("Tag", "Tag")?.indexes,
    [0, 1, 2],
    "given [a query equal to the text] should [return every index]"
  )

  t.deepEqual(
    fuzzyMatch("oo", "Octicons")?.indexes,
    [0, 5],
    "given [a repeated letter] should [match each on its own index]"
  )

  // A query longer than the text needs more indexes than the text has
  t.equal(
    fuzzyMatch("abcd", "abc"),
    undefined,
    "given [a query longer than the text] should [return undefined at once]"
  )

  {
    // The review's case: each cell used to copy the indexes of the cell
    // before it, 15 s and 505 MB for 800 letters on 8,000 characters
    const result = fuzzyMatch("a".repeat(800), "a".repeat(8000))

    t.deepEqual(
      result?.indexes,
      Array.from({ length: 800 }, (_, index) => index),
      "given [800 letters on 8,000 characters] should [place them at the start, in one pass]"
    )
  }

  // "İ" is 2 code units in lower case, so lowering the whole text would shift
  // every index after it. Such a text compares letter by letter
  t.deepEqual(
    fuzzyMatch("İb", "İstanbul")?.indexes,
    [0, 5],
    "given [a text with a letter that grows in lower case] should [return indexes into the text]"
  )
  t.deepEqual(
    fuzzyMatch("nb", "İstanbul")?.indexes,
    [4, 5],
    "given [such a text and a plain query] should [still find the letters]"
  )

  t.end()
})
