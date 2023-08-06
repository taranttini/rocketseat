import { FetchUserCheckInsHistoryUseCase } from "./fetch-user-check-ins-history";
import { GetUserMetricsUseCase } from "./get-user-metrics";
import { describe } from "node:test";
import { InMemoryCheckInsRepository } from "repositories/in-memory/in-memory-check-ins-repository";
import { beforeEach, expect, it } from "vitest";

let checkInsRepository: InMemoryCheckInsRepository;
let sut: GetUserMetricsUseCase;

describe("Get User Metrics Use Case", () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository();
    sut = new GetUserMetricsUseCase(checkInsRepository);
  });

  it("should be able to get check-ins count from metrics", async () => {
    checkInsRepository.create({
      user_id: "user-01",
      gym_id: "gym-01",
    });

    checkInsRepository.create({
      user_id: "user-02",
      gym_id: "gym-01",
    });

    checkInsRepository.create({
      user_id: "user-01",
      gym_id: "gym-02",
    });

    const { checkInsCount } = await sut.execute({
      userId: "user-01",
    });

    expect(checkInsCount).toEqual(2);
  });
});
