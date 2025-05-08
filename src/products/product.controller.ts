import {Controller, Get ,Post, Body, Param } from '@nestjs/common';
import { ProductService } from './products.service';

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) {
        this.productService = productService;
    }

    @Get()
    getAllProducts() {
        return this.productService.getAllProducts();
    }

    @Get(':id')
    getProductById(@Param('id') id: string) {
        return this.productService.getProductById(id);
    }
}
