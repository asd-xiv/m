import test from "tape"
import { isMatch } from ".."

test("core::isMatch", t => {
  t.deepEqual(
    isMatch({
      id: 2,
      parentId: null,
    })({
      id: 2,
      parentId: null,
      name: "John",
    }),
    true,
    "Properties are present and have equal values"
  )

  t.deepEqual(
    isMatch({
      name: "John",
      parentId: null,
    })({
      id: 2,
      parentId: 3,
      name: "John",
    }),
    false,
    "Properties are present but dont have equal values"
  )

  t.deepEqual(
    isMatch({
      name: "John",
      "!parentId": null,
    })({
      id: 2,
      parentId: null,
      name: "John",
    }),
    false,
    "Properties are present but dont have equal values (has negation)"
  )

  t.deepEqual(
    isMatch({
      name: "John",
      "!parentId": null,
    })({
      id: 2,
      name: "John",
    }),
    true,
    "Properties are not present"
  )

  t.deepEqual(
    isMatch({
      "!id": item => item === 3,
      name: item => item !== "John",
    })({
      id: 2,
      name: "JohnX",
    }),
    true,
    "Matching with predicate functions"
  )

  t.end()
})
