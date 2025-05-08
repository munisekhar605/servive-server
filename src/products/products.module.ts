// src/products/product.module.ts
import { Module } from '@nestjs/common';
import { ProductService } from './products.service';
import { ProductController } from './product.controller';
import { ProductResolver } from './products.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schema/products.schema';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './entities/products.entities';
const isMongo = process.env.MONGODB === 'true';
@Module({
  imports: [
    isMongo
      ? MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])
      : TypeOrmModule.forFeature([ProductEntity]),
  ],
  providers: [
    ProductService,
    ...(process.env.GRAPHQL === 'true' ? [ProductResolver] : []),
  ],
  controllers: [ProductController],
})
export class ProductModule {}






