"use client"

import { Card } from "@/components/Card"
import { useDateFilter } from "@/lib/useDateFilter"
import NumberFlow from "@number-flow/react"

export default function StatCards({
  data: { visitorsData, pageviewsData, sessionsData },
}: {
  data: {
    visitorsData: { time: string; value: number }[]
    pageviewsData: { time: string; value: number }[]
    sessionsData: { time: string; value: number }[]
  }
}) {
  const filteredVisitorsData = useDateFilter(visitorsData)
  const filteredPageviewsData = useDateFilter(pageviewsData)
  const filteredSessionsData = useDateFilter(sessionsData)

  const stats = [
    {
      name: "Views",
      stat: filteredPageviewsData
        .reduce((sum, item) => sum + Number(item.value), 0)
        .toString(),
    },
    {
      name: "Sessions",
      stat: filteredSessionsData
        .reduce((sum, item) => sum + Number(item.value), 0)
        .toString(),
    },
    {
      name: "Visitors",
      stat: filteredVisitorsData
        .reduce((sum, item) => sum + Number(item.value), 0)
        .toString(),
    },
  ]

  return (
    <>
      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:w-[600px] lg:grid-cols-3">
        {stats.map((item) => (
          <Card key={item.name} className="p-4">
            <div className="flex items-center justify-between">
              <dt className="text-tremor-content dark:text-dark-tremor-content text-sm font-medium">
                {item.name}
              </dt>
            </div>
            <dd className="text-tremor-content-strong dark:text-dark-tremor-content-strong mt-1 text-xl font-semibold">
              <NumberFlow
                continuous={true}
                value={Number(item.stat)}
                format={{ notation: "compact" }}
              />
            </dd>
          </Card>
        ))}
      </dl>
    </>
  )
}
