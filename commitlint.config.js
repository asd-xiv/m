import { readdirSync } from "node:fs"

/**
 * Each folder in `src/` is a scope, eg. `src/filter/` gives `feat(filter): …`,
 * so a new function brings its scope with it. A commit with no scope stays
 * valid, eg. `docs: …`
 */
const FOLDER_SCOPES = readdirSync(new URL("src", import.meta.url), {
  withFileTypes: true,
})
  .filter(entry => entry.isDirectory())
  .map(entry => entry.name)

/** @type {import("@commitlint/types").UserConfig} */
const config = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // The parts outside `src/`
    "scope-enum": [
      2,
      "always",
      [...FOLDER_SCOPES, "types", "ai", "spec", "readme", "examples"],
    ],
  },
}

export default config
