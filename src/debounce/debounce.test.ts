import { mock } from "node:test"
import test from "tape"

import { debounce } from "./debounce.js"

test("debounce - uncurried", t => {
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

  mock.timers.reset()
  t.end()
})

test("debounce - invalid input", t => {
  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      debounce("nope")
    },
    /@asd14\/m\/debounce: expected 'fn' to be 'Function', got 'String'/,
    "given [a string as fn] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      debounce("nope", () => undefined)
    },
    /@asd14\/m\/debounce: expected 'options' to be 'Object', got 'String'/,
    "given [a string as options] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      debounce({ wait: "10" }, () => undefined)
    },
    /expected 'wait' to be 'Number', got 'String'/,
    "given [a string as wait] should [throw TypeError]"
  )

  t.throws(
    () => {
      debounce({ wait: -1 }, () => undefined)
    },
    /expected 'wait' to be 'NonNegative', got '-1'/,
    "given [a negative wait] should [throw TypeError]"
  )

  t.end()
})
