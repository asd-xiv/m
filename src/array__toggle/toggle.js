const has = require( "../array__has/has" )
const remove = require( "../array__remove/remove" )
const push = require( "../array__push/push" )
const ifThen = require( "../core__if-then/if-then" )

/**
 * Add element if not exists, remove otherwise
 *
 * @param  {mixed}  element  Toggable value
 *
 * @return {Array}  New array with toggled element
 */
module.exports = element =>
  ifThen( has( element ), remove( element ), push( element ) )
