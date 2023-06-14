import { buildRoutePath } from "../utils/build-route-path.js";
import { randomUUID } from "node:crypto";

export function newRouteTaskPost(database) {
  return {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { title, description } = req.body;

      if (!title) {
        return res
          .writeHead(400)
          .end(JSON.stringify({ message: "title is required" }));
      }

      if (!description) {
        return res
          .writeHead(400)
          .end(JSON.stringify({ message: "description is required" }));
      }

      const now = new Date().toISOString();

      const newTask = {
        id: randomUUID(),
        title,
        description,
        created_at: now,
        updated_at: now,
        completed_at: null,
      };

      database.insert("tasks", newTask);

      return res.writeHead(201).end();
    },
  };
}
