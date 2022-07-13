import { NextFunction, Request, Response } from "express";
import Exception from "@/lib/Exception";
import LoginUser from "./domain/model/LoginUser";
import SignupUser from "./domain/model/SignupUser";
import usersMapper from "./mapper";
import UsersSerializer from "./Serializer";
import { compareData } from "@/lib/Hash";
import { signToken } from "@/lib/Token";

const usersController = () => {
  const serializer = new UsersSerializer();

  const signup = (req: Request, res: Response, next: NextFunction) => {
    (async () => {
      const signupUser = new SignupUser(req);

      // 重複確認
      const isExists = await usersMapper.isExists(signupUser.name);
      if (isExists)
        throw new Exception("そのユーザー名はすでに利用されています");

      // 新規会員登録
      const user = await usersMapper.insert(
        signupUser.name,
        signupUser.password
      );

      res.status(200).send(serializer.signup(user));
    })().catch(next);
  };

  const login = (req: Request, res: Response, next: NextFunction) => {
    (async () => {
      const loginUser = new LoginUser(req);

      // ユーザーの取得
      const user = await usersMapper.fetchByName(loginUser.name);
      if (!user)
        throw new Exception(
          "アカウントが存在しないかユーザー名またはパスワードが誤っています",
          404
        );

      // パスワード検証
      if (!compareData(loginUser.password, user.password))
        throw new Exception(
          "アカウントが存在しないかユーザー名またはパスワードが誤っています",
          404
        );

      // トークン生成
      const payload = {
        id: user.id,
      };
      const token = signToken(payload);

      res.status(200).send(serializer.login(user.id, token));
    })().catch(next);
  };

  return { signup, login };
};

export default usersController;
