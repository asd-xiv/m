import fastDeepEqual from "fast-deep-equal"

export { fastDeepEqual as isDeepEqual, fastDeepEqual as deepEqual }
export { elapsedTime } from "./elapsed-time/elapsed-time"
export { groupBy } from "./group-by/group-by"
export { indexBy } from "./index-by/index-by"
export { hist } from "./hist/hist"
export { protoChain } from "./proto-chain/proto-chain"
export { sequence, sequenceWhile } from "./sequence/sequence"
export { tryCatch } from "./try-catch/try-catch"
export { raise } from "./raise/raise"
export { type } from "./type/type"
export { throttle } from "./throttle/throttle"
export { debounce } from "./debounce/debounce"
export { isURI } from "./is-uri/is-uri"
export { spy } from "./spy/spy"

// Core
export { map } from "./map/map"
export { mapMatrix } from "./map-matrix/map-matrix"
export { reduce } from "./reduce/reduce"
export { converge } from "./converge/converge"
export { forEach } from "./for-each/for-each"
export { pipe } from "./pipe/pipe"
export { pipeP } from "./pipe-p/pipe-p"
export { read as get, read, readMany } from "./read/read"
export { write as set, write } from "./write/write"
export { same } from "./same/same"
export { i } from "./i/i"
export { clone } from "./clone/clone"
export { repeat } from "./repeat/repeat"
export { curry } from "./curry/curry"
export { compact, compactMany } from "./compact/compact"

// Boolean
export { is, isNothing, not, isTrue, isFalse, isObject } from "./is/is"
export { isEmpty, isNotEmpty } from "./is-empty/is-empty"
export { isEqual, isEqual as equals, isEqual as eq } from "./is-equal/is-equal"
export { isBetween, isBetween as between } from "./is-between/is-between"
export { any, any as has, anyWith, anyWith as hasWith } from "./any/any"
export { all, allWith } from "./all/all"
export { when } from "./when/when"
export { cases } from "./cases/cases"
export { isMatch } from "./is-match/is-match"

// Object
export { pick } from "./pick/pick"
export { pluck } from "./pluck/pluck"
export { merge, mergeAll, mergeBy } from "./merge/merge"
export { keys } from "./keys/keys"
export { values } from "./values/values"
export { rename as renameKeys, rename, renameMany } from "./rename/rename"
export {
  zipToObject as zipToObj,
  zipToObject,
} from "./zip-to-object/zip-to-object"
export { mutate, mutateMany, mutateWith } from "./mutate/mutate"
export { update, updateMany, updateWith } from "./update/update"

// Array
export { top } from "./top/top"
export { bottom } from "./bottom/bottom"
export { first, first as head } from "./first/first"
export { last, last as tail } from "./last/last"
export { page } from "./page/page"
export { push } from "./push/push"
export { max, maxBy } from "./max/max"
export { min, minBy } from "./min/min"
export { move } from "./move/move"
export { flatten } from "./flatten/flatten"
export { distinct, distinctBy } from "./distinct/distinct"
export { dropLast } from "./drop-last/drop-last"
export { upsertWith as upsert, upsertWith } from "./upsert/upsert"
export { append, append as concat } from "./append/append"
export { prepend } from "./prepend/prepend"
export { toggle } from "./toggle/toggle"
export { partition, partitionWith } from "./partition/partition"
export {
  count,
  count as length,
  count as size,
  countBy,
  countWith,
} from "./count/count"
export { replace, replaceWith } from "./replace/replace"
export { sort, sortBy } from "./sort/sort"
export { sortWith } from "./sort/sort-with"
export { remove, removeWith } from "./remove/remove"
export { hasKey } from "./has-key/has-key"
export { filter, filterWith } from "./filter/filter"
export { find, findWith } from "./find/find"
export { findIndex, findIndexWith } from "./find-index/find-index"
export { join, joinBy } from "./join/join"
export { intersect, intersectBy } from "./intersect/intersect"

// Number
export { dec } from "./dec/dec"
export { inc } from "./inc/inc"
export { gt } from "./gt/gt"
export { lt } from "./lt/lt"
export { random } from "./random/random"

// String
export { split } from "./split/split"
export { splitInGroupsOf } from "./split-in-groups-of/split-in-groups-of"
export { startsWith } from "./starts-with/starts-with"
export { endsWith } from "./ends-with/ends-with"
export { toLower } from "./to-lower/to-lower"
export { toUpper } from "./to-upper/to-upper"
export { trim } from "./trim/trim"
export { contains } from "./contains/contains"
export { unite } from "./unite/unite"
export { escapeHTML } from "./escape-html/escape-html"
export { escapeRegExp } from "./escape-reg-exp/escape-reg-exp"
