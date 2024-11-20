"use server"

import Trench from "trench-js"

function getTrenchClient() {
  if (!process.env.NEXT_PUBLIC_TRENCH_PUBLIC_API_KEY) {
    throw new Error("NEXT_PUBLIC_TRENCH_PUBLIC_API_KEY is not set")
  }
  if (!process.env.TRENCH_PRIVATE_API_KEY) {
    throw new Error("TRENCH_PRIVATE_API_KEY is not set")
  }
  if (!process.env.NEXT_PUBLIC_TRENCH_SERVER_URL) {
    throw new Error("NEXT_PUBLIC_TRENCH_SERVER_URL is not set")
  }

  return new Trench({
    publicApiKey: process.env.NEXT_PUBLIC_TRENCH_PUBLIC_API_KEY,
    privateApiKey: process.env.TRENCH_PRIVATE_API_KEY,
    serverUrl: process.env.NEXT_PUBLIC_TRENCH_SERVER_URL,
    enabled: true,
  })
}

export async function getAnalyticsDataFromTrench() {
  const trenchClient = getTrenchClient()

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
    `SELECT
        toStartOfHour(timestamp) AS time,  -- Group by hour
        count() AS value  -- Count all pageviews
      FROM 
        events
      WHERE 
        event = '$pageview'
      GROUP BY 
        time
      ORDER BY 
        time`,
    `WITH 
        sessions AS (
          SELECT
            userId,
            timestamp,
            if(
              dateDiff('minute', lagInFrame(timestamp) OVER (PARTITION BY userId ORDER BY timestamp), timestamp) > 2
              OR isNull(lagInFrame(timestamp) OVER (PARTITION BY userId ORDER BY timestamp)),
              1, 0
            ) AS is_new_session
          FROM events
          WHERE event = '$pageview'
        )
      SELECT
        toStartOfHour(timestamp) AS time,
        sum(is_new_session) AS value
      FROM sessions
      GROUP BY time
      ORDER BY time`,
  ])

  return {
    visitorsData: transformToGraphArray(queryResults.results[0]),
    referrersData: transformReferrerDataToArray(queryResults.results[1]),
    topPagesData: transformTopPagesDataToArray(queryResults.results[2]),
    pageviewsData: transformToGraphArray(queryResults.results[3]),
    sessionsData: transformToGraphArray(queryResults.results[4]),
  }
}

export async function getNumberOfOnlineUsersFromTrench() {
  const trenchClient = getTrenchClient()

  const queryResults = await trenchClient.executeQueries([
    `SELECT
      count(DISTINCT userId) AS online_users
    FROM 
      events
    WHERE 
      event = '$pageview'
      AND timestamp > now() - INTERVAL 180 SECOND`,
  ])

  return Number(
    (Object.values(queryResults.results[0])[0] as { online_users: number })
      .online_users,
  )
}

function transformToGraphArray(
  data: Record<string, any>,
): { time: string; value: number }[] {
  const values = Object.values(data).map((item) => ({
    time: item.time,
    value: item.value,
  }))

  const paddedValues: { time: string; value: number }[] = []
  const startTime = new Date(values[0].time + "Z")
  const endTime = new Date(values[values.length - 1].time + "Z")

  for (
    let time = startTime;
    time <= endTime;
    time.setHours(time.getHours() + 1)
  ) {
    const timeString = time.toISOString().slice(0, 19).replace("T", " ")
    const existingValue = values.find((item) => item.time === timeString)
    paddedValues.push({
      time: timeString,
      value: existingValue ? existingValue.value : "0",
    })
  }

  return paddedValues
}

function transformReferrerDataToArray(
  data: Record<string, any>,
): { time: string; referrer: string; referrer_count: number }[] {
  return Object.values(data).map((item) => ({
    time: item.time,
    referrer: item.referrer,
    referrer_count: item.referrer_count,
  }))
}

function transformTopPagesDataToArray(
  data: Record<string, any>,
): { time: string; page: string; page_count: number }[] {
  return Object.values(data).map((item) => ({
    time: item.time,
    page: item.page,
    page_count: item.page_count,
  }))
}
