import type { NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
import { HttpError } from "../utils/http-error";

export function notFoundMiddleware(_req: Request, res: Response) {
  res.status(404).json({ message: "Rute tidak ditemukan" });
}

export function errorMiddleware(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Validasi gagal",
      errors: err.flatten()
    });
  }

  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      return res.status(409).json({ message: "Data sudah ada" });
    }

    if (err.code === "P2025") {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }
  }

  return res.status(500).json({ message: "Terjadi kesalahan pada server" });
}