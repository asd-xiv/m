<!-- markdownlint-disable first-line-h1 line-length -->

[![CircleCI](https://circleci.com/gh/asd-xiv/m.svg?style=svg)](https://circleci.com/gh/asd-xiv/m)
[![npm version](https://badge.fury.io/js/%40asd14%2Fm.svg)](https://badge.fury.io/js/%40asd14%2Fm)
[![Coverage Status](https://coveralls.io/repos/github/asd-xiv/m/badge.svg)](https://coveralls.io/github/asd-xiv/m)

# m

> [Point free](https://en.wikipedia.org/wiki/Tacit_programming) style, functional library for Javascript with focus on object arrays.

---

<!-- vim-markdown-toc GFM -->

- [Install](#install)
- [Use](#use)
- ["With" pattern](#with-pattern)
- [|> pipe](#-pipe)
- [Develop](#develop)
- [Changelog](#changelog)

<!-- vim-markdown-toc -->

## Install

```bash
npm install @asd14/m
```

## Use

```js
import { pipe, trim, split, dropLast, push, join } from "@asd14/m"

const removeTrailingSlash = source =>
  source[source.length - 1] === sep ? source.slice(0, -1) : source

const renameFile = newName => pipe(
  removeTrailingSlash,
  split(sep),
  dropLast,
  push(trim(sep, newName)),
  join(sep)
)
```

## "With" pattern

Some functions have a `*With` variant. `find` has `findWith`, `filter` has `filterWith` etc. They allow for less boilerplate and more intuitive way of handling object arrays.

```js
import { find, findWith, filterWith, not, is } from "@asd14/m"

const todos = [
  {id: 1, name: "lorem", tagId: 2,},
  {id: 2, name: "ipsum", tagId: null},
  {id: 3, name: "dolor", tagId: null},
]
```

```js
/* Predicate fn */
find(
  item => item.id === 1,
  todos
)
// => {id: 1, name: "lorem", tagId: 2}

/* Matching object */
findWith(
  {
    "id": 1
  },
  todos
)
// => {id: 1, name: "lorem", tagId: 2}

/* Matching object & predicate fn */
filterWith(
  {
    "tagId": is // same as `tagId: source => is(source)`
  },
  todos
)
// => [{id: 1, name: "lorem", tagId: 2}]

/* Syntactic sugar */
filterWith(
  {
    "!tagId": is // same as `tagId: not(is)`
  },
  todos
)
// => [
//  {id: 2, name: "ipsum", tagId: null},
//  {id: 3, name: "dolor", tagId: null}
// ]
```

## |> pipe

There is no _structure_ difference between `pipe` and `compose`, both will use the same building blocks to get from A to B.

A series of transformations over an initial input can be written as `x -> f -> g -> result`, _piping_, or as `result = g(f(x))`, _composing_. The difference is only _syntactic_. Input is the same, transformations **and** order of application are the same, the result will be the same.

Given that:

- we read from left to right
- [left/back is in the past, right/front is the future](https://medium.com/@cwodtke/the-intuitive-and-the-unlearnable-cccffd9a762)
- a lot of piping going on in your terminal

it makes sense to choose the _syntax_ more aligned with our intuition and context. The transformations are applied in a certain order with time as a medium - `input -> t0 -> t1 -> tn -> output`.

```js
const { sep } = require("path")
const { pipe, compose, join, push, dropLast, split } = require("@asd14/m")

// Compose: g(f(x))
const renameFile = newName => filePath =>
  compose(
    join(sep), push(newName), dropLast, split(sep)
  )(filePath)

// Pipe: x -> f -> g
const renameFile = newName => filePath =>
  pipe(
    split(sep), dropLast, push(newName), join(sep)
  )(filePath)

// More expressive with pipeline operator
const renameFile = newName => filePath =>
  filePath |> split(sep) |> dropLast |> push(newName) |> join(sep)
```

## Develop

```bash
git clone git@github.com:asd14-xyz/m.git && \
  cd m && \
  npm run setup

# run tests (any `*.test.js`) once
npm test

# watch `src` folder for changes and run test automatically
npm run tdd
```

## Changelog

See the [releases section](https://github.com/asd14-xyz/m/releases) for details.
