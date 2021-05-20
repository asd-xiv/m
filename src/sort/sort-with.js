import { is } from "../is/is"

const _compareTwoValues = (direction, a, b) => {
  const valueIfFieldMissing =
    direction === "asc" ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY
  const aValue = is(a) ? a : valueIfFieldMissing
  const bValue = is(b) ? b : valueIfFieldMissing

  if (a === null && b === undefined) {
    return direction === "desc" ? -1 : 1
  }

  if (a === undefined && b === null) {
    return direction === "desc" ? 1 : -1
  }

  if (aValue === bValue) {
    return 0
  }

  if (aValue < bValue) {
    return direction === "desc" ? 1 : -1
  }

  // aValue > bValue
  return direction === "desc" ? -1 : 1
}

const _validateProps = subset => {
  const sorters = Object.entries(subset)

  for (const [key, sorter] of sorters) {
    const [sortFn, direction = "asc"] = Array.isArray(sorter)
      ? sorter
      : typeof sorter === "function"
      ? [sorter]
      : [undefined, sorter]

    if (direction !== "asc" && direction !== "desc") {
      throw new Error(
        `@asd14/m/sortWith: Unsuported sort direction for key "${key}". Accepting "asc" or "desc", received "${direction}".`
      )
    }

    if (
      typeof sortFn === "function" &&
      (sortFn.length === 0 || sortFn.length > 2)
    ) {
      throw new Error(
        `@asd14/m/sortWith: Unsuported sort function signature for key "${key}". Accepting function with one or two parameters, received ${sortFn.length}.`
      )
    }
  }
}

/**
 * Sort an array of objects by multiple fields
 *
 * @param   {Object} subset
 * @param   {Array}  source
 *
 * @returns {Array}
 *
 * @name sortWith
 * @tag Array
 * @signature (subset: Object, source: Array): Array
 *
 * @see {@link sort}
 * @see {@link sortBy}
 *
 * @example
 * sortWith({position: "asc"},
 *   { id: 1, position: 3 },
 *   { id: 2, position: 2 },
 *   { id: 3 },
 *   { id: 4, position: 5 },
 *   { id: 5, position: null },
 * ])
 * // [
 * //  { id: 2, position: 2 },
 * //  { id: 1, position: 3 },
 * //  { id: 4, position: 5 },
 * //  { id: 5, position: null },
 * //  { id: 3 },
 * //]
 */
export const sortWith = (subset, source) => {
  _validateProps(subset)

  const sorters = Object.entries(subset)

  return [...source].sort((a, b) => {
    for (let i = 0; i < sorters.length; ++i) {
      const [key, sorter] = sorters[i]
      const [sortFn, direction = "asc"] = Array.isArray(sorter)
        ? sorter
        : typeof sorter === "function"
        ? [sorter]
        : [undefined, sorter]
      const isLastSorter = i === sorters.length - 1

      let result

      if (typeof sortFn === "function") {
        // one param, treat as lens: (source) => source.field
        // two params, treas as compare func: (a, b) => a - b

        result =
          sortFn.length === 2
            ? sortFn(a[key], b[key])
            : _compareTwoValues(direction, sortFn(a[key]), sortFn(b[key]))
      } else {
        // { key: "direction" }
        result = _compareTwoValues(direction, a[key], b[key])
      }

      if (result !== 0 || isLastSorter) {
        return result
      }
    }
  })
}
