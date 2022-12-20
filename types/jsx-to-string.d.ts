declare module "jsx-to-string" {
  export default function jsxToString<T>(jsx: React.ReactElement<T>): string
}
