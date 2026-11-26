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

/*
 * fuzzyMatch fills a table: a row per query letter, a cell per text index. A
 * cell holds the best placement of the query up to its letter, with that
 * letter on its index. The best cell of the last row is the answer, and the
 * links back through the rows give its indexes
 */

// A matched letter: its score so far, its index in the text, and the cell of
// the letter before it. A link, not a copy of the indexes before it
type Cell = {
  score: number
  index: number
  previous: Cell | undefined
}

type Row = (Cell | undefined)[]

// The best cell of the row before that a gap can start from, and its score
// minus the penalty of the gap so far. One per row, updated as the scan moves
// right, so the scan builds no object per text index
type Gap = {
  cell: Cell | undefined
  score: number
}

const widenGap = (gap: Gap, opening: Cell | undefined): void => {
  // Each index the gap already spans costs a little more
  if (gap.cell) {
    gap.score -= PENALTY_GAP_EXTENSION
  }

  // A cell two indexes back can start a new gap. On a tie, the open gap stays
  if (opening && (!gap.cell || opening.score - PENALTY_GAP_START > gap.score)) {
    gap.cell = opening
    gap.score = opening.score - PENALTY_GAP_START
  }
}

// The first query letter: no letter before it to link to
const startCell = (text: string, index: number): Cell => ({
  score: SCORE_MATCH + scoreBonus(text, index) * FIRST_LETTER_MULTIPLIER,
  index,
  previous: undefined,
})

// A later query letter links to the letter before it: right before this
// index, or across the gap. On a tie, the consecutive letter wins
const extendCell = (
  text: string,
  index: number,
  consecutive: Cell | undefined,
  gap: Gap
): Cell | undefined => {
  if (!consecutive && !gap.cell) {
    return undefined
  }

  const bonus = scoreBonus(text, index)
  const consecutiveScore = consecutive
    ? consecutive.score + Math.max(bonus, BONUS_CONSECUTIVE)
    : Number.NEGATIVE_INFINITY
  const gapScore = gap.cell ? gap.score + bonus : Number.NEGATIVE_INFINITY
  const isGapBetter = gapScore > consecutiveScore

  return {
    score: (isGapBetter ? gapScore : consecutiveScore) + SCORE_MATCH,
    index,
    previous: isGapBetter ? gap.cell : consecutive,
  }
}

// The row of one query letter, from the row of the letter before it. Returns
// undefined when the letter matches nowhere. `lowerText` is the text in lower
// case, when lowering kept its length
const matchLetter = (
  letter: string,
  text: string,
  lowerText: string | undefined,
  previousRow: Row,
  isFirstLetter: boolean
): Row | undefined => {
  const row: Row = []
  const gap: Gap = { cell: undefined, score: 0 }
  // A letter whose lower case is 2 code units, eg. "İ", cannot equal one
  // character of a text that kept its length in lower case
  const letterCode = letter.length === 1 ? letter.charCodeAt(0) : -1
  let hasCell = false

  for (let index = 0, length = text.length; index < length; index++) {
    widenGap(gap, previousRow[index - 2])

    const isMatch = lowerText
      ? lowerText.charCodeAt(index) === letterCode
      : text.charAt(index).toLowerCase() === letter

    if (!isMatch) {
      continue
    }

    const cell = isFirstLetter
      ? startCell(text, index)
      : extendCell(text, index, previousRow[index - 1], gap)

    if (cell) {
      row[index] = cell
      hasCell = true
    }
  }

  return hasCell ? row : undefined
}

// On a tie, keeps `a`: the placement found first
const pickBest = (a: Cell | undefined, b: Cell | undefined) =>
  !a || (b && b.score > a.score) ? b : a

// The text index of each letter, following the links back from `cell`
const toIndexes = (cell: Cell): number[] => {
  const indexes: number[] = []
  let current: Cell | undefined = cell

  while (current) {
    indexes.push(current.index)
    current = current.previous
  }

  return indexes.reverse()
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

  // Each query letter needs its own index in the text
  if (query.length > text.length) {
    return undefined
  }

  // Lower the text once and compare character codes: about a quarter faster
  // for a short query over many texts. A text whose lower case has another
  // length, eg. one with "İ", compares letter by letter, so each index still
  // points into the text
  const lowered = text.toLowerCase()
  const lowerText = lowered.length === text.length ? lowered : undefined

  let row: Row = []

  for (let queryIndex = 0; queryIndex < query.length; queryIndex++) {
    const letter = query.charAt(queryIndex).toLowerCase()
    const nextRow = matchLetter(letter, text, lowerText, row, queryIndex === 0)

    // This letter matched nowhere, so the rest of the query cannot match
    if (!nextRow) {
      return undefined
    }

    row = nextRow
  }

  let best: Cell | undefined

  for (const cell of row) {
    best = pickBest(best, cell)
  }

  return (
    best && {
      score: best.score - text.length * PENALTY_TEXT_LENGTH,
      indexes: toIndexes(best),
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
 * The time grows with the query length times the text length: cap a query
 * from untrusted input, eg. at 100 letters.
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
