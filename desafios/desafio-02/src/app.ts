import { dietRoutes } from "./routes/diets";
import { userRoutes } from "./routes/users";
import cookie from "@fastify/cookie";
import fastify from "fastify";

export const app = fastify();

app.register(cookie);

app.get("/", async (_request, reply) => {
  reply.status(200).send({ status: "ok" });
});

app.register(userRoutes, {
  prefix: "users",
});

app.register(dietRoutes, {
  prefix: "diets",
});
