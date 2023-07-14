import { knex } from "../database";
import { checkSessionIdExists } from "../middelwares/check-session-id-exists";
import * as bcrypt from "bcrypt";
import { FastifyInstance } from "fastify";
import crypto from "node:crypto";
import { object, z } from "zod";

const Encrypt = {
  cryptPassword: (password: string) =>
    bcrypt
      .genSalt(10)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hash) => hash),

  comparePassword: (password: string, hashPassword: string) =>
    bcrypt.compare(password, hashPassword).then((resp) => resp),
};

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

    const encryptedPassword = await Encrypt.cryptPassword(password);

    await knex("users").insert({
      id: crypto.randomUUID(),
      session_id: sessionId,
      username,
      password: encryptedPassword,
    });

    return reply.status(201).send();
  });

  app.post("/login", {}, async (request, reply) => {
    const createUserBodySchema = z.object({
      username: z.string(),
      password: z.string(),
    });

    const { username, password } = createUserBodySchema.parse(request.body);

    const sessionId = crypto.randomUUID();

    const seven_days = 1000 * 60 * 60 * 24 * 7;

    const user = await knex("users")
      .select("id", "username", "password")
      .where({ username })
      .first();

    if (!user) {
      return reply.status(401).send({ error: "login fail" });
    }

    const valid = await Encrypt.comparePassword(password, user.password);

    if (!valid) {
      return reply.status(401).send({ error: "login fail" });
    }

    reply.cookie("sessionId", sessionId, {
      path: "/",
      maxAge: seven_days,
    });

    await knex("users").where({ id: user.id }).update({
      session_id: sessionId,
    });

    return { user: { id: user?.id, name: user?.username } };
  });

  app.get("/", { preHandler: [checkSessionIdExists] }, async (request) => {
    const sessionId = request.cookies.sessionId;

    const user = await knex("users")
      .select("id", "username")
      .where({ session_id: sessionId })
      .first();

    return { user };
  });

  app.get(
    "/summary",
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      const sessionId = request.cookies.sessionId;

      const user = await knex("users")
        .select("id")
        .where({ session_id: sessionId })
        .first();

      if (!user) {
        return reply
          .status(401)
          .send({ error: "user not found or not logged" });
      }

      const diets = await knex("diets")
        .select("is_diet_valid")
        .where({ user_id: user.id });

      const total_valid = await knex("diets")
        .count("is_diet_valid as total_valid")
        .where({ user_id: user.id, is_diet_valid: true });

      const total_not_valid = await knex("diets")
        .count("is_diet_valid", { as: "total_not_valid" })
        .where({ user_id: user.id, is_diet_valid: false });

      console.log(total_not_valid, total_valid);

      let actualSequence = 0;
      let bestSequence = 0;

      for (const diet of diets) {
        if (diet.is_diet_valid) {
          actualSequence++;
          continue;
        }

        if (actualSequence > bestSequence) {
          bestSequence = actualSequence;
        }
        actualSequence = 0;
      }

      //console.log(diets.map((q) => q.is_diet_valid));
      const totalDietsRegistered = diets.length;
      const totalDietsValid = diets.filter((q) => q.is_diet_valid).length;
      const totalDietsNotValid = diets.filter((q) => !q.is_diet_valid).length;
      //const totalDietsNotValid = totalDietsRegistered - totalDietsValid;

      const sumary = {
        totalDiets: totalDietsRegistered,
        totalDietsValid: totalDietsValid,
        totalDietsNotValid: totalDietsNotValid,
        bestSequence: bestSequence,
      };
      return { sumary };
    },
  );
}
