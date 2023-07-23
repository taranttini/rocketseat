import { UserAlreadyExistsError } from "errors/user-already-exists-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { InMemoryUsersRepository } from "repositories/in-memory/in-memory-users-repository";
import { PrismaUsersRepository } from "repositories/prisma/prisma-users-repository";
import { RegisterUseCase } from "use-cases/register";
import { z } from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { username, email, password } = registerBodySchema.parse(request.body);

  try {
    const usersRepository = new PrismaUsersRepository();
    //const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    await registerUseCase.execute({ username, email, password });
  } catch (err) {
    if (err instanceof UserAlreadyExistsError)
      return reply.status(409).send({ message: err.message });

    //return reply.status(500).send(); // TODO: fix me
    throw err;
  }

  return reply.status(201).send();
}
