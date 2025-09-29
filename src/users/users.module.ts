// src/users/users.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './user.entity'; // Asegúrate de que la entidad esté importada

@Module({
  imports: [
    // ✔️ Usa forFeature para registrar la entidad específica del módulo
    TypeOrmModule.forFeature([User]), 
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}