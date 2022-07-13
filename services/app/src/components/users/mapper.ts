import { prisma } from "@/lib/Database/prisma";
import { users } from "@prisma/client";

const insert = async (name: users["name"], password: users["password"]) => {
  console.log(name, password);
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

const fetchByName = async (name: users["name"]) => {
  const user = await prisma.users.findFirst({
    where: {
      name: {
        equals: name,
      },
    },
  });
  return user;
};

const usersMapper = {};
export default Object.assign(usersMapper, {
  insert,
  isExists,
  fetchByName,
});
