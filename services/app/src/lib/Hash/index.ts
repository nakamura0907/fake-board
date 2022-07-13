import bcrypt from "bcrypt";

export const hashData = (data: string | Buffer) => {
  return bcrypt.hashSync(data, 10);
};

export const compareData = (data: string | Buffer, encrypted: string) => {
  return bcrypt.compareSync(data, encrypted);
};
