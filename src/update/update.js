import { map } from "../map/map"
import { isMatch } from "../is-match/is-match"

const _update = (transformations, source) => {
  const entries = Object.entries(transformations)
  const result = { ...source }

  for (const [key, value] of entries) {
    result[key] =
      typeof value === "function" ? value(source[key], source) : value
  }

  return result
}

const _updateWith = (filter, transformations, source) => {
  const result = []

  for (let i = 0, length = source.length; i < length; ++i) {
    const item = source[i]
    const shouldMutate = isMatch(filter, item)

    result.push(shouldMutate ? _update(transformations, item) : item)
  }

  return result
}

const _updateMany = (transformations, source) =>
  map(item => _update(transformations, item), source)

export const update = (...params) => {
  // @signature (transformations) => (source)
  if (params.length <= 1) {
    return source => _update(params[0], source)
  }

  // @signature (transformations, source)
  return _update(...params)
}

export const updateMany = (...params) => {
  // @signature (transformations) => (source)
  if (params.length <= 1) {
    return source => _updateMany(params[0], source)
  }

  // @signature (transformations, source)
  return _updateMany(...params)
}

export const updateWith = (...params) => {
  // @signature (filter, transformations) => (source)
  if (params.length <= 2) {
    return source => _updateWith(params[0], params[1], source)
  }

  // @signature (filter, transformations, source)
  return _updateWith(...params)
}
