import type { PlainObject } from "../../types/object.js"

/**
 * Set an own key on an object that the caller is building.
 *
 * A plain assignment of `__proto__` calls the setter of `Object.prototype` and
 * changes the prototype in place of setting a key. `__proto__` is the one
 * accessor on `Object.prototype`, so every other key keeps the assignment,
 * which builds an object about 11 times faster than `Object.defineProperty`.
 *
 * Writes into `target`. Pass only an object you created.
 *
 * @example
 * const result = {}
 *
 * _setOwn(result, "__proto__", { polluted: true })
 * Object.keys(result)
 * // => ["__proto__"]
 */
const _setOwn = (target: PlainObject, key: string, value: unknown): void => {
  if (key === "__proto__") {
    Object.defineProperty(target, key, {
      value,
      enumerable: true,
      writable: true,
      configurable: true,
    })

    return
  }

  target[key] = value
}

export { _setOwn }
