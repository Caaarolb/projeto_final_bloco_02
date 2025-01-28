import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaModule } from './categoria/categoria.module';
import { ProdutoModule } from './produto/produto.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '95001858',
      database: 'db_farmacia',
      autoLoadEntities: true,
      synchronize: true,
    }),
    CategoriaModule,
    ProdutoModule
  ],
})
export class AppModule {}
