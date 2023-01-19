export interface InputListProductDto {};

type ProductDto = {
  name: string;
  price: number;
}

export interface OutputListProductDto {
  products: ProductDto[];
};