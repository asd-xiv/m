import { map } from "../map/map.js"
import { pipe } from "../pipe/pipe.js"
import { isMatch } from "../is-match/is-match.js"

const _mutate = (transformations, input) => {
  const entries = Object.entries(transformations)
  const result = { ...input }

  for (const [key, value] of entries) {
    if (input.hasOwnProperty(key)) {
      const transform = Array.isArray(value) ? pipe(...value) : value

      result[key] =
        typeof transform === "function"
          ? transform(input[key], input)
          : transform
    }
  }

  return result
}

const _mutateWith = (filter, transformations, input) => {
  const result = []

  for (let i = 0, length = input.length; i < length; ++i) {
    const item = input[i]
    const shouldMutate = isMatch(filter, item)

    result.push(shouldMutate ? _mutate(transformations, item) : item)
  }

  return result
}

const _mutateMany = (transformations, input) =>
  map(item => _mutate(transformations, item), input)

export const mutate = (...params) => {
  // @signature (transformations) => (source)
  if (params.length <= 1) {
    return input => _mutate(params[0], input)
  }

  // @signature (transformations, source)
  return _mutate(...params)
}

export const mutateMany = (...params) => {
  // @signature (transformations) => (source)
  if (params.length <= 1) {
    return input => _mutateMany(params[0], input)
  }

  // @signature (transformations, source)
  return _mutateMany(...params)
}

export const mutateWith = (...params) => {
  // @signature (filter, transformations) => (source)
  if (params.length <= 2) {
    return input => _mutateWith(params[0], params[1], input)
  }

  // @signature (filter, transformations, source)
  return _mutateWith(...params)
}
