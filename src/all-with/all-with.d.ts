import { Matcher } from "../is-match/is-match.d.js"

declare function allWith<T extends Record<string, any>>(
  match: Matcher<T>,
  input: T[]
): boolean

declare function allWith<T extends Record<string, any>>(
  match: Matcher<T>
): (input: T[]) => boolean
