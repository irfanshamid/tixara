import { NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const roomId = searchParams.get("room_id");
  const start = searchParams.get("start_date");
  const end = searchParams.get("end_date");

  // Build dynamic where object safely
  const where: Prisma.ProductStatsWhereInput = {};

  if (roomId) {
    where.roomId = roomId;
  }

  if (start && end) {
    where.syncTime = {
      gte: new Date(start),
      lte: new Date(end),
    };
  }

  const data = await prisma.productStats.findMany({
    where,
    take: 20,
    orderBy: { syncTime: "desc" },
  });


  return NextResponse.json(data);
}
