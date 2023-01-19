import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUsecase from "./update.product.usecase";

describe("Update product unit test", () => {
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

  const product = ProductFactory.create("a", "Product A", 10.55);

  const input = {
    type: "a",
    name: "Product A Updated",
    price: 12.80
  }

  it("should update product", async () => {
    const repository = new ProductRepository();
    const usecase = new UpdateProductUsecase(repository);
    await repository.create(product);
    
    const output = await usecase.execute(input);

    expect(output).toEqual(input);
  });

});