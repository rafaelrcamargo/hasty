import { createContext, FC, PropsWithChildren, useContext } from "react"

type Frontmatter = {
  theme: "dark" | "light"
  align: "left" | "center" | "right"
}

const ConfigContext = createContext<Frontmatter>({
  theme: "dark",
  align: "center"
})

export const ConfigProvider: FC<PropsWithChildren<{ frontmatter: Frontmatter }>> = ({ children, frontmatter }) => {
  return <ConfigContext.Provider value={frontmatter}>{children}</ConfigContext.Provider>
}

export const useConfig = () => {
  return useContext(ConfigContext)
}
