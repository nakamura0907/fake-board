import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET_KEY ?? "MY JWT_SECRET_KEY";

const options: jwt.SignOptions = {
  expiresIn: "3h",
};

export const signToken = (payload: string | object | Buffer) => {
  const token = jwt.sign(payload, SECRET_KEY, options);
  return token;
};

export const verifyToken = (token: string) => {
  const payload = jwt.verify(token, SECRET_KEY);
  return payload;
};
