import { app } from "./app";
//import { env } from "./env";

const port = parseInt(process.env.PORT || "3001"); // env.PORT
const host = "RENDER" in process.env ? "0.0.0.0" : "localhost";

app
  .listen({ host, port })
  .then(() => console.log(`http server running! ${port}`));
