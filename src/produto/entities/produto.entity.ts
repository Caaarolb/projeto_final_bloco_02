import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Categoria } from '../../categoria/entities/categoria.entity';

@Entity('produtos')
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nome: string;

  @Column('decimal')
  preco: number;

  @Column('int')
  quantidade: number;

  @ManyToOne(() => Categoria, (categoria) => categoria.produtos, { eager: true })
  categoria: Categoria; // Relacionamento com Categoria
}
