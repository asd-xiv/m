import { type } from "../type/type.js"

type FuzzyMatch = {
  /** How well the query matches the text. Higher is better */
  score: number
  /** The index in the text of each query letter, in query order */
  indexes: number[]
}

type FuzzyMatchFn = {
  (query: string, text: string): FuzzyMatch | undefined
  (query: string): (text: string) => FuzzyMatch | undefined
}

// Each matched letter
const SCORE_MATCH = 16
// A letter on the first index of the text
const BONUS_TEXT_START = 10
// A letter after a space, `-`, `_`, `/` or `.`
const BONUS_WORD_START = 8
// An upper case letter after a lower case one, eg. `B` in `CodeBlock`
const BONUS_CAMEL_HUMP = 7
// A letter right after the previous matched letter
const BONUS_CONSECUTIVE = 4
// The first query letter counts its bonus this many times
const FIRST_LETTER_MULTIPLIER = 2
// The first letter a gap skips
const PENALTY_GAP_START = 3
// Each further letter a gap skips
const PENALTY_GAP_EXTENSION = 1
// Each letter of the text, so a shorter text wins a tie
const PENALTY_TEXT_LENGTH = 0.25

const WORD_SEPARATORS = new Set([" ", "-", "_", "/", "."])

const isLowerCase = (letter: string) => letter !== letter.toUpperCase()

const isUpperCase = (letter: string) => letter !== letter.toLowerCase()

const scoreBonus = (text: string, index: number): number => {
  if (index === 0) {
    return BONUS_TEXT_START
  }

  const previous = text.charAt(index - 1)

  if (WORD_SEPARATORS.has(previous)) {
    return BONUS_WORD_START
  }

  return isLowerCase(previous) && isUpperCase(text.charAt(index))
    ? BONUS_CAMEL_HUMP
    : 0
}

const pickBest = (
  a: FuzzyMatch | undefined,
  b: FuzzyMatch | undefined
): FuzzyMatch | undefined => {
  if (a === undefined) {
    return b
  }

  if (b === undefined) {
    return a
  }

  return b.score > a.score ? b : a
}

const _fuzzyMatch = (query: string, text: string): FuzzyMatch | undefined => {
  if (typeof text !== "string") {
    throw new TypeError(
      `@asd14/m/fuzzyMatch: expected 'text' to be 'String', got '${type(text)}'`
    )
  }

  if (query === "") {
    return { score: 0, indexes: [] }
  }

  /*
   * A row per query letter, a cell per text index. A cell contains the best
   * match of the query up to this letter, with this letter on this index
   */
  let row: (FuzzyMatch | undefined)[] = []

  for (let queryIndex = 0; queryIndex < query.length; queryIndex++) {
    const letter = query.charAt(queryIndex).toLowerCase()
    const previousRow = row
    // The best cell of the previous row that leaves a gap before this index,
    // its score minus the penalty of that gap
    let gap: FuzzyMatch | undefined

    row = []

    for (let textIndex = 0; textIndex < text.length; textIndex++) {
      const opening = previousRow[textIndex - 2]

      gap = pickBest(
        gap && {
          score: gap.score - PENALTY_GAP_EXTENSION,
          indexes: gap.indexes,
        },
        opening && {
          score: opening.score - PENALTY_GAP_START,
          indexes: opening.indexes,
        }
      )

      if (text.charAt(textIndex).toLowerCase() !== letter) {
        continue
      }

      const bonus = scoreBonus(text, textIndex)

      if (queryIndex === 0) {
        row[textIndex] = {
          score: SCORE_MATCH + bonus * FIRST_LETTER_MULTIPLIER,
          indexes: [textIndex],
        }
        continue
      }

      const consecutive = previousRow[textIndex - 1]
      const best = pickBest(
        consecutive && {
          score: consecutive.score + Math.max(bonus, BONUS_CONSECUTIVE),
          indexes: consecutive.indexes,
        },
        gap && { score: gap.score + bonus, indexes: gap.indexes }
      )

      row[textIndex] = best && {
        score: best.score + SCORE_MATCH,
        indexes: [...best.indexes, textIndex],
      }
    }
  }

  let best: FuzzyMatch | undefined

  for (let index = 0, length = row.length; index < length; index++) {
    best = pickBest(best, row[index])
  }

  return (
    best && {
      score: best.score - text.length * PENALTY_TEXT_LENGTH,
      indexes: best.indexes,
    }
  )
}

/**
 * Match a query against a text, as fzf does: the query letters appear in the
 * text in order, case-insensitive, with any letters between them. Picks the
 * placement of the letters with the best score, not the first one. Returns
 * `undefined` when the text does not match.
 *
 * Scores higher: consecutive letters, a letter at the start of the text, at a
 * word start or at a camelCase hump, and a shorter text. Scores lower: each
 * gap between two letters.
 *
 * Input is never mutated.
 *
 * @param {string} query - Letters to find, in order
 * @param {string} text - Text to search
 *
 * @returns {FuzzyMatch|undefined} Score and the index of each letter
 *
 * @example
 * fuzzyMatch("cb", "CodeBlock")
 * // => { score: 51.75, indexes: [0, 4] }
 *
 * fuzzyMatch("xz", "CodeBlock")
 * // => undefined
 *
 * fuzzyMatch("")("CodeBlock")
 * // => { score: 0, indexes: [] }
 *
 * pipe(
 *   map(fuzzyMatch("cb")),
 *   filter(isSomething)
 * )(["CodeBlock", "Tag"])
 * // => [{ score: 51.75, indexes: [0, 4] }]
 *
 * @name fuzzyMatch
 * @tag String
 */
const fuzzyMatch = ((...params: unknown[]) => {
  const query = params[0]

  if (typeof query !== "string") {
    throw new TypeError(
      `@asd14/m/fuzzyMatch: expected 'query' to be 'String', got '${type(query)}'`
    )
  }

  // @signature (query) => (text)
  if (params.length === 1) {
    return (text: string) => _fuzzyMatch(query, text)
  }

  // @signature (query, text)
  return _fuzzyMatch(query, params[1] as string)
}) as FuzzyMatchFn

export { fuzzyMatch }
export type { FuzzyMatch, FuzzyMatchFn }
