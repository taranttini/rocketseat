import { app } from "./app";
import { env } from "./env";

app.get("/healthz", async (request, reply) => {
  reply.send("ok");
});

app.listen({ port: env.PORT }).then(() => console.log("http server running!"));
