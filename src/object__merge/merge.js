/**
 * Combine from left to right, 2 or more objects into a new single one.
 * Properties will be shallow copied. Those with the same name will be
 * overwriten by right most object.
 *
 * @tag Object
 * @signature ( ...source: Object[] ): Object
 *
 * @param   {Object[]}  source  Array of objects
 *
 * @return  {Object}
 *
 * @example
 * merge({a: "lorem"}, {b: "ipsum", c: 41}, {c: 42})
 * // => { a: "lorem", b: "ipsum", c: 42 }
 */
module.exports = ( ...source ) =>
  Object.assign( {}, ...source )
