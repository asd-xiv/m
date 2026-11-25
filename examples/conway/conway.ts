import {
  converge,
  isEqual,
  join,
  map,
  mapMatrix,
  pipe,
  read,
  sum,
  when,
} from "@asd14/m"

const NEIGHBOUR_OFFSETS: [number, number][] = [
  [-1, 1],
  [-1, 0],
  [-1, -1], // above
  [0, -1],
  [0, 1], // side ways
  [1, -1],
  [1, 0],
  [1, 1], // bellow
]

const drawCell = when(isEqual(0), "░", "█")
const drawRow = pipe(map(drawCell), join(""))
const drawWorld = pipe(map(drawRow), join("\n"))

const countAliveNeighbours = (
  _: number,
  rIndex: number,
  cIndex: number,
  world: readonly (readonly number[])[]
) =>
  pipe(
    map(([rOffset, cOffset]: [number, number]) =>
      read([rIndex + rOffset, cIndex + cOffset], 0, world)
    ),
    sum
  )(NEIGHBOUR_OFFSETS)

/**
 * Determine next cell state based on it's current state and surounding
 * neighbours.
 *
 * If alive:
 * - 0 or 1 neighbours it dies
 * - 2 or 3 neighbours it survives
 * - 4 or more neighbours it dies
 *
 * If dead:
 * - 3 neighbours it becomes alive
 */
const computeNextCell = (isAlive: boolean, nCount: number) =>
  isAlive ? (nCount === 2 || nCount === 3 ? 1 : 0) : nCount === 3 ? 1 : 0

const computeNextGeneration = mapMatrix(
  converge(computeNextCell, [isEqual(1), countAliveNeighbours])
)

/*
 * Main world evolving loop
 */

const start = () => {
  let seed = [
    [0, 0, 0, 0, 0, 1, 1, 1, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 1, 1, 0, 0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]

  setInterval(() => {
    console.log(drawWorld(seed), "\n")

    seed = computeNextGeneration(seed)
  }, 500)
}

export {
  NEIGHBOUR_OFFSETS,
  start,
  drawCell,
  drawRow,
  drawWorld,
  countAliveNeighbours,
  computeNextCell,
  computeNextGeneration,
}
