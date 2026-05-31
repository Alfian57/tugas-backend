import type { Request, Response } from "express";
import { loginSchema, registerSchema } from "../validators/auth.schema";
import * as authService from "../services/auth.service";

export async function register(req: Request, res: Response) {
  const payload = registerSchema.parse(req.body);
  const result = await authService.register(payload);

  return res.status(201).json({
    message: "Pengguna berhasil didaftarkan",
    data: result
  });
}

export async function login(req: Request, res: Response) {
  const payload = loginSchema.parse(req.body);
  const result = await authService.login(payload);

  return res.status(200).json({
    message: "Login berhasil",
    data: result
  });
}