"use client"

import { AnimatePresence, motion } from "framer-motion"

import ReactMarkdown from "react-markdown"

import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"

import { Code } from "components/code"

interface Props {
  section: string
}

const findSpacing = (depth: number) => {
  switch (depth) {
    case 1:
      return "ml-4"
    case 2:
      return "ml-8"
    case 3:
      return "ml-12"
    case 4:
      return "ml-16"
    case 5:
      return "ml-20"
    case 6:
      return "ml-24"
    default:
      return "ml-0"
  }
}

export const Slide = ({ section }: Props) => {
  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={section}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
        transition={{
          duration: 0.5,
          bounce: 0.5,
          type: "spring"
        }}
      >
        <div className={"min-w-full min-h-screen gap-2 flex items-center justify-center flex-col"}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex]}
            components={{
              code(props) {
                return <Code {...props} />
              },
              h1(props) {
                return <h1 className="text-6xl font-bold text-stone-900" {...props} />
              },
              h2(props) {
                return <h2 className="text-5xl font-bold text-stone-800" {...props} />
              },
              h3(props) {
                return <h3 className="text-4xl font-bold text-stone-700" {...props} />
              },
              h4(props) {
                return <h4 className="text-3xl font-bold text-stone-600" {...props} />
              },
              h5(props) {
                return <h5 className="text-2xl font-bold text-stone-500" {...props} />
              },
              h6(props) {
                return <h6 className="text-xl font-bold text-stone-400" {...props} />
              },
              p(props) {
                return <p className="text-lg font-normal text-stone-500" {...props} />
              },
              ul({ depth, ...props }) {
                let spacing = findSpacing(depth)
                return <ul className={spacing + " text-lg list-disc list-inside font-normal"} {...props} />
              },
              ol({ depth, ...props }) {
                let spacing = findSpacing(depth)
                return <ol className={spacing + " text-lg list-decimal list-inside font-normal"} {...props} />
              },
              li(props) {
                return <li className="text-lg font-normal text-stone-500" {...props} />
              }
            }}
          >
            {section}
          </ReactMarkdown>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
