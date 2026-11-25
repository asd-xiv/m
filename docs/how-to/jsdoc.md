# JSDoc

JSDoc is the first thing a user sees, in their editor tooltip, before they open
the source file or read the online docs. Write it as a quick-start guide. What
does this function do, what goes in, what comes out, how to use it.

## Full example

```ts
/**
 * Split an array into two groups based on a predicate function or a chain
 * of predicates. Returns a tuple where the first element contains items
 * that satisfy the predicate and the second contains the rest.
 *
 * Input is never mutated, always returns a new tuple of new arrays.
 *
 * @param {Function|Array} fn - Predicate function or pipe chain
 * @param {Array} input - Array to partition
 *
 * @returns {[Array, Array]} Tuple of [pass, fail] arrays
 *
 * @example
 * partition(x => x % 2 === 0, [1, 2, 3, 4, 5])
 * // => [[2, 4], [1, 3, 5]]
 *
 * partition(x => x > 3)([1, 2, 3, 4, 5])
 * // => [[4, 5], [1, 2, 3]]
 *
 * partition([read("comments"), isSomething], items)
 * // => [[{ id: 1, comments: [] }], [{ id: 2 }]]
 *
 * pipe(
 *   partition(x => x > 0),
 *   first
 * )([-1, 2, -3, 4])
 * // => [2, 4]
 *
 * @name partition
 * @tag Array
 *
 * @see {@link partitionWith}
 * @see {@link filter}
 * @see {@link filterWith}
 */
```

## Conventions

### Description

- One-line summary of what the function does
- Mention immutability: "Input is never mutated - always returns a new ..." This
  is a core library guarantee and users should see it without digging into the
  source

### `@param` and `@returns`

- Include type in braces and the parameter name
- Keep descriptions short, the examples do the heavy lifting

### `@example`

Examples are ordered by complexity, each one teaching a new calling convention:

1. **Uncurried** - simplest call, plain function + input
2. **Curried** - same function, split into two calls
3. **Predicate pipe / advanced** - shows composition with other primitives
4. **`pipe` integration** - always last, shows how the function fits in a
   pipeline

Each example shows the concrete return value as a `// =>` comment. The user
should be able to read the examples top-to-bottom and understand every way to
call the function.

### `@see`

Reference **semantically related** functions only, siblings and variants that
the user might reach for next:

```ts
// Good - "if partition doesn't fit, maybe filter or filterWith does"
@see {@link partitionWith}
@see {@link filter}

// Bad - pipe is a general utility, not a related function
@see {@link pipe}
```

### `@name` and `@tag`

- `@name` matches the exported function name
- `@tag` categorizes by what the function takes as input: `Function`,
  `Any value`, `Array`, `Object`, `String`, `Number`, `Type guard`. The same
  groups head `documentation.yml` and the sections of `src/index.ts`
