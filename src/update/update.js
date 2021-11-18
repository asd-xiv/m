import { map } from "../map/map.js"
import { isMatch } from "../is-match/is-match.js"

const _update = (transformations, input) => {
  const entries = Object.entries(transformations)
  const result = { ...input }

  for (const [key, value] of entries) {
    result[key] = typeof value === "function" ? value(input[key], input) : value
  }

  return result
}

const _updateWith = (filter, transformations, input) => {
  const result = []

  for (let i = 0, length = input.length; i < length; ++i) {
    const item = input[i]
    const shouldMutate = isMatch(filter, item)

    result.push(shouldMutate ? _update(transformations, item) : item)
  }

  return result
}

const _updateMany = (transformations, input) =>
  map(item => _update(transformations, item), input)

export const update = (...params) => {
  // @signature (transformations) => (source)
  if (params.length <= 1) {
    return input => _update(params[0], input)
  }

  // @signature (transformations, source)
  return _update(...params)
}

export const updateMany = (...params) => {
  // @signature (transformations) => (source)
  if (params.length <= 1) {
    return input => _updateMany(params[0], input)
  }

  // @signature (transformations, source)
  return _updateMany(...params)
}

export const updateWith = (...params) => {
  // @signature (filter, transformations) => (source)
  if (params.length <= 2) {
    return input => _updateWith(params[0], params[1], input)
  }

  // @signature (filter, transformations, source)
  return _updateWith(...params)
}
