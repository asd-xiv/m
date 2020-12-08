import { findIndexWith } from "../find-index/find-index"
import { update } from "../update/update"

const upsertWith = (filter, value) => source => {
  const result = [...source]
  const index = findIndexWith(filter, source)

  if (index === -1) {
    result.push(value)
  } else {
    const prev = result[index]

    result.splice(index, 1, update(value, prev))
  }

  return result
}

export { upsertWith }
