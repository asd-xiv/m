import { isDeepStrictEqual } from "node:util"

import isEqualLodash from "lodash/isEqual.js"
import underscore from "underscore"

import { isDeepEqual } from "../is-deep-equal.js"

type Compare = (left: unknown, right: unknown) => boolean

// The deep equalities m's devDependencies install, next to m's and Node's
const CANDIDATES: Record<string, Compare> = {
  "m isDeepEqual": isDeepEqual,
  "node util.isDeepStrictEqual": isDeepStrictEqual,
  "lodash isEqual": isEqualLodash,
  "underscore isEqual": (left, right) => underscore.isEqual(left, right),
}

export { CANDIDATES }
export type { Compare }
