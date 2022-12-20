import { ReactNode } from "react"
import "../styles/globals.css"

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className="text-stone-800 bg-stone-100">{children}</body>
    </html>
  )
}
