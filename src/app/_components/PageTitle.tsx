"use client"

import { OnlineUsers } from "./OnlineUsers"

export default function PageTitle() {
  return (
    <div className="my-12 space-y-4 lg:my-20">
      <h1
        id="reports-title"
        className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1]"
      >
        Demo dashboard
      </h1>
      <p className="max-w-md text-base leading-relaxed tracking-tight text-gray-600 dark:text-gray-400">
        This dashboard is powered by{" "}
        <a
          href="https://github.com/FrigadeHQ/trench"
          target="_blank"
          className="text-blue-500 hover:underline"
          rel="noopener noreferrer"
        >
          Trench
        </a>{" "}
        and tracks pageviews from our marketing{" "}
        <a
          href="https://trench.dev"
          target="_blank"
          className="text-blue-500 hover:underline"
          rel="noopener noreferrer"
        >
          website
        </a>
        . The source code is available{" "}
        <a
          href="https://github.com/FrigadeHQ/trench-analytics-nextjs-demo.git"
          target="_blank"
          className="text-blue-500 hover:underline"
          rel="noopener noreferrer"
        >
          here
        </a>
        .
      </p>
      <span className="flex items-center space-x-2">
        <OnlineUsers />
      </span>
    </div>
  )
}
