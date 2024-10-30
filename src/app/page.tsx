import { getEventsFromTrench } from "@/data/trench"
import Header from "./(dashboard)/reports/_components/Header"
import { VisitorsChart } from "./(dashboard)/reports/_components/VisitorsChart"

export default async function Page() {
  const { visitorsData } = await getEventsFromTrench()

  return (
    <>
      <Header />
      <section className="my-8">
        <div className="space-y-12">
          <VisitorsChart data={visitorsData} />
        </div>
      </section>
    </>
  )
}
