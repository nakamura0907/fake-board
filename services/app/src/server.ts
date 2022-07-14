import express from "express";
import cors from "cors";

import config from "@/config";
import errorHandling from "@/middlewares/errorHandling";
import usersRouter from "@/components/users/router";

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
app.use("/users", usersRouter(express));

// エラーハンドリング
errorHandling(app);

module.exports = app;
