import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { getJakartaTime } from "../../../../utils/helper";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

export async function GET() {
  try {
    const token = await prisma.token.findFirst({
      where: { code: "product" },
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
            stats_types: [
              1, 2, 3, 4, 5, 6, 51, 350, 64, 7, 10, 15, 341, 120, 30, 342,
            ],
          },
        };

        const response = await fetch(
          "https://seller-id.tokopedia.com/api/v1/insights/workbench/live/detail/product/list?app_name=i18n_ecom_shop&device_id=0&fp=verify_mhvna0ng_rhbcnDg4_69aX_4h9F_8WRs_hhWmYFrIW1Yn&device_platform=web&cookie_enabled=true&screen_width=1680&screen_height=1050&browser_language=en-US&browser_platform=MacIntel&browser_name=Mozilla&browser_version=5.0+(Macintosh%3B+Intel+Mac+OS+X+10_15_7)+AppleWebKit%2F537.36+(KHTML,+like+Gecko)+Chrome%2F142.0.0.0+Safari%2F537.36&browser_online=true&timezone_name=Asia%2FJakarta&vertical=2&oec_seller_id=7494930113907558878",
          {
            method: "POST",
            headers: {
              "accept": "application/json, text/plain, */*",
              "accept-language": "en-US,en;q=0.9,id;q=0.8",
              "content-type": "application/json",
              "origin": "https://seller-id.tokopedia.com",
              "referer": "https://seller-id.tokopedia.com/workbench/live/overview...",
              "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36",  
              Cookie: token.value,
              "priority": "u=1, i",
              "sec-ch-ua": '"Chromium";v="142", "Google Chrome";v="142", "Not_A Brand";v="99"',
              "sec-ch-ua-mobile": "?0",
              "sec-ch-ua-platform": '"macOS"',
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-origin"
            },
            body: JSON.stringify(payload),
          }
        );

        if (!response.ok) {
          console.error("Fetch failed:", response.status, response.statusText);

          await prisma.token.updateMany({
            where: { code: "product" },
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

        // Parse JSON aman
        let data;
        try {
          data = await response.json();
        } catch (e) {
          console.log(e);
          await prisma.token.updateMany({
            where: { code: "product" },
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

        // Save ke DB
        await prisma.productStats.create({
          data: {
            id: crypto.randomUUID(),
            roomId: ROOM_MAP[roomId],
            stats: data,
            syncTime: getJakartaTime(),
          },
        });

      } catch (err) {
        console.error("Error for room:", roomId, err);

        // Jika fetch error → token invalid juga
        await prisma.token.updateMany({
          where: { code: "product" },
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
      message: "Cron product has been success",
    });
  } catch (error) {
    console.error("Fatal error:", error);
    await prisma.token.updateMany({
      where: { code: "product" },
      data: { status: 0 },
    });
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
