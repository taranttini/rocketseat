import { PrismaGymsRepository } from "repositories/prisma/prisma-gyms-repository";
import { SearchGymsUseCase } from "use-cases/search-gyms";

export function makeSearchGymsInUseCase() {
  const gymsRepository = new PrismaGymsRepository();
  const useCase = new SearchGymsUseCase(gymsRepository);

  return useCase;
}
