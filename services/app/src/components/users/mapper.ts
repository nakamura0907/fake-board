import { prisma } from "@/lib/Database/prisma";
import { users } from "@prisma/client";

// TODO: prisma例外対策

const insert = async (name: users["name"], password: users["password"]) => {
  const user = await prisma.users.create({
    data: {
      name,
      password,
    },
  });

  return user;
};

const isExists = async (name: users["name"]) => {
  const user = await prisma.users.findFirst({
    where: {
      name: {
        equals: name,
      },
    },
  });

  return user ? true : false;
};

const usersMapper = {};
export default Object.assign(usersMapper, {
  insert,
  isExists,
});
