[![npm package version](https://badge.fury.io/js/%40codemachiner%2Fm.svg)](https://badge.fury.io/js/%40codemachiner%2Fm)
[![dev-badge](https://david-dm.org/codemachiner/m/dev-status.svg)](https://david-dm.org/codemachiner/m?type=dev)

# m

> Functional library for Javascript

<!-- MarkdownTOC levels="2,3" autolink="true" autoanchor="false" -->

- [Why only pipe](#why-only-pipe)
- [Use](#use)
- [Install](#install)
- [Develop](#develop)
- [Changelog](#changelog)
    - [0.8.2 - 26 October 2018](#082---26-october-2018)

<!-- /MarkdownTOC -->

## Why only pipe

There is no _structure/semantic_ difference between `pipe` and `compose`, both will use the same building blocks.  

> A series of transformations over an initial input can be written as `x -> f -> g -> result` or as `result = g(f(x))`, the difference is only _syntactic_. The input is the same, functions are the same, the result will be the same.

This is not to say that syntax is "secondary" to semantic. Syntax is the thing we see and parse everyday and is the difference between "Aah, right" and "Why is he doing -1 two times?".

There are reasons for why some use the `compose` notation and others the `pipe`. Math people will know more.

In a FunFunFunctions [video](https://www.youtube.com/watch?v=glZ1C-Yu5tw), Mattias makes the point of product decisions and why adding a toggle in the settings page just adds maintenance overhead and useless complexity.

Given that we read from left to right, [left/back is in the past, right/forward is the future](https://medium.com/@cwodtke/the-intuitive-and-the-unlearnable-cccffd9a762) it make sense to choose the _syntactics_ that is more aligned with our intuition **and** _semantics_ (the transformations are applied is the same order, from t0 -> t1 -> tn, the way is forward).

It's a decision between:

```js
const renameFileWithCompose = newName => filePath =>
  compose(
    join(separator),
    push(newName),
    dropLast,
    split(separator)
  )(filePath)

const renameFileWithPipe = newName => filePath =>
  pipe(
    split(separator),
    dropLast,
    push(newName),
    join(separator)
  )(filePath)

// When using the pipeline operator, things are even more natural
const renameFileWithPipe = newName => filePath =>
  filePath |> split(separator) |> dropLast |> push(newName) |> join(separator)
```

## Use

```bash
npm i --save-exact @codemachiner/m
```

## Install

```bash
git clone git@github.com:codemachiner/m.git && \
  cd m && \
  npm run setup
```

## Develop

Use `npm test` to run tests (any `*.test.js`) once or `npm run tdd` to watch `src` folder for changes and run test automatically.

## Changelog

History of all changes in [CHANGELOG.md](CHANGELOG.md)

### 0.8.2 - 26 October 2018

#### Add

- Add `replace` - Replace substring if source is string, replace element (shallow equal) if source is Array.
- Add `string__trim` - Remove char from beginning and end of string

#### Change

- 
