import { NextFunction, Request, Response } from "express";
import Exception from "@/lib/Exception";
import { verifyToken } from "@/lib/Token";

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
  try {
    const payload = verifyToken(token);

    // TODO: payloadを保存
    console.log(payload);

    next();
  } catch (error) {
    throw new Exception("認証に失敗しました", 401);
  }
};

export default authMiddleware;
