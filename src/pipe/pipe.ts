/**
 * Performs left-to-right function composition. The leftmost function may have
 * any arity, the remaining functions must be unary.
 *
 * @param {Function}   firstFn First function in transform chain
 * @param {Function[]} restFn  Remaining functions
 * @param {Array}      input   First function arguments
 *
 * @returns {any}
 *
 * @name pipe
 * @tag Core
 * @signature (...fn: Function[]) => (...input: Array): any
 *
 * @see {@link pipeP}
 *
 * @example
 * pipe(inc, inc)(2)
 * // => 4
 */

interface Pipe {
  <I extends unknown[], O>(...chain: [Morphism<I, O>]): (...input: I) => O

  <I extends unknown[], O, T1>(
    ...chain: [Morphism<I, T1>, UnaryMorphism<T1, O>]
  ): (...input: I) => O

  <I extends unknown[], O, T1, T2>(
    ...chain: [Morphism<I, T1>, UnaryMorphism<T1, T2>, UnaryMorphism<T2, O>]
  ): (...input: I) => O
}

// type Pipe = <Fns extends SomeFn[]>(
//   ...fns: Fns
// ) => (...params: Parameters<FirstOf<Fns>>) => ReturnType<LastOf<Fns>>

export const pipe: Pipe =
  (...fns) =>
  (...input) => {
    let result = fns[0](...input)

    for (let index = 1, length = fns.length; index < length; index++) {
      result = fns[index](result)
    }

    return result
  }
