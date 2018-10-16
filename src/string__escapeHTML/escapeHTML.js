module.exports = source =>
  source.replace(
    /[\"&'\/<>]/g,
    char =>
      ({
        '"': "&quot;",
        "&": "&amp;",
        "'": "&#39;",
        "/": "&#47;",
        "<": "&lt;",
        ">": "&gt;",
      }[char])
  )
