import test from "tape"

import { debounce } from "./debounce.js"

test("debounce", t => {
  {
    let callCount = 0

    let iteration = 0

    const defaultSet = debounce(input => {
      callCount = callCount + 1
      iteration = input
    })

    for (let i = 0; i < 100; i++) {
      defaultSet(i)
    }

    setTimeout(() => {
      t.deepEqual(
        {
          callCount,
          i: iteration,
        },
        {
          callCount: 1,
          i: 99,
        },
        "Calling debounce function 100 times should run it once, 50ms after last call"
      )
    }, 100)
  }

  {
    let callCount = 0

    let iteration = 0

    const customSet = debounce(
      input => {
        callCount = callCount + 1
        iteration = input
      },
      { wait: 100 }
    )

    for (let i = 0; i < 100; i++) {
      customSet(i)
    }

    setTimeout(() => {
      t.deepEqual(
        {
          callCount,
          i: iteration,
        },
        {
          callCount: 1,
          i: 99,
        },
        "Calling debounced function 100 times with custom timer window"
      )

      t.end()
    }, 150)
  }
})
