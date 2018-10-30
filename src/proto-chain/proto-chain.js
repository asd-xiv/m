/**
 * Return an array of constructor function names based on the prototype chain
 *
 * @param {Object}    source  Source input
 * @param {string[]}  acc     Accumulator array
 *
 * @returns {string[]}
 *
 * @tag Core
 * @signature (source: Object, acc: string[]): string[]
 */
const protoChain = (source, acc = []) => {
  const proto = Object.getPrototypeOf(source)

  return proto ? protoChain(proto, [...acc, proto.constructor.name]) : acc
}

module.exports = protoChain
