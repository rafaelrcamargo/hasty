"use client"

import { AnimatePresence, motion } from "framer-motion"
import { marked } from "marked"

interface Props {
  section: string
  align: string
}

export const Slide = ({ section, align }: Props) => {
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
        <div
          className={align + " min-w-full min-h-screen gap-2"}
          dangerouslySetInnerHTML={{ __html: marked.parse(section) }}
        />
      </motion.div>
    </AnimatePresence>
  )
}
