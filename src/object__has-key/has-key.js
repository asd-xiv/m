const checkType = require( "../core__check-type/check-type" )

/**
 * Check if an object has a key defined
 *
 * @param  {string}  key    Property name
 * @param  {object}  input  Test object
 *
 * @return {boolean}
 */
module.exports = key => input => {
  checkType( {
    schema: {
      key  : "String",
      input: "Object",
    },
    context: "hasKey(key)(input)",
  } )( { key, input } )

  return Object.prototype.hasOwnProperty.call( input, key )
}
