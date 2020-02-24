import { is } from "../is/is"

const alwaysTrue = () => true

export const sequenceWhile = (predicate, source) => {
  if (typeof predicate !== "function") {
    throw new TypeError(
      `Invalid predicate control function. Expected function but got "${JSON.stringify(
        predicate
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

      if (predicate(result) === true) {
        const nextPromiseFn = source[++index]

        if (is(nextPromiseFn)) {
          return queueNext(Promise.resolve(nextPromiseFn(result)))
        }

        // no more promise fn to process
        return resolved
      }

      // control function failed, return what was successfully resolved
      return resolved
    })

  return queueNext(Promise.resolve(source[0]()))
}

export const sequence = source => sequenceWhile(alwaysTrue, source)
