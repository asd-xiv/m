const test = require( "tape" )
const throttle = require( "./throttle" )

test( "core::throttle( fn: Function, { timeWindow = 50, bind = null } = {} ): Function", t => {
  let counter = 0
  const testFn = throttle( () => {counter++} )

  for ( let i = 0; i < 10; i++ ) {
    testFn()
  }

  t.equal( counter, 1, "Calling functions multiple times should run it once" )

  t.end()
} )
