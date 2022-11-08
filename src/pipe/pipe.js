/**
 * Performs left-to-right function composition. The leftmost function may have
 * any arity, the remaining functions must be unary.
 *
 * @signature pipe(first: Morphism, ...rest: UnaryMorphism[]) => (...args: any[]) => any
 *
 * @name pipe
 * @tag Core
 *
 * @see {@link pipeP}
 *
 * @example
 * pipe()(2)
 * // => Error: @asd14/m: pipe requires at least one argument
 *
 * // => 3
 * pipe(inc)(2)
 * // => 3
 *
 * pipe(inc, inc)(2)
 * // => 4
 *
 * pipe(sum, inc)(1, 2)
 * // => 4
 */
export const pipe =
  (...fns) =>
  (...input) => {
    if (fns.length === 0) {
      throw new Error("@asd14/m: pipe requires at least one argument")
    }

    const [firstFn, ...restFn] = fns

    let acc = firstFn(...input)

    for (let index = 0, length = restFn.length; index < length; index++) {
      acc = restFn[index](acc)
    }

    return acc
  }
