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

  it("should list all products", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        type: "a",
        name: "Product A",
        price: 10.5,
      });

    expect(response.status).toBe(200);
    const response2 = await request(app)
      .post("/product")
      .send({
        type: "b",
        name: "Product B",
        price: 21.9,
      });

    expect(response2.status).toBe(200);

    const listResponse = await request(app)
      .get("/product")
      .send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(2);
    const p1 = listResponse.body.products[0];
    expect(p1.name).toEqual("Product A");
    expect(p1.price).toEqual(10.5);
    const p2 = listResponse.body.products[1];
    expect(p2.name).toEqual("Product B");
    expect(p2.price).toEqual(43.8); // Price x 2
  });

});