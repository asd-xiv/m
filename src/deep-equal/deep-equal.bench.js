/* eslint-disable no-sync, no-console */

import Benchmark from "benchmark"
import lodash from "lodash"
import deepEqualF from "fast-deep-equal"
import { equals as deepEqualR } from "ramda"
import { isEqual as deepEqualU } from "underscore"

import { isDeepEqual } from "./deep-equal.own.js"

const inputA1 = {
  "lvl1": [1, 2, 3],
  "lvl1-1": {
    a: [1, 2],
    b: 3,
  },
}

const inputA2 = {
  "lvl1-1": {
    b: 3,
    a: [1, 2],
  },
  "lvl1": [1, 2, 3],
}

const inputB1 = {
  "lvl1": [1, 2, 3],
  "lvl1-1": {
    a: [1, 2],
    b: {
      lorem: "ipsum",
      dolor: {
        test: [1, 2, 3],
      },
    },
  },
}

const inputB2 = {
  "lvl1": [1, 2, 3],
  "lvl1-1": {
    a: [1, 2],
    b: {
      lorem: "ipsum",
      dolor: {
        test: [1, 2, 4],
      },
    },
  },
}

const suite1 = new Benchmark.Suite({
  name: "2 lvl deep equal objects with arrays",
})
  .on("start", bench => {
    console.log(`### ${bench.currentTarget.options.name} ###`)
  })
  .on("cycle", event => {
    console.log(String(event.target))
  })
  .add("- functies#deepEqual", () => {
    isDeepEqual(inputA1, inputA2)
  })
  .add("- lodash#isEqual", () => {
    lodash.isEqual(inputA1, inputA2)
  })
  .add("- ramda#equals", () => {
    deepEqualR(inputA1)(inputA2)
  })
  .add("- underscore#isEqual", () => {
    deepEqualU(inputA1, inputA2)
  })
  .add("- fast-deep-equal#isEqual", () => {
    deepEqualF(inputA1, inputA2)
  })

const suite2 = new Benchmark.Suite({
  name: "3 lvl deep not equal objects with arrays",
})
  .on("start", bench => {
    console.log(`### ${bench.currentTarget.options.name} ###`)
  })
  .on("cycle", event => {
    console.log(String(event.target))
  })
  .add("- functies#deepEqual", () => {
    isDeepEqual(inputB1, inputB2)
  })
  .add("- lodash#isEqual", () => {
    lodash.isEqual(inputB1, inputB2)
  })
  .add("- ramda#equals", () => {
    deepEqualR(inputB1, inputB2)
  })
  .add("- underscore#isEqual", () => {
    deepEqualU(inputB1, inputB2)
  })
  .add("- fast-deep-equal#isEqual", () => {
    deepEqualF(inputB1, inputB2)
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
