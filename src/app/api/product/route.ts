import { NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  console.log('getter run')
  const data = await prisma.productStats.findMany({
    take: 20,
    orderBy: { syncTime: "desc" },
  });

  return NextResponse.json(data);
}