const test = require("tape")
const indexBy = require("./index-by")

/**
 * Index an array of objects by field. Only truthy fields will be indexed.
 *
 * @param  {string}  field  The field to index by
 * @param  {Array}   array  Input
 *
 * @return {Object}
 *
 * @tag Array
 * @signature (field: string) => (source: Object[]): Object
 *
 * @example
 * indexBy("id")([
 *   {id: 1, user_id: 2},
 *   {id: 2, user_id: 3},
 * ])
 * // => {
 * //   1: {id: 1, user_id: 2},
 * //   2: {id: 2, user_id: 3},
 * // }
 */
test("array::indexBy", t => {
  t.deepEqual(
    indexBy("id")([{ id: 1, label: "test" }, { id: 2, label: "foo" }]),
    {
      1: { id: 1, label: "test" },
      2: { id: 2, label: "foo" },
    },
    "index object array by existing field"
  )

  t.deepEqual(
    indexBy("id")([
      { id: 1, label: "test" },
      { id: 2, label: "foo" },
      { label: "foo bar" },
    ]),
    {
      1: { id: 1, label: "test" },
      2: { id: 2, label: "foo" },
    },
    "index object array by existing field"
  )

  t.end()
})
