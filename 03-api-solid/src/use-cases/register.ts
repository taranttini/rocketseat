import { hash } from "bcryptjs";
import { prisma } from "lib/prisma";
import { PrismaUsersRepository } from "repository/prisma-users.repository";

interface RegisterUseCaseRequest {
  username: string;
  email: string;
  password: string;
}

export async function registerUseCase({
  username,
  email,
  password,
}: RegisterUseCaseRequest) {
  const password_hash = await hash(password, 6);

  const userWithSameEmail = await prisma.user.findUnique({
    where: { email },
  });

  if (userWithSameEmail) {
    throw new Error("E-mail already exists.");
  }

  const prismaUsersRepository = new PrismaUsersRepository();

  await prismaUsersRepository.create({ username, email, password_hash });
}
