import { buildRoutePath } from "../utils/build-route-path.js";

export function newRouteTaskPatch(database) {
  return {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params;

      const updated_at = new Date().toISOString();
      let completed_at = updated_at;

      const [task] = database.select("tasks", { id });

      if (!task) {
        return res.writeHead(204).end();
      }

      if (task.completed_at != null) {
        completed_at = task.completed_at;
      }

      database.update("tasks", id, {
        ...task,
        updated_at,
        completed_at,
      });

      return res.writeHead(200).end();
    },
  };
}
