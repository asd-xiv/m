import { findIndexWith } from "../find-index/find-index.js"
import { update } from "../update/update.js"

const upsertWith = (filter, value) => input => {
  const result = [...input]
  const index = findIndexWith(filter, input)

  if (index === -1) {
    result.push(update(value, {}))
  } else {
    const previous = result[index]

    result.splice(index, 1, update(value, previous))
  }

  return result
}

export { upsertWith }
