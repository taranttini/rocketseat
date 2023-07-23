import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";
import { InvalidCreditialsError } from "errors/invalid-credentials-error";
import { describe } from "node:test";
import { InMemoryUsersRepository } from "repositories/in-memory/in-memory-users-repository";
import { beforeEach, expect, it } from "vitest";

let usersRepository: InMemoryUsersRepository;
// SUT - System Under Test
let sut: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(usersRepository);
  });

  it("should be able to authenticate", async () => {
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
    await usersRepository.create({
      username: "monalisa",
      email: "monalista1@teste.com",
      password_hash: await hash("123456", 6),
    });

    const testWrongEmailError = async () =>
      await sut.execute({
        email: "monalista@teste.com",
        password: "123456",
      });

    await expect(testWrongEmailError()).rejects.toBeInstanceOf(
      InvalidCreditialsError,
    );
  });

  it("should not be able to authentication with wrong password", async () => {
    await usersRepository.create({
      username: "monalisa",
      email: "monalista@teste.com",
      password_hash: await hash("123456", 6),
    });

    const testWrongEmailError = async () =>
      await sut.execute({
        email: "monalista@teste.com",
        password: "123455",
      });

    await expect(testWrongEmailError()).rejects.toBeInstanceOf(
      InvalidCreditialsError,
    );
  });
});
