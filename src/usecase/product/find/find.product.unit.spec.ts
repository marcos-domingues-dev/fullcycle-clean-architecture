import Product from "../../../domain/product/entity/product";
import FindProductUsecase from "./find.product.usecase";

describe("Find product unit test", () => {  
 
  const product = new Product("213", "Product Usecase 1", 14.9);

  const MockRepository = () => {
    return {
      find: jest.fn().mockReturnValue(Promise.resolve(product)),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    };
  };


  it("should find product", async () => {
    const productRepository = MockRepository();
    const findProductUseCase = new FindProductUsecase(productRepository);

    const input = {
      id: "123"
    };

    const output = {
      name: product.name,
      price: product.price,
    };

    const result = await findProductUseCase.execute(input);    

    expect(result).toEqual(output);
  });


  it("should not find product", async () => {
    const productRepository = MockRepository();
    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found");
    });

    const findProductUseCase = new FindProductUsecase(productRepository);

    const input = {
      id: "123"
    };

    expect(() => {
      return findProductUseCase.execute(input)
    }).rejects.toThrowError("Product not found")
  });

});