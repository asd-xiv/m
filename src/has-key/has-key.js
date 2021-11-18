import { curry } from "../curry/curry.js"
import { is } from "../is/is.js"

const _hasKey = (key, input) =>
  is(input) && Object.prototype.hasOwnProperty.call(input, key)

export const hasKey = curry(_hasKey)
