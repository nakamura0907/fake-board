import { Request } from "express";
import Exception from "@/lib/Exception";
import { hashData } from "@/lib/Hash";

type ReqBody = {
  name: string;
  password: string;
};

class SignupUser {
  private readonly _name: string;
  private readonly _password: string;

  constructor(req: Request<{}, {}, ReqBody>) {
    const { name, password } = req.body;

    if (!name || name === "")
      throw new Exception("ユーザー名を入力してください", 422);
    // TODO: 英数チェック
    const nameLength = name.length;
    if (nameLength < 3 || nameLength > 30)
      throw new Exception(
        "ユーザー名を3文字以上30文字以内で入力してください",
        422
      );

    if (!password || password === "")
      throw new Exception("パスワードを入力してください", 422);
    // TODO: 英数チェック
    const passLength = password.length;
    if (passLength < 3 || passLength > 255)
      throw new Exception(
        "パスワードを3文字以上255文字以内で入力してください",
        422
      );

    this._name = name;
    this._password = password;
  }

  get name() {
    return this._name;
  }

  get password() {
    return hashData(this._password);
  }
}

export default SignupUser;
