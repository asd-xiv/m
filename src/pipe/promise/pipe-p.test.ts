import test from "tape"

import { pipeP } from "./pipe-p.js"

const inc = (input: number): number => input + 1
const incP = (input: number): Promise<number> =>
  new Promise(resolve => {
    resolve(input + 1)
  })

test("pipeP - uncurried", async t => {
  t.equal(
    await pipeP(incP)(2),
    3,
    "given [single async function] should [resolve to result]"
  )

  t.equal(
    await pipeP(incP, inc)(2),
    4,
    "given [async then sync functions] should [chain and resolve]"
  )

  t.equal(
    await pipeP(incP, inc, inc)(2),
    5,
    "given [three functions] should [chain all results left to right]"
  )

  t.end()
})

test("pipeP - rejections", async t => {
  const boom = (): number => {
    throw new Error("boom")
  }

  const reason = async (promise: Promise<number>): Promise<string> =>
    promise.then(
      () => "resolved",
      (error: unknown) => (error as Error).message
    )

  t.equal(
    await reason(pipeP(boom, inc)(1)),
    "boom",
    "given [a first function that throws] should [return a rejected promise]"
  )

  t.equal(
    await reason(pipeP(incP, boom)(1)),
    "boom",
    "given [a later function that throws] should [return a rejected promise]"
  )

  t.end()
})

test("pipeP - invalid input", t => {
  t.throws(
    () => {
      // @ts-expect-error - intentional to test runtime throw
      pipeP()(2)
    },
    /TypeError: @asd14\/m\/pipeP: expected 'fns' to be 'NonEmpty', got 'Empty'/,
    "given [no functions] should [throw error]"
  )

  t.throws(
    () => {
      // @ts-expect-error - intentional to test runtime throw
      pipeP(incP, "x")
    },
    /@asd14\/m\/pipeP: expected 'fns\[1\]' to be 'Function', got 'String'/,
    "given [a string as the second function] should [throw error naming the index]"
  )

  t.end()
})
