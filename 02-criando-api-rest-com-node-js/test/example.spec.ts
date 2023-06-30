import { app } from "../src/app";
import { execSync } from "node:child_process";
//import { beforeEach } from "node:test"; NAO_IMPORTAR_DO_NODE
import request from "supertest";
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  test,
} from "vitest";

describe("Transactions routes", () => {
  // antes de todos 1 vez
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    execSync("npm run knex -- migrate:rollback --all");
    execSync("npm run knex -- migrate:latest ");
  });

  it("should be able to create a new transaction", async () => {
    // fazer a chamada http e criar a transação
    const response = await request(app.server)
      .post("/transactions")
      .send({
        title: "new transaction",
        amount: 5002,
        type: "credit",
      })
      .expect(201);

    //console.log(response.get("Set-Cookie"));
  });

  it("should be able to list all transactions", async () => {
    // fazer a chamada http e criar a transação
    const createTransactionResponse = await request(app.server)
      .post("/transactions")
      .send({
        title: "new transaction",
        amount: 5001,
        type: "credit",
      });

    const cookies = createTransactionResponse.get("Set-Cookie");

    const listTransactionResponse = await request(app.server)
      .get("/transactions")
      .set("Cookie", cookies)
      .expect(200);

    expect(listTransactionResponse.body.transaction).toEqual([
      expect.objectContaining({
        title: "new transaction",
        amount: 5001,
      }),
    ]);

    // console.log(listTransactionResponse.body);
  });

  ///////////////////////////////////////////
  it("should be able to get a specific transactions", async () => {
    ///////////////////////////////////////////
    // fazer a chamada http e criar a transação
    const createTransactionResponse = await request(app.server)
      .post("/transactions")
      .send({
        title: "new transaction",
        amount: 5000,
        type: "credit",
      });

    const cookies = createTransactionResponse.get("Set-Cookie");

    const listTransactionsResponse = await request(app.server)
      .get("/transactions")
      .set("Cookie", cookies)
      .expect(200);

    const transactionId = listTransactionsResponse.body.transaction[0].id;

    const getTransactionResponse = await request(app.server)
      .get(`/transactions/${transactionId}`)
      .set("Cookie", cookies)
      .expect(200);

    //expect(1).toEqual(1);

    //console.log(getTransactionResponse.body.transaction);

    expect(getTransactionResponse.body.transaction).toEqual(
      expect.objectContaining({
        title: "new transaction",
        amount: 5000,
      }),
    );
  });

  it("should be able to get the summary", async () => {
    // fazer a chamada http e criar a transação
    const createTransactionResponse = await request(app.server)
      .post("/transactions")
      .send({
        title: "credit transaction",
        amount: 5000,
        type: "credit",
      });

    const cookies = createTransactionResponse.get("Set-Cookie");

    await request(app.server)
      .post("/transactions")
      .set("Cookie", cookies)
      .send({
        title: "debit transaction",
        amount: 2000,
        type: "debit",
      });

    const summaryResponse = await request(app.server)
      .get("/transactions/summary")
      .set("Cookie", cookies)
      .expect(200);

    expect(summaryResponse.body.summary).toEqual({
      amount: 3000,
    });
  });
});
