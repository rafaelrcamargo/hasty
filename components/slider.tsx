"use client"

import { marked, Renderer } from "marked"
import { useState } from "react"
import { HTML } from "../utils/jsx-to-html"
import { Slide } from "./slide"

/* Override the default marked renderer */
const renderer: Partial<Renderer> = {
  heading(text, level) {
    const headings = ["", "text-8xl", "text-7xl", "text-6xl", "text-5xl", "text-4xl", "text-3xl"]
    const size = `${headings[level]} font-black`
    return HTML(<h1 className={size}>{text}</h1>)
  },
  paragraph(text) {
    return HTML(<p className="text-lg text-stone-600">{text}</p>)
  },
  list(body, ordered) {
    return HTML(<ul className="list-none">{body}</ul>)
  },
  listitem(text) {
    return HTML(<li className="text-lg text-stone-600">{text}</li>)
  },
  blockquote(quote) {
    return HTML(<blockquote className="text-lg">{quote}</blockquote>)
  },
  link(link, _, text) {
    return HTML(
      <a href={link ?? ""} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
        {text}
      </a>
    )
  },
  codespan(code) {
    return HTML(<code className="text-sm">{code}</code>)
  },
  code(code, language) {
    return HTML(
      <pre className="bg-stone-900/10 pr-10 backdrop-blur-xl rounded-md">
        <code className="text-sm">{code}</code>
      </pre>
    )
  },
  hr() {
    return HTML(<hr className="border-1 border-stone/80" />)
  },
  checkbox(checked) {
    return HTML(<input type="checkbox" className="mr-2 text-blue-500 border-2" checked={checked} />)
  },
  strong(text) {
    return HTML(<strong className="font-bold">{text}</strong>)
  },
  em(text) {
    return HTML(<em className="italic">{text}</em>)
  },
  del(text) {
    return HTML(<del className="line-through">{text}</del>)
  },
  image(href: string | null, title: string | null, text) {
    return HTML(
      <img
        src={href ?? ""}
        alt={text}
        title={title ?? ""}
        className="w-full h-auto max-w-3xl max-h-3xl object-contain"
      />
    )
  }
}

import markdown from "hello.md"

export default function Slider() {
  /* Get MD Frontmatter */
  const frontmatter = markdown.split("---")[1].trim()

  /* Convert MD Frontmatter to JSON */
  const frontmatterJSON = JSON.parse(
    "{" +
      frontmatter
        .split("\n")
        .map(line => line.split(":"))
        .map(([key, value]) => `"${key.trim()}": ${value.trim()}`)
        .join(",") +
      "}"
  )

  const layout = {
    ...{ theme: frontmatterJSON.theme === "dark" ? "bg-stone-900 text-stone-100" : "bg-stone-100 text-stone-900" },
    ...{
      align:
        frontmatterJSON.align === "center"
          ? "flex flex-col justify-center items-center"
          : "flex flex-col justify-start items-start"
    }
  }

  /* Get MD Sections */
  const sections = markdown
    .split("---")
    .slice(2)
    .map(section => section.trim())

  /* Set MD custom renderer */
  marked.use({ renderer })

  const [active, setActive] = useState(0)

  return (
    <>
      <Slide section={sections[active]} align={layout.align} />

      <div className="bottom-4 right-4 absolute z-10 h-10 gap-4 flex flex-row">
        <button
          className="w-10 bg-stone-900/10 text-stone-900/80 rounded-full"
          onClick={() => setActive(active - 1)}
          disabled={active === 0}
        >
          ◀
        </button>
        <button
          className="w-10 bg-stone-900/10 text-stone-900/80 rounded-full"
          onClick={() => setActive(active + 1)}
          disabled={active === sections.length - 1}
        >
          ▶
        </button>
      </div>
    </>
  )
}
