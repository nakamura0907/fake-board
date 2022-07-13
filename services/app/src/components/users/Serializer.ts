import Serializer from "@/lib/Serializer";
import { users } from "@prisma/client";

class UsersSerializer extends Serializer {
  signup(user: users) {
    return {
      id: user.id,
      name: user.name,
    };
  }

  login(id: number, token: string) {
    return {
      id,
      token,
    };
  }
}

export default UsersSerializer;
