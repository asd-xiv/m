import { mock } from "node:test"
import { setFlagsFromString } from "node:v8"
import { runInNewContext } from "node:vm"

import test from "tape"

import { debounce } from "../debounce.js"

// The test runner starts Node without --expose-gc, so the flag is set here
setFlagsFromString("--expose-gc")
const gc = runInNewContext("gc") as () => void

test("debounce - edge", async t => {
  mock.timers.enable({ apis: ["setTimeout"] })

  {
    // After a call runs, debounce must let go of its params. A timer that is
    // still set after it fired would keep them until the next call:
    //
    //   debounced (the function you keep)
    //     └── timer          the last timer, still set after it fired
    //           └── callback () => fn(...params)
    //                 └── params   [payload]
    const debounced = debounce({ wait: 10 }, (_payload: object) => undefined)
    let payload: object | undefined = { body: "x".repeat(10_000) }
    const reference = new WeakRef(payload)

    debounced(payload)
    payload = undefined
    mock.timers.tick(10)

    // V8 keeps a WeakRef's target until the current job ends
    await new Promise(resolve => setImmediate(resolve))
    gc()

    t.equal(
      reference.deref(),
      undefined,
      "given [a call that already ran] should [release its params]"
    )
  }

  mock.timers.reset()
})
