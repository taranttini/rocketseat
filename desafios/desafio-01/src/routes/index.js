import { Database } from "../utils/database.js";
import { newRouteTaskDelete } from "./task_delete.js";
import { newRouteTaskGet } from "./task_get.js";
import { newRouteTaskPatch } from "./task_patch.js";
import { newRouteTaskPost } from "./task_post.js";
import { newRouteTaskPut } from "./task_put.js";

const database = new Database();

export const routes = [
  newRouteTaskGet(database),
  newRouteTaskPost(database),
  newRouteTaskPut(database),
  newRouteTaskDelete(database),
  newRouteTaskPatch(database),
];
