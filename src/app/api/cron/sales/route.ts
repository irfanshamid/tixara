import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getJakartaTime } from "@/utils/helper";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

export async function GET() {
  try {
    const token = await prisma.token.findFirst({
      where: { code: "sales" },
    });

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Token not found" },
        { status: 400 }
      );
    }
    
    const rooms = await prisma.roomStats.findMany({
      select: { roomId: true, username: true }
    });

    const ROOM_MAP = Object.fromEntries(
      rooms.map(r => [r.roomId, r.username])
    );

    const ROOM_IDS = rooms.map(r => r.roomId);


    for (const roomId of ROOM_IDS) {
      try {
        const payload = {
          request: {
            room_filter: {
              room_id: roomId,
              is_content_type: 1,
              shop_id: "7494930113907558878",
              country: "ID",
            },
            sorting_type: 1,
            stats_types: [23,20,322,310,39,29,332,330,10,323,349,70,43,30,71,72,341,342,2,5,18,290,291,292,-23,-20,-39,-330,-10,-70,-41,-71,-341,-342,-2,-18],
            ts: Date.now(),
          },
        };

        const response = await fetch(
          "https://seller-id.tokopedia.com/api/v1/insights/workbench/live/detail/core/stats?app_name=i18n_ecom_shop&device_id=0&fp=verify_mhvna0ng_rhbcnDg4_69aX_4h9F_8WRs_hhWmYFrIW1Yn&device_platform=web&cookie_enabled=true&screen_width=1680&screen_height=1050&browser_language=en-US&browser_platform=MacIntel&browser_name=Mozilla&browser_version=5.0+(Macintosh%3B+Intel+Mac+OS+X+10_15_7)+AppleWebKit%2F537.36+(KHTML,+like+Gecko)+Chrome%2F142.0.0.0+Safari%2F537.36&browser_online=true&timezone_name=Asia%2FJakarta&vertical=2&oec_seller_id=7494930113907558878",
          {
            method: "POST",
            headers: {
              "accept": "application/json, text/plain, */*",
              "content-type": "application/json",
              "Cookie": token.value,
            },
            body: JSON.stringify(payload)
          }
        );

        if (!response.ok) {
          console.error("Fetch failed:", response.status, response.statusText);

          await prisma.token.updateMany({
            where: { code: "sales" },
            data: { status: 0 }, // set token invalid
          });

          return NextResponse.json(
            {
              success: false,
              message: "Token invalid. Updated status to 0.",
            },
            { status: 401 }
          );
        }

        let data;
        try {
          data = await response.json();
        } catch (e) {
          console.log(e);
          await prisma.token.updateMany({
            where: { code: "sales" },
            data: { status: 0 },
          });

          return NextResponse.json(
            {
              success: false,
              message: "JSON parse error. Token set invalid.",
            },
            { status: 400 }
          );
        }

        // Save ke Prisma
        await prisma.salesStats.create({
          data: {
            id: crypto.randomUUID(),
            roomId: ROOM_MAP[roomId],
            stats: data,
            syncTime: getJakartaTime()
          },
        });

      } catch (err) {
        console.error("Error for room:", roomId, err);

        // Jika fetch error → token invalid juga
        await prisma.token.updateMany({
          where: { code: "sales" },
          data: { status: 0 },
        });

        return NextResponse.json(
          {
            success: false,
            message: "Network or server error. Token updated to invalid.",
          },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      message: "Cron sales has been success",
    });
  } catch (error) {
    console.error("Error in API:", error);
    await prisma.token.updateMany({
      where: { code: "sales" },
      data: { status: 0 },
    });
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : JSON.stringify(error),
      },
      { status: 500 }
    );
  }
}
