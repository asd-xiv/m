[![npm package version](https://badge.fury.io/js/%40codemachiner%2Fm.svg)](https://badge.fury.io/js/%40codemachiner%2Fm)
[![dev-badge](https://david-dm.org/codemachiner/m/dev-status.svg)](https://david-dm.org/codemachiner/m?type=dev)

# m

> Functional library for Javascript

<!-- MarkdownTOC levels="2,3" autolink="true" autoanchor="false" -->

- [Why only pipe](#why-only-pipe)
    - [Links](#links)
- [Install](#install)
- [Develop](#develop)
- [Changelog](#changelog)
    - [0.9.0 - 26 October 2018](#090---26-october-2018)

<!-- /MarkdownTOC -->

## Why only pipe

There is no _structure_ difference between `pipe` and `compose`, both will use the same building blocks to get from A to B.

> A series of transformations over an initial input can be written as `x -> f -> g -> result`, _piping_, or as `result = g(f(x))`, _composing_. The difference is only _syntactic_. Input is the same, transformations **and** order of application are the same, the result will be the same.

Syntax is the thing we look at, reason with and write ourselves everyday and is the difference between _"Aah, right"_ and _"Why is he doing -1 two times?"_.

There are [reasons](https://en.wikipedia.org/wiki/Function_composition#Alternative_notations) for why some use the [`compose`](https://en.wikipedia.org/wiki/Composition_operator) notation and others the `pipe`. [Math](https://en.wikipedia.org/wiki/Nicolas_Bourbaki) people will know more.

In [Settings are evil](https://www.youtube.com/watch?v=glZ1C-Yu5tw), Mattias Petter Johansson makes the point of product decisions and why adding a toggle in the settings page just adds maintenance overhead and useless complexity. While a measly Twitter flag does not compare to _Function Composition_, I think there is a decision to be made.

> Having a set of functions/transformations/verbs, what is the best way of arranging them so that people with little to no knowledge of the overall context can understand it in the smallest amount of time and with least amount of cognitive overhead?

Given that:

- we read from left to right
- [left/back is in the past, right/front is the future](https://medium.com/@cwodtke/the-intuitive-and-the-unlearnable-cccffd9a762)
- a lot of piping going on in your terminal

it makes sense to choose the _syntactic_ that is more aligned with our intuition and context. The transformations are applied in a certain order with time as a medium, from `input -> t0 -> t1 -> tn -> output`. The way is forward.

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
```

Use `npm test` to run tests (any `*.test.js`) once or `npm run tdd` to watch `src` folder for changes and run test automatically.

## Changelog

History of all changes in [CHANGELOG.md](CHANGELOG.md)

### 0.9.0 - 26 October 2018

#### Add

- Add [`replace`](/src/replace/replace.js) - Replace substring if source is string, replace element (shallow equal) if source is Array.
- Add [`string__trim`](/src/string__trim/trim.js) - Remove char from beginning and end of string
- Add [`array__dropLast`](/src/array__drop-last/drop-last.js) - Remove elements from end of array
- Add [`fs__renameFile`](/src/fs__rename-file/rename-file.js) - Rename a file given a path string

#### Remove

- Remove `src/fs.js` entry point
  - Rename `fs__find` -> `fs__findFiles` and add to main index
  - load `findFiles` like `const { findFiles } = require("m")`, oposed to `const { find } = require("m/src/fs")`
