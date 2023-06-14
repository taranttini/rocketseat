import { buildRoutePath } from "../utils/build-route-path.js";

export function newRouteTaskPut(database) {
  return {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      const { title, description } = req.body;

      const updated_at = new Date().toISOString();

      const [task] = database.select("tasks", { id });

      if (!task) {
        return res.writeHead(204).end();
      }

      if (!title && !description) {
        return res
          .writeHead(400)
          .end(
            JSON.stringify({ message: "title or description are required" }),
          );
      }

      if (title && description) {
        database.update("tasks", id, {
          ...task,
          title,
          description,
          updated_at,
        });
      } else if (title) {
        database.update("tasks", id, { ...task, title, updated_at });
      } else if (description) {
        database.update("tasks", id, { ...task, description, updated_at });
      }

      return res.writeHead(200).end();
    },
  };
}
