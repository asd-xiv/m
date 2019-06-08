import test from "tape"
import { map } from ".."

test("map", t => {
  const square = value => value * value

  t.deepEqual(
    map(square)([1, 2, 3]),
    [1, 4, 9],
    "(square)([1,2,3]) // => [1,4,9]"
  )

  t.deepEqual(
    map(square)(3),
    [9],
    "Run map for non-array input, treat as array of one"
  )

  t.deepEqual(
    map(square, square)([1, 2, 3]),
    [1, 16, 81],
    "(square,square)([1,2,3]) // => [1,16,82]"
  )

  t.deepEqual(map(square)([]), [], "iteration over [] should equal []")

  map((currentValue, index, array) => {
    t.equal(
      currentValue,
      array[index],
      `callback element "${currentValue}" should equal [${array}][${index}]`
    )

    return currentValue * currentValue
  })([1, 2])

  const imutableTestArray = [1, 2, 3]

  t.notEqual(map(square)(imutableTestArray), imutableTestArray, "Imutable")

  t.end()
})
