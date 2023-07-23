import { hash } from "bcryptjs";
import { prisma } from "lib/prisma";

interface RegisterUseCaseRequest {
  username: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  // rome-ignore lint/suspicious/noExplicitAny: <explanation>
  constructor(private usersRepository: any) {}

  async execute({ username, email, password }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (userWithSameEmail) {
      throw new Error("E-mail already exists.");
    }

    await this.usersRepository.create({ username, email, password_hash });
  }
}
