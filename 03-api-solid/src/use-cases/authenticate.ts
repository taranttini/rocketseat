import { User } from "@prisma/client";
import { compare } from "bcryptjs";
import { InvalidCreditialsError } from "errors/invalid-credentials-error";
import { IUsersRepository } from "repositories/users-repository";

interface IAuthenticateUseCaseRequest {
  email: string;
  password: string;
}

interface IAuthenticateUseCaseResponse {
  user: User;
}

export class AuthenticateUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    email,
    password,
  }: IAuthenticateUseCaseRequest): Promise<IAuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCreditialsError();
    }

    const doesPasswordMatches = await compare(password, user.password_hash);

    if (!doesPasswordMatches) {
      throw new InvalidCreditialsError();
    }

    return { user };
  }
}
