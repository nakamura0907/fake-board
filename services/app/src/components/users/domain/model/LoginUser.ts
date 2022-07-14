import { Request } from "express";

type ReqBody = {
  name: string;
  password: string;
};

class LoginUser {
  private readonly _name: string;
  private readonly _password: string;

  constructor(req: Request<{}, ReqBody>) {
    const { name, password } = req.body;

    this._name = name;
    this._password = password;
  }

  get name() {
    return this._name;
  }

  get password() {
    return this._password;
  }
}

export default LoginUser;
