import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// =========================
// GET all tokens
// =========================
export async function GET() {
  const tokens = await prisma.token.findMany({
    select: { id: true, code: true, value: true, status: true, updatedAt: true },
  });

  return NextResponse.json(tokens);
}

// =========================
// CREATE token
// =========================
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const token = await prisma.token.create({
      data: {
        code: body.code,
        value: body.value,
        status: Number(body.status),
      },
    });

    return NextResponse.json({ message: "Token created", token });
  } catch (err) {
    console.error("POST /tokens error:", err);
    return NextResponse.json(
      { message: "Error creating token" },
      { status: 500 }
    );
  }
}

// =========================
// UPDATE token
// =========================
export async function PUT(req: Request) {
  try {
    const body = await req.json();

    if (!body.id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }

    const token = await prisma.token.update({
      where: { id: Number(body.id) }, // FIX UTAMA
      data: {
        code: body.code,
        value: body.value,
        status: Number(body.status),
      },
    });

    return NextResponse.json({ message: "Updated", token });
  } catch (err) {
    console.error("PUT /tokens error:", err);
    return NextResponse.json(
      { error: "Token not found" },
      { status: 404 }
    );
  }
}

// =========================
// DELETE token
// =========================
export async function DELETE(req: Request) {
  try {
    const body = await req.json();

    if (!body.id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }

    await prisma.token.delete({
      where: { id: Number(body.id) }, // FIX UTAMA
    });

    return NextResponse.json({ message: "Deleted" });
  } catch (err) {
    console.error("DELETE /tokens error:", err);
    return NextResponse.json(
      { error: "Token not found" },
      { status: 404 }
    );
  }
}
