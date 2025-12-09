import { Injectable, NotFoundException, BadRequestException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService implements OnModuleInit {
  // Injeção do Repository do TypeORM
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  // Hook que executa após o módulo ser inicializado
  // Cria categorias padrão se o banco estiver vazio
  async onModuleInit() {
    const count = await this.categoryRepository.count();
    if (count === 0) {
      await this.createDefaultCategories();
    }
  }

  // Cria categorias padrão
  private async createDefaultCategories() {
    const defaults = [
      { name: 'Pessoal', description: 'Tarefas pessoais', color: '#4CAF50' },
      { name: 'Trabalho', description: 'Tarefas profissionais', color: '#2196F3' },
      { name: 'Estudos', description: 'Tarefas de aprendizado', color: '#FF9800' },
    ];

    for (const cat of defaults) {
      await this.create(cat);
    }
  }

  // Retorna todas as categorias
  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  // Retorna uma categoria específica por ID
  async findOne(id: string): Promise<Category> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Categoria com ID ${id} não encontrada`);
    }
    return category;
  }

  // Cria uma nova categoria
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    // Verifica se já existe categoria com o mesmo nome
    const existingCategory = await this.categoryRepository.findOne({
      where: { name: createCategoryDto.name },
    });

    if (existingCategory) {
      throw new BadRequestException(`Já existe uma categoria com o nome "${createCategoryDto.name}"`);
    }

    const newCategory = this.categoryRepository.create({
      name: createCategoryDto.name,
      description: createCategoryDto.description || '',
      color: createCategoryDto.color || '#9E9E9E',
    });

    return await this.categoryRepository.save(newCategory);
  }

  // Atualiza uma categoria existente
  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const category = await this.findOne(id);

    // Verifica se o novo nome já existe em outra categoria
    if (updateCategoryDto.name) {
      const existingCategory = await this.categoryRepository.findOne({
        where: { name: updateCategoryDto.name },
      });

      if (existingCategory && existingCategory.id !== id) {
        throw new BadRequestException(`Já existe uma categoria com o nome "${updateCategoryDto.name}"`);
      }
    }

    // Atualiza os campos fornecidos
    Object.assign(category, updateCategoryDto);

    return await this.categoryRepository.save(category);
  }

  // Remove uma categoria
  async remove(id: string): Promise<void> {
    const category = await this.findOne(id);
    await this.categoryRepository.remove(category);
  }

  // Método usado pelo TasksService para validar se a categoria existe
  // Este é um exemplo de como um módulo pode expor métodos para outros módulos
  async validateCategoryExists(categoryId: string): Promise<boolean> {
    const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
    return !!category;
  }
}
