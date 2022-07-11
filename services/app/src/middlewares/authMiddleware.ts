import { NextFunction, Request, Response } from "express";
import Exception from "@/lib/Exception";
import { verifyToken } from "@/lib/Token";

// TODO: 動作確認

const authMiddleware = (req: Request, _: Response, next: NextFunction) => {
  const authorization = req.headers["authorization"];

  if (authorization == undefined) throw new Exception("authorization");
  if (authorization.split(" ")[0] !== "Bearer")
    throw new Exception("authorization format");

  const token = authorization.split(" ")[1];
  try {
    const payload = verifyToken(token);

    // TODO: payloadに誤りはないか
    // TODO: payloadを保存
    console.log(payload);

    next();
  } catch (error) {
    throw new Exception("認証", 403);
  }
};

export default authMiddleware;
