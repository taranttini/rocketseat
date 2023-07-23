import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "errors/user-already-exists-error";
import { IUsersRepository } from "repositories/users-repository";

interface IRegisterUseCaseRequest {
  username: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ username, email, password }: IRegisterUseCaseRequest) {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    await this.usersRepository.create({ username, email, password_hash });
  }
}
