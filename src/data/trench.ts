import Trench from "trench-js"

export async function getEventsFromTrench() {
  if (!process.env.NEXT_PUBLIC_TRENCH_PUBLIC_API_KEY) {
    throw new Error("NEXT_PUBLIC_TRENCH_PUBLIC_API_KEY is not set")
  }
  if (!process.env.TRENCH_PRIVATE_API_KEY) {
    throw new Error("TRENCH_PRIVATE_API_KEY is not set")
  }
  if (!process.env.NEXT_PUBLIC_TRENCH_SERVER_URL) {
    throw new Error("NEXT_PUBLIC_TRENCH_SERVER_URL is not set")
  }

  const trenchClient = new Trench({
    publicApiKey: process.env.NEXT_PUBLIC_TRENCH_PUBLIC_API_KEY,
    privateApiKey: process.env.TRENCH_PRIVATE_API_KEY,
    serverUrl: process.env.NEXT_PUBLIC_TRENCH_SERVER_URL,
    enabled: true,
  })

  const queryResults = await trenchClient.executeQueries([
    `SELECT
        toStartOfHour(timestamp) AS time,  -- Group by hour (see https://clickhouse.com/docs/en/sql-reference/functions/date-time-functions)
        count(DISTINCT userId) AS value  -- Count distinct users
      FROM events
      WHERE event = '$pageview'
      GROUP BY time
      ORDER BY time`,
  ])

  return { visitorsData: transformDataToArray(queryResults.results[0]) }
}

export function transformDataToArray(
  data: Record<string, any>,
): { time: string; value: number }[] {
  return Object.values(data).map((item) => ({
    time: new Date(item.time + "Z").toLocaleString("en-US", {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    }),
    value: item.value,
  }))
}
