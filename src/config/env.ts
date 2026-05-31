import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(1),
  APP_URL: z.string().url().optional(),
  PORT: z.coerce.number().int().positive().default(3000)
});

const parsedEnv = envSchema.parse(process.env);

export const env = {
  ...parsedEnv,
  APP_URL: (parsedEnv.APP_URL ?? `http://localhost:${parsedEnv.PORT}`).replace(/\/+$/, "")
};
