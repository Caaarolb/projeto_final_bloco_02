import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Produto } from '../entities/produto.entity';
import { Categoria } from '../../categoria/entities/categoria.entity';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,

    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
  ) {}

  async findAll(): Promise<Produto[]> {
   
    return this.produtoRepository.find({ relations: ['categoria'] });
  }

  async findOne(id: number): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({ where: { id }, relations: ['categoria'] });
    if (!produto) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado`);
    }
    return produto;
  }

  async create(produtoData: { nome: string; preco: number; quantidade: number; categoriaId: number }): Promise<Produto> {
    const categoria = await this.categoriaRepository.findOne({ where: { id: produtoData.categoriaId } });
    if (!categoria) {
      throw new NotFoundException('Categoria não encontrada');
    }

    
    const produto = this.produtoRepository.create({
      nome: produtoData.nome,
      preco: produtoData.preco,
      quantidade: produtoData.quantidade,
      categoria,
    });

    return this.produtoRepository.save(produto);
  }

  async update(id: number, produtoData: { nome: string; preco: number; quantidade: number; categoriaId: number }): Promise<Produto> {
    const produto = await this.findOne(id);
    const categoria = await this.categoriaRepository.findOne({ where: { id: produtoData.categoriaId } });

    if (!categoria) {
      throw new NotFoundException('Categoria não encontrada');
    }

    
    Object.assign(produto, produtoData);
    produto.categoria = categoria;

    return this.produtoRepository.save(produto);
  }

  async delete(id: number): Promise<void> {
    const produto = await this.findOne(id);
    await this.produtoRepository.remove(produto);
  }
}
