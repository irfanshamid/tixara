import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const rooms = await prisma.roomStats.findMany({
      select: {
        roomId: true,       // numeric ID live
        username: true,     // name
        displayName: true,  // optional
        createdAt: true,    // tanggal fetch
        stats: true,        // optional kalau mau ditampilkan
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      data: rooms,
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
