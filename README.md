# 📝 API de Tarefas - NestJS Exemplo

Uma API RESTful simples desenvolvida com NestJS para demonstrar os principais conceitos e funcionalidades do framework.

## 🐟 Sobre o Projeto

Este é um projeto didático que implementa uma API de gerenciamento de tarefas (To-Do List) com integração a banco de dados MySQL usando TypeORM para ensinar os conceitos fundamentais do NestJS de forma prática e simples.

## 📦 Banco de Dados

A API utiliza **MySQL** como banco de dados e **TypeORM** como ORM.

### Configuração Rápida:

1. Instale o MySQL
2. Crie o banco de dados: `CREATE DATABASE nest_api_exemplo;`
3. Configure o arquivo `.env` com suas credenciais (veja `.env.example`)
4. Execute `npm run start:dev` - as tabelas serão criadas automaticamente!

📖 **Para instruções detalhadas, veja [DATABASE.md](DATABASE.md)**

## 🚀 Tecnologias

- **NestJS** - Framework progressivo para Node.js
- **TypeScript** - Superset JavaScript com tipagem estática
- **TypeORM** - ORM para TypeScript e JavaScript
- **MySQL** - Banco de dados relacional
- **Express** - Framework web (usado internamente pelo NestJS)

## 📚 Conceitos do NestJS Demonstrados

### 1. **Modules (Módulos)**
- `AppModule`: Módulo raiz que organiza toda a aplicação
- `TasksModule`: Módulo específico para o domínio de tarefas
- Os módulos agrupam código relacionado e gerenciam dependências

### 2. **Controllers (Controladores)**
- `AppController`: Gerencia rotas básicas (/, /health)
- `TasksController`: Gerencia todas as rotas relacionadas a tarefas
- Usam decorators como `@Get()`, `@Post()`, `@Put()`, `@Delete()`
- Recebem requisições HTTP e retornam respostas

### 3. **Services (Serviços)**
- `AppService`: Lógica de negócio simples da aplicação
- `TasksService`: Contém toda a lógica de negócio das tarefas
- São injetáveis e reutilizáveis (padrão @Injectable)

### 4. **DTOs (Data Transfer Objects)**
- `CreateTaskDto`: Define estrutura para criar tarefas
- `UpdateTaskDto`: Define estrutura para atualizar tarefas
- Validam dados automaticamente usando decorators

### 5. **Dependency Injection (Injeção de Dependência)**
- Services são automaticamente injetados nos controllers
- Facilita testes e manutenção do código

### 6. **Pipes & Validation**
- `ValidationPipe`: Valida dados de entrada automaticamente
- Usa decorators do `class-validator` nos DTOs

### 7. **Exception Filters**
- `NotFoundException`: Tratamento de erros quando recurso não é encontrado
- NestJS possui tratamento de erros integrado

### 8. **Interação Entre Módulos** ⭐
- `TasksModule` importa `CategoriesModule`
- `TasksService` injeta `CategoriesService`
- Um módulo pode usar services de outro módulo
- Demonstra como criar aplicações modulares e escaláveis

### 9. **TypeORM & Database Integration** 📦
- **Entities**: Classes que mapeiam tabelas do banco de dados
- **Repository Pattern**: Acesso ao banco através de repositories
- **Relations**: Relacionamentos entre entidades (One-to-Many, Many-to-One)
- **Async/Await**: Operações assíncronas com o banco de dados
- **Auto-sync**: TypeORM cria/atualiza tabelas automaticamente (desenvolvimento)

## 📁 Estrutura do Projeto

```
src/
├── tasks/
│   ├── dto/
│   │   ├── create-task.dto.ts    # DTO para criar tarefa
│   │   └── update-task.dto.ts    # DTO para atualizar tarefa
│   ├── entities/
│   │   └── task.entity.ts        # Entity do TypeORM (tabela tasks)
│   ├── tasks.controller.ts       # Controller com rotas HTTP
│   ├── tasks.service.ts          # Service com lógica de negócio
│   └── tasks.module.ts           # Módulo que agrupa tudo
├── categories/
│   ├── dto/
│   │   ├── create-category.dto.ts  # DTO para criar categoria
│   │   └── update-category.dto.ts  # DTO para atualizar categoria
│   ├── entities/
│   │   └── category.entity.ts      # Entity do TypeORM (tabela categories)
│   ├── categories.controller.ts  # Controller de categorias
│   ├── categories.service.ts     # Service de categorias
│   └── categories.module.ts      # Módulo de categorias
├── app.controller.ts             # Controller raiz
├── app.service.ts                # Service raiz
├── app.module.ts                 # Módulo raiz (configura TypeORM)
└── main.ts                       # Arquivo de entrada (bootstrap)
```

## 🔧 Instalação

```bash
# 1. Instalar dependências
npm install

# 2. Configurar banco de dados (veja DATABASE.md)
cp .env.example .env
# Edite o .env com suas credenciais do MySQL

# 3. O banco deve estar rodando e criado:
# CREATE DATABASE nest_api_exemplo;
```

## ▶️ Executando a Aplicação

```bash
# Modo desenvolvimento (com auto-reload)
npm run start:dev

# Modo produção
npm run start:prod

# Modo debug
npm run start:debug
```

A API estará disponível em `http://localhost:3000`

## 🌐 Front-end de Demonstração

O projeto inclui uma página web simples para demonstrar a interação entre front-end e back-end!

### Acessar o Front-end:

```
http://localhost:3000/index.html
```

### Funcionalidades da Página:

