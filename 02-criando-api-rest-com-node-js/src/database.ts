import { Knex, knex as db } from "knex";

export const config: Knex.Config = {
  client: "sqlite3",
  connection: {
    filename: "./db/app.sqlite",
  },
  useNullAsDefault: true,
  migrations: {
    extension: "ts",
    directory: "./db/migrations",
  },
};

export const knex = db(config);
