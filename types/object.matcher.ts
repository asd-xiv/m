import type { PredicatePipe, UnaryPredicate } from "./function.js"
import type { PlainObject } from "./object.js"

/**
 * A match condition applied to a single object key. Either:
 * - a literal value to compare with strict equality
 * - `null` for null-checking
 * - a predicate `(value: V) => boolean`
 * - a pipe chain ending in a predicate (`V → ... → boolean`)
 */
// A plain value is never an array: m reads an array in a function slot as a
// pipe. Match an array with a predicate, eg. `tags => isDeepEqual(tags, ["a"])`
type KeyMatcher<V> =
  Exclude<V, readonly unknown[]> | null | UnaryPredicate<V> | PredicatePipe<V>

/**
 * A map of key-level matchers. Each key maps to a value, predicate,
 * or predicate pipe chain. Supports negation keys prefixed with "!".
 *
 * Used by `isMatch` — tests whether an object satisfies all conditions.
 */
type Matcher<T extends PlainObject> = {
  [K in keyof T]?: T[K] extends never ? unknown : KeyMatcher<T[K]>
} & {
  // Negation keys: prefix a key with "!" to negate the match at runtime.
  // This is a runtime convention, so the type accepts any `!`-prefixed key.
  [key: `!${string}`]: unknown
}

export type { KeyMatcher, Matcher }
