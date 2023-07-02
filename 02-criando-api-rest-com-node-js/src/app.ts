import { transactionRoutes } from "./routes/transactions";
import cookie from "@fastify/cookie";
import fastify from "fastify";

export const app = fastify();

app.register(cookie);

app.get("/healthz", async (request, reply) => {
  reply.status(200).send({ status: "ok" });
});

app.get("/", async (request, reply) => {
  reply.status(200).send({ status: "ok" });
});

/*
app.register(transactionRoutes, {
  prefix: "transactions",
});
*/
