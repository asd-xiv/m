const findIndexBy = require("../find-index-by/find-index-by")

module.exports = (filter, value) => source => {
  const result = [...source]
  const index = findIndexBy(filter)(source)

  if (index === -1) {
    result.push(value)
  } else {
    result.splice(index, 1, value)
  }

  return result
}
