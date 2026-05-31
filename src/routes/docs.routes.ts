import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "../swagger/openapi";

export const docsRouter = Router();

docsRouter.get("/openapi.json", (_req, res) => {
  res.json(swaggerSpec);
});

docsRouter.use("/", swaggerUi.serve);
docsRouter.get("/", swaggerUi.setup(swaggerSpec, { explorer: true }));