import { PrismaGymsRepository } from "repositories/prisma/prisma-gyms-repository";
import { FetchNearbyGymUseCase } from "use-cases/fetch-nearby-gyms";

export function makeFetchNearbyGymUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new FetchNearbyGymUseCase(gymsRepository);

  return useCase;
}
