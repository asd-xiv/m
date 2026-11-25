export type Length<T extends unknown[]> = T["length"]

export type First<T extends unknown[]> = T extends [
  first: infer O,
  ...rest: unknown[],
]
  ? O
  : never

export type Last<T extends unknown[]> = T extends [
  ...rest: unknown[],
  last: infer O,
]
  ? O
  : never

export type DropFirst<T extends unknown[]> = T extends [
  first: unknown,
  ...rest: infer O,
]
  ? O
  : T

export type DropLast<T extends unknown[]> = T extends [
  ...rest: infer O,
  last: unknown,
]
  ? O
  : never

export type Top<I extends unknown[]> = I extends [
  ...top: infer O,
  last: unknown,
]
  ? O
  : never

export type Rest<I extends unknown[]> = I extends [
  first: unknown,
  ...rest: infer O,
]
  ? O
  : never
