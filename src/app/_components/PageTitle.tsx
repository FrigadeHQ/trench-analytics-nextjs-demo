"use client"

export default function PageTitle() {
  return (
    <div className="my-12 space-y-4 lg:my-20">
      <h1
        id="reports-title"
        className="text-4xl font-bold text-gray-900 dark:text-gray-50"
      >
        Trench Demo Dashboard
      </h1>
      <p className="max-w-md text-base leading-relaxed text-gray-600 dark:text-gray-400">
        This demo site is powered by{" "}
        <a
          href="https://github.com/FrigadeHQ/trench"
          target="_blank"
          className="text-blue-500 hover:underline"
          rel="noopener noreferrer"
        >
          Trench
        </a>{" "}
        and tracks pageviews from the{" "}
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
    </div>
  )
}
