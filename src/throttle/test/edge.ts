import { mock } from "node:test"

import test from "tape"

import { throttle } from "../throttle.js"

test("throttle - edge", t => {
  // The fake clock starts at 0, and cannot step back below it
  mock.timers.enable({ apis: ["setTimeout", "Date"], now: 10_000_000 })

  {
    // The wall clock steps back when the system corrects it, eg. by NTP. The
    // window must still end after `wait`, not an hour later
    const calls: number[] = []
    const throttled = throttle({ wait: 50 }, (input: number) =>
      calls.push(input)
    )

    throttled(1)
    mock.timers.tick(50)
    mock.timers.setTime(Date.now() - 3_600_000)
    throttled(2)

    t.deepEqual(
      calls,
      [1, 2],
      "given [a wall clock that steps back an hour] should [run again once the window ends]"
    )
  }

  mock.timers.reset()
  t.end()
})
