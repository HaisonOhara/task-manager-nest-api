import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CategoriesService } from '../categories/categories.service';

// @Injectable() marca esta classe como um provider que pode ser injetado
@Injectable()
export class TasksService {
  // Injeção do Repository do TypeORM
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private readonly categoriesService: CategoriesService,
  ) {}

  // Retorna todas as tarefas
  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find({
      relations: ['category'], // Carrega a categoria junto
      order: { createdAt: 'DESC' },
    });
  }

  // Retorna uma tarefa específica por ID
  async findOne(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['category'],
    });
    if (!task) {
      throw new NotFoundException(`Tarefa com ID ${id} não encontrada`);
    }
    return task;
  }

  // Cria uma nova tarefa
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    // INTERAÇÃO ENTRE MÓDULOS: Valida se a categoria existe
    if (createTaskDto.categoryId) {
      const categoryExists = await this.categoriesService.validateCategoryExists(createTaskDto.categoryId);
      if (!categoryExists) {
        throw new BadRequestException(`Categoria com ID ${createTaskDto.categoryId} não encontrada`);
      }
    }

    const newTask = this.taskRepository.create({
      title: createTaskDto.title,
      description: createTaskDto.description || '',
      completed: false,
      categoryId: createTaskDto.categoryId,
    });

    return await this.taskRepository.save(newTask);
  }

  // Atualiza uma tarefa existente
  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);
    
    // Valida categoria se estiver sendo atualizada
    if (updateTaskDto.categoryId !== undefined && updateTaskDto.categoryId) {
      const categoryExists = await this.categoriesService.validateCategoryExists(updateTaskDto.categoryId);
      if (!categoryExists) {
        throw new BadRequestException(`Categoria com ID ${updateTaskDto.categoryId} não encontrada`);
      }
    }
    
    // Atualiza os campos fornecidos
    Object.assign(task, updateTaskDto);

    return await this.taskRepository.save(task);
  }

  // Remove uma tarefa
  async remove(id: string): Promise<void> {
    const task = await this.findOne(id);
    await this.taskRepository.remove(task);
  }

  // Retorna apenas tarefas concluídas
  async findCompleted(): Promise<Task[]> {
    return await this.taskRepository.find({
      where: { completed: true },
      relations: ['category'],
      order: { createdAt: 'DESC' },
    });
  }

  // Retorna apenas tarefas pendentes
  async findPending(): Promise<Task[]> {
    return await this.taskRepository.find({
      where: { completed: false },
      relations: ['category'],
      order: { createdAt: 'DESC' },
    });
  }

  // Retorna tarefas de uma categoria específica
  async findByCategory(categoryId: string): Promise<Task[]> {
    // Valida se a categoria existe
    const categoryExists = await this.categoriesService.validateCategoryExists(categoryId);
    if (!categoryExists) {
      throw new NotFoundException(`Categoria com ID ${categoryId} não encontrada`);
    }
    
    return await this.taskRepository.find({
      where: { categoryId },
      relations: ['category'],
      order: { createdAt: 'DESC' },
    });
  }
}
