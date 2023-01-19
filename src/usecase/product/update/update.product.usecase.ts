import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputUpdateProductDto, OutputUpdateProductDto } from "./update.product.dto";

export default class UpdateProductUsecase {
  productRepository: ProductRepositoryInterface;

  constructor(repository: ProductRepositoryInterface) {
    this.productRepository = repository;
  }

  async execute(input: InputUpdateProductDto): Promise<OutputUpdateProductDto> {
    const product = ProductFactory.create(
      input.type,
      input.name,
      input.price
    );

    await this.productRepository.update(product);

    return {
      type: input.type,
      name: product.name,
      price: product.price
    };
  }

}