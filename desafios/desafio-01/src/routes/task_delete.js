import { buildRoutePath } from "../utils/build-route-path.js";

export function newRouteTaskDelete(database) {
  return {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;

      const [task] = database.select("tasks", { id });

      if (!task) {
        return res.writeHead(204).end();
      }

      database.delete("tasks", id);

      return res.writeHead(410).end();
    },
  };
}
