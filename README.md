# m
[![npm package version](https://badge.fury.io/js/%40codemachiner%2Fm.svg)](https://badge.fury.io/js/%40codemachiner%2Fm)
[![dev-badge](https://david-dm.org/codemachiner/m/dev-status.svg)](https://david-dm.org/codemachiner/m?type=dev)

> Functional library for Javascript

## Installation

```bash
npm i --save-exact @codemachiner/m
```

## Development

### Clone

```bash
## Clone repo
git clone git@github.com:codemachiner/m.git && cd m

## Install dependencies
npm run setup
```

### Testing

Using [tape] with babel support to run tests inside all `*.test.js` files. 

```bash
## once
npm test

# or watch for src changes and rerun test automatically
npm run tdd 
```

> Read ["Why I use Tape Instead of Mocha & So Should You"](https://medium.com/javascript-scene/why-i-use-tape-instead-of-mocha-so-should-you-6aa105d8eaf4)

### Static types 

`npm run flow` for manual checking with [flow]. 

Already uses `eslint-plugin-flowtype` and `eslint-plugin-flowtype-errors`, if you have `eslint` support, you also have flow.

> Using [`@codemachiner/eslint-config`](https://github.com/codemachiner/eslint-config) with flow eslint configs

[tape]: https://github.com/substack/tape
[flow]: https://flow.org
