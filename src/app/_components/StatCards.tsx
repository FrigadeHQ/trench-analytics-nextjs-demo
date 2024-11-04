// 'use client';

import { Card } from "@/components/Card"

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ")
}

const data = [
  {
    name: "Views",
    stat: "10,200",
  },
  {
    name: "Sessions",
    stat: "602",
  },
  {
    name: "Visitors",
    stat: "598",
  },
]

export default function StatCards() {
  return (
    <>
      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:w-[600px] lg:grid-cols-3">
        {data.map((item) => (
          <Card key={item.name} className="p-4">
            <div className="flex items-center justify-between">
              <dt className="text-tremor-content dark:text-dark-tremor-content text-sm font-medium">
                {item.name}
              </dt>
            </div>
            <dd className="text-tremor-content-strong dark:text-dark-tremor-content-strong mt-1 text-xl font-semibold">
              {Number(item.stat.replace(/,/g, "")) >= 10000
                ? (Number(item.stat.replace(/,/g, "")) / 1000).toFixed(1) + "k"
                : item.stat}
            </dd>
          </Card>
        ))}
      </dl>
    </>
  )
}
