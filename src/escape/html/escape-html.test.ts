import test from "tape"

import { escapeHTML } from "./escape-html.js"

test("escapeHTML - uncurried", t => {
  t.equal(
    escapeHTML("<b>bold</b>"),
    "&lt;b&gt;bold&lt;&#47;b&gt;",
    "given [string with angle brackets] should [escape < and > and /]"
  )

  t.equal(
    escapeHTML("Tom & Jerry"),
    "Tom &amp; Jerry",
    "given [string with ampersand] should [escape &]"
  )

  t.equal(
    escapeHTML(`He said "hello"`),
    "He said &quot;hello&quot;",
    'given [string with double quotes] should [escape "]'
  )

  t.equal(
    escapeHTML("it's"),
    "it&#39;s",
    "given [string with single quote] should [escape ']"
  )

  t.equal(
    escapeHTML("path/to/file"),
    "path&#47;to&#47;file",
    "given [string with forward slashes] should [escape /]"
  )

  t.equal(
    escapeHTML("<script type='text/javascript'>alert('HERE'S BOBBY')</script>"),
    "&lt;script type=&#39;text&#47;javascript&#39;&gt;alert(&#39;HERE&#39;S BOBBY&#39;)&lt;&#47;script&gt;",
    "given [script tag with mixed special chars] should [escape all HTML special characters]"
  )

  t.equal(
    escapeHTML("plain text"),
    "plain text",
    "given [string without special chars] should [return the string unchanged]"
  )

  t.end()
})

test("escapeHTML - invalid input", t => {
  t.throws(
    () => {
      // @ts-expect-error -- testing runtime validation
      escapeHTML(42)
    },
    /expected 'input' to be 'String', got 'Number'/,
    "given [a number as input] should [throw TypeError]"
  )

  t.end()
})
