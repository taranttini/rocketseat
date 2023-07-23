import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import { UserAlreadyExistsError } from "errors/user-already-exists-error";
import { describe } from "node:test";
import { InMemoryUsersRepository } from "repositories/in-memory/in-memory-users-repository";
// import { PrismaUsersRepository } from "repositories/prisma-users.repository";
import { expect, it } from "vitest";

describe("Register Use Case", () => {
  it("should be able to register", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const { user } = await registerUseCase.execute({
      username: "monalisa",
      email: "monalista@teste.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String)); // seja a qualquer string
    expect(user.id).not.toBeNull(); // nao pode ser null
  });

  it("should hash user password upon registration", async () => {
    // simular integrado com banco
    // const usersRepository = new PrismaUsersRepository();
    // simular com dados em memoria
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

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

  it("should not be able to register with same email twice", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    const email = "monalista@teste.com";

    const testEmailValid = async () =>
      await registerUseCase.execute({
        username: "monalisa-1",
        email,
        password: "123456",
      });

    const testEmailError = async () =>
      await registerUseCase.execute({
        username: "monalisa-2",
        email,
        password: "123456",
      });

    await expect(testEmailValid()).resolves.not.toThrow();

    await expect(testEmailError()).rejects.toBeInstanceOf(
      UserAlreadyExistsError,
    );
  });

  // test("check if it works", () => { expect(2 + 2).toBe(4); });
});
