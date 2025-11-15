import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const runtime = "nodejs";

const ROOM_IDS = [
  "7572438844390968076",
  "7571036699610893067",
  "7572472780560157451",
];

export async function GET() {
  try {
    const { prisma } = await import("@/lib/prisma");
    
    for (const roomId of ROOM_IDS) {
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
            "content-type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      // Save ke Prisma
      await prisma.productStats.create({
        data: {
          roomId,
          stats: data,
        },
      });

    }

    return NextResponse.json({
      success: true,
      message: "Cron product has been success",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error,
      },
      { status: 500 }
    );
  }
}
