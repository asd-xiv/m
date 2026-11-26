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

const _symmetricDifference = (aList, bList) => {
  if (aList.length === 0) {
    return bList
  }

  if (bList.length === 0) {
    return aList
  }

  const leftSide = filter(source => not(any(isDeepEqual(source)), bList), aList)
  const rightSide = filter(
    source => not(any(isDeepEqual(source)), aList),
    bList
  )

  return [...leftSide, ...rightSide]
}

export const difference = curry(_difference)

export const symmetricDifference = curry(_symmetricDifference)
