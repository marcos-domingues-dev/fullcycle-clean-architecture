import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUsecase from "./list.product.usecase";

describe("List product unit test", () => {
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
  
  const MockRepository = () => {
    return {
      create: jest.fn(),
      find: jest.fn(),
      update: jest.fn(),
      findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
    };
  };

  it("should list products", async () => {
    const productRepository = MockRepository();
    const listProductUsecase = new ListProductUsecase(productRepository);

    const inputListProduct = {};

    const output = await listProductUsecase.execute(inputListProduct);

    expect(output.products.length).toBe(2);
    expect(output.products[0].name).toEqual(product1.name);
    expect(output.products[0].price).toEqual(product1.price);
    expect(output.products[1].name).toEqual(product2.name);
    expect(output.products[1].price).toEqual(product2.price);
  });

});