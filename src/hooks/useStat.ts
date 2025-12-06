import { useEffect, useState } from "react";
import { ProductList } from "@/types/affiliate";
import { mergeCoreStats } from "@/utils/merge";

export function useStat(
    roomId: string, 
    dateFilter: { 
        type: string;
        start: number | null;
        end: number | null;
    }
) {
  const [loading, setLoading] = useState<boolean>(true);
  const [dataStat, setDataStat] = useState<ProductList>();
  const [dataListStat, setDataListStat] = useState<ProductList[]>([]);

  useEffect(() => {
    if (!roomId) return;

    setLoading(true);

    fetch(
      `/api/sales?room_id=${roomId}&start_date=${dateFilter.start}&end_date=${dateFilter.end}`
    )
    .then((res) => res.json())
    .then((data: ProductList[]) => {
      getLatestSyncPerDay(data);
      // generateList(data);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Fetch error:", err);
      setLoading(false);
    });
  }, [roomId, dateFilter]);

  const generateList = (list: ProductList[]) => {
    const reversed = [...list].reverse();
    setDataListStat(reversed);
    const data = mergeCoreStats(list);
    setDataStat(data);
  }

  function getLatestSyncPerDay(data: ProductList[]) {
    const map = new Map();

    function parseTime(t: string) {
        // jika tidak ada Z → anggap itu UTC
        return t.endsWith("Z") ? new Date(t) : new Date(t + "Z");
    }

    data.forEach(item => {
        const date = item.syncTime.split("T")[0];
        const key = `${item.roomId}-${date}`;

        if (!map.has(key)) {
            map.set(key, item);
        } else {
            const existing = map.get(key);
            if (parseTime(item.syncTime) > parseTime(existing.syncTime)) {
                map.set(key, item);
            }
        }
    });

    return generateList(Array.from(map.values()));
  }

  return {
    loadingStat: loading,
    dataStat,
    dataListStat,
  };
}
