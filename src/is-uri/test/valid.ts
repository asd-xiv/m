import test from "tape"

import { filter } from "../../filter/filter.js"
import { isURI } from "../is-uri.js"

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

  t.equal(
    isURI("http://a.b/caf%C3%A9?q=%E2%9C%93#%20"),
    true,
    "given [percent-encoded bytes in the path, query and fragment] should [return true]"
  )
  t.equal(
    isURI("git+ssh://example.com/repo.git"),
    true,
    "given [a scheme with + and .] should [return true]"
  )

  // Not a URI
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

  // RFC 3986: a "%" starts a pair of hex digits. A lone "%" or "%zz" cannot
  // be decoded, eg. decodeURIComponent throws on both
  t.equal(
    isURI("http://a.b/%zz"),
    false,
    "given [a % followed by letters that are not hex digits] should [return false]"
  )
  t.equal(
    isURI("http://a.b/%"),
    false,
    "given [a lone % at the end] should [return false]"
  )
  t.equal(
    isURI("http://a.b/?q=%zz"),
    false,
    "given [a bad % in the query] should [return false]"
  )

  // A scheme allows letters, digits, "+", "-" and ".", not a comma
  t.equal(
    isURI("a,b:c"),
    false,
    "given [a comma in the scheme] should [return false]"
  )

  // In a pipe
  t.deepEqual(
    filter(isURI, ["https://a.b", "nope"]),
    ["https://a.b"],
    "given [isURI as filter predicate] should [keep only the URIs]"
  )

  t.end()
})
