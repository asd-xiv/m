const test = require("tape")
const hasWith = require("./has-with")

test("hasWith", t => {
  t.equals(
    hasWith({ id: 2 })([{ id: 1 }, { id: 3 }]),
    false,
    "Array does not have an object with id = 2"
  )

  t.equals(
    hasWith({ id: 3 })([{ id: 1 }, { id: 3 }]),
    true,
    "Array has object with id = 3"
  )

  t.equals(hasWith({})([]), false, "Has value in empty array")

  t.end()
})
