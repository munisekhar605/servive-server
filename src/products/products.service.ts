// src/products/product.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schema/products.schema'; // For MongoDB
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/products.entities'; // For MySQL

@Injectable()
export class ProductService {
  constructor(
    // For MongoDB
    @InjectModel(Product.name) private productModel: Model<Product>,
    // For MySQL
    @InjectRepository(ProductEntity) private productRepository: Repository<ProductEntity>,
  ) {}

  // Find all products (MongoDB or MySQL)
  async getAllProducts(): Promise<any[]> {
    if (process.env.MONGODB === 'true') {
      return this.productModel.find().exec();
    }
    return this.productRepository.find(); 
  }
  

  // Create product (MongoDB or MySQL)
  async getProductById(createProductDto: any): Promise<any> {
    if (process.env.MONGODB === 'true') {
      const createdProduct = new this.productModel(createProductDto);
      return createdProduct.save();
    }
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }
  
}






