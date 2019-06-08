const escape = match => source => source.replace(match, "\\$&")

export { escape }
