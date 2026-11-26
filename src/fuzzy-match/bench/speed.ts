import { Bench } from "tinybench"

import { fuzzyMatch } from "../fuzzy-match.js"

// A list of file names, as a picker searches it
const FILES = Array.from(
  { length: 10_000 },
  (_, index) => `src/components/Code${index % 97}Block${index}.tsx`
)

// The case of the security review: the cost grows with query × text, and each
// cell used to copy the indexes of the cell before it
const LONG_QUERY = "a".repeat(200)
const LONG_TEXT = "a".repeat(2000)

// A query longer than every text can never match
const QUERY_LONGER_THAN_TEXT = "a".repeat(100)
const SHORT_TEXTS = Array.from({ length: 10_000 }, (_, index) => `text${index}`)

const bench = new Bench({ time: 500, warmupIterations: 5 })

bench
  .add("short query on one text", () => {
    fuzzyMatch("cb", "CodeBlock")
  })
  .add("3 letters over 10,000 file names", () => {
    for (const file of FILES) {
      fuzzyMatch("cbt", file)
    }
  })
  .add("200 letters on 2,000 characters", () => {
    fuzzyMatch(LONG_QUERY, LONG_TEXT)
  })
  .add("query longer than each of 10,000 texts", () => {
    for (const text of SHORT_TEXTS) {
      fuzzyMatch(QUERY_LONGER_THAN_TEXT, text)
    }
  })

await bench.run()

console.table(bench.table())
