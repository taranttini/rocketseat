import { SearchGymsUseCase } from "./search-gyms";
import { describe } from "node:test";
import { InMemoryCheckInsRepository } from "repositories/in-memory/in-memory-check-ins-repository";
import { InMemoryGymsRepository } from "repositories/in-memory/in-memory-gyms-repository";
import { beforeEach, expect, it } from "vitest";

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

describe("Search Gyms Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsUseCase(gymsRepository);
  });

  it("should be able to fetch check-in history ", async () => {
    await gymsRepository.create({
      title: "TypeScript Gym",
      description: null,
      phone: null,
      latitude: -27.0747279,
      longitude: -49.6401091,
    });

    await gymsRepository.create({
      title: "JavaScript Gym",
      description: null,
      phone: null,
      latitude: -27.0747279,
      longitude: -49.6401091,
    });

    await gymsRepository.create({
      title: "JavaScript Advanced Gym",
      description: null,
      phone: null,
      latitude: -27.0747279,
      longitude: -49.6401091,
    });

    const { gyms } = await sut.execute({
      query: "JavaScript",
      page: 1,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "JavaScript Gym" }),
      expect.objectContaining({ title: "JavaScript Advanced Gym" }),
    ]);
  });

  it("should be able to fetch paginate gyms seach ", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `JavaScript Gym ${i}`,
        description: null,
        phone: null,
        latitude: -27.0747279,
        longitude: -49.6401091,
      });
    }

    const { gyms } = await sut.execute({
      query: "JavaScrip",
      page: 2,
    });

    expect(gyms).toEqual([
      expect.objectContaining({ title: "JavaScript Gym 21" }),
      expect.objectContaining({ title: "JavaScript Gym 22" }),
    ]);
  });
});
