<!-- markdownlint-disable no-duplicate-header -->

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

[Unreleased]: https://github.com/codemachiner/m/compare/v0.9.0...HEAD

[0.9.0]: https://github.com/codemachiner/m/compare/v0.8.1...v0.9.0
[0.8.1]: https://github.com/codemachiner/m/compare/v0.8.0...v0.8.1
[0.8.0]: https://github.com/codemachiner/m/compare/v0.7.0...v0.8.0
[0.7.0]: https://github.com/codemachiner/m/compare/v0.6.0...v0.7.0
[0.6.0]: https://github.com/codemachiner/m/compare/v0.5.1...v0.6.0
