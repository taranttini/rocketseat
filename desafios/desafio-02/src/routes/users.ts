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
      username: z.string(),
      password: z.string(),
    });

    const { username, password } = createUserBodySchema.parse(request.body);

    const user = await knex("users")
      .select("id", "username")
      .where({ username })
      .first();

    if (user) {
      return reply.status(400).send({ error: "user already exists" });
    }

    const sessionId = crypto.randomUUID();

    const seven_days = 1000 * 60 * 60 * 24 * 7;

    reply.cookie("sessionId", sessionId, {
      path: "/",
      maxAge: seven_days,
    });

    await knex("users").insert({
      id: crypto.randomUUID(),
      session_id: sessionId,
      username,
      password,
    });

    return reply.status(201).send();
  });

  app.post("/login", {}, async (request, reply) => {
    const createUserBodySchema = z.object({
      username: z.string(),
      password: z.string(),
    });

    const { username, password } = createUserBodySchema.parse(request.body);
    console.log("a", username, password);

    const sessionId = crypto.randomUUID();

    const seven_days = 1000 * 60 * 60 * 24 * 7;

    const user = await knex("users")
      .select("id", "username")
      .where({ username, password })
      .first();

    if (!user) {
      return reply.status(401).send({ error: "login fail" });
    }

    reply.cookie("sessionId", sessionId, {
      path: "/",
      maxAge: seven_days,
    });

    await knex("users").where({ id: user.id }).update({
      session_id: sessionId,
    });

    return { user };
  });

  app.get("/", { preHandler: [checkSessionIdExists] }, async (request) => {
    const sessionId = request.cookies.sessionId;

    const user = await knex("users")
      .select("id", "username")
      .where({ session_id: sessionId })
      .first();

    return { user };
  });
}
