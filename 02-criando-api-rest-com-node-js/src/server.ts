import { app } from "./app";
import { env } from "./env";

const port = env.PORT; //parseInt(process.env.PORT || "3001"); // env.PORT
// render port 0.0.0.0
const host = "RENDER" in process.env ? "0.0.0.0" : "localhost";

app
  .listen({ host, port })
  .then(() => console.log(`http server running! ${port}`));
