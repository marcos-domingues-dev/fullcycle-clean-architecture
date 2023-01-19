import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUsecase from "./update.product.usecase";

describe("Update product unit test", () => {

  const product = ProductFactory.create("a", "Product A", 10.55);

  const input = {
    type: "a",
    name: "Product A Updated",
    price: 12.80
  }

  const MockRepository = () => {
    return {
      create: jest.fn(),
      findAll: jest.fn(),
      find: jest.fn().mockReturnValue(Promise.resolve(product)),
      update: jest.fn(),
    };
  };

  it("should update product", async () => {
    const repository = MockRepository();
    const usecase = new UpdateProductUsecase(repository);
    
    const output = await usecase.execute(input);

    expect(output).toEqual(input);
  });

});