import type { Request, Response } from "express";
import { createFruitSchema, updateFruitSchema } from "../validators/fruit.schema";
import * as fruitService from "../services/fruit.service";
import { HttpError } from "../utils/http-error";

function getUserId(req: Request) {
  if (!req.user) {
    throw new HttpError(401, "Unauthorized");
  }

  return req.user.id;
}

export async function createFruit(req: Request, res: Response) {
  const userId = getUserId(req);
  const payload = createFruitSchema.parse(req.body);
  const fruit = await fruitService.createFruit(userId, payload);

  return res.status(201).json({
    message: "Buah berhasil dibuat",
    data: fruit
  });
}

export async function listFruits(req: Request, res: Response) {
  const userId = getUserId(req);
  const fruits = await fruitService.listFruits(userId);

  return res.status(200).json({
    message: "Data buah berhasil diambil",
    data: fruits
  });
}

export async function getFruitById(req: Request, res: Response) {
  const userId = getUserId(req);
  const fruitId = String(req.params.id);
  const fruit = await fruitService.getFruitById(userId, fruitId);

  return res.status(200).json({
    message: "Data buah berhasil diambil",
    data: fruit
  });
}

export async function updateFruit(req: Request, res: Response) {
  const userId = getUserId(req);
  const payload = updateFruitSchema.parse(req.body);
  const fruitId = String(req.params.id);
  const fruit = await fruitService.updateFruit(userId, fruitId, payload);

  return res.status(200).json({
    message: "Buah berhasil diperbarui",
    data: fruit
  });
}

export async function deleteFruit(req: Request, res: Response) {
  const userId = getUserId(req);
  const fruitId = String(req.params.id);
  const result = await fruitService.deleteFruit(userId, fruitId);

  return res.status(200).json(result);
}