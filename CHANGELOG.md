<!-- markdownlint-disable no-duplicate-header -->

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.20] - 22 March 2019

### Add

- Add [`pipeP`](src/pipeP/pipeP.js) - Left-to-right function composition that can return Promises

## [0.19] - 25 February 2019

### Add

- Add [`upsertBy`](src/upsert-by/upsert-by.js) - Update if exists, else update
- Add [`equals`](src/equals/equals) - Tripple equals

## [0.18.0] - 22 January 2019

### Add

- Add [`concat`](src/concat/concat.js) - Merge twp arrays into once
- Add [`page`](src/page/page.js) - Subset array using offset and limit 
- Add [`groupBy`](src/group-by/group-by.js) - Group an array of objects by field. Returns an array of arrays.

### Change

- Change [`isMatch`](src/is-match/is-match.js) to accept predicate functions
- Change [`indexBy`](src/index-by/index-by.js) to return object of objects

## [0.17.1] - 6 January 2019

### Change

- Fix bugs in [`min`](src/min/min.js) and [`max`](src/max/max.js) functions

## [0.17.0] - 5 January 2019

### Add

- [`findIndex`](src/find-by/find-by.js) - Find the position of first element that satisfies a function
- [`findIndexBy`](src/find-index-by/find-index-by.js) - Find the position of first element that matches the filter criteria

## [0.16.1] - 2 January 2019

### Change

- [`head`](src/head/head.js) returns `undefined` if source is empty or not array

## [0.16.0] - 1 January 2019

### Change

