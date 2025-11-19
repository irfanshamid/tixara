import { NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const roomId = searchParams.get("room_id");
  const startStr = searchParams.get("start_date");
  const endStr = searchParams.get("end_date");

  const where: Prisma.SalesStatsWhereInput = {};

  if (roomId) {
    where.roomId = roomId;
  }

  // --- FIX DI SINI ---
  if (startStr && endStr) {
    const start = Number(startStr); // convert to number
    const end = Number(endStr);

    // validate timestamp before using it
    if (!isNaN(start) && !isNaN(end)) {
      where.syncTime = {
        gte: new Date(start),
        lte: new Date(end),
      };
    }
  }

  const data = await prisma.salesStats.findMany({
    where,
    orderBy: { syncTime: "desc" },
  });

  return NextResponse.json(data);
}
