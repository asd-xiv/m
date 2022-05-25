import { any } from "../any/any.js"
import { curry } from "../curry/curry.js"
import { pipe } from "../pipe/pipe.js"
import { compact } from "../compact/compact.js"
import { isEmpty } from "../is-empty/is-empty.js"

const _sliceKeys = (keysToSlice, input) => {
  if (isEmpty(keysToSlice) || isEmpty(input)) {
    return {}
  }

  const result = {}
  const objectKeys = Object.keys(input)
  const keys = Array.isArray(keysToSlice) ? keysToSlice : [keysToSlice]
  const sliceable = pipe(compact)(keys)

  for (const key of objectKeys) {
    if (any(key)(sliceable)) {
      result[key] = input[key]
    }
  }

  return result
}

const sliceKeys = curry(_sliceKeys)

export { sliceKeys }
