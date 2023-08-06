import { CheckIn } from "@prisma/client";
import { ICheckInsRepository } from "repositories/check-ins-repository";

interface IFetchUserCheckInsHistoryUseCaseRequest {
  userId: string;
  page: number;
}

interface IFetchUserCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[];
}

export class FetchUserCheckInsHistoryUseCase {
  constructor(private checkinsRepository: ICheckInsRepository) {}

  async execute({
    userId,
    page,
  }: IFetchUserCheckInsHistoryUseCaseRequest): Promise<IFetchUserCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkinsRepository.findManyByUserId(
      userId,
      page,
    );

    return { checkIns };
  }
}
