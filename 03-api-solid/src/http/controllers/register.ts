import { FastifyReply, FastifyRequest } from "fastify";
import { InMemoryUsersRepository } from "repository/in-memory-users.repository";
import { PrismaUsersRepository } from "repository/prisma-users.repository";
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
    //const usersRepository = new PrismaUsersRepository();
    const usersRepository = new InMemoryUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    await registerUseCase.execute({ username, email, password });
  } catch (err) {
    return reply.status(409).send();
  }

  return reply.status(201).send();
}
