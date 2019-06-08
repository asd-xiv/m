import { findIndexWith } from "../find-index/find-index"

const upsert = (filter, value) => source => {
  const result = [...source]
  const index = findIndexWith(filter)(source)

  if (index === -1) {
    result.push(value)
  } else {
    result.splice(index, 1, value)
  }

  return result
}

export { upsert }
