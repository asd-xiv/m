import test from "tape"
import { escapeHTML } from ".."

test("escapeHTML", t => {
  const actual = escapeHTML(
    "<script type='text/javascript'>alert('HERE'S BOBBY')</script>"
  )
  const expected =
    "&lt;script type=&#39;text&#47;javascript&#39;&gt;alert(&#39;HERE&#39;S BOBBY&#39;)&lt;&#47;script&gt;"

  t.equal(
    actual,
    expected,
    "HTML special chars are translated for safe rendering"
  )

  t.end()
})
