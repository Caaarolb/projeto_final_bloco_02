import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from '../categoria/entities/categoria.entity';
import { CategoriaService } from '../categoria/services/categoria.service';
import { CategoriaController } from '../categoria/controllers/categoria.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Categoria])],
  providers: [CategoriaService],
  controllers: [CategoriaController],
})
export class CategoriaModule {}