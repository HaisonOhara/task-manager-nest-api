import { IsString, IsOptional, IsBoolean, MinLength } from 'class-validator';

// DTO para atualizar uma tarefa existente
// Todos os campos são opcionais para permitir atualização parcial
export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  @MinLength(3, { message: 'O título deve ter no mínimo 3 caracteres' })
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  completed?: boolean;

  @IsString()
  @IsOptional()
  categoryId?: string; // ID da categoria (opcional)
}
