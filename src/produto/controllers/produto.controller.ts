import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ProdutoService } from '../services/produto.service';
import { Produto } from '../entities/produto.entity';

@Controller('produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Get()
  async findAll(): Promise<Produto[]> {
    return this.produtoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Produto> {
    return this.produtoService.findOne(id);
  }

  @Post()
  async create(@Body() produtoData: { nome: string; preco: number; quantidade: number; categoriaId: number }): Promise<Produto> {
    return this.produtoService.create(produtoData);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() produtoData: { nome: string; preco: number; quantidade: number; categoriaId: number }): Promise<Produto> {
    return this.produtoService.update(id, produtoData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.produtoService.delete(id);
  }
}
