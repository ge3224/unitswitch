const unitList = [
  "Pixels",
  "Rems",
  "Ems",
  "Tailwind",
  "Bootstrap",
  "Inches",
  "Millimetres",
  "Centimetres",
  "Feet",
  "Picas",
  "Points",
]

const convertToObject = () => {
  const obj = {}

  for (const v of unitList) {
    obj[v] = v
  }

  return obj
}

export const units = convertToObject()
