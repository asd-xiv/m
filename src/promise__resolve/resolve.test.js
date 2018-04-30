const test = require( "tape" )
const resolve = require( "./resolve" )
const type = require( "../core__type/type" )

/**
 * Wrapp with promise
 */
test( "promise::resolve", t => {
  // expected assertions count
  t.plan( 5 )

  const value = 2
  const promisifiedValue = resolve(

    // resolve function
    ( input, secondInput ) => {
      t.deepEqual( input, 2,
        "inputFn should receive input" )

      t.deepEqual( secondInput, 4,
        "inputFn should receive input (arity 2)" )

      return input + secondInput
    },

    // then function
    resolvedInput => {
      t.deepEqual( resolvedInput, 6,
        "thenFn should receive resolved input" )

      throw new Error( "Test catch" )
    },

    // catch function
    error => {
      t.deepEqual( error.message, "Test catch",
        "catchFn should receive error" )
    }
  )( value, value * 2 )

  t.deepEqual( type( promisifiedValue ), "Promise",
    "resolve should return a Promise" )
} )
