<!-- markdownlint-disable first-line-h1 line-length -->

[![npm package version](https://badge.fury.io/js/%40asd14%2Fm.svg)](https://badge.fury.io/js/%40asd14%2Fm)
[![dev-badge](https://david-dm.org/asd14/m.svg)](https://david-dm.org/asd14/m)
[![Coverage Status](https://coveralls.io/repos/github/asd14/m/badge.svg)](https://coveralls.io/github/asd14/m)

# m

> [Point free](https://en.wikipedia.org/wiki/Tacit_programming) style, functional library for Javascript

Experimental. Use [Ramda](https://github.com/ramda/ramda).

---

<!-- vim-markdown-toc GFM -->

* ["With" pattern](#with-pattern)
* [|> pipe](#-pipe)
* [Install](#install)
* [Develop](#develop)
* [Use](#use)
* [Changelog](#changelog)
  * [0.23 - 10 July 2019](#023---10-july-2019)
    * [Change](#change)

<!-- vim-markdown-toc -->

## "With" pattern

```js
import { find, findWith, filterWith, is } from "@asd14/m"

const todos = [
  {id: 1, name: "lorem", tagId: 2,},
  {id: 2, name: "ipsum", tagId: null},
  {id: 3, name: "dolor", tagId: null},
]

find(item => item.id === 2)(todos)
// or
findWith({id: 2})(todos)
//=> {id: 2, name: "ipsum"}

filterWith({
  // tagId: value => is(value)
  tagId: is
})(todos)
// [{id:1, name: "lorem", tagId: 2}]
```

## |> pipe

There is no _structure_ difference between `pipe` and `compose`, both will use the same building blocks to get from A to B.

A series of transformations over an initial input can be written as `x -> f -> g -> result`, _piping_, or as `result = g(f(x))`, _composing_. The difference is only _syntactic_. Input is the same, transformations **and** order of application are the same, the result will be the same.

Given that:

* we read from left to right
* [left/back is in the past, right/front is the future](https://medium.com/@cwodtke/the-intuitive-and-the-unlearnable-cccffd9a762)
* a lot of piping going on in your terminal

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

### 0.23 - 10 July 2019

#### Change

* Update packages
