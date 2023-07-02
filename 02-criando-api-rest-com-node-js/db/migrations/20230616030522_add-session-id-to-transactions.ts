import { Knex } from "knex";

const TB_TRANSACTIONS = "transactions";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable(TB_TRANSACTIONS, (table) => {
    table.uuid("session_id").after("id").index();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable(TB_TRANSACTIONS, (table) => {
    table.dropColumn("session_id");
  });
}
