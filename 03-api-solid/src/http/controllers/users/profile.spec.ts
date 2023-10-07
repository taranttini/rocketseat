import { app } from "@/app";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it, test, vi } from "vitest";

describe("Profile (e2e)", () => {
  //const consoleMock = vi.spyOn(console, "log").mockImplementation(() => undefined);

  beforeAll(async () => await app.ready());
  afterAll(async () => await app.close());

  it("should be able to get user profile", async () => {
    await request(app.server).post("/users").send({
      username: "John Doe",
      email: "johndoe@example.com",
      password: "123456",
    });

    const authResponse = await request(app.server).post("/sessions").send({
      email: "johndoe@example.com",
      password: "123456",
    });

    const { token } = authResponse.body;

    const profileResponse = await request(app.server)
      .get("/me")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(profileResponse.statusCode).toEqual(200);
    expect(profileResponse.body).toEqual(
      expect.objectContaining({
        email: "johndoe@example.com",
      }),
    );
  });
});
