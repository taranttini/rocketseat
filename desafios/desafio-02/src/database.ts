import { env } from "./env";
import { Knex, knex as db } from "knex";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL env not found.");
}

const dbConnection =
  env.DATABASE_CLIENT === "sqlite"
    ? {
        filename: env.DATABASE_URL,
      }
    : env.DATABASE_URL;

export const config: Knex.Config = {
  client: env.DATABASE_CLIENT,
  connection: dbConnection,
  useNullAsDefault: true,
  migrations: {
    extension: "ts",
    directory: "./db/migrations",
  },
};

export const knex = db(config);
