import { expectType } from "tsd"

import { i, identity } from "./i.js"

expectType<4>(i(4))

expectType<{ a: number }>(identity({ a: 42 }))
