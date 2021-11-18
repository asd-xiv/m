/**
 * Return an array of constructor function names based on the prototype chain
 *
 * @param {Object}   input Source input
 * @param {string[]} acc   Accumulator array
 *
 * @returns {string[]}
 *
 * @tag Core
 * @signature (input: Object, acc: string[]): string[]
 */
const protoChain = (input, acc = []) => {
  const proto = Object.getPrototypeOf(input)

  return proto ? protoChain(proto, [...acc, proto.constructor.name]) : acc
}

export { protoChain }
