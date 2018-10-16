module.exports = source =>
  Array.isArray(source) && source.length !== 0
    ? source[source.length - 1]
    : null
