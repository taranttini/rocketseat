import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import { describe } from "node:test";
// import { PrismaUsersRepository } from "repositories/prisma-users.repository";
import { expect, it, test } from "vitest";

describe("Register Use Case", () => {
  it("should hash user password upon registration", async () => {
    // simular integrado
    // const prismaUsersRepository = new PrismaUsersRepository();
    // const registerUseCase = new RegisterUseCase(prismaUsersRepository);

    // simular fake test
    const registerUseCase = new RegisterUseCase({
      async findByEmail(email) {
        return null;
      },
      async create(data) {
        return {
          id: "user-1",
          username: data.username,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
        };
      },
    });

    const { user } = await registerUseCase.execute({
      username: "monalisa",
      email: "monalista@teste.com",
      password: "123456",
    });

    const isPasswordCorrecltyHashed = await compare(
      "123456",
      user.password_hash,
    );

    expect(isPasswordCorrecltyHashed).toBe(true);
  });

  // test("check if it works", () => { expect(2 + 2).toBe(4); });
});
