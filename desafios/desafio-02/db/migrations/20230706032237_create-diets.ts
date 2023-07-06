import { Knex } from "knex";

const TB_DIETS = "diets";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TB_DIETS, (table) => {
    table.uuid("id").primary();
    table.uuid("session_id").index();
    table.boolean("is_diet_valid").notNullable().defaultTo(false);
    table.text("description").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(TB_DIETS);
}
