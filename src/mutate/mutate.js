import { map } from "../map/map"
import { pipe } from "../pipe/pipe"
import { isMatch } from "../is-match/is-match"

const _mutate = (transformations, source) => {
  const entries = Object.entries(transformations)
  const result = { ...source }

  for (const [key, value] of entries) {
    if (source.hasOwnProperty(key)) {
      const transform = Array.isArray(value) ? pipe(...value) : value

      result[key] =
        typeof transform === "function"
          ? transform(source[key], source)
          : transform
    }
  }

  return result
}

const _mutateWith = (filter, transformations, source) => {
  const result = []

  for (let i = 0, length = source.length; i < length; ++i) {
    const item = source[i]
    const shouldMutate = isMatch(filter, item)

    result.push(shouldMutate ? _mutate(transformations, item) : item)
  }

  return result
}

const _mutateMany = (transformations, source) =>
  map(item => _mutate(transformations, item), source)

export const mutate = (...params) => {
  // @signature (transformations) => (source)
  if (params.length <= 1) {
    return source => _mutate(params[0], source)
  }

  // @signature (transformations, source)
  return _mutate(...params)
}

export const mutateMany = (...params) => {
  // @signature (transformations) => (source)
  if (params.length <= 1) {
    return source => _mutateMany(params[0], source)
  }

  // @signature (transformations, source)
  return _mutateMany(...params)
}

export const mutateWith = (...params) => {
  // @signature (filter, transformations) => (source)
  if (params.length <= 2) {
    return source => _mutateWith(params[0], params[1], source)
  }

  // @signature (filter, transformations, source)
  return _mutateWith(...params)
}
