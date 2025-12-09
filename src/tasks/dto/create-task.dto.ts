import { IsString, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

// DTO (Data Transfer Object) para criar uma nova tarefa
// Os decorators validam automaticamente os dados recebidos
export class CreateTaskDto {
  @IsString()
  @IsNotEmpty({ message: 'O título é obrigatório' })
  @MinLength(3, { message: 'O título deve ter no mínimo 3 caracteres' })
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  categoryId?: string; // ID da categoria (opcional)
}
