"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@/components/Table"
import { useDateFilter } from "@/lib/useDateFilter"
import { useMemo } from "react"

export const ReferrersTable = ({
  data,
}: {
  data: { time: string; referrer: string; referrer_count: number }[]
}) => {
  const filteredData = useDateFilter(data)

  const formattedData = useMemo(() => {
    const referrerCountMap: { [key: string]: number } = {}

    filteredData.forEach((item) => {
      const referrer = item.referrer
      if (referrerCountMap[referrer]) {
        referrerCountMap[referrer] += Number(item.referrer_count)
      } else {
        referrerCountMap[referrer] = Number(item.referrer_count)
      }
    })

    return Object.entries(referrerCountMap)
      .map(([referrer, referrer_count]) => ({
        referrer,
        referrer_count,
      }))
      .sort((a, b) => b.referrer_count - a.referrer_count)
  }, [filteredData])

  const getReferrerIcon = (referrer: string) => {
    try {
      const url = new URL(referrer)
      const domain = url.hostname
      return `https://icons.duckduckgo.com/ip3/${domain}.ico`
    } catch (error) {
      return "https://icons.duckduckgo.com/ip3/unknown.ico"
    }
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Referrer</TableHeaderCell>
          <TableHeaderCell>Count</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {formattedData.slice(0, 15).map((item, index) => (
          <TableRow key={index}>
            <TableCell>
              <img
                src={getReferrerIcon(item.referrer)}
                alt={item.referrer}
                className="mr-2 inline-block"
                width="16"
                height="16"
              />
              {item.referrer}
            </TableCell>
            <TableCell>{item.referrer_count.toLocaleString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
