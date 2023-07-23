import { Prisma, User } from "@prisma/client";

export interface IUsersRepository {
  findById(id: String): Promise<User | null>;
  findByEmail(email: String): Promise<User | null>;
  create(data: Prisma.UserCreateInput): Promise<User>;
}
