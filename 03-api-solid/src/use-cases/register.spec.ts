import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import { UserAlreadyExistsError } from "errors/user-already-exists-error";
import { describe } from "node:test";
import { InMemoryUsersRepository } from "repositories/in-memory/in-memory-users-repository";
import { beforeEach, expect, it } from "vitest";

let usersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(usersRepository);
  });

  it("should be able to register", async () => {
    const { user } = await sut.execute({
      username: "monalisa",
      email: "monalista@teste.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String)); // seja a qualquer string
    expect(user.id).not.toBeNull(); // nao pode ser null
  });

  it("should hash user password upon registration", async () => {
    const { user } = await sut.execute({
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
    const email = "monalista@teste.com";

    const testEmailValid = async () =>
      await sut.execute({
        username: "monalisa-1",
        email,
        password: "123456",
      });

    const testEmailError = async () =>
      await sut.execute({
        username: "monalisa-2",
        email,
        password: "123456",
      });

    await expect(testEmailValid()).resolves.not.toThrow();

    await expect(testEmailError()).rejects.toBeInstanceOf(
      UserAlreadyExistsError,
    );
  });
});
