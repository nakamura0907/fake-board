import express from "express";
import cors from "cors";

import config from "@/config";
import errorHandling from "@/middlewares/errorHandling";

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

// エラーハンドリング
errorHandling(app);

module.exports = app;
