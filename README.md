[![npm package version](https://badge.fury.io/js/%40codemachiner%2Fm.svg)](https://badge.fury.io/js/%40codemachiner%2Fm)
[![dev-badge](https://david-dm.org/codemachiner/m/dev-status.svg)](https://david-dm.org/codemachiner/m?type=dev)

# m

> Functional library for Javascript

<!-- TOC depthFrom:2 depthTo:3 withLinks:1 updateOnSave:1 orderedList:0 -->

- [Use](#use)
- [Install](#install)
- [Develop](#develop)
- [Changelog](#changelog)
	- [0.6.0 - 20 October 2018](#060-20-october-2018)

<!-- /TOC -->

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

Using [tape] with babel support to run tests inside all `*.test.js` files. 

[tape]: https://github.com/substack/tape

Use `npm test` to run tests onces or `npm run tdd` to watch `src` folder for changes and run test automatically 

## Changelog

History of all changes in [CHANGELOG.md](CHANGELOG.md)

### 0.6.0 - 20 October 2018

#### Added

- Add `array_repeat` to generate an array of fixed size containing a specified value or function result

#### Removed

- Remove `flow` support
