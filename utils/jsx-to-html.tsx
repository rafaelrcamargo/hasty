import jsxToString from "jsx-to-string"

export const HTML = (jsx: JSX.Element) => {
  return jsxToString<typeof jsx>(jsx).replace("className", "class")
}
