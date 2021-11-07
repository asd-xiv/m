export const escapeHTML = input =>
  input.replace(
    /["&'/<>]/g,
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
