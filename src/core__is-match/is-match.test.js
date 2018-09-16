const test = require( "tape" )
const isMatch = require( "./is-match" )

/**
 * Determines one object's properties are equal to another
 *
 * @tag Core
 * @signature ( subset: Object )( source: Object ): boolean
 *
 * @param  {Object}   subset  Set of properties that should match
 * @param  {Object}   source  Object matching against
 *
 * @return {boolean}  True if all "subset" properties are of equal value to
 * properties in "source" object
 *
 * @example
 *
 * isMatch({
 *  id: 2,
 *  parentId: null,
 * })({
 *  id: 2,
 *  parentId: null
 *  name: "John",
 * })
 * // true
 *
 * isMatch({
 *  "!parentId": null,
 *  "name": "John",
 * })({
 *  id: 2,
 *  parentId: null,
 *  name: "John",
 * })
 * // false
 */
test( "isMatch::(test: Object)(source: Object): boolean", t => {

  t.deepEqual(
    isMatch( {
      id      : 2,
      parentId: null,
    } )( {
      id      : 2,
      parentId: null,
      name    : "John",
    } ),
    true,
    "Properties are present and have equal values" )

  t.deepEqual(
    isMatch( {
      name    : "John",
      parentId: null,
    } )( {
      id      : 2,
      parentId: 3,
      name    : "John",
    } ),
    false,
    "Properties are present but dont have equal values" )

  t.deepEqual(
    isMatch( {
      "name"     : "John",
      "!parentId": null,
    } )( {
      id      : 2,
      parentId: null,
      name    : "John",
    } ),
    false,
    "Properties are present but dont have equal values (has negation)" )

  t.deepEqual(
    isMatch( {
      "name"     : "John",
      "!parentId": null,
    } )( {
      id  : 2,
      name: "John",
    } ),
    true,
    "Properties are not present" )

  t.end()
} )
