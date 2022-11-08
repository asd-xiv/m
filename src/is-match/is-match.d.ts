import { UnaryPredicate } from "../../types/function.js"

export type Matcher<T extends Record<string, any>> = {
  [key in keyof T]?: T[key] extends never
    ? unknown
    : T[key] | UnaryPredicate<T[key]>
}

export function isMatch<T extends Record<string, any>>(
  match: Matcher<T>,
  input: T
): boolean

export function isMatch<T extends Record<string, any>>(
  match: Matcher<T>
): (input: T) => boolean
