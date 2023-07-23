import { IUsersRepository } from "../users-repository";
import { Prisma, User } from "@prisma/client";
import { randomUUID } from "node:crypto";

export class InMemoryUsersRepository implements IUsersRepository {
  public users: User[] = [];

  async findById(id: String): Promise<User | null> {
    const user = this.users.find((q) => q.id === id);

    if (!user) {
      return null;
    }

    return user;
  }

  async findByEmail(email: String): Promise<User | null> {
    const user = this.users.find((q) => q.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const userId = randomUUID();

    const user = {
      id: data.id || userId,
      username: data.username,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    };

    this.users.push(user);

    return user;
  }
}
