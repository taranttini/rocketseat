import { prisma } from "../lib/prisma";
import { hash } from "bcryptjs";

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
    where: {
      email,
    },
  });

  if (userWithSameEmail) {
    throw new Error("User already exists");
    //return reply.status(409).send();
  }

  await prisma.user.create({
    data: {
      username,
      email,
      password_hash,
    },
  });
}
