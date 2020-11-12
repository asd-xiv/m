import { curry } from "../curry/curry"

const _mutate = (transformations, source) => {
  const entries = Object.entries(transformations)
  const result = { ...source }

  for (const [key, value] of entries) {
    if (source.hasOwnProperty(key)) {
      result[key] = typeof value === "function" ? value(source[key]) : value
    }
  }

  return result
}

export const mutate = curry(_mutate)
