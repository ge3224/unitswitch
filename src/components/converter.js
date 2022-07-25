export function converter(value, unit, funcs) {

  const keys = Object.keys(funcs)
  if (keys === null || keys === undefined || keys === void 0) {
   return 
  }

  if (!keys.includes(unit)) {
    return
  }

  const fn = keys[unit]
  fn(value)

}
