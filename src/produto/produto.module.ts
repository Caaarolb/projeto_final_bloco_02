import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from '../produto/entities/produto.entity';
import { ProdutoService } from '../produto/services/produto.service';
import { ProdutoController } from '../produto/controllers/produto.controller';
import { Categoria } from '../categoria/entities/categoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Produto, Categoria])],
  controllers: [ProdutoController],
  providers: [ProdutoService],
})
export class ProdutoModule {}
