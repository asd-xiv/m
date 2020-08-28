/* eslint-disable no-sync, no-console */

import Benchmark from "benchmark"

import { isDeepEqual } from "./deep-equal"
import { isEqual as deepEqualL } from "lodash"
import { equals as deepEqualR } from "ramda"
import { isEqual as deepEqualU } from "underscore"
import deepEqualF from "fast-deep-equal"

const sourceA1 = {
  lvl1: [1, 2, 3],
  "lvl1-1": {
    a: [1, 2],
    b: 3,
  },
}

const sourceA2 = {
  "lvl1-1": {
    b: 3,
    a: [1, 2],
  },
  lvl1: [1, 2, 3],
}

const sourceB1 = {
  lvl1: [1, 2, 3],
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

const sourceB2 = {
  lvl1: [1, 2, 3],
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
    isDeepEqual(sourceA1, sourceA2)
  })
  .add("- lodash#isEqual", () => {
    deepEqualL(sourceA1, sourceA2)
  })
  .add("- ramda#equals", () => {
    deepEqualR(sourceA1)(sourceA2)
  })
  .add("- underscore#isEqual", () => {
    deepEqualU(sourceA1, sourceA2)
  })
  .add("- fast-deep-equal#isEqual", () => {
    deepEqualF(sourceA1, sourceA2)
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
    isDeepEqual(sourceB1, sourceB2)
  })
  .add("- lodash#isEqual", () => {
    deepEqualL(sourceB1, sourceB2)
  })
  .add("- ramda#equals", () => {
    deepEqualR(sourceB1, sourceB2)
  })
  .add("- underscore#isEqual", () => {
    deepEqualU(sourceB1, sourceB2)
  })
  .add("- fast-deep-equal#isEqual", () => {
    deepEqualF(sourceB1, sourceB2)
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
