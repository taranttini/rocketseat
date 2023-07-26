import { CheckIn } from "@prisma/client";
import { ICheckInsRepository } from "repositories/check-ins-repository";

interface ICheckInUseCaseRequest {
  userId: string;
  gymId: string;
}

interface ICheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class CheckInUseCase {
  constructor(private checkinsRepository: ICheckInsRepository) {}

  async execute({
    userId,
    gymId,
  }: ICheckInUseCaseRequest): Promise<ICheckInUseCaseResponse> {
    const checkIn = await this.checkinsRepository.create({
      user_id: userId,
      gym_id: gymId,
    });

    return { checkIn };
  }
}
