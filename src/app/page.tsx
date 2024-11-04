import { getEventsFromTrench } from "@/data/trench"
import Nav from "./_components/Navigation"
import PageHeader from "./_components/PageHeader"
import PageTitle from "./_components/PageTitle"
import { ReferrersTable } from "./_components/ReferrersTable"
import { TopPagesTable } from "./_components/TopPagesTable"
import { VisitorsChart } from "./_components/VisitorsChart"
export const fetchCache = "force-no-store"

export default async function Page() {
  const { visitorsData, referrersData, topPagesData } =
    await getEventsFromTrench()

  return (
    <div className="mx-auto max-w-screen-xl">
      <Nav />
      <main className="ease mx-auto max-w-7xl transform-gpu px-2 transition-all duration-100 will-change-transform sm:px-6 lg:p-3 lg:px-8 lg:dark:bg-gray-950">
        <PageTitle />
        <PageHeader />

        <section className="my-8">
          <div className="flex flex-row flex-wrap divide-y divide-gray-200 border border-gray-200 dark:divide-gray-900 dark:border-gray-900 [&>*:not(:first-child)]:border-l [&>*:nth-child(even)]:border-l-0 [&>*]:border-l-gray-200 dark:[&>*]:border-l-gray-900">
            <VisitorsChart data={visitorsData} />
            <TopPagesTable data={topPagesData} />
            <ReferrersTable data={referrersData} />
          </div>
        </section>
      </main>
    </div>
  )
}
