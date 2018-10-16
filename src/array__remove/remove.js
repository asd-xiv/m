const filter = require("../array__filter/filter")

/**
 * { lambda_description }
 *
 * @param  {mixed}  value  Value to remove
 * @param  {Array}  array  Array from where to remove
 *
 * @return {Array}
 */
module.exports = value => filter(element => element !== value)
