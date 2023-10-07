import { FastifyReply, FastifyRequest } from "fastify";
import { makeFecthUserCheckInsHistoryUseCase } from "use-cases/factories/make-fetch-user-check-ins-history-use-case";
import { z } from "zod";

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInHistorySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = checkInHistorySchema.parse(request.query);

  const fecthUserCheckInsHistoryUseCase = makeFecthUserCheckInsHistoryUseCase();

  const { checkIns } = await fecthUserCheckInsHistoryUseCase.execute({
    userId: request.user.sub,
    page,
  });

  return reply.status(200).send({ checkIns });
}
