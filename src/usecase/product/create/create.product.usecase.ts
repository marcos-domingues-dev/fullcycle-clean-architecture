import Product from "../../../domain/product/entity/product";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto";

export default class CreateProductUsecase {
  private productRepository: ProductRepositoryInterface;

  constructor (repository: ProductRepositoryInterface) {
    this.productRepository = repository;
  }

  async execute(inputCreateProductDto: InputCreateProductDto): Promise<OutputCreateProductDto> {
    const product = ProductFactory.create("a",
      inputCreateProductDto.name,
      inputCreateProductDto.price);

    await this.productRepository.create(product as Product);

    return {
      name: product.name,
      price: product.price
    }
  }

}