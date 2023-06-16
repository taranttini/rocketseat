import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";
import { extracQueryParams } from "./utils/extrac-query-params.js";
import http from "node:http";

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  const route = routes.find((route) => {
    return route.method === method && route.path.test(url);
  });

  if (route) {
    const routeParams = req.url.match(route.path);

    const { query, ...params } = routeParams.groups;

    req.params = params;
    req.query = query ? extracQueryParams(query) : {};

    return route.handler(req, res);
  }

  return res.writeHead(404).end("NOT FOUND");
});

server.listen(3333);

// node --watch src/server.js
