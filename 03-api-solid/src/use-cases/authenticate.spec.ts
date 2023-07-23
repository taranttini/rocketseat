import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";
import { InvalidCreditialsError } from "errors/invalid-credentials-error";
import { describe } from "node:test";
import { InMemoryUsersRepository } from "repositories/in-memory/in-memory-users-repository";
import { expect, it } from "vitest";

describe("Authenticate Use Case", () => {
  it("should be able to authenticate", async () => {
    const usersRepository = new InMemoryUsersRepository();
    // SUT - System Under Test
    const sut = new AuthenticateUseCase(usersRepository);

    await usersRepository.create({
      username: "monalisa",
      email: "monalista@teste.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      email: "monalista@teste.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to authentication with wrong email", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);

    await usersRepository.create({
      username: "monalisa",
      email: "monalista1@teste.com",
      password_hash: await hash("123456", 6),
    });

    const testWrongEmail = async () =>
      await sut.execute({
        email: "monalista@teste.com",
        password: "123456",
      });

    await expect(testWrongEmail()).rejects.toBeInstanceOf(
      InvalidCreditialsError,
    );
  });

  it("should not be able to authentication with wrong password", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const sut = new AuthenticateUseCase(usersRepository);

    await usersRepository.create({
      username: "monalisa",
      email: "monalista@teste.com",
      password_hash: await hash("123456", 6),
    });

    const testWrongEmail = async () =>
      await sut.execute({
        email: "monalista@teste.com",
        password: "123455",
      });

    await expect(testWrongEmail()).rejects.toBeInstanceOf(
      InvalidCreditialsError,
    );
  });

  // test("check if it works", () => { expect(2 + 2).toBe(4); });
});
