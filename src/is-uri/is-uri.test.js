/* eslint-disable unicorn/no-null */

import test from "tape"

import { isURI } from "./is-uri.js"

test("isURI", t => {
  t.equal(isURI(2), false, "given [a number] should [return false]")

  t.equal(isURI(null), false, "given [null] should [return false]")

  t.equal(isURI(), false, "given [undefined] should [return false]")

  t.equal(isURI("lorem"), false, "given [random word] should [return false]")

  t.equal(
    isURI("ftp://ftp.is.co.za/rfc/rfc1808.txt"),
    true,
    "given [FTP file address with protocol] should [return true]"
  )

  t.equal(
    isURI("http://www.ietf.org/rfc/rfc2396.txt"),
    true,
    "given [HTTP file address with protocol] should [return true]"
  )

  t.equal(
    isURI("www.ietf.org/rfc/rfc2396.txt"),
    false,
    "given [HTTP file address without protocol] should [return false]"
  )

  t.equal(
    isURI("mailto:John.Doe@example.com"),
    true,
    "given [Email address with protocol] should [return true]"
  )

  t.equal(
    isURI("John.Doe@example.com"),
    false,
    "given [Email address without protocol] should [return false]"
  )

  t.end()
})
