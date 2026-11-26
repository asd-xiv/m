import { Bench } from "tinybench"

import { CANDIDATES } from "./_candidates.js"

// A payload as an API returns it: 100 users with nested fields
const USERS = Array.from({ length: 100 }, (_, index) => ({
  id: index,
  name: `user ${index}`,
  tags: ["admin", "editor"],
  address: { city: "Amsterdam", zip: `10${index}AB` },
}))
const COPY = structuredClone(USERS)

// A full copy, with the last user's city changed: a comparison walks almost
// everything before it finds the difference. A copy that reused the users
// would let each comparison stop at `left === right`
const CHANGED = structuredClone(USERS).map((user, index) =>
  index === 99
    ? { ...user, address: { ...user.address, city: "Utrecht" } }
    : user
)

const bench = new Bench({ time: 500, warmupIterations: 5 })

for (const [name, compare] of Object.entries(CANDIDATES)) {
  bench.add(`${name}: equal`, () => compare(USERS, COPY))
  bench.add(`${name}: last item differs`, () => compare(USERS, CHANGED))
}

await bench.run()

console.log(`Speed, 100 users, Node ${process.version} on ${process.arch}`)
console.table(bench.table())
