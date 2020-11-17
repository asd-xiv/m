import test from "tape"
import { renameFile } from "./rename-file"

test("renameFile", t => {
  t.equals(
    renameFile("ipsum")("/home/user/lorem"),
    "/home/user/ipsum",
    "Rename file with full path"
  )

  t.equals(
    renameFile("ipsum")("/home/user/lorem/"),
    "/home/user/ipsum",
    "Rename file with trailing slash in path"
  )

  t.equals(
    renameFile("ipsum/")("/home/user/lorem/"),
    "/home/user/ipsum",
    "Rename file with trailing slash in path and new file name"
  )

  t.equals(
    renameFile("/ipsum")("/home/user/lorem"),
    "/home/user/ipsum",
    "Rename file with trailing slash in new file name"
  )

  t.equals(
    renameFile("ipsum")("lorem"),
    "ipsum",
    "Rename file with only fileName"
  )

  t.equals(
    renameFile("ipsum")(renameFile("ipsum")("/lorem/test")),
    "/lorem/ipsum",
    "Idempotent"
  )
  t.end()
})
