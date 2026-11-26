import { any } from "../any/any"
import { curry } from "../curry/curry"
import { filter } from "../filter/filter"
import { isDeepEqual } from "../deep-equal/deep-equal"

const _intersection = (aList, bList) => {
  if (bList.length === 0) {
    return []
  }

  return filter(source => any(isDeepEqual(source), bList), aList)
}

export const intersection = curry(_intersection)
