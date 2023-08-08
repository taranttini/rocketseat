import { Gym } from "@prisma/client";
import { IGymsRepository } from "repositories/gyms-repository";

interface ISearchGymUseCaseRequest {
  query: string;
  page: number;
}

interface ISearchGymUseCaseResponse {
  gyms: Gym[];
}

export class SearchGymsUseCase {
  constructor(private gymsRepository: IGymsRepository) {}

  async execute({
    query,
    page,
  }: ISearchGymUseCaseRequest): Promise<ISearchGymUseCaseResponse> {
    const gyms = await this.gymsRepository.serchMany(query, page);

    return { gyms };
  }
}
