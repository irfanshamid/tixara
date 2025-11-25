import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const rooms = await prisma.roomStats.findMany({
      select: {
        roomId: true,
        username: true,
        displayName: true,
        createdAt: true,
        stats: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const unique = rooms.reduce((acc, item) => {
      if (!acc.has(item.username)) {
        acc.set(item.username, item);
      }
      return acc;
    }, new Map());

    return NextResponse.json({
      success: true,
      data: Array.from(unique.values()),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
