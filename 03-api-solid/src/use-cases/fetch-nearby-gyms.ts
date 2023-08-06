import { Gym } from "@prisma/client";
import { IGymsRepository } from "repositories/gyms-repository";

interface IFetchNearbyGymUseCaseRequest {
  userLatitude: number;
  userLongitude: number;
}

interface IFetchNearbyGymUseCaseResponse {
  gyms: Gym[];
}

export class FetchNearbyGymUseCase {
  constructor(private gymsRepository: IGymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: IFetchNearbyGymUseCaseRequest): Promise<IFetchNearbyGymUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      userLatitude,
      userLongitude,
    });

    return { gyms };
  }
}
