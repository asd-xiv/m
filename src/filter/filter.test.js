const test = require("tape")
const filter = require("./filter")

test("array::filter", t => {
  t.deepEqual(
    filter(filterElm => filterElm <= 3)([1, 2, 3, 4, 5, 6]),
    [1, 2, 3],
    "Keep items lower or equal than 3"
  )

  t.end()
})
