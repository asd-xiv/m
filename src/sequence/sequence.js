import { is } from "../is/is"

const alwaysTrue = () => true

export const sequenceWhile = (predicateFn, source) => {
  if (typeof predicate !== "function") {
    throw new TypeError(
      `Invalid predicate control function. Expected function but got "${JSON.stringify(
        predicateFn
      )}"`
    )
  }

  if (
    !Array.isArray(source) ||
    (Array.isArray(source) && source.length === 0)
  ) {
    throw new TypeError(
      `Invalid source array. Expected array of functions but got "${JSON.stringify(
        source
      )}"`
    )
  }

  let index = 0
  const resolved = []

  const queueNext = promise =>
    promise.then(result => {
      resolved.push(result)

      if (predicateFn(result) === true) {
        const nextPromiseFn = source[++index]

        if (is(nextPromiseFn)) {
          return queueNext(Promise.resolve(nextPromiseFn(result)))
        }

        // no more functions to process
        return resolved
      }

      // predicate function failed, return what already resolved and stop
      // processing further
      return resolved
    })

  return queueNext(Promise.resolve(source[0]()))
}

export const sequence = source => sequenceWhile(alwaysTrue, source)
