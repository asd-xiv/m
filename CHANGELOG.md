# A log of changes

# [6.1.0](https://github.com/asd-xiv/m/compare/v6.0.0...v6.1.0) (2021-05-08)


### Features

* update packages ([c771ed6](https://github.com/asd-xiv/m/commit/c771ed61489e1ab505e82655e28b86ba96d363c2))

## [6.0.0](https://github.com/asd-xiv/m/compare/v5.4.0...v6.0.0) (2021-04-27)

### Features

* rework `intersect`, add `join` ([#8](https://github.com/asd-xiv/m/issues/8)) ([f80680b](https://github.com/asd-xiv/m/commit/f80680b4610ac58d5bc0b45ac205ec2d7e4fee08))

### BREAKING CHANGES

* `distinct` no longer uses deep equal compare. Use `distinctBy` with custom
compare function to parse object arrays.

```js
// old
distinct([1, {a: 2}, {a: 2}])
// => [1, {a: 2}]

// new
import deepEquals from "fast-deep-equal"

distinctBy(deepEquals, [1, { a: 2 }, { a: 2 }])
// => [1, {a: 2}]
```

* feat: add `overlap` and `overlapBy` functions to combine 2 arrays into a set (array of unique items)

* feat: add `intersect` and `intersectBy` functions to obtain common items in 2 arrays

* feat: rename `join` -> `unit`, `overlap` -> `join`

## [5.4.0](https://github.com/asd-xiv/m/compare/v5.3.0...v5.4.0) (2021-04-11)

### Features

* add git hooks for staged files and commit message linting ([9ad3514](https://github.com/asd-xiv/m/commit/9ad3514a850f80d1cc0d67af538aed8e2f2dd949))
