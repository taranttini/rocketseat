// definição de tipos
import { Knex } from "knex";

declare module "knex/types/tables" {
  interface Tables {
    transactions: {
      id: string;
      amount: number;
      title: string;
      created_at: string;
      session_id?: string;
    };
  }
}
