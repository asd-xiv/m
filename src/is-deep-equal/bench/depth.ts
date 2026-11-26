import { CANDIDATES } from "./_candidates.js"
import type { Compare } from "./_candidates.js"

// The search stops here: about 4 times the deepest warm limit measured. A
// candidate that reaches it is reported as "≥ 30,000"
const DEPTH_CAP = 30_000

// An object nested `depth` levels deep: { a: { a: … { a: 1 } } }
const nest = (depth: number): unknown => {
  let value: unknown = 1

  for (let level = 0; level < depth; level++) {
    value = { a: value }
  }

  return value
}

// The deepest nesting `compare` handles before the stack overflows, up to the
// cap
const findDepthLimit = (compare: Compare): number => {
  let low = 1
  let high = DEPTH_CAP

  while (low < high) {
    const middle = Math.ceil((low + high) / 2)

    try {
      compare(nest(middle), nest(middle))
      low = middle
    } catch {
      high = middle - 1
    }
  }

  return low
}

const toLabel = (depth: number) =>
  depth >= DEPTH_CAP ? `≥ ${DEPTH_CAP.toLocaleString("en")}` : depth

// The candidates share no code, so measuring one does not warm up the next.
// Each is measured cold, then warm after 50 calls, when V8 has optimized it
// and its frames take less of the stack
const DEPTHS = Object.entries(CANDIDATES).map(([name, deepFn]) => {
  const cold = findDepthLimit(deepFn)

  for (let call = 0; call < 50; call++) {
    deepFn(nest(500), nest(500))
  }

  const warm = findDepthLimit(deepFn)

  // A comparison whose time grows with the square of the depth shows here,
  // eg. one that scans every object above it for a cycle
  const left = nest(8000)
  const right = nest(8000)
  const start = performance.now()
  let at8000 = "RangeError"

  try {
    deepFn(left, right)
    at8000 = `${(performance.now() - start).toFixed(1)} ms`
  } catch {
    // The stack overflowed before 8,000 levels
  }

  return {
    name,
    "cold": toLabel(cold),
    "warm": toLabel(warm),
    "8,000 levels": at8000,
  }
})

console.log(
  `Depth limits, Node ${process.version} on ${process.arch}, V8's default stack`
)
console.table(DEPTHS)
