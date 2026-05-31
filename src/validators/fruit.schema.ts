import { z } from "zod";

const priceSchema = z.coerce.number().positive();

export const createFruitSchema = z.object({
  name: z.string().min(2).max(100),
  description: z.string().max(500).optional().nullable(),
  imageUrl: z.string().url().optional().nullable(),
  price: priceSchema,
  stock: z.coerce.number().int().nonnegative()
});

export const updateFruitSchema = createFruitSchema.partial().refine(
  (value) => Object.keys(value).length > 0,
  { message: "At least one field is required" }
);

export type CreateFruitInput = z.infer<typeof createFruitSchema>;
export type UpdateFruitInput = z.infer<typeof updateFruitSchema>;