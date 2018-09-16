module.exports = match => source =>
  source.replace( match, "\\$&" )
