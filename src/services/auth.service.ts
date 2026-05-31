import type { User } from "@prisma/client";
import { prisma } from "../config/prisma";
import { comparePassword, hashPassword } from "../utils/password";
import { signToken } from "../utils/jwt";
import { HttpError } from "../utils/http-error";
import type { LoginInput, RegisterInput } from "../validators/auth.schema";

function toPublicUser(user: User) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
}

export async function register(payload: RegisterInput) {
  const password = await hashPassword(payload.password);

  const user = await prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email.toLowerCase(),
      password
    }
  });

  return {
    user: toPublicUser(user),
    token: signToken({ id: user.id, email: user.email, name: user.name })
  };
}

export async function login(payload: LoginInput) {
  const user = await prisma.user.findUnique({
    where: { email: payload.email.toLowerCase() }
  });

  if (!user) {
    throw new HttpError(401, "Email atau kata sandi tidak valid");
  }

  const isValid = await comparePassword(payload.password, user.password);

  if (!isValid) {
    throw new HttpError(401, "Email atau kata sandi tidak valid");
  }

  return {
    user: toPublicUser(user),
    token: signToken({ id: user.id, email: user.email, name: user.name })
  };
}