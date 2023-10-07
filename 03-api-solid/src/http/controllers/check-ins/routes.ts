import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { create } from "./create";
import { history } from "./history";
import { metrics } from "./metricts";
import { validate } from "./validate";

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT); /* todas horas validarao o token */

  app.get("/check-ins/history", history);
  app.get("/check-ins/metrics", metrics);

  app.post("/gyms/:gymdId/check-ins", create);
  app.patch("/check-ins/:checkInId/validate", validate);
}
