import { is } from "../is/is"

const _hasKey = (key, source) =>
  is(source) && Object.prototype.hasOwnProperty.call(source, key)

export const hasKey = (...params) => {
  // @signature (key) => (source)
  if (params.length <= 1) {
    return source => _hasKey(params[0], source)
  }

  // @signature (key, source)
  return _hasKey(...params)
}
