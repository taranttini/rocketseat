import { InvalidCreditialsError } from "errors/invalid-credentials-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { makeAuthenticateUseCase } from "use-cases/factories/make-authenticate-use-case";
import { z } from "zod";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const authenticateUseCase = makeAuthenticateUseCase();

    const { user } = await authenticateUseCase.execute({ email, password });

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      },
    );

    return reply.status(200).send({
      token,
    });
  } catch (err) {
    if (err instanceof InvalidCreditialsError) {
      return reply.status(400).send({ message: err.message });
    }

    throw err;
  }
}
