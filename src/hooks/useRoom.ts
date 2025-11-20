import { useEffect, useState } from "react";

export interface RoomItem {
  roomId: string;
  username: string;
  displayName?: string;
  createdAt: string;
}

export function useRoom() {
  const [loading, setLoading] = useState<boolean>(true);
  const [roomList, setRoomList] = useState<RoomItem[]>([]);
  const [latestRoom, setLatestRoom] = useState<RoomItem | null>(null);

  useEffect(() => {
    setLoading(true);

    fetch(`/api/room`)
      .then((res) => res.json())
      .then((res) => {
        const data: RoomItem[] = res.data || [];

        // urutkan terbaru (kadang sudah urut dari API)
        const sorted = [...data].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setRoomList(sorted);
        setLatestRoom(sorted[0] || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch room error:", err);
        setLoading(false);
      });
  }, []);

  return {
    loadingRoom: loading,
    roomList,
    latestRoom,
  };
}
