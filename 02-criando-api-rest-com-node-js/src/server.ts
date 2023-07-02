import { app } from "./app";
import { env } from "./env";

app.get("/ready", async (request, reply) => {
  reply.send("ok");
});

app.listen({ port: env.PORT }).then(() => console.log("http server running!"));
