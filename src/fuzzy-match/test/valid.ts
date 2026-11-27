import test from "tape"

import { fuzzyMatch } from "../fuzzy-match.js"
import type { FuzzyMatch } from "../fuzzy-match.js"

/** The page names of the docs sandbox, in its order */
const SANDBOX_PAGES = [
  "Home",
  "Grid",
  "Type",
  "Prose",
  "Octicons",
  "Box",
  "Button",
  "Callout",
  "Checkbox",
  "CodeBlock",
  "ColorSchemeSwitch",
  "Dialog",
  "Disclosure",
  "GridBlock",
  "Heading",
  "Input",
  "Label",
  "Radio",
  "Select",
  "Sidebar",
  "Table",
  "Tag",
  "Textarea",
  "Tree",
  "TriStateSwitch",
]

/** The score of a match, `-Infinity` when there is none, so a compare fails */
const findScore = (query: string, text: string): number =>
  fuzzyMatch(query, text)?.score ?? Number.NEGATIVE_INFINITY

const rank = (query: string, texts: readonly string[]): string[] => {
  const matches: { text: string; match: FuzzyMatch }[] = []

  for (const text of texts) {
    const match = fuzzyMatch(query, text)

    if (match !== undefined) {
      matches.push({ text, match })
    }
  }

  return matches
    .sort((a, b) => b.match.score - a.match.score)
    .map(entry => entry.text)
}

test("fuzzyMatch - valid", t => {
  t.deepEqual(
    fuzzyMatch("cb", "CodeBlock")?.indexes,
    [0, 4],
    "given [query letters in order in the text] should [return the index of each letter]"
  )

  t.deepEqual(
    fuzzyMatch("CODE", "codeblock")?.indexes,
    [0, 1, 2, 3],
    "given [a query in another case than the text] should [match it]"
  )

  t.deepEqual(
    fuzzyMatch("cb", "CheckboxCodeBlock")?.indexes,
    [8, 12],
    "given [a letter both early and on a camelCase hump] should [pick the humps]"
  )

  t.ok(
    findScore("ab", "abx") > findScore("ab", "axb"),
    "given [consecutive letters] should [score higher than letters with a gap]"
  )

  t.ok(
    findScore("ab", "axbxx") > findScore("ab", "axxxb"),
    "given [a longer gap] should [score lower than a shorter gap]"
  )

  t.ok(
    findScore("b", "bxx") > findScore("b", "xxb"),
    "given [a letter at the start of the text] should [score higher than one inside a word]"
  )

  {
    const insideScore = findScore("b", "axb")

    for (const separator of [" ", "-", "_", "/", "."]) {
      t.ok(
        findScore("b", `a${separator}b`) > insideScore,
        "given [a letter after a space, -, _, / or .] should [score higher than one inside a word]"
      )
    }
  }

  t.ok(
    findScore("b", "aB") > findScore("b", "ab"),
    "given [a letter on a camelCase hump] should [score higher than one inside a word]"
  )

  t.equal(
    findScore("b", "AB"),
    findScore("b", "ab"),
    "given [an upper case letter after another] should [score as one inside a word]"
  )

  t.ok(
    findScore("ab", "ab") > findScore("ab", "abc"),
    "given [the same placement in a shorter text] should [score higher]"
  )

  t.deepEqual(
    rank("cb", SANDBOX_PAGES),
    ["CodeBlock", "Checkbox"],
    "given [cb and the sandbox pages] should [rank CodeBlock above Checkbox]"
  )

  t.equal(
    rank("chk", SANDBOX_PAGES)[0],
    "Checkbox",
    "given [chk and the sandbox pages] should [rank Checkbox first]"
  )

  // No match
  t.equal(
    fuzzyMatch("xz", "CodeBlock"),
    undefined,
    "given [a letter missing from the text] should [return undefined]"
  )

  t.equal(
    fuzzyMatch("kc", "Clock"),
    undefined,
    "given [letters out of order] should [return undefined]"
  )

  t.equal(
    fuzzyMatch("tags", "Tag"),
    undefined,
    "given [a query longer than the text] should [return undefined]"
  )

  t.equal(
    fuzzyMatch("a", ""),
    undefined,
    "given [an empty text] should [return undefined]"
  )

  // Curried
  t.deepEqual(
    fuzzyMatch("cb")("CodeBlock"),
    { score: 51.75, indexes: [0, 4] },
    "given [a query and a text, curried] should [return score and indexes]"
  )

  {
    const matches = SANDBOX_PAGES.map(fuzzyMatch("tsw"))

    t.equal(
      matches[SANDBOX_PAGES.indexOf("TriStateSwitch")]?.indexes.length,
      3,
      "given [a curried query in map] should [match each text]"
    )
  }

  t.end()
})
