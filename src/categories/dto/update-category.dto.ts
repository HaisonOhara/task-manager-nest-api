import { IsString, IsOptional, MinLength, MaxLength } from 'class-validator';

// DTO para atualizar uma categoria existente
export class UpdateCategoryDto {
  @IsString()
  @IsOptional()
  @MinLength(3, { message: 'O nome deve ter no mínimo 3 caracteres' })
  @MaxLength(30, { message: 'O nome deve ter no máximo 30 caracteres' })
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  color?: string;
}
