import { describe, expect, test } from "tstyche"

import { write } from "./write.js"
import { pipe } from "../pipe/pipe.js"
import { read } from "../read/read.js"

type User = { id: number; name: string; email?: string }
type Post = { title: string; meta: { views: number; draft: boolean } }

describe("write", () => {
  test("write - uncurried", () => {
    const user: User = { id: 1, name: "alice" }
    const post: Post = { title: "Hi", meta: { views: 0, draft: true } }

    expect(write("name", "bob", user)).type.toBe<User>()

    expect(write("name", 42, user)).type.toBe<{
      id: number
      name: number
      email?: string
    }>()

    expect(write("isAdmin", true, user)).type.toBe<{
      id: number
      name: string
      email?: string
      isAdmin: boolean
    }>()

    expect(write(["meta", "views"], 10, post)).type.toBe<Post>()

    expect(write(["meta", "draft"], "no", post)).type.toBe<{
      title: string
      meta: { views: number; draft: string }
    }>()

    expect(write(["tags", 0], "x", {})).type.toBe<{ tags: string[] }>()

    expect(write([0], "x", [1, 2])).type.toBe<(number | string)[]>()
  })

  test("write - curried", () => {
    const user: User = { id: 1, name: "alice" }
    const post: Post = { title: "Hi", meta: { views: 0, draft: true } }

    expect(write("name", "bob")(user)).type.toBe<User>()

    expect(write(["meta", "views"], 10)(post)).type.toBe<Post>()

    expect(
      pipe(write(["meta", "views"], 10), read(["meta", "views"]))(post)
    ).type.toBe<number>()
  })

  test("write - missing segments", () => {
    type Profile = { address?: { city: string; zip: string } }

    const profile: Profile = {}

    // An optional object on the path is either copied or created
    expect(write(["address", "city"], "Amsterdam", profile)).type.toBe<{
      address: { city: string; zip: string } | { city: string }
    }>()

    expect(write(["a", "b", "c"], 1, {})).type.toBe<{
      a: { b: { c: number } }
    }>()
  })

  test("write - dynamic key", () => {
    const counts: Record<string, number> = { a: 1 }
    const key: string = "b"

    expect(write(key, 2, counts)).type.toBe<Record<string, number>>()
  })

  test("write - a value that fits its field keeps the field's type", () => {
    type Todo = { id: number; status: "todo" | "done"; count: number }
    const todo: Todo = { id: 1, status: "todo", count: 0 }

    expect(write("status", "done", todo)).type.toBe<Todo>()
    expect(write("count", 0, todo)).type.toBe<Todo>()
    expect(write("status", "done")(todo)).type.toBe<Todo>()

    // So the result still fits where a Todo goes
    const next: Todo = write("status", "done", todo)
    expect(next).type.toBe<Todo>()
  })

  test("write - a new key or a value that does not fit widens the literal", () => {
    type Todo = { id: number; status: "todo" | "done"; count: number }
    const todo: Todo = { id: 1, status: "todo", count: 0 }

    expect(write("tag", "x", todo)).type.toBe<{
      id: number
      status: "todo" | "done"
      count: number
      tag: string
    }>()
    expect(write("count", "many", todo)).type.toBe<{
      id: number
      status: "todo" | "done"
      count: string
    }>()
    expect(write(["meta", "tags"], ["x"], todo)).type.toBe<{
      id: number
      status: "todo" | "done"
      count: number
      meta: { tags: string[] }
    }>()
  })

  test("write - invalid input", () => {
    expect(write).type.not.toBeCallableWith("name", "bob", 42)

    expect(write).type.not.toBeCallableWith(42, "bob", {})

    expect(write).type.not.toBeCallableWith([], "bob", {})

    expect(write).type.not.toBeCallableWith("name")
  })
})
