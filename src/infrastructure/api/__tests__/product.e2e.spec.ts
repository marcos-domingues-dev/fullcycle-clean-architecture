import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for Product", () => {

  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        type: "a",
        name: "Product A",
        price: 10.0,
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Product A");
    expect(response.body.price).toEqual(10.0);
  });

  it("should not create a Product", async () => {
    const response = await request(app)
      .post("/product")
      .send({ name: "ABC" });

    expect(response.status).toBe(500);
  });

});