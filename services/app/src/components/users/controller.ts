import Exception from "@/lib/Exception";
import { NextFunction, Request, Response } from "express";
import LoginUser from "./domain/model/LoginUser";
import SignupUser from "./domain/model/SignupUser";
import usersMapper from "./mapper";
import UsersSerializer from "./Serializer";

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
      console.log(loginUser);

      // ユーザーの取得
      // パスワード検証
      // トークン生成

      res.status(200).send(serializer.login());
    })().catch(next);
  };

  return { signup, login };
};

export default usersController;
