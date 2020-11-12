import { is } from "../is/is"

/**
 * Sort array using custom function
 *
 * @param {Function} fn     Sort function
 * @param {Array}    source Array
 *
 * @returns {Array}
 *
 * @tag Array
 * @signature ( fn: Function ) => ( source: Array ): Array
 *
 * @example
 * sort((a,b) => a.id-b.id)([{id:2}, {id: 1}])
 * // => [{id:1}, {id: 2}]
 */
const sort = fn => source => [...source].sort(fn)

/**
 * Sort an array of objects by a custom field
 *
 * @tag Array
 * @signature ( field: string, direction: string ) => ( source: Array ): Array
 *
 * @param {string} field     Sort field name
 * @param {string} direction Sort direction
 * @param {Array}  source    Input array
 *
 * @returns {Array}
 *
 * @example
 * sortWith( "position" )( [
 *   { id: 1, position: 3 },
 *   { id: 2, position: 2 },
 *   { id: 3 },
 *   { id: 4, position: 5 },
 *   { id: 5, position: null },
 * ] )
 * // [
 * //  { id: 2, position: 2 },
 * //  { id: 1, position: 3 },
 * //  { id: 4, position: 5 },
 * //  { id: 5, position: null },
 * //  { id: 3 },
 * //]
 */
const sortWith = (field, direction = "asc") => {
  const valueIfFieldMissing =
    direction === "asc" ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY

  return sort((a, b) => {
    const aValue = is(a[field]) ? a[field] : valueIfFieldMissing
    const bValue = is(b[field]) ? b[field] : valueIfFieldMissing

    return a[field] === null && b[field] === undefined
      ? -1
      : b[field] === null && a[field] === undefined
      ? 1
      : aValue < bValue
      ? direction === "asc"
        ? -1
        : 1
      : direction === "asc"
      ? 1
      : -1
  })
}

export { sort, sortWith }
