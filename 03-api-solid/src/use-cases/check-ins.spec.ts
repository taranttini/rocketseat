import { CheckInUseCase } from "./checkin";
import { describe } from "node:test";
import { InMemoryCheckInsRepository } from "repositories/in-memory/in-memory-check-ins-repository";
import { beforeEach, expect, it } from "vitest";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: CheckInUseCase;

describe("Check-In Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new CheckInUseCase(checkInsRepository);
  });

  it("should be able to check in", async () => {
    const { checkIn } = await sut.execute({
      userId: "user-01",
      gymId: "gym-01",
    });

    expect(checkIn.id).toEqual(expect.any(String)); // seja a qualquer string
    expect(checkIn.id).not.toBeNull(); // nao pode ser null
    expect(checkIn.user_id).toEqual("user-01");
    expect(checkIn.gym_id).toEqual("gym-01");
  });
});
