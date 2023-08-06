import { FetchNearbyGymUseCase } from "./fetch-nearby-gyms";
import { describe } from "node:test";
import { InMemoryGymsRepository } from "repositories/in-memory/in-memory-gyms-repository";
import { beforeEach, expect, it } from "vitest";

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymUseCase;

describe("Fetch Nearby Gyms Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymUseCase(gymsRepository);
  });

  it("should be able to fetch nearby gyms ", async () => {
    await gymsRepository.create({
      title: "Near Gym",
      description: null,
      phone: null,
      latitude: -27.0747279,
      longitude: -49.6401091,
    });

    await gymsRepository.create({
      title: "Far Gym",
      description: null,
      phone: null,
      latitude: -27.8610928,
      longitude: -49.5229501,
    });

    const { gyms } = await sut.execute({
      userLatitude: -27.1547279,
      userLongitude: -49.68624,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "Near Gym" })]);
  });
});
