import { Database } from "./database.js";
import { randomUUID } from "node:crypto";
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/users"),
    handler: (req, res) => {
      const { search } = req.query;

      const users = database.select(
        "users",
        search
          ? {
              name: search,
              email: search,
            }
          : null,
      );

      return res.end(JSON.stringify(users));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/users"),
    handler: (req, res) => {
      const { name, email } = req.body;

      const newUser = {
        id: randomUUID(),
        name,
        email,
      };

      database.insert("users", newUser);

      return res.writeHead(201).end();
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/users/:id"),
    handler: (req, res) => {
      const { id } = req.params;
      const { name, email } = req.body;

      database.update("users", id, { name, email });

      return res.writeHead(204).end();
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/users/:id"),
    handler: (req, res) => {
      const { id } = req.params;

      database.delete("users", id);

      return res.writeHead(204).end();
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/login"),
    handler: (req, res) => {
      return res.writeHead(201).end(JSON.stringify({ token: "testexpto" }));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/product"),
    handler: (req, res) => {
      return res.writeHead(201).end(
        JSON.stringify({
          header: req.headers,
          bdoy: { nome: "sim", username: "Bearer testexpto" },
        }),
      );
    },
  },
];

/*
if (method === "POST" && url === "/login") {
        return res.writeHead(201).end(JSON.stringify({ token: "testexpto" }));
    }
    if (method === "POST" && url === "/product") {
        return res.writeHead(201).end(
            JSON.stringify({
                header: req.headers,
                bdoy: { nome: "sim", username: "Bearer testexpto" },
            }),
        );
    }
*/
