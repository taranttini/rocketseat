import { Prisma, User } from "@prisma/client";

export interface IUsersRepository {
  findByEmail(email: String): Promise<User | null>;
  create(data: Prisma.UserCreateInput): Promise<User>;
}
