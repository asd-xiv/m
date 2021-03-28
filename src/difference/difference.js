import { any } from "../any/any"
import { not } from "../is/is"
import { curry } from "../curry/curry"
import { filter } from "../filter/filter"
import { isDeepEqual } from "../deep-equal/deep-equal"

const _difference = (aList, bList) => {
  if (bList.length === 0) {
    return aList
  }

  return filter(source => not(any(isDeepEqual(source)), bList), aList)
}

export const difference = curry(_difference)
