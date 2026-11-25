[![npm version](https://badge.fury.io/js/%40asd14%2Fm.svg)](https://badge.fury.io/js/%40asd14%2Fm)
![coverage](https://img.shields.io/badge/coverage-100%25-brightgreen)

# @asd14/m

> [Point free](https://en.wikipedia.org/wiki/Tacit_programming) style,
> functional library for JavaScript, with native TypeScript support and focus on
> object arrays.

- :evergreen_tree: **Immutable** - functions return new data, input is never
  mutated
- :link: **Dual signature** - `sort("desc", items)` (uncurried) or
  `sort("desc")(items)` (curried)
- :brain: **TypeScript** - smart sounding names like `UnaryMorphism` and
  other-worldly psychedelic types like
  [`ConvergeFn`](src/converge/converge.ts#L5)
- :shield: **100% test code coverage + type tests** via
  [tstyche](https://github.com/tstyche/tstyche)
- :boom: **Runtime validation** - Broken pipes say
  `@asd14/m/sort: expected 'input' to be 'Array', got 'Undefined'` instead of
  `cannot read property of undefined`
- :book: **Intuition driven** - `first` works on arrays and strings because both
  are ordered sequences

---

<!-- vim-markdown-toc GFM -->

- [Install](#install)
- [Use](#use)
- ["With" pattern](#with-pattern)
- [|> pipe](#-pipe)
  - [An array is a pipe](#an-array-is-a-pipe)
- [Develop](#develop)
- [Contributors](#contributors)
- [Changelog](#changelog)

<!-- vim-markdown-toc -->

## Install

```bash
# humans
npm install @asd14/m
```

```sh
# ai
npx skills add asd-xiv/m/.ai
```

## Use

```js
import { sep } from "node:path"
import { pipe, trim, split, dropLast, push, join } from "@asd14/m"

const removeTrailingSlash = source =>
  source[source.length - 1] === sep ? source.slice(0, -1) : source

const renameFile = newName =>
  pipe(
    removeTrailingSlash,
    split(sep),
    dropLast,
    push(trim({ chars: sep }, newName)),
    join(sep)
  )
```

## "With" pattern

Some functions have a `*With` variant. `find` has `findWith`, `filter` has
`filterWith` etc. They allow for less boilerplate and more intuitive way of
handling object arrays.

```js
import { find, findWith, filterWith, isSomething } from "@asd14/m"

const todos = [
  { id: 1, name: "lorem", tagId: 2 },
  { id: 2, name: "ipsum", tagId: null },
  { id: 3, name: "dolor", tagId: null }
]
```

```js
/* Predicate fn */
find(item => item.id === 1, todos)
// => {id: 1, name: "lorem", tagId: 2}

/* Matching object */
findWith({ id: 1 }, todos)
// => {id: 1, name: "lorem", tagId: 2}

/* Matching object & predicate fn */
filterWith(
  {
    tagId: isSomething // same as `tagId: source => isSomething(source)`
  },
  todos
)
// => [{id: 1, name: "lorem", tagId: 2}]

/* More syntactic sugar */
filterWith(
  {
    "!tagId": isSomething // same as `tagId: source => !isSomething(source)`
  },
  todos
)
// => [
//  {id: 2, name: "ipsum", tagId: null},
//  {id: 3, name: "dolor", tagId: null}
// ]
```

## |> pipe

There is no _structure_ difference between `pipe` and `compose`, both will use
the same building blocks to get from A to B.

A series of transformations over an initial input can be written as
`x -> f -> g -> result`, _piping_, or as `result = g(f(x))`, _composing_. The
difference is only _syntactic_. Input is the same, transformations **and** order
of application are the same, the result will be the same.

Given that:

- we read from left to right
- [left/back is in the past, right/front is the future](https://medium.com/@cwodtke/the-intuitive-and-the-unlearnable-cccffd9a762)
- a lot of piping going on in your terminal or your CI _pipelines_

It makes sense to choose the _syntax_ more aligned with our intuition and
context. The transformations are applied in a certain order with time as a
medium - `input -> t0 -> t1 -> tn -> output`.

```js
const { sep } = require("path")
const { pipe, compose, join, push, dropLast, split } = require("@asd14/m")

// Compose: g(f(x))
const renameFile = newName => filePath =>
  compose(join(sep), push(newName), dropLast, split(sep))(filePath)

// Pipe: x -> f -> g
const renameFile = newName => filePath =>
  pipe(split(sep), dropLast, push(newName), join(sep))(filePath)

// More expressive with pipeline operator
const renameFile = newName => filePath =>
  filePath |> split(sep) |> dropLast |> push(newName) |> join(sep)
```

### An array is a pipe

Where a function takes a function param, it also takes an array of functions and
pipes them. TypeScript types each step from the input, which an inline `pipe()`
cannot do:

```js
filter([read("id"), isEqual(1)], [{ id: 1 }, { id: 2 }])
// => [{ id: 1 }]
```

Why, and what it costs a patcher or a matcher:
[pipe arrays](docs/how-to/pipe-arrays.md).

## Develop

**Rules**:

- Each function in its own folder: `src/<function-name>/`
- Export from `src/index.ts`
- Test code `tape` in collocated `*.test.ts` files
- Test types `tstyche` in collocated `*.tst.ts` files
- 100% coverage enforced via `c8 --100`

**Tools**:

```bash
npm run unit-test       # runtime tests (tape)
npm run type-test       # type tests (tstyche)
npm run typecheck:code  # tsc --noEmit
npm run lint            # eslint
npm run tdd             # watch mode
```

Or targeted:

```bash
npx tsx src/all/all.test.ts      # runtime test
npx tstyche src/all/all.tst.ts   # type test
npx eslint src/all/all.ts        # lint
npx tsc --noEmit src/all/all.ts  # typecheck
```

## Contributors

Thank you for contributing your time and knowledge:

- [David Gil](https://github.com/dgilperez)

## Changelog

See the [releases section](https://github.com/asd-xiv/m/releases) for details.
