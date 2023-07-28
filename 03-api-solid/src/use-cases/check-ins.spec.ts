import { CheckInUseCase } from "./check-ins";
import { describe } from "node:test";
import { InMemoryCheckInsRepository } from "repositories/in-memory/in-memory-check-ins-repository";
import { afterEach, beforeEach, /*describe, */ expect, it, vi } from "vitest";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: CheckInUseCase;

describe("Check-In Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new CheckInUseCase(checkInsRepository);

    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check in", async () => {
    vi.setSystemTime(new Date(2023, 9, 10, 8, 0, 0));

    const { checkIn } = await sut.execute({
      userId: "user-01",
      gymId: "gym-01",
    });

    expect(checkIn.id).toEqual(expect.any(String)); // seja a qualquer string
    expect(checkIn.id).not.toBeNull(); // nao pode ser null
    expect(checkIn.user_id).toEqual("user-01");
    expect(checkIn.gym_id).toEqual("gym-01");
  });

  it("should not be able to check in twice in the same day", async () => {
    const createCheckIn = async () =>
      await sut.execute({
        userId: "user-01",
        gymId: "gym-01",
      });

    vi.setSystemTime(new Date(2023, 9, 10, 8, 0, 0));
    await createCheckIn();

    vi.setSystemTime(new Date(2023, 9, 10, 8, 0, 0));
    await expect(createCheckIn).rejects.toBeInstanceOf(Error);
  });

  it("should be able to check in twice but in different days", async () => {
    const createCheckIn = async () =>
      await sut.execute({
        userId: "user-01",
        gymId: "gym-01",
      });

    vi.setSystemTime(new Date(2023, 9, 10, 8, 0, 0));
    await createCheckIn();

    vi.setSystemTime(new Date(2023, 9, 11, 8, 0, 0));
    const { checkIn } = await createCheckIn();

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
