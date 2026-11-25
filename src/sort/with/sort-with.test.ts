import test from "tape"

import { sortWith } from "./sort-with.js"

test("sortWith - uncurried", t => {
  t.deepEqual(
    sortWith(
      {
        isActive: "desc",
        position: "asc",
      },
      [
        { id: 4, position: 5, isActive: true },
        { id: 1, position: 3, isActive: true },
        { id: 3, position: 4, isActive: false },
        { id: 6, position: 0, isActive: false },
      ]
    ),
    [
      { id: 1, position: 3, isActive: true },
      { id: 4, position: 5, isActive: true },
      { id: 6, position: 0, isActive: false },
      { id: 3, position: 4, isActive: false },
    ],
    "given [direction strings config] should [return a sorted array]"
  )

  t.deepEqual(
    sortWith({}, [{ a: 2 }, { a: 1 }]),
    [{ a: 2 }, { a: 1 }],
    "given [empty config] should [preserve original order]"
  )

  t.deepEqual(
    sortWith(
      {
        isActive: "desc",
        createdAt: (a: string, b: string) =>
          new Date(a).getTime() - new Date(b).getTime(),
      },
      [
        { id: 5, createdAt: "12-02-2010", isActive: false },
        { id: 4, createdAt: "12-02-2011", isActive: true },
        { id: 6, createdAt: "12-02-2005", isActive: false },
        { id: 2, createdAt: "12-02-2003", isActive: true },
        { id: 11, createdAt: "12-02-2003" },
        { id: 12, createdAt: "12-02-2003", isActive: null },
      ]
    ),
    [
      { id: 2, createdAt: "12-02-2003", isActive: true },
      { id: 4, createdAt: "12-02-2011", isActive: true },
      { id: 6, createdAt: "12-02-2005", isActive: false },
      { id: 5, createdAt: "12-02-2010", isActive: false },
      { id: 12, createdAt: "12-02-2003", isActive: null },
      { id: 11, createdAt: "12-02-2003" },
    ],
    "given [direction string and compare function] should [return a sorted array]"
  )

  t.deepEqual(
    sortWith(
      {
        createdAt: [(input: string) => new Date(input).getTime(), "desc"],
      },
      [
        { id: 5, createdAt: "12-02-2010", isActive: false },
        { id: 4, createdAt: "12-02-2011", isActive: true },
        { id: 3, createdAt: "12-02-2001", isActive: false },
        { id: 6, createdAt: "12-02-2005", isActive: false },
        { id: 11, createdAt: "12-02-2003" },
      ]
    ),
    [
      { id: 4, createdAt: "12-02-2011", isActive: true },
      { id: 5, createdAt: "12-02-2010", isActive: false },
      { id: 6, createdAt: "12-02-2005", isActive: false },
      { id: 11, createdAt: "12-02-2003" },
      { id: 3, createdAt: "12-02-2001", isActive: false },
    ],
    "given [lens function with direction tuple] should [return a sorted array]"
  )

  t.deepEqual(
    sortWith({ value: "asc" }, [
      { id: 1, value: null },
      { id: 2, value: undefined },
      { id: 3, value: 5 },
    ] as Array<{ id: number; value: number | null | undefined }>),
    [
      { id: 3, value: 5 },
      { id: 2, value: undefined },
      { id: 1, value: null },
    ],
    "given [null and undefined values with asc direction] should [sort undefined before null, both after real values]"
  )

  t.deepEqual(
    sortWith({ value: "desc" }, [
      { id: 1, value: undefined },
      { id: 2, value: null },
      { id: 3, value: 5 },
    ] as Array<{ id: number; value: number | null | undefined }>),
    [
      { id: 3, value: 5 },
      { id: 2, value: null },
      { id: 1, value: undefined },
    ],
    "given [null and undefined values with desc direction] should [sort null before undefined, both after real values]"
  )

  t.deepEqual(
    sortWith({ value: "asc" }, [
      { id: 1, value: null },
      { id: 2, value: undefined },
    ] as Array<{ id: number; value: number | null | undefined }>),
    [
      { id: 2, value: undefined },
      { id: 1, value: null },
    ],
    "given [null before undefined with asc] should [place undefined before null]"
  )

  t.deepEqual(
    sortWith({ value: "asc" }, [
      { id: 1, value: undefined },
      { id: 2, value: null },
    ] as Array<{ id: number; value: number | null | undefined }>),
    [
      { id: 1, value: undefined },
      { id: 2, value: null },
    ],
    "given [undefined before null with asc] should [keep undefined before null]"
  )

  t.deepEqual(
    sortWith({ value: "desc" }, [
      { id: 1, value: null },
      { id: 2, value: undefined },
    ] as Array<{ id: number; value: number | null | undefined }>),
    [
      { id: 1, value: null },
      { id: 2, value: undefined },
    ],
    "given [null before undefined with desc] should [keep null before undefined]"
  )

  t.deepEqual(
    sortWith({ value: "desc" }, [
      { id: 1, value: undefined },
      { id: 2, value: null },
    ] as Array<{ id: number; value: number | null | undefined }>),
    [
      { id: 2, value: null },
      { id: 1, value: undefined },
    ],
    "given [undefined before null with desc] should [place null before undefined]"
  )

  t.end()
})

