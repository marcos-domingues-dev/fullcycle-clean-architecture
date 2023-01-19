import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUsecase from "./create.product.usecase";

const input = {
  name: "Product A",
  price: 12.5
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Create product unit test", () => {

  it("should create a product", async () => {
    const productRepository = MockRepository();
    const createProductUsecase = new CreateProductUsecase(productRepository);

    const output = await createProductUsecase.execute(input);

    expect(output).toEqual({
      name: input.name,
      price: input.price,
    });
  });

  it("should thrown an error when name is missing", async () => {
    const productRepository = MockRepository();
    const createProductUsecase = new CreateProductUsecase(productRepository);

    input.name = "";

    await expect(createProductUsecase.execute(input)).rejects.toThrow(
      "Name is required"
    );
  });

  it("should thrown an error when price is missing", async () => {
    const productRepository = MockRepository();
    const createProductUsecase = new CreateProductUsecase(productRepository);

    input.name = "Product A";
    input.price = 0;

    await expect(createProductUsecase.execute(input)).rejects.toThrow(
      "Price must be greater than zero"
    );
  });

});