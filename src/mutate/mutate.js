import { map } from "../map/map"

const _mutateOne = (transformations, source) => {
  const entries = Object.entries(transformations)
  const result = { ...source }

  for (const [key, value] of entries) {
    if (source.hasOwnProperty(key)) {
      result[key] = typeof value === "function" ? value(source[key]) : value
    }
  }

  return result
}

const _mutate = (transformations, source) =>
  Array.isArray(source)
    ? map(item => _mutateOne(transformations, item), source)
    : _mutateOne(transformations, source)

export const mutate = (...params) => {
  // @signature (transformations) => (source)
  if (params.length <= 1) {
    return source => _mutate(params[0], source)
  }

  // @signature (transformations, source)
  return _mutate(...params)
}
