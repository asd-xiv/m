const reduce = require( "../array__reduce/reduce" )
const filter = require( "../array__filter/filter" )
const set = require( "../object__set/set" )
const pipe = require( "../core__pipe/pipe" )

/**
 * Returns a partial copy of an object containing only the keys specified.
 * If the key does not exist, the property is ignored.
 *
 * @param      {Array<string>}  props  The properties to be filtered out
 * @param      {Object}         source      The source object
 *
 * @return     {Object}
 */
module.exports = props => source =>
  pipe(
    filter( key =>
      Object.hasOwnProperty.call( source, key ) ),
    reduce( ( acc, key ) =>
      set( key, source[ key ] )( acc ),
    {} )
  )( props )
