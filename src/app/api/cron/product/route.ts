import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getJakartaTime } from "@/utils/helper";

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
      select: { roomId: true, username: true },
    });

    const ROOM_MAP = Object.fromEntries(
      rooms.map((r) => [r.roomId, r.username])
    );

    for (const room of rooms) {
      try {
        const payload = {
          request: {
            room_filter: {
              room_id: room.roomId,
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
          "https://seller-id.tokopedia.com/api/v1/insights/workbench/live/detail/product/list?app_name=i18n_ecom_shop&device_id=0",
          {
            method: "POST",
            headers: {
              accept: "application/json, text/plain, */*",
              "content-type": "application/json",
              Cookie: token.value,
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
            roomId: ROOM_MAP[room.roomId],
            stats: data,
            syncTime: getJakartaTime(),
          },
        });

      } catch (err) {
        console.error("Error for room:", room.roomId, err);

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
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
