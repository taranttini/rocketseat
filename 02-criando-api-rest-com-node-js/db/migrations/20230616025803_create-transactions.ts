import { Knex } from "knex";

const TB_TRANSACTIONS = "transactions";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(TB_TRANSACTIONS, (table) => {
    table.uuid("id").primary();
    table.text("title").notNullable();
    table.decimal("amount", 10, 2).notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(TB_TRANSACTIONS);
}
