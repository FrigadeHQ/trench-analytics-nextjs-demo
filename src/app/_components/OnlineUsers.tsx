"use client"

import { getNumberOfOnlineUsersFromTrench } from "@/data/trench"
import { useEffect, useState } from "react"

export function OnlineUsers() {
  const [onlineUsers, setOnlineUsers] = useState(0)

  useEffect(() => {
    async function fetchAndSetOnlineUsers() {
      const onlineUsers = await getNumberOfOnlineUsersFromTrench()
      setOnlineUsers(onlineUsers)
    }

    fetchAndSetOnlineUsers()
    const interval = setInterval(fetchAndSetOnlineUsers, 5000)
    return () => clearInterval(interval)
  }, [])

  const hasUsersOnline = onlineUsers > 0
  return (
    <>
      <span
        className={`shrink-0 animate-pulse rounded-full ${
          hasUsersOnline ? "bg-emerald-500/30" : "bg-gray-500/30"
        } p-1`}
        aria-hidden={true}
      >
        <span
          className={`block size-2 rounded-full ${
            hasUsersOnline ? "bg-emerald-500" : "bg-gray-500"
          }`}
        />
      </span>
      <span className="max-w-md text-sm leading-relaxed text-gray-800 dark:text-gray-400">
        {hasUsersOnline ? `${onlineUsers} online` : "No one online"}
      </span>
    </>
  )
}
