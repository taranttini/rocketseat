import { knex } from "./database";
import fastify from "fastify";
import crypto from "node:crypto";

const app = fastify();

app.get("/hello", async () => {
  await knex("transactions").insert({
    id: crypto.randomUUID(),
    title: "Transação 1",
    amount: 1000,
  });

  const transaction = await knex("transactions")
    .where("amount", 1000)
    .select("*");

  return transaction;
});

app.listen({ port: 3333 }).then(() => console.log("http server running!"));
