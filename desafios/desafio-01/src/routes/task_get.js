import { buildRoutePath } from "../utils/build-route-path.js";

export function newRouteTaskGet(database) {
  return {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { search } = req.query;

      const users = database.select("tasks", search ? { title: search } : null);

      return res.writeHead(200).end(JSON.stringify(users));
    },
  };
}
