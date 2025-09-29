// src/users/users.service.ts (Completo y Corregido)

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './user.entity'; // Asegúrate de que User exista
import { CreateUserDto } from './dto/create-user.dto'; // Asegúrate de que el DTO exista

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  /**
   * Método requerido por AuthService para el LOGIN
   */
  async findOneByEmail(email: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where: { email } });
    return user === null ? undefined : user;
  }

  /**
   * ✅ MÉTODO CORREGIDO/AÑADIDO: findOneById
   * Este es el método que OrdersService estaba buscando.
   */
  async findOneById(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      // Usamos NotFoundException, asumiendo que está importado en este archivo.
      throw new NotFoundException(`Usuario con ID "${id}" no encontrado`);
    }
    return user;
  }

  /**
   * Método requerido por AuthService para el REGISTRO
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    
    const newUser = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return this.usersRepository.save(newUser);
  }
}