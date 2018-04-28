const i = require( "../core__i/i" )
const type = require( "../core__type/type" )

/**
 * Creates a new instance of the object with same properties than original.
 *
 * @param {T}  toBeCloned  To be cloned
 * @return {T}  Copy of this object.
 *
 * @type    {T}
 * @example { example }
 */
const clone = toBeCloned => {

  const byType = {
    Null     : () => null,
    Undefined: () => undefined,
    Number   : i,
    String   : i,
    Boolean  : i,
    Function : i,
    Array    : input => input.map( elm => clone( elm ) ),
    Date     : input => new Date( input.getTime() ),
    Object   : input => {
      const newObj = {}

      Object.keys( input ).forEach( property => {
        newObj[ property ] = clone( input[ property ] )
      } )

      return newObj
    },
  }

  return byType[ type( toBeCloned ) ]( toBeCloned )
}
