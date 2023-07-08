import { knex } from "../database";
import { checkSessionIdExists } from "../middelwares/check-session-id-exists";
import { FastifyInstance } from "fastify";
import crypto from "node:crypto";
import { z } from "zod";

async function getUser(sessionId: string) {
  return await knex("users")
    .select("id")
    .where({ session_id: sessionId })
    .first();
}

export async function dietRoutes(app: FastifyInstance) {
  app.addHook("preHandler", async (request) => {
    console.log(`[${request.method}] ${request.url}`);
  });

  app.post(
    "/",
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      const createDietBodySchema = z.object({
        description: z.string(),
        isDietValid: z.boolean(),
      });

      const { description, isDietValid } = createDietBodySchema.parse(
        request.body,
      );

      const sessionId = request.cookies.sessionId;

      // if (!sessionId) {
      //   return reply.status(401).send({ error: "need user logged" });
      // }

      const user = await knex("users")
        .select("id")
        .where({ session_id: sessionId })
        .first();

      if (!user) {
        return reply
          .status(401)
          .send({ error: "user not found or not logged" });
      }

      await knex("diets").insert({
        id: crypto.randomUUID(),
        description,
        is_diet_valid: isDietValid,
        user_id: user.id,
      });

      return reply.status(201).send();
    },
  );

  app.get(
    "/",
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const { sessionId } = request.cookies;

      const user = await knex("users")
        .select("id")
        .where({ session_id: sessionId })
        .first();

      if (!user) {
        return reply
          .status(401)
          .send({ error: "user not found or not logged" });
      }

      const diets = await knex("diets").select().where({ user_id: user.id });

      return { diets };
    },
  );

  app.get(
    "/:id",
    {
      preHandler: [checkSessionIdExists],
    },
    async (request, reply) => {
      const sessionId = request.cookies.sessionId;

      const getUserParamsSchema = z.object({
        id: z.string().uuid(),
      });

      const { id } = getUserParamsSchema.parse(request.params);

      const user = await knex("users").where({ session_id: sessionId }).first();

      if (!user) {
        return reply
          .status(401)
          .send({ error: "user not found or not logged" });
      }

      const diet = await knex("diets").where({ id, user_id: user.id }).first();

      return { diet };
    },
  );

  app.put(
    "/:id",
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      const createDietBodySchema = z.object({
        description: z.string(),
        isDietValid: z.boolean(),
      });

      const { description, isDietValid } = createDietBodySchema.parse(
        request.body,
      );

      const getDietParamsSchema = z.object({
        id: z.string().uuid(),
      });

      const { id } = getDietParamsSchema.parse(request.params);

      const sessionId = request.cookies.sessionId;

      // if (!sessionId) {
      //   return reply.status(401).send({ error: "need user logged" });
      // }

      const user = await knex("users")
        .select("id")
        .where({ session_id: sessionId })
        .first();

      if (!user) {
        return reply
          .status(401)
          .send({ error: "user not found or not logged" });
      }

      const diet = await knex("diets").where({ id, user_id: user.id }).first();

      if (!diet) {
        return reply.status(204).send();
      }

      await knex("diets")
        .where({
          id: diet.id,
        })
        .update({
          description,
          is_diet_valid: isDietValid,
          updated_at: knex.fn.now(),
        });

      return reply.status(200).send({});
    },
  );

  app.delete(
    "/:id",
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      const getDietParamsSchema = z.object({
        id: z.string().uuid(),
      });

      const { id } = getDietParamsSchema.parse(request.params);

      const sessionId = request.cookies.sessionId;

      // if (!sessionId) {
      //   return reply.status(401).send({ error: "need user logged" });
      // }

      const user = await knex("users")
        .select("id")
        .where({ session_id: sessionId })
        .first();

      if (!user) {
        return reply
          .status(401)
          .send({ error: "user not found or not logged" });
      }

      const diet = await knex("diets").where({ id, user_id: user.id }).first();

      if (!diet) {
        return reply.status(204).send();
      }

      await knex("diets")
        .where({
          id: diet.id,
        })
        .del();

      return reply.status(200).send();
    },
  );
}
