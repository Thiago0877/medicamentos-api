// src/products/products.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  // Crear
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = this.productsRepository.create(createProductDto);
    return this.productsRepository.save(newProduct);
  }

  // Leer todos
  async findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  // Leer uno por ID
  async findOne(id: number): Promise<Product> {
    const product = await this.productsRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado.`);
    }
    return product;
  }

  // Actualizar
  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id); // Reutiliza findOne para verificar existencia
    
    // Aplica las actualizaciones parciales y guarda
    const updatedProduct = this.productsRepository.merge(product, updateProductDto);
    return this.productsRepository.save(updatedProduct);
  }

  // Eliminar
  async remove(id: number): Promise<void> {
    const result = await this.productsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado.`);
    }
  }
}