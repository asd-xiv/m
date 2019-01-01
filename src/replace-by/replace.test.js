const test = require("tape")
const replaceBy = require("./replace-by")

/**
 * Find and replace object in array
 *
 * @tag Array
 * @signature (filter: Object, newElm: Object) => (source: Object[]): Object[]
 *
 * @param  {Object}    filter  Filter object used to match against each element
 * @param  {Object}    newElm  Object to replace matching elements
 * @param  {Object[]}  source  Source array
 *
 * @return {Array}
 *
 * @example
 * replaceBy(
 *  {id: 2},
 *  {id: 2, title: "boss", isBoss: true}
 *  )([
 *    {id: 2, title:"not boss"}
 *  ])
 * // => [{id: 2, title:"boss", isBoss: true}]
 */
test("array::replaceBy", t => {
  t.deepEqual(
    replaceBy({ id: 2 }, { id: 2, title: "boss", isBoss: true })([
      { id: 2, title: "minion" },
      { id: 3, title: "minion" },
    ]),
    [{ id: 2, title: "boss", isBoss: true }, { id: 3, title: "minion" }],
    "Replace existing object"
  )

  t.deepEqual(
    replaceBy({ "!name": "alice" }, { name: "bobby", title: "tables" })([
      { name: "alice", title: "first" },
      { name: "bob", title: "second" },
      { name: "george", title: "third" },
    ]),
    [
      { name: "alice", title: "first" },
      { name: "bobby", title: "tables" },
      { name: "bobby", title: "tables" },
    ],
    "Replace multiple objects by using negate in filter object"
  )

  t.deepEquals(
    replaceBy({ id: 2 }, item => ({
      ...item,
      content: ["new", "updated", "field"],
    }))([
      { id: 1, name: "foo", content: [] },
      { id: 2, name: "bar", content: [] },
    ]),
    [
      { id: 1, name: "foo", content: [] },
      { id: 2, name: "bar", content: ["new", "updated", "field"] },
    ],
    "Replace object with custom update function"
  )

  t.end()
})
