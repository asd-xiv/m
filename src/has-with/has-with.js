const has = require("../has/has")

/**
 * Check if input has objects with certain properties
 *
 * @param  {Object}   filterObj  The filters
 * @param  {Array}    source     Source input array
 *
 * @return {boolean}
 *
 * @tag Array
 * @signature (filterObj: Object) => (source: Array): boolean
 *
 * @example
 * hasWith( { id: 2 } )( [ { id: 2, title: "todo #1"} ] )
 * // => true
 * hasWith( { id: 2 } )( [ { id: 3, title: "todo #2"} ] )
 * // => false
 */
module.exports = filterObj => source => {
  if (source.length === 0) {
    return false
  }

  const filterEntries = Object.entries(filterObj)

  for (let i = 0, length = filterEntries.length; i < length; i++) {
    const [key, value] = filterEntries[i]

    if (!has(hasSourceElm => hasSourceElm[key] === value)(source)) {
      return false
    }
  }

  return true
}
