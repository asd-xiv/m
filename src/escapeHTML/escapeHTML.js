const escapeHTML = source =>
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

export { escapeHTML }