- ✅ **Criar tarefas** com título, descrição e categoria
- ✅ **Listar todas as tarefas** com seus detalhes
- ✅ **Filtrar tarefas** (Todas / Pendentes / Concluídas)
- ✅ **Marcar como concluída** ou reabrir tarefa
- ✅ **Deletar tarefas**
- ✅ **Estatísticas** em tempo real
- ✅ **Verificação de conexão** com a API
- ✅ **Design responsivo** e moderno

### Tecnologias do Front-end:

- **HTML5** - Estrutura semântica
- **CSS3** - Design moderno com gradientes e animações
- **JavaScript Vanilla** - Fetch API para requisições HTTP
- **Sem frameworks** - Puro e simples para fins didáticos

### Exemplos de Requisições no Código:

```javascript
// GET - Listar tarefas
fetch('http://localhost:3000/tasks')
  .then(res => res.json())
  .then(tasks => console.log(tasks));

// POST - Criar tarefa
fetch('http://localhost:3000/tasks', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Minha tarefa',
    description: 'Descrição',
    categoryId: 'uuid-da-categoria'
  })
});

// PUT - Atualizar tarefa
fetch('http://localhost:3000/tasks/{id}', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ completed: true })
});

// DELETE - Deletar tarefa
fetch('http://localhost:3000/tasks/{id}', {
  method: 'DELETE'
});
```

**Arquivos do Front-end:**
- `public/index.html` - Estrutura HTML
- `public/styles.css` - Estilização
- `public/app.js` - Lógica e requisições à API

## 🌐 Endpoints da API

### Rotas Principais

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | / | Mensagem de boas-vindas |
| GET | /health | Verifica status da API |

### Rotas de Tarefas

| Método | Endpoint | Descrição |
|--------|----------|--------|
| GET | /tasks | Lista todas as tarefas |
| GET | /tasks/:id | Busca uma tarefa específica |
| GET | /tasks/completed | Lista tarefas concluídas |
| GET | /tasks/pending | Lista tarefas pendentes |
| GET | /tasks/category/:categoryId | Lista tarefas de uma categoria |
| POST | /tasks | Cria uma nova tarefa |
| PUT | /tasks/:id | Atualiza uma tarefa |
| DELETE | /tasks/:id | Remove uma tarefa |

### Rotas de Categorias

| Método | Endpoint | Descrição |
|--------|----------|--------|
| GET | /categories | Lista todas as categorias |
| GET | /categories/:id | Busca uma categoria específica |
| POST | /categories | Cria uma nova categoria |
| PUT | /categories/:id | Atualiza uma categoria |
| DELETE | /categories/:id | Remove uma categoria |

## 📝 Exemplos de Uso

### Listar categorias disponíveis

```bash
curl http://localhost:3000/categories
```

### Criar uma tarefa com categoria

```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Estudar NestJS",
    "description": "Aprender os conceitos básicos do framework",
    "categoryId": "3"
  }'
```

### Listar todas as tarefas

```bash
curl http://localhost:3000/tasks
```

### Buscar uma tarefa específica

```bash
curl http://localhost:3000/tasks/1
```

**Nota:** Com o banco de dados, os IDs são UUIDs (ex: `550e8400-e29b-41d4-a716-446655440000`). Use o ID real retornado pela API.

### Buscar tarefas de uma categoria

```bash
curl http://localhost:3000/tasks/category/3
```

### Atualizar uma tarefa

```bash
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{
    "completed": true
  }'
```

### Deletar uma tarefa

```bash
curl -X DELETE http://localhost:3000/tasks/1
```

## 🎓 Aprendendo com este Projeto

Este projeto é ideal para quem está começando com NestJS porque:

1. ✅ **Simples e direto**: Usa apenas recursos essenciais do framework
2. ✅ **Bem comentado**: Código com comentários explicativos
3. ✅ **Conceitos fundamentais**: Demonstra os pilares do NestJS
4. ✅ **Estrutura clara**: Organização modular fácil de entender
5. ✅ **Banco de dados real**: PostgreSQL com TypeORM
6. ✅ **RESTful**: Segue as melhores práticas de APIs REST
7. ✅ **Front-end demo**: Página interativa para testar a API

## 🔍 Principais Decorators do NestJS Usados

- `@Module()` - Define um módulo
- `@Controller()` - Define um controller
- `@Injectable()` - Define um provider/service
- `@Get()`, `@Post()`, `@Put()`, `@Delete()` - Define rotas HTTP
- `@Param()` - Extrai parâmetros da URL
- `@Body()` - Extrai corpo da requisição
- `@HttpCode()` - Define código de status HTTP da resposta

## 📖 Próximos Passos

Após dominar este exemplo, você pode:

1. ✅ ~~Adicionar um banco de dados real (TypeORM + MySQL)~~ - **Já implementado!**
2. Implementar migrations do TypeORM para produção
3. Implementar autenticação com JWT
4. Adicionar testes unitários e e2e
5. Implementar paginação nos endpoints
6. Adicionar documentação Swagger/OpenAPI
7. Implementar WebSockets para atualizações em tempo real
8. Adicionar cache com Redis

## 📚 Recursos Adicionais

- [Documentação Oficial do NestJS](https://docs.nestjs.com)
- [NestJS Fundamentals Course](https://learn.nestjs.com)
- [GitHub do NestJS](https://github.com/nestjs/nest)
- [Git](https://git-scm.com/)
## 📄 Licença

MIT

---

**Dica**: Use este projeto como base para criar suas próprias APIs com NestJS! 🚀
