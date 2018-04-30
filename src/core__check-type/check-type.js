const type = require( "../core__type/type" )

/**
 * Validate field types
 *
 * @param  {Object}     arg1          Props
 * @param  {Object}     arg1.schema   Validation schema
 * @param  {String}     arg1.context  Name of function or object the error is
 *                                    relevant in
 *
 * @throws {TypeError}
 *
 * @return {undefined}  { description_of_the_return_value }
 */
module.exports = ( { schema, context } ) => input => {
  const fieldPairs = Object.entries( schema )

  for ( let i = 0, length = fieldPairs.length; i < length; i++ ) {
    const [ field, expectedType ] = fieldPairs[ i ]

    if ( type( input[ field ] ) !== expectedType ) {
      throw new TypeError( `Expected type of "${field}" to be "${expectedType}" in "${context}". Received value: "${input[ field ]}" with type "${type( input[ field ] )}".` )
    }
  }
}
