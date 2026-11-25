/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { Bench } from "tinybench"

import {
  NEIGHBOUR_OFFSETS,
  computeNextGeneration,
  drawWorld,
} from "./conway.ts"

// --- Shared data ---

const SEED = [
  [0, 0, 0, 0, 0, 1, 1, 1, 0],
  [0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 1, 1, 0, 0, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
]

// --- Imperative alternatives ---

const impDrawWorld = (world: number[][]) => {
  let canvas = ""
  for (let i = 0, rowCount = world.length; i < rowCount; i++) {
    const row = world[i]!
    for (let j = 0, colCount = row.length; j < colCount; j++) {
      canvas += row[j] === 0 ? "░" : "█"
    }
    canvas += "\n"
  }
  return canvas
}

const impCountAliveNeighbours = (
  rIndex: number,
  cIndex: number,
  world: number[][]
) => {
  let count = 0

  for (let i = 0, length = NEIGHBOUR_OFFSETS.length; i < length; i++) {
    const [dr, dc] = NEIGHBOUR_OFFSETS[i]!
    const row = world[rIndex + dr]

    if (row !== undefined) {
      count += row[cIndex + dc] ?? 0
    }
  }

  return count
}

const impComputeNextGeneration = (world: number[][]): number[][] => {
  const result: number[][] = []

  for (let i = 0, rowCount = world.length; i < rowCount; i++) {
    const row = world[i]!
    const newRow: number[] = []

    for (let j = 0, colCount = row.length; j < colCount; j++) {
      const cell = row[j]!
      const nCount = impCountAliveNeighbours(i, j, world)
      const nextCell =
        cell === 1
          ? nCount === 2 || nCount === 3
            ? 1
            : 0
          : nCount === 3
            ? 1
            : 0

      newRow.push(nextCell)
    }

    result.push(newRow)
  }

  return result
}

// --- Benchmarks ---

const bench = new Bench({ warmupIterations: 1000 })

bench
  .add("drawWorld - functional", () => {
    drawWorld(SEED)
  })
  .add("drawWorld - imperative", () => {
    impDrawWorld(SEED)
  })
  .add("evolve - functional", () => {
    computeNextGeneration(SEED)
  })
  .add("evolve - imperative", () => {
    impComputeNextGeneration(SEED)
  })

await bench.run()
console.table(bench.table())
