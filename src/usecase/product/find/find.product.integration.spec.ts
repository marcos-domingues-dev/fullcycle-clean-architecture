import { Sequelize } from "sequelize-typescript";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUsecase from "./find.product.usecase";

describe("Find product integration test", () => {
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

  it("should find product", async () => {
    const productRepository = new ProductRepository();
    const findProductUseCase = new FindProductUsecase(productRepository);

    const product = ProductFactory.create("a", "Product test abc", 12.55);
    await productRepository.create(product);

    const input = {
      id: product.id
    };

    const output = {
      name: product.name,
      price: product.price,
    };

    const result = await findProductUseCase.execute(input);

    expect(result).toEqual(output);
  });


  it("should not find product", async () => {
    const productRepository = new ProductRepository();
    const findProductUseCase = new FindProductUsecase(productRepository);

    const input = {
      id: "123"
    };

    expect(() => {
      return findProductUseCase.execute(input)
    }).rejects.toThrowError("Product not found")
  });

});