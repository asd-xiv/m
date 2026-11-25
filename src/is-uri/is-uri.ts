/*
 * The `uri` regular expression ported from rfc-3986 1.0.1 to TypeScript
 * https://github.com/DavidTPate/rfc-3986
 * MIT License, Copyright (c) 2015 David Pate
 */

import { type } from "../type/type.js"

type IsURIFn = (input: string) => boolean

// --- Regular expression, built once at module load ---

const _buildURIRegExp = (): RegExp => {
  const digit = "0-9"
  const digitOnly = `[${digit}]`
  const alpha = "a-zA-Z"
  const hexDigit = `${digit}A-Fa-f`
  const hexDigitOnly = `[${hexDigit}]`
  const unreserved = `${alpha}${digit}-\\._~`
  const subDelims = "!\\$&'\\(\\)\\*\\+,;="
  const pctEncoded = `%${hexDigit}`
  const pchar = `${unreserved}${pctEncoded}${subDelims}:@`
  const pcharOnly = `[${pchar}]`

  // dec-octet, with zero-padded addresses accepted
  const decOctet =
    `(?:0?0?${digitOnly}|0?[1-9]${digitOnly}|1${digitOnly}${digitOnly}` +
    `|2[0-4]${digitOnly}|25[0-5])`
  const ipv4 = `(?:${decOctet}\\.){3}${decOctet}`

  const h16 = `${hexDigitOnly}{1,4}`
  const ls32 = `(?:${h16}:${h16}|${ipv4})`
  const ipv6 = `(?:${[
    `(?:${h16}:){6}${ls32}`,
    `::(?:${h16}:){5}${ls32}`,
    `(?:${h16})?::(?:${h16}:){4}${ls32}`,
    `(?:(?:${h16}:){0,1}${h16})?::(?:${h16}:){3}${ls32}`,
    `(?:(?:${h16}:){0,2}${h16})?::(?:${h16}:){2}${ls32}`,
    `(?:(?:${h16}:){0,3}${h16})?::${h16}:${ls32}`,
    `(?:(?:${h16}:){0,4}${h16})?::${ls32}`,
    `(?:(?:${h16}:){0,5}${h16})?::${h16}`,
    `(?:(?:${h16}:){0,6}${h16})?::`,
  ].join("|")})`
  const ipFuture = `v${hexDigitOnly}+\\.[${unreserved}${subDelims}:]+`

  const scheme = `[${alpha}][${alpha}${digit}+-\\.]*`
  const userinfo = `[${unreserved}${pctEncoded}${subDelims}:]*`
  const ipLiteral = `\\[(?:${ipv6}|${ipFuture})\\]`
  const regName = `[${unreserved}${pctEncoded}${subDelims}]{0,255}`
  const host = `(?:${ipLiteral}|${ipv4}|${regName})`
  const authority = `(?:${userinfo}@)?${host}(?::${digitOnly}*)?`

  const segment = `${pcharOnly}*`
  const segmentNz = `${pcharOnly}+`
  const pathAbEmpty = `(?:\\/${segment})*`
  const pathAbsolute = `\\/(?:${segmentNz}${pathAbEmpty})?`
  const pathRootless = `${segmentNz}${pathAbEmpty}`
  const hierPart = `(?:(?:\\/\\/${authority}${pathAbEmpty})|${pathAbsolute}|${pathRootless})`

  // The query ends at the fragment or at the end of the input
  const query = `[${pchar}\\/\\?]*(?=#|$)`
  const fragment = `[${pchar}\\/\\?]*`

  return new RegExp(
    `^(?:${scheme}:${hierPart})(?:\\?${query})?(?:#${fragment})?$`
  )
}

const URI_REG_EXP = _buildURIRegExp()

// --- Public function ---

/**
 * Check that a string is a URI, as [RFC 3986](https://www.rfc-editor.org/rfc/rfc3986)
 * defines it. A URI needs a scheme, `example.com` is not one. Takes one
 * argument, there is no curried form.
 *
 * @param {string} input - Text to check
 *
 * @returns {boolean} `true` when the input is a URI
 *
 * @example
 * isURI("https://example.com/path?q=1#top")
 * // => true
 *
 * isURI("mailto:john@example.com")
 * // => true
 *
 * isURI("example.com")
 * // => false
 *
 * filter(isURI, ["https://a.b", "nope"])
 * // => ["https://a.b"]
 *
 * @name isURI
 * @tag String
 */
const isURI = ((input: unknown): boolean => {
  if (typeof input !== "string") {
    throw new TypeError(
      `@asd14/m/isURI: expected 'input' to be 'String', got '${type(input)}'`
    )
  }

  return URI_REG_EXP.test(input)
}) as IsURIFn

export { isURI }
export type { IsURIFn }
