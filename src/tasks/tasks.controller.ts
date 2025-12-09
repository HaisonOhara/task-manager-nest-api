import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

// @Controller define a rota base para este controller (/tasks)
@Controller('tasks')
export class TasksController {
  // Injeção de dependência do service
  constructor(private readonly tasksService: TasksService) {}

  // GET /tasks - Lista todas as tarefas
  @Get()
  async findAll(): Promise<Task[]> {
    return await this.tasksService.findAll();
  }

  // GET /tasks/completed - Lista tarefas concluídas
  @Get('completed')
  async findCompleted(): Promise<Task[]> {
    return await this.tasksService.findCompleted();
  }

  // GET /tasks/pending - Lista tarefas pendentes
  @Get('pending')
  async findPending(): Promise<Task[]> {
    return await this.tasksService.findPending();
  }

  // GET /tasks/category/:categoryId - Lista tarefas de uma categoria
  @Get('category/:categoryId')
  async findByCategory(@Param('categoryId') categoryId: string): Promise<Task[]> {
    return await this.tasksService.findByCategory(categoryId);
  }

  // GET /tasks/:id - Busca uma tarefa específica
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Task> {
    return await this.tasksService.findOne(id);
  }

  // POST /tasks - Cria uma nova tarefa
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.tasksService.create(createTaskDto);
  }

  // PUT /tasks/:id - Atualiza uma tarefa
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): Promise<Task> {
    return await this.tasksService.update(id, updateTaskDto);
  }

  // DELETE /tasks/:id - Remove uma tarefa
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.tasksService.remove(id);
  }
}
