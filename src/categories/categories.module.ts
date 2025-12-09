import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';

// Módulo de Categorias
// O service é exportado para que o TasksModule possa utilizá-lo
@Module({
  imports: [TypeOrmModule.forFeature([Category])], // Registra a entity Category
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService], // IMPORTANTE: Exporta para outros módulos usarem
})
export class CategoriesModule {}
