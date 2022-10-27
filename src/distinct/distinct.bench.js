/* eslint-disable no-sync, no-console */

import Benchmark from "benchmark"
import { uniq as distinctR } from "ramda"

import { distinct } from "./distinct.js"

const inputA = [1, 2, 3, 3, 4]
const inputB = [1, 2, [{ a: 2 }], [{ a: 2 }]]

// lodash & underscore's uniq functions dont do deepEqual, only shallow

const suite1 = new Benchmark.Suite({
  name: "Primitive duplicates",
})
  .on("start", bench => {
    console.log(`### ${bench.currentTarget.options.name} ###`)
  })
  .on("cycle", event => {
    console.log(String(event.target))
  })
  .add("- functies#distinct", () => {
    distinct(inputA)
  })
  .add("- ramda#uniq", () => {
    distinctR(inputA)
  })

const suite2 = new Benchmark.Suite({
  name: "Recursive with objects duplicates",
})
  .on("start", bench => {
    console.log(`### ${bench.currentTarget.options.name} ###`)
  })
  .on("cycle", event => {
    console.log(String(event.target))
  })
  .add("- functies#distinct", () => {
    distinct(inputB)
  })
  .add("- ramda#uniq", () => {
    distinctR(inputB)
  })

suite1
  .run({
    async: true,
  })
  .on("complete", () => {
    suite2.run({
      async: true,
    })
  })
