import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import * as fruitController from "../controllers/fruit.controller";
import { asyncHandler } from "../utils/async-handler";

export const fruitRouter = Router();

fruitRouter.use(authMiddleware);

/**
 * @openapi
 * /fruits:
 *   get:
 *     tags:
 *       - Fruits
 *     summary: Mengambil semua data buah untuk pengguna yang sudah login
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Data buah berhasil diambil
 */
fruitRouter.get("/", asyncHandler(fruitController.listFruits));

/**
 * @openapi
 * /fruits:
 *   post:
 *     tags:
 *       - Fruits
 *     summary: Membuat data buah
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - stock
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Buah berhasil dibuat
 */
fruitRouter.post("/", asyncHandler(fruitController.createFruit));

/**
 * @openapi
 * /fruits/{id}:
 *   get:
 *     tags:
 *       - Fruits
 *     summary: Mengambil data buah berdasarkan ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Data buah berhasil diambil
 */
fruitRouter.get("/:id", asyncHandler(fruitController.getFruitById));

/**
 * @openapi
 * /fruits/{id}:
 *   put:
 *     tags:
 *       - Fruits
 *     summary: Memperbarui data buah berdasarkan ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Buah berhasil diperbarui
 */
fruitRouter.put("/:id", asyncHandler(fruitController.updateFruit));

/**
 * @openapi
 * /fruits/{id}:
 *   delete:
 *     tags:
 *       - Fruits
 *     summary: Menghapus data buah berdasarkan ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Buah berhasil dihapus
 */
fruitRouter.delete("/:id", asyncHandler(fruitController.deleteFruit));