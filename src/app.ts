import express from "express";
import cors from "cors";
import { authRouter } from "./routes/auth.routes";
import { fruitRouter } from "./routes/fruit.routes";
import { docsRouter } from "./routes/docs.routes";
import { errorMiddleware, notFoundMiddleware } from "./middleware/error.middleware";

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.use("/auth", authRouter);
  app.use("/fruits", fruitRouter);
  app.use("/", docsRouter);

  app.use(notFoundMiddleware);
  app.use(errorMiddleware);

  return app;
}