- Allow [`replaceBy`](src/replace-by/replace-by.js#L45) to accept an update function

## [0.15.3] - 29 December 2018

### Change

- Update packages

## [0.15.2] - 17 November 2018

### Change

- Change [`remove`](src/remove/remove) to allow multiple values to be removed at once

## [0.15.1] - 17 November 2018

### Change

- Change [`filter`](src/filter/filter) to also iterate over non-array input, treat as array of one.

## [0.15.0] - 15 November 2018

### Add

- Add [`elapsedTime`](src/elapsed-time/elapsed-time) - Calculate elapsed time between to dates. In days, hours, minutes and seconds

## [0.14.0] - 15 November 2018

### Change

- Update packages and renaming to "asd14"

## [0.13.2] - 15 November 2018

### Add

- Add [`map`](src/map/map.test.js) tests: imutable and non-array source
- Add `npm audit fix` to `setup` and `prepare` scripts

### Change

- Change [`reduce`](src/reduce/reduce.js) to allow non-array input

## [0.13.1] - 14 November 2018

### Change

- Change [`map`](src/map/map.js) to also iterate over input even if not array - treat it as array with one element.
- Change [`find-files`](src/find-files/find-files.js) to accept multiple folders and treat first param as the test fn or regexp (opposed to object containing test property).

## [0.13.0] - 14 November 2018

### Add

- Add [`debounce`](src/debounce/debounce.js) - Call a function only after it wasn't called for `timeWindow` ms
- Add [`startsWith`](src/starts-with/starts-with.js) - Test if string starts with substring

### Change

- Change [`reduce`](src/reduce/reduce.js) to allow default acc to be set as default param. Dont explicitly set default acc to {}.
- Change [`count`](src/count/count.js) to return the length if the first param is an Array

## [0.11.0] - 30 October 2018

### Add

- Add tests for [`random`](src/random/random) and [`coin-toss`](src/coin-toss/coin-toss) using [Chi-squared distribution](https://en.wikipedia.org/wiki/Chi-squared_distribution) via [chi-squared-test](https://www.npmjs.com/package/chi-squared-test)
- Add functions:
  - [`gt`](src/gt/gt.js) - Grater than compare
  - [`lt`](src/lt/lt.js) - Less than compare
  - [`between`](src/between/between) - Check if value is inside open or closed interval
  - [`dec`](src/dec/dec.js) - Substract one
  - [`inc`](src/inc/inc.js) - Add one
  - [`is`](src/is/is.js) - Test if something is not `null` or `undefined`
  - [`all`](src/all/all.js) - Test if all elements of array satisfy a function
- Add tests for [`sort-by`](src/sort-by/sort-by.js), [`repeat`](src/repeat/repeat.js), [`raise`](src/raise/raise.js), [`throttle`](src/throttle/throttle.js), [`proto-chain`](src/proto-chain/proto-chain.js), [`merge`](src/merge/merge.js), [`max`](src/max/max.js), [`deep-equal`](src/deep-equal/deep-equal.js), [`find-files`](src/find-files/find-files.js), [`ends-with`](src/ends-with/ends-with.js), [`when`](src/when/when.js), [`tail`](src/tail/tail.js), [`head`](src/head/head.js), [`equals`](src/core__equals/equals.js), [`clone`](src/core__clone/clone.js)
- Add test for main [`index.js`](src/index.js) file

### Change

- **Breaking**: `ifThen` renamed to `when`
- Change [`equals`](src/core__equals/equals.js) to handle equality between NaN values

## [0.10.1] - 27 October 2018

### Add

- Add test for [`array__filter`](src/array__filter/filter.js)

## [0.10.0] - 27 October 2018

### Add

- Add test coverage and [coveralls](https://coveralls.io/github/asd14/m) badge

## [0.9.0] - 26 October 2018

### Add

- Add [`replace`](src/replace/replace.js) - Replace substring if source is string, replace element (shallow equal) if source is Array.
- Add [`string__trim`](src/string__trim/trim.js) - Remove char from beginning and end of string
- Add [`array__drop-last`](src/array__drop-last/drop-last.js) - Remove elements from end of array
- Add [`fs__rename-file`](src/fs__rename-file/rename-file.js) - Rename a file given a path string

### Remove

- Remove `src/fs.js` entry point
  - rename `fs__find` -> `fs__find-files` and add to main index
  - load `findFiles` like `const { findFiles } = require("m")`, oposed to `const { find } = require("msrc/fs")`

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

[Unreleased]: https://github.com/asd14/m/compare/v0.20...HEAD

[0.20]: https://github.com/asd14/m/compare/v0.19...v0.20.0
[0.19]: https://github.com/asd14/m/compare/v0.18.0...v0.19
[0.18.0]: https://github.com/asd14/m/compare/v0.17.1...v0.18.0
[0.17.1]: https://github.com/asd14/m/compare/v0.17.0...v0.17.1
[0.17.0]: https://github.com/asd14/m/compare/v0.16.1...v0.17.0
[0.16.1]: https://github.com/asd14/m/compare/v0.16.0...v0.16.1
[0.16.0]: https://github.com/asd14/m/compare/v0.15.3...v0.16.0
[0.15.3]: https://github.com/asd14/m/compare/v0.15.2...v0.15.3
[0.15.2]: https://github.com/asd14/m/compare/v0.15.1...v0.15.2
[0.15.1]: https://github.com/asd14/m/compare/v0.15.0...v0.15.1
[0.15.0]: https://github.com/asd14/m/compare/v0.14.0...v0.15.0
[0.14.0]: https://github.com/asd14/m/compare/v0.13.2...v0.14.0
[0.13.2]: https://github.com/asd14/m/compare/v0.13.1...v0.13.2
[0.13.1]: https://github.com/asd14/m/compare/v0.13.0...v0.13.1
[0.13.0]: https://github.com/asd14/m/compare/v0.11.0...v0.13.0
[0.11.0]: https://github.com/asd14/m/compare/v0.10.1...v0.11.0
[0.10.1]: https://github.com/asd14/m/compare/v0.10.0...v0.10.1
[0.10.0]: https://github.com/asd14/m/compare/v0.9.0...v0.10.0
[0.9.0]: https://github.com/asd14/m/compare/v0.8.1...v0.9.0
[0.8.1]: https://github.com/asd14/m/compare/v0.8.0...v0.8.1
[0.8.0]: https://github.com/asd14/m/compare/v0.7.0...v0.8.0
[0.7.0]: https://github.com/asd14/m/compare/v0.6.0...v0.7.0
[0.6.0]: https://github.com/asd14/m/compare/v0.5.1...v0.6.0
