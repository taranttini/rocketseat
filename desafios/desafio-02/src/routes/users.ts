import { knex } from "../database";
import { checkSessionIdExists } from "../middelwares/check-session-id-exists";
import { FastifyInstance } from "fastify";
import crypto from "node:crypto";
import { z } from "zod";

export async function userRoutes(app: FastifyInstance) {
  app.addHook("preHandler", async (request) => {
    console.log(`[${request.method}] ${request.url}`);
  });

  app.post("/", async (request, reply) => {
    const createUserBodySchema = z.object({
      name: z.string(),
    });

    const { name } = createUserBodySchema.parse(request.body);

    let sessionId = request.cookies.sessionId;

    if (!sessionId) {
      sessionId = crypto.randomUUID();

      const seven_days = 1000 * 60 * 60 * 24 * 7;

      reply.cookie("sessionId", sessionId, {
        path: "/",
        maxAge: seven_days,
      });
    }

    await knex("users").insert({
      id: crypto.randomUUID(),
      name,
    });

    return reply.status(201).send();
  });

  app.get("/", { preHandler: [checkSessionIdExists] }, async (request) => {
    const { sessionId } = request.cookies;

    const user = await knex("users").select();

    return { user };
  });

  app.get("/:id", { preHandler: [checkSessionIdExists] }, async (request) => {
    const sessionId = request.cookies.sessionId;

    const getUserParamsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = getUserParamsSchema.parse(request.params);

    const user = await knex("users").where({ id }).first();

    return { user };
  });
}
