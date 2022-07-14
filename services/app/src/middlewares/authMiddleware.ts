import { NextFunction, Request, Response } from "express";
import Exception from "@/lib/Exception";
import { verifyToken } from "@/lib/Token";
import { hasProperty } from "@/lib/util";

const authMiddleware = (req: Request, _: Response, next: NextFunction) => {
  const authorization = req.headers["authorization"];

  if (authorization == undefined)
    throw new Exception("Authorizationリクエストヘッダーがありません", 401);
  if (authorization.split(" ")[0] !== "Bearer")
    throw new Exception(
      "Authorizationリクエストヘッダーのフォーマットが誤っています",
      401
    );

  const token = authorization.split(" ")[1];
  let payload;
  try {
    payload = verifyToken(token);
  } catch (error) {
    throw new Exception("認証に失敗しました", 401);
  }

  if (!hasProperty(payload, "id") || typeof payload.id !== "number")
    throw new Exception("トークンが誤っています", 401);

  req.user = { id: payload.id };

  next();
};

export default authMiddleware;
