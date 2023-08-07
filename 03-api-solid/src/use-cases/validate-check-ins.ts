import { CheckIn } from "@prisma/client";
import { ResourceNotFoundError } from "errors/resourcer-not-found-error";
import { ICheckInsRepository } from "repositories/check-ins-repository";

interface IValidateCheckInUseCaseRequest {
  checkInId: string;
}

interface IValidateCheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class ValidateCheckInUseCase {
  constructor(private checkinsRepository: ICheckInsRepository) {}

  async execute({
    checkInId,
  }: IValidateCheckInUseCaseRequest): Promise<IValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkinsRepository.findById(checkInId);

    if (!checkIn) {
      throw new ResourceNotFoundError();
    }

    checkIn.validated_at = new Date();

    await this.checkinsRepository.save(checkIn);

    return { checkIn };
  }
}
