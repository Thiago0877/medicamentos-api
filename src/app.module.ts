// src/app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config'; // Necesario para variables de entorno

import { UsersModule } from './users/users.module';
// import { AuthModule } from './auth/auth.module'; // Descomenta cuando esté listo
// import { ProductsModule } from './products/products.module'; // Descomenta cuando esté listo

@Module({
  imports: [
    // 1. Configurar ConfigModule para usar variables de entorno (ej: .env)
    ConfigModule.forRoot({
      isGlobal: true, // Hace que las variables estén disponibles en toda la app
    }),

    // 2. CONFIGURACIÓN PRINCIPAL DE LA BASE DE DATOS (Soluciona el error)
    TypeOrmModule.forRoot({
      // ⚠️ ADVERTENCIA: Rellena estas opciones con los datos reales de tu DB
      type: 'postgres', // Usar el tipo de tu base de datos (mysql, postgres, sqlite, etc.)
      host: 'localhost', 
      port: 5432, 
      username: 'tu_usuario_db', 
      password: 'tu_contraseña_db', 
      database: 'medicamentos_api',
      
      // Busca automáticamente las clases con el decorador @Entity
      autoLoadEntities: true, 
      // Sincroniza el esquema automáticamente (¡Usar solo en desarrollo!)
      synchronize: true, 
      // Desactiva si usas migraciones: logging: true, 
    }),

    // 3. Importar los módulos de tu aplicación
    UsersModule,
    // AuthModule, 
    // ProductsModule,
    // OrdersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}