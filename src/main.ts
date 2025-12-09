import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  // Cria a aplicação NestJS com suporte a Express
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Habilita validação global usando class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove propriedades não definidas nos DTOs
      forbidNonWhitelisted: true, // Retorna erro se propriedades extras forem enviadas
      transform: true, // Transforma os payloads para instâncias dos DTOs
    }),
  );

  // Habilita CORS para permitir requisições de outros domínios
  app.enableCors();

  // Configura pasta para servir arquivos estáticos (HTML, CSS, JS)
  app.useStaticAssets(join(__dirname, '..', 'public'));

  // Define a porta da aplicação
  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`🚀 API rodando em: http://localhost:${port}`);
  console.log(`🌐 Front-end disponível em: http://localhost:${port}/index.html`);
  console.log(`📋 Endpoints disponíveis:`);
  console.log(`   GET    /              - Mensagem de boas-vindas`);
  console.log(`   GET    /health        - Health check`);
  console.log(`   `);
  console.log(`   Tarefas:`);
  console.log(`   GET    /tasks         - Listar todas as tarefas`);
  console.log(`   GET    /tasks/:id     - Buscar tarefa por ID`);
  console.log(`   GET    /tasks/completed - Listar tarefas concluídas`);
  console.log(`   GET    /tasks/pending - Listar tarefas pendentes`);
  console.log(`   GET    /tasks/category/:categoryId - Listar tarefas por categoria`);
  console.log(`   POST   /tasks         - Criar nova tarefa`);
  console.log(`   PUT    /tasks/:id     - Atualizar tarefa`);
  console.log(`   DELETE /tasks/:id     - Deletar tarefa`);
  console.log(`   `);
  console.log(`   Categorias:`);
  console.log(`   GET    /categories    - Listar todas as categorias`);
  console.log(`   GET    /categories/:id - Buscar categoria por ID`);
  console.log(`   POST   /categories    - Criar nova categoria`);
  console.log(`   PUT    /categories/:id - Atualizar categoria`);
  console.log(`   DELETE /categories/:id - Deletar categoria`);
}

bootstrap();
