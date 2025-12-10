import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";
import { verifyPassword, signToken } from "../../../lib/auth";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user)
    return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });

  const isMatch = verifyPassword(password, user.password);

  if (!isMatch)
    return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });

  const token = signToken({ id: user.id, email: user.email });

  return NextResponse.json({
    message: "Login success",
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  });
}
