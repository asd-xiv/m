import test from "tape"
import { get } from ".."

test("get", t => {
  t.equal(
    get("lorem")({
      lorem: "ipsum",
    }),
    "ipsum",
    "Get existing property"
  )

  t.equal(
    get("not-exist")({
      lorem: "ipsum",
    }),
    undefined,
    "Get non-existing property // undefined"
  )

  t.equal(
    get("not-exist")(undefined),
    undefined,
    "Get prop from undefined // undefined"
  )

  t.equal(
    get("not-exist")(2),
    undefined,
    "Get prop from non object // undefined"
  )

  t.end()
})
