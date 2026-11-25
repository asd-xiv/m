Before submitting your PR:

- Name the PR using [conventional commits](https://www.conventionalcommits.org)
  (enforced by CI). The scope is the function's folder in `src/`, eg.
  `feat(filter): …`
- Check for existing functions that might do similar things
- Consult [`ramda`](https://ramdajs.com/) or
  [`haskell`](https://hoogle.haskell.org/) for inspiration

---

## Primary

1. Add function `foo` to do something with `bar`
2. Add a variant, eg. `fooWith` or `fooBy`

## Secondary

1. Fix bug in related function

## Checklist

- [ ] Consult the rules in `docs/SPEC.md`, the how-tos in `docs/how-to/` and
      `docs/DECISIONS.md`
- [ ] Tests (runtime + type), 100% coverage
- [ ] JSDoc with pipe example, and the `@tag` of its group
- [ ] Export in `src/index.ts` and list in `documentation.yml`, under the same
      group
