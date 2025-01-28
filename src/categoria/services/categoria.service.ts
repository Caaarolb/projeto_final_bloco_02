import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from '../entities/categoria.entity';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  
  findAll(): Promise<Categoria[]> {
    return this.categoriaRepository.find();
  }

  
  async findOne(id: number): Promise<Categoria> {
    const categoria = await this.categoriaRepository.findOne({ where: { id } });
    if (!categoria) {
      throw new NotFoundException(`Categoria com ID ${id} não encontrada`);
    }
    return categoria as Categoria; 
  }

  
  create(categoria: Categoria): Promise<Categoria> {
    return this.categoriaRepository.save(categoria);
  }

 
  async update(id: number, categoria: Categoria): Promise<Categoria> {
    const existingCategoria = await this.findOne(id); 
    await this.categoriaRepository.update(existingCategoria.id, categoria);
    return this.categoriaRepository.findOne({ where: { id } }) as Promise<Categoria>;
  }

  
  async delete(id: number): Promise<void> {
    const categoria = await this.findOne(id); 
    await this.categoriaRepository.delete(categoria.id);
  }
}
