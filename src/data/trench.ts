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
      FROM 
        events
      WHERE 
        event = '$pageview'
      GROUP BY 
        time
      ORDER BY 
        time`,
    `SELECT 
        toStartOfHour(timestamp) AS time,  -- Group by hour
        domainWithoutWWW(JSONExtractString(properties, 'referrer')) AS referrer,
        count() AS referrer_count
      FROM 
        events
      WHERE 
        event = '$pageview' 
        AND referrer != '' 
        AND referrer NOT LIKE '%localhost%' AND referrer NOT LIKE '%trench.dev%'
      GROUP BY 
        time, referrer
      ORDER BY 
        referrer_count DESC 
      LIMIT 13000`,
    `SELECT 
        toStartOfHour(timestamp) AS time,  -- Group by hour
        JSONExtractString(properties, 'path') AS page,
        count() AS page_count
      FROM 
        events
      WHERE 
        event = '$pageview'
      GROUP BY 
        time, page
      ORDER BY 
        page_count DESC 
      LIMIT 13000`,
  ])

  return {
    visitorsData: transformTimeValueDataToArray(queryResults.results[0]),
    referrersData: transformReferrerDataToArray(queryResults.results[1]),
    topPagesData: transformTopPagesDataToArray(queryResults.results[2]),
  }
}

export function transformTimeValueDataToArray(
  data: Record<string, any>,
): { time: string; value: number }[] {
  return Object.values(data).map((item) => ({
    time: item.time,
    value: item.value,
  }))
}

export function transformReferrerDataToArray(
  data: Record<string, any>,
): { time: string; referrer: string; referrer_count: number }[] {
  return Object.values(data).map((item) => ({
    time: item.time,
    referrer: item.referrer,
    referrer_count: item.referrer_count,
  }))
}

export function transformTopPagesDataToArray(
  data: Record<string, any>,
): { time: string; page: string; page_count: number }[] {
  return Object.values(data).map((item) => ({
    time: item.time,
    page: item.page,
    page_count: item.page_count,
  }))
}
