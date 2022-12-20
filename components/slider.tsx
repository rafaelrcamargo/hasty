"use client"

import { ConfigProvider } from "context/config"
import { useState } from "react"
import { Slide } from "./slide"

// @ts-ignore-next-line
import MD from "hello.md"

export default function Slider() {
  const markdown = MD as string
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

  /* Get MD Sections */
  const sections = markdown
    .split("---")
    .slice(2)
    .map(section => section.trim())

  const [active, setActive] = useState(0)

  return (
    <ConfigProvider frontmatter={frontmatterJSON}>
      <Slide section={sections[active]} />

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
    </ConfigProvider>
  )
}
