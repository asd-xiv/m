/* eslint-disable unicorn/no-null */

import { describe } from "riteway"

import { isURI } from "./is-uri"

describe("isURI", async assert => {
  assert({
    given: "a number as source",
    should: "return false",
    actual: isURI(2),
    expected: false,
  })

  assert({
    given: "null as source",
    should: "return false",
    actual: isURI(null),
    expected: false,
  })

  assert({
    given: "undefined as source",
    should: "return false",
    actual: isURI(),
    expected: false,
  })

  assert({
    given: "random word",
    should: "return false",
    actual: isURI("lorem"),
    expected: false,
  })

  assert({
    given: "FTP file address with protocol",
    should: "return true",
    actual: isURI("ftp://ftp.is.co.za/rfc/rfc1808.txt"),
    expected: true,
  })

  assert({
    given: "HTTP file address with protocol",
    should: "return true",
    actual: isURI("http://www.ietf.org/rfc/rfc2396.txt"),
    expected: true,
  })

  assert({
    given: "HTTP file address without protocol",
    should: "return false",
    actual: isURI("www.ietf.org/rfc/rfc2396.txt"),
    expected: false,
  })

  assert({
    given: "Email address with protocol",
    should: "return true",
    actual: isURI("mailto:John.Doe@example.com"),
    expected: true,
  })

  assert({
    given: "Email address without protocol",
    should: "return false",
    actual: isURI("John.Doe@example.com"),
    expected: false,
  })
})
