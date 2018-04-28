/**
 * Return an array of constructor function names based on the prototype chain
 *
 * @param {Object} obj - Source object
 * @param {string[]} acc - Accumulator array
 *
 * @returns {string[]}
 */
const protoChain = ( obj, acc = [] ) => {
  const proto = Object.getPrototypeOf( obj )

  return proto
    ? protoChain( proto, [ ...acc, proto.constructor.name ] )
    : acc
}
