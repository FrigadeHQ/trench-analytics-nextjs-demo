import { getEventsFromTrench } from "@/data/trench"
import { cx } from "@/lib/utils"
import dynamic from "next/dynamic"
import Header from "./_components/Header"
// Loading graphs async so client timezone can be passed in
const VisitorsChart = dynamic(
  () => import("./_components/VisitorsChart").then((mod) => mod.VisitorsChart),
  {
    ssr: false,
    loading: () => (
      <div className="h-80 animate-pulse rounded bg-gray-200 dark:bg-gray-800"></div>
    ),
  },
)

export default async function Page() {
  const { visitorsData } = await getEventsFromTrench()

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
          <Header />
          <section className="my-8">
            <div className="space-y-12">
              <VisitorsChart data={visitorsData} />
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
