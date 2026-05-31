import { Prisma } from "@prisma/client";
import { prisma } from "../config/prisma";
import { HttpError } from "../utils/http-error";
import type { CreateFruitInput, UpdateFruitInput } from "../validators/fruit.schema";

function serializeFruit(fruit: {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  price: Prisma.Decimal;
  stock: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}) {
  return {
    ...fruit,
    price: fruit.price.toString()
  };
}

export async function createFruit(userId: string, payload: CreateFruitInput) {
  const fruit = await prisma.fruit.create({
    data: {
      ...payload,
      price: new Prisma.Decimal(payload.price),
      userId
    }
  });

  return serializeFruit(fruit);
}

export async function listFruits(userId: string) {
  const fruits = await prisma.fruit.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" }
  });

  return fruits.map(serializeFruit);
}

export async function getFruitById(userId: string, fruitId: string) {
  const fruit = await prisma.fruit.findFirst({
    where: { id: fruitId, userId }
  });

  if (!fruit) {
    throw new HttpError(404, "Buah tidak ditemukan");
  }

  return serializeFruit(fruit);
}

export async function updateFruit(userId: string, fruitId: string, payload: UpdateFruitInput) {
  await getFruitById(userId, fruitId);

  const fruit = await prisma.fruit.update({
    where: { id: fruitId },
    data: {
      ...(payload.name !== undefined ? { name: payload.name } : {}),
      ...(payload.description !== undefined ? { description: payload.description } : {}),
      ...(payload.imageUrl !== undefined ? { imageUrl: payload.imageUrl } : {}),
      ...(payload.price !== undefined ? { price: new Prisma.Decimal(payload.price) } : {}),
      ...(payload.stock !== undefined ? { stock: payload.stock } : {})
    }
  });

  return serializeFruit(fruit);
}

export async function deleteFruit(userId: string, fruitId: string) {
  await getFruitById(userId, fruitId);

  await prisma.fruit.delete({
    where: { id: fruitId }
  });

  return { message: "Buah berhasil dihapus" };
}