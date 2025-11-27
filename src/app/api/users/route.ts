import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { hashPassword } from "@/lib/auth";

export async function GET() {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, createdAt: true },
  });

  return NextResponse.json(users);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const existing = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (existing) {
      return NextResponse.json(
        { message: "Email already used" },
        { status: 409 }
      );
    }

    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashPassword(body.password),
      },
    });

    return NextResponse.json({ message: "User created", user });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Error creating user" }, { status: 500 });
  }
}
