"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@/components/Table"

export const ReferrersTable = ({
  data,
}: {
  data: { referrer: string; referrer_count: number }[]
}) => {
  const formattedData = data.map((item) => ({
    referrer: item.referrer,
    referrer_count: item.referrer_count,
  }))

  const getReferrerIcon = (referrer: string) => {
    const url = new URL(referrer)
    const domain = url.hostname
    return `https://icons.duckduckgo.com/ip3/${domain}.ico`
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
        {formattedData.map((item, index) => (
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
