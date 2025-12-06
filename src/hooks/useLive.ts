import { useEffect, useState } from "react";
import { ProductList } from "@/types/affiliate";

export function useLive(
    roomId: string, 
    dateFilter: { 
        type: string;
        start: number | null;
        end: number | null;
    }
) {
  const [loading, setLoading] = useState<boolean>(true);
  const [dataListStatOrigin, setDataListStatOrigin] = useState<ProductList[]>([]);

  useEffect(() => {
    setLoading(true);

    fetch(
      `/api/sales?start_date=${dateFilter.start}&end_date=${dateFilter.end}${roomId ? `&room_id=${roomId}` : ''}`
    )
    .then((res) => res.json())
    .then((data: ProductList[]) => {
      setDataListStatOrigin(data);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Fetch error:", err);
      setLoading(false);
    });
  }, [roomId, dateFilter]);


  return {
    loadingStat: loading,
    dataListStatOrigin,
  };
}
