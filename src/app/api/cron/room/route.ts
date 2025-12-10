import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { getJakartaTime } from "../../../../utils/helper";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

export async function GET() {
  try {
    const token = await prisma.token.findFirst({
      where: { code: "room" },
    });

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Token not found" },
        { status: 400 }
      );
    }

    // ========== DATE RANGE (7 hari) ==========
    const today = new Date();
    const endDate = today.toISOString().split("T")[0];
    const startObj = new Date(today);
    startObj.setDate(today.getDate() - 7);
    const startDate = startObj.toISOString().split("T")[0];

    const payload = {
      request: {
        time_descriptor: {
          granularity: "7D",
          end: endDate,
          start: startDate,
          with_previous_period: false,
          scenario: 4,
          timezone_offset: 25200,
        },
      },
    };

    // ===================== API CALL =====================
    const response = await fetch(
      "https://seller-id.tokopedia.com/api/v2/insights/seller/live/performance/creator/list?locale=en&language=en&oec_seller_id=7494930113907558878&seller_id=7494930113907558878&aid=4068&app_name=i18n_ecom_shop&device_platform=web&cookie_enabled=true&browser_online=true&timezone_name=Asia%2FJakarta&use_content_type_definition=1",
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

    // Jika HTTP-level gagal (jarang terjadi)
    if (!response.ok) {
      await prisma.token.updateMany({
        where: { code: "room" },
        data: { status: 0 },
      });

      return NextResponse.json(
        { success: false, message: "Token invalid (HTTP error)" },
        { status: 401 }
      );
    }

    // ================== PARSE JSON ==================
    let data;
    try {
      data = await response.json();
    } catch (err) {
      console.error("JSON parse error:", err);

      await prisma.token.updateMany({
        where: { code: "room" },
        data: { status: 0 },
      });

      return NextResponse.json(
        { success: false, message: "JSON parse failed. Token invalidated." },
        { status: 400 }
      );
    }

    // ================= VALIDASI TOKOPELITA (200 OK tapi error) =================

    const isInvalid =
      !data ||
      data.error ||
      data.error_code ||
      data.code === 401 ||
      data.message?.toLowerCase().includes("login") ||
      !data.data ||
      !Array.isArray(data.data.stats) ||
      data.data.stats.length === 0; // <--- Tokopedia sering return kosong saat token mati

    if (isInvalid) {
      console.error("Invalid response detected:", data);

      await prisma.token.updateMany({
        where: { code: "room" },
        data: { status: 0 },
      });

      return NextResponse.json(
        { success: false, message: "Token expired or invalid data returned." },
        { status: 401 }
      );
    }

    // ================= SAVE TO DB =================
    const rooms = data.data.stats;

    for (const item of rooms) {
      const username = item?.creator_meta?.handle;
      const liveId = item?.live_meta?.id;

      if (!username || !liveId) continue;

      await prisma.roomStats.upsert({
        where: { username },
        update: {
          roomId: String(liveId),
          displayName: item.creator_meta?.display_name ?? null,
          stats: item,
          createdAt: getJakartaTime(),
        },
        create: {
          id: crypto.randomUUID(),
          roomId: String(liveId),
          username,
          displayName: item.creator_meta?.display_name ?? null,
          stats: item,
          createdAt: getJakartaTime(),
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Cron room has been success",
    });
  } catch (error) {
    console.error("Fatal error:", error);

    // Token dianggap invalid kalau fatal error
    await prisma.token.updateMany({
      where: { code: "room" },
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
