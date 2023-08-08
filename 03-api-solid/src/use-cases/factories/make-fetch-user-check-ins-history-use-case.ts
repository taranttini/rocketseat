import { PrismaCheckInsRepository } from "repositories/prisma/prisma-check-ins-repository";
import { FetchUserCheckInsHistoryUseCase } from "use-cases/fetch-user-check-ins-history";

export function makeFecthUserCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();
  const useCase = new FetchUserCheckInsHistoryUseCase(checkInsRepository);

  return useCase;
}
