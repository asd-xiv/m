<!-- markdownlint-disable no-duplicate-header -->

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.12.0] - 5 November 2018

### Add

- Add [`startsWith`](/src/starts-with/starts-with.js) - Test if string starts with substring

## [0.11.0] - 30 October 2018

### Add

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

### Change

- **Breaking**: `ifThen` renamed to `when`
- Change [`equals`](/src/core__equals/equals.js) to handle equality between NaN values

## [0.10.1] - 27 October 2018

### Add

- Add test for [`array__filter`](/src/array__filter/filter.js)

## [0.10.0] - 27 October 2018

### Add

- Add test coverage and [coveralls](https://coveralls.io/github/codemachiner/m) badge

## [0.9.0] - 26 October 2018

### Add

- Add [`replace`](/src/replace/replace.js) - Replace substring if source is string, replace element (shallow equal) if source is Array.
- Add [`string__trim`](/src/string__trim/trim.js) - Remove char from beginning and end of string
- Add [`array__drop-last`](/src/array__drop-last/drop-last.js) - Remove elements from end of array
- Add [`fs__rename-file`](/src/fs__rename-file/rename-file.js) - Rename a file given a path string

### Remove

- Remove `src/fs.js` entry point
  - rename `fs__find` -> `fs__find-files` and add to main index
  - load `findFiles` like `const { findFiles } = require("m")`, oposed to `const { find } = require("m/src/fs")`

## [0.8.1] - 24 October 2018

### Changed

- Write tests for and update `array__remove` - to accept primitive value or filter function

## [0.8.0] - 24 October 2018

### Added

- Add `string__contains` - Test if string contains substring
- Add `string__ends-with` - Test if string ends with substring

## [0.7.0] - 22 October 2018

### Added

- Add `array__replace-by` - Find and replace object in array

## [0.6.0] - 20 October 2018

### Added

- Add `array__repeat` - Return an array of fixed size containing a specified 
  value or function result

### Removed

- Removed `flow` support

[Unreleased]: https://github.com/codemachiner/m/compare/v0.12.0...HEAD

[0.12.0]: https://github.com/codemachiner/m/compare/v0.11.0...v0.12.0
[0.11.0]: https://github.com/codemachiner/m/compare/v0.10.1...v0.11.0
[0.10.1]: https://github.com/codemachiner/m/compare/v0.10.0...v0.10.1
[0.10.0]: https://github.com/codemachiner/m/compare/v0.9.0...v0.10.0
[0.9.0]: https://github.com/codemachiner/m/compare/v0.8.1...v0.9.0
[0.8.1]: https://github.com/codemachiner/m/compare/v0.8.0...v0.8.1
[0.8.0]: https://github.com/codemachiner/m/compare/v0.7.0...v0.8.0
[0.7.0]: https://github.com/codemachiner/m/compare/v0.6.0...v0.7.0
[0.6.0]: https://github.com/codemachiner/m/compare/v0.5.1...v0.6.0
