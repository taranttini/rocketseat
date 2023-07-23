import { IUsersRepository } from "../users-repository";
import { Prisma, User } from "@prisma/client";

export class InMemoryUsersRepository implements IUsersRepository {
  public users: User[] = [];

  async findByEmail(email: String): Promise<User | null> {
    const user = this.users.find((q) => q.email === email);

    if (!user) {
      return null;
    }
    return user;
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: "user-1",
      username: data.username,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    };

    this.users.push(user);

    return user;
  }
}