{
  const sortByName = sortWith({ name: "asc" })
  const sortByNameDesc = sortWith({ name: "desc" })
  const input: { name?: string }[] = [
    { name: "b" },
    {},
    { name: "a" },
    { name: "c" },
  ]

  test("sortWith - missing field", t => {
    t.deepEqual(
      sortByName(input),
      [{ name: "a" }, { name: "b" }, { name: "c" }, {}],
      "given [a missing string field and asc direction] should [sort the missing field last]"
    )

    t.deepEqual(
      sortByNameDesc(input),
      [{ name: "c" }, { name: "b" }, { name: "a" }, {}],
      "given [a missing string field and desc direction] should [sort the missing field last]"
    )

    t.deepEqual(
      sortByName([{ name: null }, { name: undefined }] as {
        name?: string | null
      }[]),
      [{ name: undefined }, { name: null }],
      "given [null and undefined] should [place undefined before null in asc]"
    )

    t.deepEqual(
      sortByName([{}, { name: undefined }] as { name?: string }[]),
      [{}, { name: undefined }],
      "given [two missing fields of the same kind] should [keep their order]"
    )

    t.end()
  })
}

test("sortWith - curried", t => {
  t.deepEqual(
    sortWith({
      createdAt: (input: string) => new Date(input).getTime(),
    })([
      { id: 5, createdAt: "12-02-2010", isActive: false },
      { id: 4, createdAt: "12-02-2011", isActive: true },
      { id: 3, createdAt: "12-02-2001", isActive: false },
      { id: 6, createdAt: "12-02-2005", isActive: false },
      { id: 11, createdAt: "12-02-2003" },
    ]),
    [
      { id: 3, createdAt: "12-02-2001", isActive: false },
      { id: 11, createdAt: "12-02-2003" },
      { id: 6, createdAt: "12-02-2005", isActive: false },
      { id: 5, createdAt: "12-02-2010", isActive: false },
      { id: 4, createdAt: "12-02-2011", isActive: true },
    ],
    "given [lens function config] should [return a sorted array]"
  )

  t.end()
})

test("sortWith - invalid input", t => {
  t.throws(
    // @ts-expect-error -- testing runtime validation
    () => sortWith({ position: "asc" }, 42),
    /expected 'input' to be 'Array', got 'Number'/,
    "given [a number as input] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => sortWith(42, []),
    /expected 'config' to be 'Object', got 'Number'/,
    "given [a number as config] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => sortWith("foo", []),
    /expected 'config' to be 'Object', got 'String'/,
    "given [a string as config] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => sortWith(null, []),
    /expected 'config' to be 'Object', got 'Null'/,
    "given [null as config] should [throw TypeError]"
  )

  t.throws(
    // @ts-expect-error -- intentionally testing wrong input type
    () => sortWith([1, 2], []),
    /expected 'config' to be 'Object', got 'Array'/,
    "given [an array as config] should [throw TypeError]"
  )

  t.throws(
    () =>
      sortWith(
        // @ts-expect-error -- intentionally testing wrong direction
        { createdAt: [(input: string) => new Date(input).getTime(), "doesc"] },
        [] as Array<{ createdAt: string }>
      ),
    /expected 'createdAt' to be 'asc' or 'desc', got 'doesc'/,
    "given [invalid sort direction] should [throw TypeError]"
  )

  t.throws(
    () => sortWith({ createdAt: () => 2 }, [] as Array<{ createdAt: string }>),
    /expected 'createdAt' to be 'Unary' or 'Binary', got '0'/,
    "given [invalid sort function] should [throw TypeError]"
  )

  t.end()
})
