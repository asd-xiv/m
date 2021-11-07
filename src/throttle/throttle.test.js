import test from "tape"

import { throttle } from "./throttle.js"

test("throttle", t => {
  {
    const callData = []
    const fn = input => callData.push(input)
    const throttledFn = throttle(fn)

    for (let i = 0; i < 100; i++) {
      throttledFn(i)
    }

    setTimeout(() => {
      t.deepEqual(
        callData,
        [0],
        "Calling throttled function 100 times should run it once - using default throttle props"
      )
    }, 100)
  }

  {
    const callData = []
    const fn = input => callData.push(input)
    const throttledFn = throttle(fn, {
      timeWindow: 50,
      hasLastCall: true,
    })

    for (let i = 0; i < 100; i++) {
      throttledFn(i)
    }

    setTimeout(() => {
      t.deepEqual(
        callData,
        [0, 99],
        "Calling throttled function 100 times with lastCall enabled should run it twice - using custom throttle props"
      )

      t.end()
    }, 100)
  }
})
