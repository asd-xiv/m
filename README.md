<!-- markdownlint-disable first-line-h1 line-length -->

[![CircleCI](https://circleci.com/gh/asd14/m/tree/master.svg?style=svg)](https://circleci.com/gh/asd14/m/tree/master)
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
* [Commit messages](#commit-messages)
* [Changelog](#changelog)

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

// predicate style filter
filterWith({
    tagId: is // or "tagId: value => is(value)"
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

## Commit messages

Using Angular's [conventions](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines).

```text
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

* **feat**: A new feature
* **fix**: A bug fix
* **docs**: Documentation only changes
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **perf**: A code change that improves performance
* **test**: Adding missing or correcting existing tests
* **chore**: Changes to the build process or auxiliary tools and libraries such as documentation generation

## Changelog

See the [releases section](https://github.com/asd14/m/releases) for details.
