import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductService } from './products.service';
import { Product } from './schema/products.schema'; // MongoDB schema
import { CreateProductDto } from './dto/create-product.dto';
import { ProductEntity } from './entities/products.entities'; // MySQL entity

@Resolver('Product')
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => [Product]) // This returns a list of products
  async getProducts() {
    return this.productService.getAllProducts();
  }

  @Mutation(() => Product) // This creates a new product
  async createProduct(@Args('createProductInput') createProductDto: CreateProductDto) {
    return this.productService.getProductById(createProductDto);
  }
}
  