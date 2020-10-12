import { curry } from "../curry/curry"

export const escape = curry((match, source) => source.replace(match, "\\$&"))
