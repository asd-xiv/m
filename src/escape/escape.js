import { curry } from "../curry/curry"

const _escape = (match, source) => source.replace(match, "\\$&")

export const escape = curry(_escape)
