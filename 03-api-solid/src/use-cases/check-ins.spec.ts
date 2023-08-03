import { CheckInUseCase } from "./check-ins";
import { Decimal } from "@prisma/client/runtime/library";
import { MaxDistanceError } from "errors/max-distance-error";
import { MaxNumberOfCheckInsError } from "errors/max-number-of-check-ins-erro";
import { describe } from "node:test";
import { InMemoryCheckInsRepository } from "repositories/in-memory/in-memory-check-ins-repository";
import { InMemoryGymsRepository } from "repositories/in-memory/in-memory-gyms-repository";
import { afterEach, beforeEach, expect, it, vi } from "vitest";

let checkInsRepository: InMemoryCheckInsRepository;
let gymsRepository: InMemoryGymsRepository;
let sut: CheckInUseCase;

describe("Check-In Use Case", () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    gymsRepository = new InMemoryGymsRepository();
    sut = new CheckInUseCase(checkInsRepository, gymsRepository);

    await gymsRepository.create({
      id: "gym-01",
      title: "JavaScript Gym",
      description: "",
      phone: "",
      latitude: new Decimal(-27.0747279),
      longitude: new Decimal(-49.6401091),
    });

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
      userLatitude: -27.0747279,
      userLongitude: -49.6401091,
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
        userLatitude: -27.0747279,
        userLongitude: -49.6401091,
      });

    vi.setSystemTime(new Date(2023, 9, 10, 8, 0, 0));
    await createCheckIn();

    vi.setSystemTime(new Date(2023, 9, 10, 8, 0, 0));
    await expect(createCheckIn).rejects.toBeInstanceOf(
      MaxNumberOfCheckInsError,
    ); // expected
  });

  it("should be able to check in twice but in different days", async () => {
    const createCheckIn = async () =>
      await sut.execute({
        userId: "user-01",
        gymId: "gym-01",
        userLatitude: -27.0747279,
        userLongitude: -49.6401091,
      });

    vi.setSystemTime(new Date(2023, 9, 10, 8, 0, 0));
    await createCheckIn();

    vi.setSystemTime(new Date(2023, 9, 11, 8, 0, 0));
    const { checkIn } = await createCheckIn();

    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("should not be able to check in on distant gym", async () => {
    gymsRepository.items.push({
      id: "gym-02",
      title: "JavaScript Gym",
      description: "",
      phone: "",
      latitude: new Decimal(-27.0747279),
      longitude: new Decimal(-49.6501091),
    });

    const createCheckIn = async () =>
      await sut.execute({
        userId: "user-01",
        gymId: "gym-02",
        userLatitude: -27.0747252,
        userLongitude: -49.6401091,
      });

    await expect(createCheckIn).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
