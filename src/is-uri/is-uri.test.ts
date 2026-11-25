import test from "tape"

import { isURI } from "./is-uri.js"
import { filter } from "../filter/filter.js"

test("isURI - valid", t => {
  t.equal(
    isURI("https://example.com/path?q=1#top"),
    true,
    "given [a URL with path, query and fragment] should [return true]"
  )

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
    isURI("mailto:John.Doe@example.com"),
    true,
    "given [Email address with protocol] should [return true]"
  )

  t.equal(
    isURI("http://[2001:db8::1]:8080/"),
    true,
    "given [an IPv6 host] should [return true]"
  )

  t.end()
})

test("isURI - invalid", t => {
  t.equal(isURI("lorem"), false, "given [random word] should [return false]")

  t.equal(
    isURI("example.com"),
    false,
    "given [a host without a scheme] should [return false]"
  )

  t.equal(
    isURI("www.ietf.org/rfc/rfc2396.txt"),
    false,
    "given [HTTP file address without protocol] should [return false]"
  )

  t.equal(
    isURI("John.Doe@example.com"),
    false,
    "given [Email address without protocol] should [return false]"
  )

  t.equal(isURI(""), false, "given [an empty string] should [return false]")

  t.end()
})

test("isURI - composition", t => {
  t.deepEqual(
    filter(isURI, ["https://a.b", "nope"]),
    ["https://a.b"],
    "given [isURI as filter predicate] should [keep only the URIs]"
  )

  t.end()
})

test("isURI - invalid input", t => {
  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      isURI(42)
    },
    /@asd14\/m\/isURI: expected 'input' to be 'String', got 'Number'/,
    "given [a number] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      isURI(null)
    },
    /expected 'input' to be 'String', got 'Null'/,
    "given [null] should [throw TypeError]"
  )

  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      isURI()
    },
    /expected 'input' to be 'String', got 'Undefined'/,
    "given [no argument] should [throw TypeError]"
  )

  t.end()
})
