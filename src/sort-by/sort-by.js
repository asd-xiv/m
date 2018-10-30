/**
 * Sort an array of objects by a custom field
 *
 * @tag Array
 * @signature ( field: string, direction: string ) => ( source: Array ): Array
 *
 * @param  {string}  field      Sort field name
 * @param  {string}  direction  Sort direction
 * @param  {Array}   source     Input array
 *
 * @return {Array}
 *
 * @example
 * sortBy( "position" )( [
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
module.exports = (field, direction = "asc") => source => {
  const result = [...source]
  const valueIfFieldMissing =
    direction === "asc" ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY

  return result.sort((alice, bob) => {
    const aliceValue = alice[field] || valueIfFieldMissing
    const bobValue = bob[field] || valueIfFieldMissing

    return alice[field] === null && typeof bob[field] === "undefined"
      ? -1
      : aliceValue < bobValue
        ? direction === "asc"
          ? -1
          : 1
        : direction === "asc"
          ? 1
          : -1
  })
}
