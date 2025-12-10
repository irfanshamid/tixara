import { useEffect, useState } from "react";
import { AffiliateList } from "./../types/performance";
// import { mergeCoreStats } from "./../utils/merge";

export function useAffiliate(
  dateFilter: { 
      type: string;
      start: number | null;
      end: number | null;
  }
) {
  const [loading, setLoading] = useState<boolean>(true);
  const [dataStat, setDataStat] = useState<AffiliateList>();
//   const [dataListStat, setDataListStat] = useState<AffiliateList[]>([]);

  useEffect(() => {

    setLoading(true);

    fetch(
      `/api/affiliate?start_date=${dateFilter.start}&end_date=${dateFilter.end}`
    )
      .then((res) => res.json())
      .then((data: AffiliateList[]) => {
        getLatestSyncPerDay(data);
        // generateList(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, [dateFilter]);

     const generateList = (list: AffiliateList[]) => {
        console.log('per day', list);
        // const reversed = [...list].reverse();
        // setDataListStat(reversed);
        // const data = mergeCoreStats(list);
        setDataStat(list[0]);
    }

    function getLatestSyncPerDay(data: AffiliateList[]) {
        // Map untuk menampung {roomId|date → object dengan syncTime terbesar}
        const map = new Map();

        data.forEach(item => {
            const date = item.syncTime.split("T")[0]; // ambil YYYY-MM-DD
            const key = `${item.roomId}-${date}`;

            if (!map.has(key)) {
                map.set(key, item);
            } else {
                const existing = map.get(key);

                // bandingkan syncTime, ambil yang terbesar
                if (new Date(item.syncTime) > new Date(existing.syncTime)) {
                    map.set(key, item);
                }
            }
        });

        return generateList(Array.from(map.values()));
    }

  return {
    loadingStat: loading,
    dataStat,
    // dataListStat,
  };
}
