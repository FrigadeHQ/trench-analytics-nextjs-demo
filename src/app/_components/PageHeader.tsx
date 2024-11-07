"use client"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/Accordion"
import { Button } from "@/components/Button"
import useScroll from "@/lib/useScroll"
import { cx } from "@/lib/utils"
import { useQueryState } from "nuqs"
import { DEFAULT_RANGE } from "../../lib/dateRanges"
import { FilterDate } from "./FilterDate"
import StatCards from "./StatCards"

export default function PageHeader({
  visitorsData,
  pageviewsData,
  sessionsData,
}: {
  visitorsData: { time: string; value: number }[]
  pageviewsData: { time: string; value: number }[]
  sessionsData: { time: string; value: number }[]
}) {
  const scrolled = useScroll(10)

  const [, setRange] = useQueryState("range")
  const [, setExpenseStatus] = useQueryState("expense_status")
  const [, setAmountRange] = useQueryState("amount_range")
  const [, setSelectedCountries] = useQueryState("countries")

  const handleResetFilters = () => {
    setRange(DEFAULT_RANGE)
    setExpenseStatus(null)
    setAmountRange(null)
    setSelectedCountries(null)
  }

  return (
    <section
      aria-labelledby="reports-title"
      className={cx(
        "sticky top-0 z-50 -my-6 flex flex-col justify-between gap-6 bg-white py-6 md:flex-row md:flex-wrap md:items-center lg:top-0 dark:bg-gray-925",
        scrolled &&
          "border-b border-gray-200 transition-all dark:border-gray-900",
      )}
    >
      <Accordion type="single" collapsible className="block w-full lg:hidden">
        <AccordionItem className="rounded-md border" value="1">
          <AccordionTrigger className="px-4 py-2.5">Filters</AccordionTrigger>
          <AccordionContent className="p-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-end">
              <FilterDate />
              <Button
                variant="light"
                className="h-fit dark:border-gray-800"
                onClick={handleResetFilters}
              >
                Reset
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="flex-1">
        <StatCards data={{ visitorsData, pageviewsData, sessionsData }} />
      </div>
      <div className="hidden items-end gap-3 lg:flex lg:flex-wrap lg:self-start">
        <FilterDate />
      </div>
    </section>
  )
}
