import { FastifyReply, FastifyRequest } from "fastify";
import { makeSearchGymsUseCase } from "use-cases/factories/make-search-gyms-use-case";
import { z } from "zod";

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchGymsQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  });

  const { query, page } = searchGymsQuerySchema.parse(request.body);

  const createGymUseCase = makeSearchGymsUseCase();

  const { gyms } = await createGymUseCase.execute({
    query,
    page,
  });

  return reply.status(201).send({ gyms });
}
