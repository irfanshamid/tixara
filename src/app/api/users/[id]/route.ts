import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { hashPassword } from "@/lib/auth";

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  const user = await prisma.user.findUnique({
    where: { id: Number(params.id) },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}

export async function PUT(req: NextRequest, { params }: RouteParams) {
  const body = await req.json() as {
    name?: string;
    email?: string;
    password?: string;
  };

  const user = await prisma.user.update({
    where: { id: Number(params.id) },
    data: {
      name: body.name,
      email: body.email,
      ...(body.password && { password: hashPassword(body.password) }),
    },
  });

  return NextResponse.json({ message: "Updated", user });
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  await prisma.user.delete({
    where: { id: Number(params.id) },
  });

  return NextResponse.json({ message: "Deleted" });
}
