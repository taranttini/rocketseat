// definição de tipos
import { Knex } from "knex";

declare module "knex/types/tables" {
  interface Tables {
    users: {
      id: string;
      username: string;
      password: string;
      session_id: string;
      created_at: string;
    };
    diets: {
      id: string;
      description: string;
      is_diet_valid: boolean;
      created_at: string;
      updated_at: string;
      user_id: string;
    };
  }
}
