import { IsString, IsNotEmpty, IsOptional, MinLength, MaxLength } from 'class-validator';

// DTO para criar uma nova categoria
export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @MinLength(3, { message: 'O nome deve ter no mínimo 3 caracteres' })
  @MaxLength(30, { message: 'O nome deve ter no máximo 30 caracteres' })
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  color?: string; // Ex: "#FF5733", "blue", etc.
}
