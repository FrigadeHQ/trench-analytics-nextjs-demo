import { GeistSans } from "geist/font/sans"
import type { Metadata } from "next"
import { ThemeProvider } from "next-themes"
import React from "react"
import "./globals.css"
import { siteConfig } from "./siteConfig"

export const metadata: Metadata = {
  metadataBase: new URL("https://demo.trench.dev"),
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: [],
  authors: [
    {
      name: "Frigade",
      url: "https://frigade.com",
    },
  ],
  creator: "Frigade",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.className} overflow-x-hidden overflow-y-scroll scroll-auto bg-white antialiased selection:bg-blue-100 selection:text-blue-700 dark:bg-gray-950`}
        suppressHydrationWarning
      >
        <ThemeProvider
          defaultTheme="system"
          disableTransitionOnChange
          attribute="class"
        >
          <div>{children}</div>
        </ThemeProvider>
      </body>
    </html>
  )
}
