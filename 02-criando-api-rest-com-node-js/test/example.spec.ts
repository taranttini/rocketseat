import { app } from "../src/app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it, test } from "vitest";

describe("Transactions routes", () => {
  // antes de todos 1 vez
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
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

    console.log(response.get("Set-Cookie"));
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

    console.log(listTransactionResponse.body);
  });
});
