import type { AnyMorphism } from "../../types/function.js"

/**
 * Compose functions left to right, without a check. For a caller that checked
 * each function itself, eg. `pipe` and `_toFunction`.
 *
 * @example
 * _pipe([x => x + 1, x => x * 2])(1)
 * // => 4
 */
const _pipe =
  (fns: readonly AnyMorphism[]) =>
  (input: unknown): unknown => {
    let acc: unknown = fns[0]!(input)

    for (let index = 1, length = fns.length; index < length; index++) {
      acc = fns[index]!(acc)
    }

    return acc
  }

export { _pipe }
