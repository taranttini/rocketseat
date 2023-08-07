import { ValidateCheckInUseCase } from "./validate-check-ins";
import { ResourceNotFoundError } from "errors/resourcer-not-found-error";
import { describe } from "node:test";
import { InMemoryCheckInsRepository } from "repositories/in-memory/in-memory-check-ins-repository";
import { beforeEach, expect, it } from "vitest";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: ValidateCheckInUseCase;

describe("Validate CheckIns Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new ValidateCheckInUseCase(checkInsRepository);
  });

  it("should be able to validate to the check-in", async () => {
    const createdCheckIn = await checkInsRepository.create({
      user_id: "user-01",
      gym_id: "gym-01",
    });

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    });

    expect(checkIn.validated_at).toEqual(expect.any(Date));
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date));
  });

  it("should not be able to validate to inexistent check-in", async () => {
    await expect(() =>
      sut.execute({
        checkInId: "inexistent-check-in-id",
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
