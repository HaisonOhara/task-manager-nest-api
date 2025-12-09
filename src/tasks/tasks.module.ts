import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { CategoriesModule } from '../categories/categories.module';

// @Module agrupa o controller e o service relacionados
// Este é um dos conceitos fundamentais do NestJS
@Module(
  {
  imports: [
    TypeOrmModule.forFeature([Task]), // Registra a entity Task
    CategoriesModule,                  // Importa CategoriesModule para usar CategoriesService
  ],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule {}
