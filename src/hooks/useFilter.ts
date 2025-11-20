import { useState } from "react";

export function useFilter() {
  // Room ID
  const [roomId, setRoomId] = useState<string>("");

  // default today
  const now = new Date();
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);

  const end = new Date(now);
  end.setHours(23, 59, 59, 999);

  const [dateFilter, setDateFilter] = useState<{
    type: "today" | "last3day" | "monthly" | "range";
    start: number | null;
    end: number | null;
  }>({
    type: "today",
    start: start.getTime(),
    end: end.getTime(),
  });

  return {
    roomId,
    setRoomId,
    dateFilter,
    setDateFilter,
  };
}
