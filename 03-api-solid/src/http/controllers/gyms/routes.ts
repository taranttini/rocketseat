import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { create } from "./create";
import { nearby } from "./nearby";
import { search } from "./search";

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT); /* todas horas validarao o token */

  app.get("/gyms/search", search);
  app.get("/gyms/nearby", nearby);

  app.post("/gyms", create);
}
