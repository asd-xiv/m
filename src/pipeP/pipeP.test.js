import test from "tape"
import { pipeP } from ".."

test("pipeP", t => {
  const inc = input => input + 1
  const sum = (a = 0, b = 0) =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(a + b)
      }, 100)
    })

  return Promise.all([pipeP(sum, inc)(2), pipeP(sum, inc, inc)(2, 2)]).then(
    ([first, second]) => {
      t.equal(first, 3, "first input arity 1")
      t.equal(second, 6, "first input arity 2")
      t.end()
    }
  )
})
