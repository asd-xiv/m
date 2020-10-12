import { curry } from "../curry/curry"
import { is } from "../is/is"

const _hasKey = (key, source) =>
  is(source) && Object.prototype.hasOwnProperty.call(source, key)

export const hasKey = curry(_hasKey)
