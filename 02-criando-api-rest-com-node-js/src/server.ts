import { app } from "./app";
//import { env } from "./env";

const port = process.env.PORT || 3001; // env.PORT

app.listen({ port }).then(() => console.log(`http server running! ${port}`));
