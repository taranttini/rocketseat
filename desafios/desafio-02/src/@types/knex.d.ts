// definição de tipos
import { Knex } from "knex";

declare module "knex/types/tables" {
  interface Tables {
    users: {
      id: string;
      name: string;
      created_at: string;
    };
    diets: {
      id: string;
      description: string;
      is_diet_valid: boolean;
      created_at: string;
      session_id?: string;
    };
  }
}
