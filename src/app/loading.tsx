const LoadingPage = () => {
  return (
    <div className="mx-auto">
      <div className="lg-px-8 mx-auto h-16 max-w-7xl animate-pulse rounded bg-gray-200 px-2 dark:bg-gray-800" />
      <main className="ease mx-auto max-w-7xl transform-gpu px-2 transition-all duration-100 will-change-transform sm:px-6 lg:p-3 lg:px-8 lg:dark:bg-gray-950">
        <div className="my-12 space-y-4 lg:my-20">
          <div className="h-10 w-64 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          <div className="h-20 w-full max-w-md animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
          <div className="h-6 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-24 animate-pulse rounded-lg bg-gray-200 p-6 dark:bg-gray-800"
            />
          ))}
        </div>

        <section className="my-8 px-[1px]">
          <div className="flex flex-row flex-wrap divide-y divide-gray-200 rounded-lg border border-gray-200 p-0 dark:divide-gray-900 dark:border-gray-900">
            <div className="h-96 w-full animate-pulse bg-gray-200 dark:bg-gray-800" />
            <div className="h-96 w-full animate-pulse bg-gray-200 dark:bg-gray-800" />
            <div className="h-96 w-full animate-pulse bg-gray-200 dark:bg-gray-800" />
          </div>
        </section>
      </main>
    </div>
  )
}

export default LoadingPage
