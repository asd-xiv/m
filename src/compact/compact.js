import { forEach } from "../for-each/for-each"
import { is } from "../is/is"
import { map } from "../map/map"
import { filter } from "../filter/filter"
import { curry } from "../curry/curry"

const _compactObject = source => {
  const result = { ...source }

  forEach(key => {
    if (!is(result[key])) {
      delete result[key]
    }
  }, Object.keys(result))

  return result
}

const _compactArray = source => filter(is, source)

const _compact = source => {
  const type = Array.isArray(source) ? "array" : typeof source

  switch (type) {
    case "array":
      return _compactArray(source)

    case "object":
      return _compactObject(source)

    default:
      return source
  }
}

const _compactMany = source => map(item => _compact(item), source)

export const compact = curry(_compact)

export const compactMany = curry(_compactMany)
