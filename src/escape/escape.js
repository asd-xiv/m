import { curry } from "../curry/curry.js"

const _escape = (match, input) => input.replace(match, "\\$&")

export const escape = curry(_escape)
