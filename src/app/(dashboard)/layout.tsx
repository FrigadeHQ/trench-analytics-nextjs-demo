"use client"
import { cx } from "@/lib/utils"
import React from "react"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="mx-auto max-w-screen-xl">
      <header className="flex justify-end p-4"></header>

      <main
        className={cx(
          "lg:pl-0",
          "ease transform-gpu transition-all duration-100 will-change-transform lg:bg-gray-50 lg:py-3 lg:pr-3 lg:dark:bg-gray-950",
        )}
      >
        <div className="bg-white p-4 sm:p-6 lg:rounded-lg lg:border lg:border-gray-200 dark:bg-gray-925 lg:dark:border-gray-900">
          {children}
        </div>
      </main>
    </div>
  )
}
