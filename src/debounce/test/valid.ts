import { mock } from "node:test"
import test from "tape"

import { debounce } from "../debounce.js"

test("debounce - valid", t => {
  mock.timers.enable({ apis: ["setTimeout", "Date"] })

  {
    const calls: number[] = []
    const debounced = debounce((input: number) => calls.push(input))

    for (let i = 0; i < 100; i++) {
      debounced(i)
    }

    mock.timers.tick(49)
    t.deepEqual(calls, [], "given [49 ms after the last call] should [not run]")

    mock.timers.tick(1)
    t.deepEqual(
      calls,
      [99],
      "given [100 calls and the default wait] should [run once with the last params]"
    )
  }

  {
    const calls: number[] = []
    const debounced = debounce({ wait: 100 }, (input: number) =>
      calls.push(input)
    )

    debounced(1)
    mock.timers.tick(60)
    debounced(2)
    mock.timers.tick(99)
    t.deepEqual(
      calls,
      [],
      "given [a call that restarts the wait] should [not run before the new wait ends]"
    )

    mock.timers.tick(1)
    t.deepEqual(
      calls,
      [2],
      "given [a custom wait of 100] should [run once, 100 ms after the last call]"
    )
  }

  {
    const calls: number[] = []
    const debounced = debounce({}, (input: number) => calls.push(input))

    debounced(1)
    mock.timers.tick(50)
    t.deepEqual(calls, [1], "given [empty options] should [wait 50 ms]")
  }

  // Abort with a signal, eg. when a React component unmounts: the pending call
  // never runs, and later calls do nothing
  {
    const calls: number[] = []
    const controller = new AbortController()
    const debounced = debounce(
      { wait: 50, signal: controller.signal },
      (input: number) => calls.push(input)
    )

    debounced(1)
    controller.abort()
    mock.timers.tick(50)
    debounced(2)
    mock.timers.tick(50)
    t.deepEqual(
      calls,
      [],
      "given [an abort before the wait ends] should [drop the pending call and every later one]"
    )
  }

  {
    const calls: number[] = []
    const debounced = debounce(
      { signal: AbortSignal.abort() },
      (input: number) => calls.push(input)
    )

    debounced(1)
    mock.timers.tick(50)
    t.deepEqual(
      calls,
      [],
      "given [a signal that is already aborted] should [never run fn]"
    )
  }

  mock.timers.reset()
  t.end()
})
