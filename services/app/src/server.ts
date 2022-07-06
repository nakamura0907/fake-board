import express, { Request, Response } from "express";
import cors from "cors";

import config from "@/config";
import errorHandling from "@/middlewares/errorHandling";
import { PrismaClient } from "@prisma/client";

const app = express();

// サーバー設定
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const options: cors.CorsOptions = {
  origin: config.server.cors.origin,
  optionsSuccessStatus: 200,
};
app.use(cors(options));

// ルーティング
app.route("").get((req: Request, res: Response) => {
  (async () => {
    const prisma = new PrismaClient();
    const result = await prisma.users.findMany();
    res.status(200).send(result);
  })();
});

// エラーハンドリング
errorHandling(app);

module.exports = app;
