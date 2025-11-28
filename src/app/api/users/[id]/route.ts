import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { hashPassword } from "@/lib/auth";

// -----------------------------
// GET /api/users/[id]
// -----------------------------
export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const id = Number(context.params.id);

  if (isNaN(id)) {
    return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}

// -----------------------------
// PUT /api/users/[id]
// -----------------------------
export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const id = Number(context.params.id);

  if (isNaN(id)) {
    return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
  }

  const { name, email, password }: { name?: string; email?: string; password?: string } =
    await req.json();

  const user = await prisma.user.update({
    where: { id },
    data: {
      ...(name && { name }),
      ...(email && { email }),
      ...(password && { password: hashPassword(password) }),
    },
  });

  return NextResponse.json({ message: "Updated", user });
}

// -----------------------------
// DELETE /api/users/[id]
// -----------------------------
export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const id = Number(context.params.id);

  if (isNaN(id)) {
    return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
  }

  await prisma.user.delete({ where: { id } });

  return NextResponse.json({ message: "Deleted" });
}
