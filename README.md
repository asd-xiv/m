[![npm package version](https://badge.fury.io/js/%40codemachiner%2Fm.svg)](https://badge.fury.io/js/%40codemachiner%2Fm)
[![dev-badge](https://david-dm.org/codemachiner/m/dev-status.svg)](https://david-dm.org/codemachiner/m?type=dev)

# m

> Functional library for Javascript

<!-- MarkdownTOC levels="2,3" autolink="true" autoanchor="false" -->

- [Use](#use)
- [Install](#install)
- [Develop](#develop)
- [Changelog](#changelog)
    - [0.8.1 - 24 October 2018](#081---24-october-2018)

<!-- /MarkdownTOC -->

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

### 0.8.1 - 24 October 2018

#### Changed

- Write tests for and update `array__remove` - to accept primitive value or filter function
