import { Knex } from "knex";

const TB_USERS = "users";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TB_USERS, (table) => {
    table.uuid("id").primary();
    table.text("username").notNullable().unique();
    table.text("password").notNullable();
    table.uuid("session_id").index();
    table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(TB_USERS);
}
