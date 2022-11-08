export type Length<T extends any[]> = T["length"]

export type First<T extends any[]> = T extends [first: infer O, ...rest: any[]]
  ? O
  : never

export type Last<T extends any[]> = T extends [...rest: any[], last: infer O]
  ? O
  : never

export type DropFirst<T extends any[]> = T extends [
  first: any,
  ...rest: infer O
]
  ? O
  : T

export type DropLast<T extends any[]> = T extends [...rest: infer O, last: any]
  ? O
  : never

export type Top<I extends any[]> = I extends [...top: infer O, last: any]
  ? O
  : never

export type Rest<I extends any[]> = I extends [first: any, ...rest: infer O]
  ? O
  : never
