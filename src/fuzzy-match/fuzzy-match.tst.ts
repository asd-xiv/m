import { describe, expect, test } from "tstyche"

import { fuzzyMatch } from "./fuzzy-match.js"
import type { FuzzyMatch } from "./fuzzy-match.js"

describe("fuzzyMatch", () => {
  test("fuzzyMatch - uncurried", () => {
    expect(fuzzyMatch("cb", "CodeBlock")).type.toBe<FuzzyMatch | undefined>()
  })

  test("fuzzyMatch - curried", () => {
    const matchCallback = fuzzyMatch("cb")

    expect(matchCallback).type.toBe<(text: string) => FuzzyMatch | undefined>()
    expect(matchCallback("CodeBlock")).type.toBe<FuzzyMatch | undefined>()
    expect(["CodeBlock", "Tag"].map(matchCallback)).type.toBe<
      (FuzzyMatch | undefined)[]
    >()
  })

  test("fuzzyMatch - invalid input", () => {
    // @ts-expect-error Argument of type 'number' is not assignable to parameter of type 'string'.
    fuzzyMatch(1, "text")

    // @ts-expect-error Argument of type 'number' is not assignable to parameter of type 'string'.
    fuzzyMatch("a")(1)
  })
})
