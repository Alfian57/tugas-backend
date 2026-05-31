import type { NextFunction, Request, Response } from "express";
import { HttpError } from "../utils/http-error";
import { verifyToken } from "../utils/jwt";

export function authMiddleware(req: Request, _res: Response, next: NextFunction) {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new HttpError(401, "Unauthorized"));
  }

  const token = authorization.slice(7).trim();

  try {
    const payload = verifyToken(token);
    req.user = {
      id: payload.id,
      email: payload.email,
      name: payload.name
    };
    return next();
  } catch {
    return next(new HttpError(401, "Invalid or expired token"));
  }
}