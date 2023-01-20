import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUsecase from "./create.product.usecase";

const input = {
  type: "a",
  name: "Product ABC",
  price: 12.5
}

describe("Create product integration test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const createProductUsecase = new CreateProductUsecase(productRepository);

    const output = await createProductUsecase.execute(input);

    expect(output.name).toEqual(input.name);
    expect(output.price).toEqual(input.price);
  });

  it("should thrown an error when name is missing", async () => {
    const productRepository = new ProductRepository();
    const createProductUsecase = new CreateProductUsecase(productRepository);

    input.name = "";

    await expect(createProductUsecase.execute(input)).rejects.toThrow(
      "Name is required"
    );
  });

  it("should thrown an error when price is missing", async () => {
    const productRepository = new ProductRepository();
    const createProductUsecase = new CreateProductUsecase(productRepository);

    input.name = "Product ABC";
    input.price = 0;

    await expect(createProductUsecase.execute(input)).rejects.toThrow(
      "Price must be greater than zero"
    );
  });

});