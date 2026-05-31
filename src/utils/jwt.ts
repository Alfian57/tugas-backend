import jwt from "jsonwebtoken";
import { env } from "../config/env";

export interface AuthenticatedUser {
  id: string;
  email: string;
  name: string;
}

interface TokenPayload extends AuthenticatedUser {
  iat?: number;
  exp?: number;
}

export function signToken(user: AuthenticatedUser) {
  return jwt.sign(user, env.JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string) {
  return jwt.verify(token, env.JWT_SECRET) as TokenPayload;
}