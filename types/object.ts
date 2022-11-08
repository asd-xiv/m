export type Merge<T, U> = Omit<T, keyof U> & U

export type DeepPartial<T> = { [K in keyof T]?: DeepPartial<T[K]> }
