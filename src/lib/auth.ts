import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

interface JwtUserPayload {
  id: number;
  email: string;
}

const JWT_SECRET = process.env.JWT_SECRET || "SOME_SUPER_SECRET_KEY";

export function signToken(payload: JwtUserPayload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyPassword(password: string, hashed: string) {
  return bcrypt.compareSync(password, hashed);
}

export function hashPassword(password: string) {
  return bcrypt.hashSync(password, 10);
}
