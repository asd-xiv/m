import { findIndexWith } from "../find-index/find-index"
import { update } from "../update/update"

const upsertWith = (filter, value) => source => {
  const result = [...source]
  const index = findIndexWith(filter, source)

  if (index === -1) {
    result.push(update(value, {}))
  } else {
    const previous = result[index]

    result.splice(index, 1, update(value, previous))
  }

  return result
}

export { upsertWith }
