import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "PolChat AI - Chatbot ya Pole Martini Magembe",
  description: "Msaidizi wako wa maswali yote | Powered by ChatGPT",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sw">
      <body>{children}</body>
    </html>
  )
}
