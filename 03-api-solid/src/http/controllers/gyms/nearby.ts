import { FastifyReply, FastifyRequest } from "fastify";
import { makeFetchNearbyGymsUseCase } from "use-cases/factories/make-fetch-nearby-gyms-use-case";
import { makeSearchGymsUseCase } from "use-cases/factories/make-search-gyms-use-case";
import { z } from "zod";

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const nerabyGymsQuerySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90;
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180;
    }),
  });

  const { latitude, longitude } = nerabyGymsQuerySchema.parse(request.body);

  const fetchNearbyGymsUseCase = makeFetchNearbyGymsUseCase();

  const { gyms } = await fetchNearbyGymsUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return reply.status(201).send({ gyms });
}
