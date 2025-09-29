// src/products/products.controller.ts

import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpCode, HttpStatus } from '@nestjs/common';
// Importa el servicio y los DTOs
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './product.entity'; // Importa la entidad para tipado

@Controller('products') // Define la ruta base para todos los métodos: /products
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // POST /products
  @Post()
  @HttpCode(HttpStatus.CREATED) // Opcional: Especifica el código de estado 201 (Created)
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    // El 'CreateProductDto' valida automáticamente el body de la petición
    return this.productsService.create(createProductDto);
  }

  // GET /products
  @Get()
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  // GET /products/:id
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    // ParseIntPipe asegura que 'id' sea un número entero
    return this.productsService.findOne(id);
  }

  // PATCH /products/:id
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    // El 'UpdateProductDto' valida automáticamente el body de la petición
    return this.productsService.update(id, updateProductDto);
  }

  // DELETE /products/:id
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // Especifica el código de estado 204 (No Content) para una eliminación exitosa
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.productsService.remove(id);
  }
}