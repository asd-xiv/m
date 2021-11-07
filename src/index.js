export {
  fastDeepEqual as isDeepEqual,
  fastDeepEqual as deepEqual,
} from "fast-deep-equal"
export { elapsedTime } from "./elapsed-time/elapsed-time.js"
export { groupBy } from "./group-by/group-by.js"
export { indexBy } from "./index-by/index-by.js"
export { hist } from "./hist/hist.js"
export { protoChain } from "./proto-chain/proto-chain.js"
export { sequence, sequenceWhile } from "./sequence/sequence.js"
export { tryCatch } from "./try-catch/try-catch.js"
export { raise } from "./raise/raise.js"
export { type } from "./type/type.js"
export { throttle } from "./throttle/throttle.js"
export { debounce } from "./debounce/debounce.js"
export { isURI } from "./is-uri/is-uri.js"
export { spy } from "./spy/spy.js"

// Core
export { map } from "./map/map.js"
export { mapMatrix } from "./map-matrix/map-matrix.js"
export { reduce } from "./reduce/reduce.js"
export { converge } from "./converge/converge.js"
export { forEach } from "./for-each/for-each.js"
export { pipe } from "./pipe/pipe.js"
export { pipeP } from "./pipe-p/pipe-p.js"
export { read as get, read, readMany } from "./read/read.js"
export { write as set, write } from "./write/write.js"
export { same } from "./same/same.js"
export { i } from "./i/i.js"
export { clone } from "./clone/clone.js"
export { repeat } from "./repeat/repeat.js"
export { curry } from "./curry/curry.js"
export { compact, compactMany } from "./compact/compact.js"

// Boolean
export { is, isNothing, not, isTrue, isFalse, isObject } from "./is/is.js"
export { isEmpty, isNotEmpty } from "./is-empty/is-empty.js"
export {
  isEqual,
  isEqual as equals,
  isEqual as eq,
} from "./is-equal/is-equal.js"
export { isBetween, isBetween as between } from "./is-between/is-between.js"
export { any, any as has, anyWith, anyWith as hasWith } from "./any/any.js"
export { all, allWith } from "./all/all.js"
export { when } from "./when/when.js"
export { cases } from "./cases/cases.js"
export { isMatch } from "./is-match/is-match.js"

// Object
export { pick } from "./pick/pick.js"
export { pluck } from "./pluck/pluck.js"
export { merge, mergeAll, mergeBy } from "./merge/merge.js"
export { keys } from "./keys/keys.js"
export { values } from "./values/values.js"
export { rename as renameKeys, rename, renameMany } from "./rename/rename.js"
export {
  zipToObject as zipToObj,
  zipToObject,
} from "./zip-to-object/zip-to-object.js"
export { mutate, mutateMany, mutateWith } from "./mutate/mutate.js"
export { update, updateMany, updateWith } from "./update/update.js"

// Array
export { top } from "./top/top.js"
export { bottom } from "./bottom/bottom.js"
export { first, first as head } from "./first/first.js"
export { last, last as tail } from "./last/last.js"
export { page } from "./page/page.js"
export { push } from "./push/push.js"
export { max, maxBy } from "./max/max.js"
export { min, minBy } from "./min/min.js"
export { move } from "./move/move.js"
export { flatten } from "./flatten/flatten.js"
export { distinct, distinctBy } from "./distinct/distinct.js"
export { dropLast } from "./drop-last/drop-last.js"
export { upsertWith as upsert, upsertWith } from "./upsert/upsert.js"
export { append, append as concat } from "./append/append.js"
export { prepend } from "./prepend/prepend.js"
export { toggle } from "./toggle/toggle.js"
export { partition, partitionWith } from "./partition/partition.js"
export {
  count,
  count as length,
  count as size,
  countBy,
  countWith,
} from "./count/count.js"
export { replace, replaceWith } from "./replace/replace.js"
export { sort, sortBy } from "./sort/sort.js"
export { sortWith } from "./sort/sort-with.js"
export { remove, removeWith } from "./remove/remove.js"
export { hasKey } from "./has-key/has-key.js"
export { filter, filterWith } from "./filter/filter.js"
export { find, findWith } from "./find/find.js"
export { findIndex, findIndexWith } from "./find-index/find-index.js"
export { join, joinBy } from "./join/join.js"
export { intersect, intersectBy } from "./intersect/intersect.js"

// Number
export { dec } from "./dec/dec.js"
export { inc } from "./inc/inc.js"
export { gt } from "./gt/gt.js"
export { lt } from "./lt/lt.js"
export { random } from "./random/random.js"

// String
export { split } from "./split/split.js"
export { splitInGroupsOf } from "./split-in-groups-of/split-in-groups-of.js"
export { startsWith } from "./starts-with/starts-with.js"
export { endsWith } from "./ends-with/ends-with.js"
export { toLower } from "./to-lower/to-lower.js"
export { toUpper } from "./to-upper/to-upper.js"
export { trim } from "./trim/trim.js"
export { contains } from "./contains/contains.js"
export { unite } from "./unite/unite.js"
export { escapeHTML } from "./escape-html/escape-html.js"
export { escapeRegExp } from "./escape-reg-exp/escape-reg-exp.js"
