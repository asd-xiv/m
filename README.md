[![npm package version](https://badge.fury.io/js/%40codemachiner%2Fm.svg)](https://badge.fury.io/js/%40codemachiner%2Fm)
[![dev-badge](https://david-dm.org/codemachiner/m.svg)](https://david-dm.org/codemachiner/m)
[![Coverage Status](https://coveralls.io/repos/github/codemachiner/m/badge.svg)](https://coveralls.io/github/codemachiner/m)

# m

> Functional library for Javascript.

Changes a lot and not yet complete. Use [Ramda](https://github.com/ramda/ramda) to be safe.

---

<!-- MarkdownTOC levels="2,3" autolink="true" autoanchor="false" -->

- [Why only pipe](#why-only-pipe)
    - [Links](#links)
- [Install](#install)
- [Develop](#develop)
- [Use](#use)
- [Changelog](#changelog)
    - [0.11 - 30 October 2018](#011---30-october-2018)

<!-- /MarkdownTOC -->

## Why only pipe

There is no _structure_ difference between `pipe` and `compose`, both will use the same building blocks to get from A to B.

> A series of transformations over an initial input can be written as `x -> f -> g -> result`, _piping_, or as `result = g(f(x))`, _composing_. The difference is only _syntactic_. Input is the same, transformations **and** order of application are the same, the result will be the same.

Syntax is the thing we look at, reason with and write ourselves everyday and is the difference between _"Aah, right"_ and _"Why is he doing -1 two times?"_.

There are [reasons](https://en.wikipedia.org/wiki/Function_composition#Alternative_notations) for why some use the [`compose`](https://en.wikipedia.org/wiki/Composition_operator) notation and others the `pipe`. [Math](https://en.wikipedia.org/wiki/Nicolas_Bourbaki) people will know more.

In [Settings are evil](https://www.youtube.com/watch?v=glZ1C-Yu5tw), Mattias Petter Johansson makes the point of product decisions and why adding a toggle in the settings page just adds maintenance overhead and useless complexity. While a measly Twitter feature flag does not compare to _Function Composition_, I think choosing one is helpfull (just like " over ').

> Having a set of functions/transformations/verbs, what is the best way of presenting them so that people with little to no knowledge of the overall context can understand it in the least amount of time and with smallest amount of cognitive overhead?

Given that:

- we read from left to right
- [left/back is in the past, right/front is the future](https://medium.com/@cwodtke/the-intuitive-and-the-unlearnable-cccffd9a762)
- a lot of piping going on in your terminal

it makes sense to choose the _syntactic_ that is more aligned with our intuition and context. The transformations are applied in a certain order with time as a medium - `input -> t0 -> t1 -> tn -> output`. The way is forward.

```js
const { sep } = require("path")
const { pipe, compose, join, push, dropLast, split } = require("../index")

//
// Compose - g(f(x))
//
const renameFile = newName => filePath =>
  compose(
    join(sep), push(newName), dropLast, split(sep)
  )(filePath)

//
// Pipe - x -> f -> g
//
const renameFile = newName => filePath =>
  pipe(
    split(sep), dropLast, push(newName), join(sep) 
  )(filePath)

//
// When using the new pipeline operator, things are even more expressive
//
const renameFile = newName => filePath =>
  filePath |> split(sep) |> dropLast |> push(newName) |> join(sep)
```

### Links

- [@babel/plugin-proposal-pipeline-operator
](https://babeljs.io/docs/en/next/babel-plugin-proposal-pipeline-operator.html)

## Install

```bash
npm i --save-exact @codemachiner/m
```

## Develop

```bash
git clone git@github.com:codemachiner/m.git && \
  cd m && \
  npm run setup

# run tests (any `*.test.js`) once
npm test

# watch `src` folder for changes and run test automatically
npm run tdd
```

## Use

```js
import { pipe, trim, split, dropLast, push, join } from "@codemachiner/m"

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

### 0.11 - 30 October 2018

#### Add

- Add tests for [`random`](/src/random/random) and [`coin-toss`](/src/coin-toss/coin-toss) using [Chi-squared distribution](https://en.wikipedia.org/wiki/Chi-squared_distribution) via [chi-squared-test](https://www.npmjs.com/package/chi-squared-test)
- Add functions:
  - [`gt`](/src/gt/gt.js) - Grater than compare
  - [`lt`](/src/lt/lt.js) - Less than compare
  - [`between`](/src/between/between) - Check if value is inside open or closed interval
  - [`dec`](/src/dec/dec.js) - Substract one
  - [`inc`](/src/inc/inc.js) - Add one
  - [`is`](/src/is/is.js) - Test if something is not `null` or `undefined`
  - [`all`](/src/all/all.js) - Test if all elements of array satisfy a function
- Add tests for [`sort-by`](/src/sort-by/sort-by.js), [`repeat`](/src/repeat/repeat.js), [`raise`](/src/raise/raise.js), [`throttle`](/src/throttle/throttle.js), [`proto-chain`](/src/proto-chain/proto-chain.js), [`merge`](/src/merge/merge.js), [`max`](/src/max/max.js), [`deep-equal`](/src/deep-equal/deep-equal.js), [`find-files`](/src/find-files/find-files.js), [`ends-with`](/src/ends-with/ends-with.js), [`when`](/src/when/when.js), [`tail`](/src/tail/tail.js), [`head`](/src/head/head.js), [`equals`](/src/core__equals/equals.js), [`clone`](/src/core__clone/clone.js)
- Add test for main [`index.js`](/src/index.js) file

#### Change

- **Breaking**: `ifThen` renamed to `when`
- Change [`equals`](/src/core__equals/equals.js) to handle equality between NaN values
