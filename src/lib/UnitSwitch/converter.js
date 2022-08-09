import { units } from "./units";

// converter takes as an argument a Map<string, function> and returns a closure
// that will convert a given value to a corresponding value for a given unit, if
// the unit that has been passed as an argument is found in the Map. The Map's
// keys can only be those contained in the Units component, otherwise converter
// will log and error and return early. 
export const converter = (conversionMap) => {
  const u = new Set(Object.values(units));

  // check is conversion map is valid
  const invalid = false;
  const iterator = conversionMap.keys();
  let key = iterator.next();
  while (!key.done) {
    if (!u.has(key.value)) {
      console.error(`"${key.value}" is not a valid unit`);
      invalid = true;
      break;
    }
    if (typeof conversionMap.get(key.value) !== "function") {
      console.error(`the value of "${key.value} in the conversion map is not a valid type`);
      invalid = true;
      break;
    }
    key = iterator.next();
  }
  if(invalid) return;

  // return a closure
  return (input, targetUnit) => {
    if (typeof input !== "number") {
      console.log(`"${input}" is not a number`);
      return
    }

    if (!conversionMap.has(targetUnit)) {
      console.error(`"${targetUnit}" is not included in this component's conversion map`);
      return
    }
    const convert = conversionMap.get(targetUnit);
    return convert(input);
  }
}
