import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUsecase from "./list.product.usecase";

describe("List product unit test", () => {
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

  const product1 = ProductFactory.create(
    "a",
    "Product A",
    10.0
  );
  
  const product2 = ProductFactory.create(
    "b",
    "Product B",
    25.9
  );


  it("should list products", async () => {
    const productRepository = new ProductRepository();
    const listProductUsecase = new ListProductUsecase(productRepository);
    await productRepository.create(product1 as Product);
    await productRepository.create(product2 as Product);

    const inputListProduct = {};

    const output = await listProductUsecase.execute(inputListProduct);

    expect(output.products.length).toBe(2);
    expect(output.products[0].name).toEqual(product1.name);
    expect(output.products[0].price).toEqual(product1.price);
    expect(output.products[1].name).toEqual(product2.name);
    expect(output.products[1].price).toEqual(product2.price);
  });

});