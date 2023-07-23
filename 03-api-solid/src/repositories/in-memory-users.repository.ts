import { IUsersRepository } from "./users-repository";
import { Prisma, User } from "@prisma/client";

export class InMemoryUsersRepository implements IUsersRepository {
  findByEmail(email: String): Promise<User | null> {
    throw new Error("Method not implemented.");
  }

  public users: Prisma.UserCreateInput[] = [];

  async create(data: Prisma.UserCreateInput): Promise<User> {
    this.users.push(data);
    const user = data as User;
    return user;
  }
}
