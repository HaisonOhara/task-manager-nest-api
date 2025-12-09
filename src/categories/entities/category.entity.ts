import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Task } from '../../tasks/entities/task.entity';

// Entity do TypeORM - representa a tabela 'categories' no banco de dados
@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 50, default: '#9E9E9E' })
  color: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  // Relacionamento One-to-Many: Uma categoria pode ter várias tarefas
  @OneToMany(() => Task, (task) => task.category)
  tasks: Task[];
}
