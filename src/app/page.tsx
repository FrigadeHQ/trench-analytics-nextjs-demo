import { Card } from "@/components/Card"
import { getEventsFromTrench } from "@/data/trench"
import Nav from "./_components/Navigation"
import PageHeader from "./_components/PageHeader"
import PageTitle from "./_components/PageTitle"
import { ReferrersTable } from "./_components/ReferrersTable"
import { TopPagesTable } from "./_components/TopPagesTable"
import { VisitorsChart } from "./_components/VisitorsChart"
export const fetchCache = "force-no-store"

export default async function Page() {
  const {
    visitorsData,
    referrersData,
    topPagesData,
    pageviewsData,
    sessionsData,
  } = await getEventsFromTrench()

  return (
    <div className="mx-auto max-w-screen-xl">
      <Nav />
      <main className="ease mx-auto max-w-7xl transform-gpu px-2 transition-all duration-100 will-change-transform sm:px-6 lg:p-3 lg:px-8 lg:dark:bg-gray-950">
        <PageTitle />
        <PageHeader
          visitorsData={visitorsData}
          pageviewsData={pageviewsData}
          sessionsData={sessionsData}
        />

        <section className="my-8">
          <Card className="flex flex-row flex-wrap divide-y divide-gray-200 rounded-lg border border-gray-200 p-0 dark:divide-gray-900 dark:border-gray-900 sm:[&>*:not(:first-child)]:border-l sm:[&>*:nth-child(even)]:border-l-0 [&>*]:border-l-gray-200 dark:[&>*]:border-l-gray-900">
            <VisitorsChart data={visitorsData} />
            <TopPagesTable data={topPagesData} />
            <ReferrersTable data={referrersData} />
          </Card>
        </section>
      </main>
    </div>
  )
}
