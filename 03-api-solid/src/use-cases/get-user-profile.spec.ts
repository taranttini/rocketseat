import { GetUserProfileUseCase } from "./get-user-profile";
import { hash } from "bcryptjs";
import { ResourceNotFoundError } from "errors/resourcer-not-found-error";
import { describe } from "node:test";
import { InMemoryUsersRepository } from "repositories/in-memory/in-memory-users-repository";
import { beforeEach, expect, it } from "vitest";

let usersRepository: InMemoryUsersRepository;
// SUT - System Under Test
let sut: GetUserProfileUseCase;

describe("Get User Profile Use Case", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(usersRepository);
  });

  it("should be able to get user profile", async () => {
    await usersRepository.create({
      id: "one",
      username: "monalisa",
      email: "monalista@teste.com",
      password_hash: await hash("123456", 6),
    });

    const { user } = await sut.execute({
      userId: "one",
    });

    expect(user.id).toEqual("one");
    expect(user.username).toEqual("monalisa");
  });

  it("should not be able to get user profile with wrong id", async () => {
    const testNotFoundError = async () =>
      await sut.execute({
        userId: "not-exists-id",
      });

    await expect(testNotFoundError()).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    );
  });
});
