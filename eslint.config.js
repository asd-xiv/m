import path from "node:path"
import { nxConfig, nxDevConfig } from "@asd14/eslint-config/nx"
import { tsConfig, devConfig, getIgnorePatterns } from "@asd14/eslint-config/ts"
import asd14Plugin from "@asd14/eslint-plugin"

const GIT_IGNORE_PATTERNS = getIgnorePatterns(
  path.join(import.meta.dirname, ".gitignore")
)

const SRC_FILES = ["src/**/*.ts", "types/**/*.ts"]
const EXAMPLE_FILES = ["examples/**/*.ts"]
const TEST_FILES = ["src/**/*.test.ts"]
const TYPE_TEST_FILES = ["src/**/*.tst.ts"]
const DEV_FILES = ["eslint.config.js"]

/** @type {import("eslint").Linter.Config[]} */
export default [
  { ignores: [...GIT_IGNORE_PATTERNS, "docs/**"] },
  {
    files: SRC_FILES,
    ...tsConfig,
    plugins: {
      ...tsConfig.plugins,
      ...nxConfig.plugins,
      "@asd14": asd14Plugin,
    },
    rules: {
      ...tsConfig.rules,
      ...nxConfig.rules,

      // Enforce message pattern when throwing errors ... DX FTW!
      "@asd14/throw-argument-format": [
        "error",
        {
          TypeError: {
            checks: [
              {
                pattern:
                  "^@asd14/m/\\w+: expected '[\\w.[\\]()]+' to be '\\w+' or '\\w+', got '\\w+'",
                message:
                  "Format: @asd14/m/<fn>: expected '<param>' to be '<Type>' or '<Type>', got '<Actual>'. A param may be a path, eg. 'fns[0]', 'patcher.tags' or 'fn(input[0])'",
              },
              {
                pattern:
                  "^@asd14/m/\\w+: expected '[\\w.[\\]()]+' to be '\\w+', got '\\w+'",
                message:
                  "Format: @asd14/m/<fn>: expected '<param>' to be '<Type>', got '<Actual>'. A param may be a path, eg. 'fns[0]', 'patcher.tags' or 'fn(input[0])'",
              },
            ],
          },
        },
      ],

      // Array.isArray narrows unknown to any[], triggering this on every
      // dynamic pipe(...fns) spread. Unavoidable TS behavior.
      "@typescript-eslint/no-unsafe-argument": "off",

      // Loop bounds and conditional checks guarantee valid indices;
      // non-null assertions are the correct tool in a primitives library.
      "@typescript-eslint/no-non-null-assertion": "off",
    },
  },
  {
    files: [...TEST_FILES, ...TYPE_TEST_FILES, ...DEV_FILES, ...EXAMPLE_FILES],
    ...tsConfig,
    ...devConfig,
    plugins: {
      ...tsConfig.plugins,
      ...nxDevConfig.plugins,
      "@asd14": asd14Plugin,
    },
    rules: {
      ...tsConfig.rules,
      ...devConfig.rules,
      ...nxDevConfig.rules,

      // `node:test` describe/test return promises that are handled by the test runner
      "@typescript-eslint/no-floating-promises": "off",
    },
  },
  {
    files: EXAMPLE_FILES,
    rules: {
      // An example imports m by its name, as a reader does. The rule crashes
      // on a project that imports its own name
      "@nx/enforce-module-boundaries": "off",
    },
  },
  {
    files: [...TEST_FILES],
    rules: {
      "@asd14/call-argument-format": [
        "error",
        {
          "equal|deepEqual|equals|deepEquals|ok|notEqual|notOk|throws": {
            checks: [
              {
                argumentIndex: -1,
                pattern: "^given \\[.+\\] should \\[.+\\]$",
                message:
                  "Assertion message must match: given [<context>] should [<expectation>]",
              },
            ],
          },
        },
      ],
    },
  },
]
