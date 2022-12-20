import { useConfig } from "context/config"

/* MD To JSX */
import { CodeProps, ComponentType } from "react-markdown/lib/ast-to-react"

/* Prism.js */
import SyntaxHighlighter from "react-syntax-highlighter"
import { atomOneDark, atomOneLight } from "react-syntax-highlighter/dist/esm/styles/hljs"

export const Code: ComponentType<CodeProps> = ({ node, inline, className, children, ...props }) => {
  /* Set theme */
  const { theme } = useConfig()
  const colorscheme = (theme === "dark" ? atomOneDark : atomOneLight) as any

  /* Match code */
  const match = /language-(\w+)/.exec(className || "")

  return !inline && match ? (
    <div className="overflow-hidden rounded-md shadow-2xl shadow-stone-500/30 border border-stone-500/10">
      <SyntaxHighlighter
        style={colorscheme}
        language={match[1]}
        customStyle={{ padding: "0.8rem 1.6rem" }}
        PreTag="div"
        {...props}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    </div>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  )
}
