import { getEventsFromTrench } from "@/data/trench"
import Header from "./_components/Header"
import { ReferrersTable } from "./_components/ReferrersTable"
import { TopPagesTable } from "./_components/TopPagesTable"
import { VisitorsChart } from "./_components/VisitorsChart"

export default async function Page() {
  const { visitorsData, referrersData, topPagesData } =
    await getEventsFromTrench()

  return (
    <div className="mx-auto max-w-screen-xl">
      <header className="flex justify-end p-4"></header>

      <main className="ease transform-gpu transition-all duration-100 will-change-transform lg:bg-gray-50 lg:py-3 lg:pl-3 lg:pr-3 lg:dark:bg-gray-950">
        <div className="bg-white p-4 sm:p-6 lg:rounded-lg lg:border lg:border-gray-200 dark:bg-gray-925 lg:dark:border-gray-900">
          <Header />
          <section className="my-8">
            <div className="space-y-12">
              <VisitorsChart data={visitorsData} />
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                  Top Pages
                </h2>
                <TopPagesTable data={topPagesData} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                  Referrers
                </h2>
                <ReferrersTable data={referrersData} />
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
