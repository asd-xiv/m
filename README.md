[![npm package version](https://badge.fury.io/js/%40asd14%2Fm.svg)](https://badge.fury.io/js/%40asd14%2Fm)
[![dev-badge](https://david-dm.org/asd14/m.svg)](https://david-dm.org/asd14/m)
[![Coverage Status](https://coveralls.io/repos/github/asd14/m/badge.svg)](https://coveralls.io/github/asd14/m)

# m

> Functional library for Javascript

Changes a lot and not yet complete. Use [Ramda](https://github.com/ramda/ramda) to be safe.

---

<!-- MarkdownTOC levels="2,3" autolink="true" autoanchor="false" -->

- [|> pipe](#%7C-pipe)
- [Install](#install)
- [Develop](#develop)
- [Use](#use)
- [Changelog](#changelog)
    - [0.18.0 - 22 January 2019](#0180---22-january-2019)

<!-- /MarkdownTOC -->

## |> pipe

There is no _structure_ difference between `pipe` and `compose`, both will use the same building blocks to get from A to B.

A series of transformations over an initial input can be written as `x -> f -> g -> result`, _piping_, or as `result = g(f(x))`, _composing_. The difference is only _syntactic_. Input is the same, transformations **and** order of application are the same, the result will be the same.

Given that:

- we read from left to right
- [left/back is in the past, right/front is the future](https://medium.com/@cwodtke/the-intuitive-and-the-unlearnable-cccffd9a762)
- a lot of piping going on in your terminal

it makes sense to choose the _syntactic_ more aligned with our intuition and context. The transformations are applied in a certain order with time as a medium - `input -> t0 -> t1 -> tn -> output`. The way is forward.

```js
const { sep } = require("path")
const { pipe, compose, join, push, dropLast, split } = require("@asd14/m")

// Compose - g(f(x))
const renameFile = newName => filePath =>
  compose(
    join(sep), push(newName), dropLast, split(sep)
  )(filePath)

// Pipe - x -> f -> g
const renameFile = newName => filePath =>
  pipe(
    split(sep), dropLast, push(newName), join(sep) 
  )(filePath)

// Using the pipeline operator, things are more expressive
const renameFile = newName => filePath =>
  filePath |> split(sep) |> dropLast |> push(newName) |> join(sep)
```

## Install

```bash
npm i --save-exact @asd14/m
```

## Develop

```bash
git clone git@github.com:asd14/m.git && \
  cd m && \
  npm run setup

# run tests (any `*.test.js`) once
npm test

# watch `src` folder for changes and run test automatically
npm run tdd
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
  push(trim(sep)(newName)),
  join(sep)
)
```

## Changelog

History of all changes in [CHANGELOG.md](CHANGELOG.md)

### 0.18.0 - 22 January 2019

#### Add

- Add [`concat`](src/concat/concat.js) - Merge twp arrays into once
- Add [`page`](src/page/page.js) - Subset array using offset and limit 
- Add [`groupBy`](src/group-by/group-by.js) - Group an array of objects by field. Returns an array of arrays.

#### Change

- Change [`isMatch`](src/is-match/is-match.js) to accept predicate functions
- Change [`indexBy`](src/index-by/index-by.js) to return object of objects
