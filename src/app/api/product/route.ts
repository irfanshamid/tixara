import { NextResponse } from "next/server";
import { PrismaClient, type Prisma } from "@/generated/prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const roomId = String(searchParams.get("room_id")) ?? undefined;
  const start = searchParams.get("start_date");
  const end = searchParams.get("end_date");

  // Build filter object without any
  const where: Prisma.ProductStatsWhereInput = {
    ...(roomId && { roomId }),
    ...(start &&
      end && {
        syncTime: {
          gte: new Date(start),
          lte: new Date(end),
        },
      }),
  };

  const data = await prisma.productStats.findMany({
    where,
    take: 20,
    orderBy: { syncTime: "desc" },
  });

  return NextResponse.json(data);
}
